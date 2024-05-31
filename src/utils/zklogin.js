import React, { useEffect, useRef, useState } from "react";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import {
    genAddressSeed,
    generateNonce,
    generateRandomness,
    getExtendedEphemeralPublicKey,
    getZkLoginSignature,
    jwtToAddress,
} from "@mysten/zklogin";
import { NetworkName, makePolymediaUrl, requestSuiFromFaucet, shortenSuiAddress } from "@polymedia/suitcase-core";


import { jwtDecode } from 'jwt-decode';




/* Configuration */
import config from "./config.json"; // copy and modify config.example.json with your own values

const NETWORK = "devnet";
const MAX_EPOCH = 2; // keep ephemeral keys active for this many Sui epochs from now (1 epoch ~= 24h)

const suiClient = new SuiClient({
    url: getFullnodeUrl(NETWORK),
});

/* Session storage keys */
const setupDataKey = "zklogin-demo.setup";
const accountDataKey = "zklogin-demo.accounts";
const LinkExternal = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);



const ZKButton = () => {
    const accounts = useRef(loadAccounts()); // useRef() instead of useState() because of setInterval()
    const [balances, setBalances] = useState(new Map()); // Map<Sui address, SUI balance>
    const [modalContent, setModalContent] = useState("");

    useEffect(() => {
        completeZkLogin();
        fetchBalances(accounts.current);
        const interval = setInterval(() => fetchBalances(accounts.current), 5_000);
        return () => { clearInterval(interval); };
    }, []);

    /* zkLogin end-to-end */
    async function beginZkLogin(provider) {
        setModalContent(`🔑 Logging in with ${provider}...`);

        // Create a nonce
        const { epoch } = await suiClient.getLatestSuiSystemState();
        const maxEpoch = Number(epoch) + MAX_EPOCH; // the ephemeral key will be valid for MAX_EPOCH from now
        const ephemeralKeyPair = new Ed25519Keypair();
        const randomness = generateRandomness();
        const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);

        // Save data to session storage so completeZkLogin() can use it after the redirect
        saveSetupData({
            provider,
            maxEpoch,
            randomness: randomness.toString(),
            ephemeralPrivateKey: ephemeralKeyPair.getSecretKey(),
        });

        // Start the OAuth flow with the OpenID provider
        const urlParamsBase = {
            nonce: nonce,
            redirect_uri: window.location.origin,
            response_type: "id_token",
            scope: "openid",
        };
        let loginUrl;
        switch (provider) {
            case "Google": {
                const urlParams = new URLSearchParams({
                    ...urlParamsBase,
                    client_id: config.CLIENT_ID_GOOGLE,
                });
                loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${urlParams.toString()}`;
                break;
            }
            case "Twitch": {
                const urlParams = new URLSearchParams({
                    ...urlParamsBase,
                    client_id: config.CLIENT_ID_TWITCH,
                    force_verify: "true",
                    lang: "en",
                    login_type: "login",
                });
                loginUrl = `https://id.twitch.tv/oauth2/authorize?${urlParams.toString()}`;
                break;
            }
            case "Facebook": {
                const urlParams = new URLSearchParams({
                    ...urlParamsBase,
                    client_id: config.CLIENT_ID_FACEBOOK,
                });
                loginUrl = `https://www.facebook.com/v19.0/dialog/oauth?${urlParams.toString()}`;
                break;
            }
        }
        window.location.replace(loginUrl);
    }

    async function completeZkLogin() {
        // === Grab and decode the JWT that beginZkLogin() produced ===
        // https://docs.sui.io/concepts/cryptography/zklogin#decoding-jwt

        // grab the JWT from the URL fragment (the '#...')
        const urlFragment = window.location.hash.substring(1);
        const urlParams = new URLSearchParams(urlFragment);
        const jwt = urlParams.get("id_token");
        if (!jwt) {
            return;
        }

        // remove the URL fragment
        window.history.replaceState(null, "", window.location.pathname);

        // decode the JWT
        const jwtPayload = jwtDecode(jwt);
        if (!jwtPayload.sub || !jwtPayload.aud) {
            console.warn("[completeZkLogin] missing jwt.sub or jwt.aud");
            return;
        }

        // === Get the salt ===
        // https://docs.sui.io/concepts/cryptography/zklogin#user-salt-management

        const requestOptions =
            config.URL_SALT_SERVICE === "/dummy-salt-service.json"
                ? // dev, using a JSON file (same salt all the time)
                {
                    method: "GET",
                }
                : // prod, using an actual salt server
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ jwt }),
                };

        const saltResponse = await fetch(config.URL_SALT_SERVICE, requestOptions)
            .then(res => {
                console.debug("[completeZkLogin] salt service success");
                return res.json();
            })
            .catch((error) => {
                console.warn("[completeZkLogin] salt service error:", error);
                return null;
            });

        if (!saltResponse) {
            return;
        }

        const userSalt = saltResponse.salt

        // === Get a Sui address for the user ===
        // https://docs.sui.io/concepts/cryptography/zklogin#get-the-users-sui-address

        const userAddr = jwtToAddress(jwt, userSalt);

        // === Load and clear the data which beginZkLogin() created before the redirect ===
        const setupData = loadSetupData();
        if (!setupData) {
            console.warn("[completeZkLogin] missing session storage data");
            return;
        }
        clearSetupData();
        for (const account of accounts.current) {
            if (userAddr === account.userAddr) {
                console.warn(`[completeZkLogin] already logged in with this ${setupData.provider} account`);
                return;
            }
        }

        // === Get the zero-knowledge proof ===
        // https://docs.sui.io/concepts/cryptography/zklogin#get-the-zero-knowledge-proof

        const ephemeralKeyPair = keypairFromSecretKey(setupData.ephemeralPrivateKey);
        const ephemeralPublicKey = ephemeralKeyPair.getPublicKey();
        const payload = JSON.stringify({
            maxEpoch: setupData.maxEpoch,
            jwtRandomness: setupData.randomness,
            extendedEphemeralPublicKey: getExtendedEphemeralPublicKey(ephemeralPublicKey),
            jwt,
            salt: userSalt.toString(),
            keyClaimName: "sub",
        }, null, 2);

        console.debug("[completeZkLogin] Requesting ZK proof with:", payload);
        setModalContent("⏳ Requesting ZK proof. This can take a few seconds...");

        const zkProofs = await fetch(config.URL_ZK_PROVER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
        })
            .then(res => {
                console.debug("[completeZkLogin] ZK proving service success");
                return res.json();
            })
            .catch((error) => {
                console.warn("[completeZkLogin] ZK proving service error:", error);
                return null;
            })
            .finally(() => {
                setModalContent("");
            });

        if (!zkProofs) {
            return;
        }

        // === Save data to session storage so sendTransaction() can use it ===
        saveAccount({
            provider: setupData.provider,
            userAddr,
            zkProofs,
            ephemeralPrivateKey: setupData.ephemeralPrivateKey,
            userSalt: userSalt.toString(),
            sub: jwtPayload.sub,
            aud: typeof jwtPayload.aud === "string" ? jwtPayload.aud : jwtPayload.aud[0],
            maxEpoch: setupData.maxEpoch,
        });
    }

    async function sendTransaction(account) {
        setModalContent("🚀 Sending transaction...");

        // Sign the transaction bytes with the ephemeral private key
        const tx = new Transaction();
        tx.setSender(account.userAddr);

        const ephemeralKeyPair = keypairFromSecretKey(account.ephemeralPrivateKey);
        const { bytes, signature: userSignature } = await tx.sign({
            client: suiClient,
            signer: ephemeralKeyPair,
        });

        const singer = new RawSigner(signature);

        // Generate an address seed by combining userSalt, sub (subject ID), and aud (audience)
        const addressSeed = genAddressSeed(
            account.userSalt,
            "sub",
            account.sub,
            account.aud,
        ).toString();

        // Serialize the zkLogin signature by combining the ZK proof (inputs), the maxEpoch, the user's transaction signature, and the addressSeed
        const signature = getZkLoginSignature(
            account.zkProofs,
            account.maxEpoch,
            userSignature,
            addressSeed,
        );

        // Send the transaction
        const response = await suiClient.executeTransaction({
            transaction: bytes,
            signature,
        });

        console.debug("[sendTransaction] response:", response);
        setModalContent(
            response?.digest
                ? <>
                    🥳 <LinkExternal href={makePolymediaUrl({ digest: response.digest, network: NETWORK })}>Transaction succeeded</LinkExternal>!
                </>
                : <>
                    😟 Transaction failed!
                </>,
        );
    }

    /* Funds */
    async function requestFunds(account) {
        setModalContent("💸 Requesting test SUI...");
        const result = await requestSuiFromFaucet(NETWORK, account.userAddr);
        setModalContent(result.message);
    }

    /* Balances */
    async function fetchBalances(accounts) {
        if (accounts.length === 0) {
            return;
        }

        const balances = new Map();
        for (const account of accounts) {
            const coins = await suiClient.getCoins({
                owner: account.userAddr,
                coinType: "0x2::sui::SUI",
            });
            let totalBalance = 0n;
            for (const coin of coins.data) {
                totalBalance += coin.balance
            }
            balances.set(account.userAddr, totalBalance);
        }
        setBalances(balances);
    }

    return (
      <div className="App" style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
          
  
          <div className="content" style={{ textAlign: 'left',color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:'30%' }}>
             
              <p
                  style={{ marginBottom: '20px', fontSize: '16px' }}  
              >
                  Choose an identity provider to log in. Your ZK address and testnet balance will appear below.
              </p>
  
              <div className="login-buttons" style={{ marginBottom: '50px' }}>
                  {["Google", "Twitch", "Facebook"].map((provider) => (
                      <button
                          key={provider}
                          onClick={() => beginZkLogin(provider)}
                          style={{ marginRight: '10px', padding: '15px 20px', fontSize: '14px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
                      >
                          {provider}
                      </button>
                  ))}
              </div>
  
              <h2>Your zkLogin Accounts</h2>
              {accounts.current.length === 0 && <p>No accounts yet. Log in above!</p>}
              {accounts.current.length > 0 && accounts.current.map((account) => (
                  <div key={account.userAddr} className="account" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                      <h3>{account.provider}</h3>
                      <div>
                          Address: <code>{account.userAddr}</code>
                      </div>
                      <div>
                          Shortened address: {shortenSuiAddress(account.userAddr)}
                      </div>
                      <div>
                          Balance: {balances.get(account.userAddr) ?? '...'}
                      </div>
                      <div className="actions" style={{ marginTop: '10px' }}>
                          <button onClick={() => sendTransaction(account)} style={{ marginRight: '5px', padding: '5px 10px', fontSize: '14px', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
                              Send Transaction
                          </button>
                          <button onClick={() => requestFunds(account)} style={{ padding: '5px 10px', fontSize: '14px', borderRadius: '5px', backgroundColor: '#17a2b8', color: '#fff', border: 'none', cursor: 'pointer' }}>
                              Request Test SUI
                          </button>
                      </div>
                  </div>
              ))}
          </div>
  
          {/* <Modal
              content={modalContent}
              onClose={() => setModalContent("")}
          /> */}
      </div>
  </div>
  
    );
};

/* Local storage helpers */
function loadSetupData() {
    const data = window.sessionStorage.getItem(setupDataKey);
    return data ? JSON.parse(data) : null;
}

function saveSetupData(data) {
    window.sessionStorage.setItem(setupDataKey, JSON.stringify(data));
}

function clearSetupData() {
    window.sessionStorage.removeItem(setupDataKey);
}

function loadAccounts() {
    const data = window.localStorage.getItem(accountDataKey);
    return data ? JSON.parse(data) : [];
}

function saveAccount(account) {
    const accounts = loadAccounts();
    accounts.push(account);
    window.localStorage.setItem(accountDataKey, JSON.stringify(accounts));
}

function keypairFromSecretKey(secretKey) {
    const array = Uint8Array.from(Buffer.from(secretKey, "hex"));
    return Ed25519Keypair.fromSecretKey(array);
}

export default ZKButton ;
export { ZKButton };
