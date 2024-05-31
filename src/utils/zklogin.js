import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { jwtToAddress, getExtendedEphemeralPublicKey, genAddressSeed, getZkLoginSignature } from '@mysten/zklogin';

function Zklogin() {
  const [authUrl, setAuthUrl] = useState('');
  const [jwt, setJwt] = useState('');
  const [zkProof, setZkProof] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [ephemeralKeyPair] = useState(new Ed25519Keypair());
  const [randomness] = useState(generateRandomness());
  
  const handleLogin = async () => {
    const response = await axios.post('http://localhost:8000/api/zklogin/get-jwt', {
      clientId: 'YOUR_GOOGLE_CLIENT_ID',
      redirectUri: 'http://localhost:3000/callback'
    });
    setAuthUrl(response.data.authUrl);
  };
  
  const handleCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idToken = urlParams.get('id_token');
    setJwt(idToken);
    
    const decodedJwt = jwt_decode(idToken);
    const userSalt = 'YOUR_SALT'; // Replace with actual salt management
    const address = jwtToAddress(idToken, userSalt);
    setUserAddress(address);
    
    const response = await axios.post('http://localhost:8000/api/zklogin/get-zk-proof', { jwt: idToken, userSalt });
    setZkProof(response.data);
  };
  
  const handleTransaction = async () => {
    const client = new SuiClient({ url: 'YOUR_RPC_URL' });
    const txb = new Transaction();
    
    txb.setSender(userAddress);
    
    const { bytes, signature: userSignature } = await txb.sign({
      client,
      signer: ephemeralKeyPair,
    });
    
    const addressSeed = genAddressSeed(BigInt(userSalt), 'sub', decodedJwt.sub, decodedJwt.aud).toString();
    const zkLoginSignature = getZkLoginSignature({
      inputs: {
        ...zkProof,
        addressSeed,
      },
      maxEpoch,
      userSignature,
    });
    
    await client.executeTransaction({
      transaction: bytes,
      signature: zkLoginSignature,
    });
  };
  
  return (
    <div className="App">
      <h1>zkLogin Integration</h1>
      <button onClick={handleLogin}>Login with Google</button>
      {authUrl && <a href={authUrl}>Complete Login</a>}
      {jwt && <button onClick={handleCallback}>Get ZK Proof</button>}
      {zkProof && <button onClick={handleTransaction}>Submit Transaction</button>}
    </div>
  );
}

export default Zklogin;
