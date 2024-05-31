const express = require('express');
const { generateNonce, generateRandomness, jwtToAddress, getExtendedEphemeralPublicKey } = require('@mysten/zklogin');
const jwt_decode = require('jwt-decode');
const axios = require('axios');

const router = express.Router();

router.post('/get-jwt', async (req, res) => {
  try {
    const { clientId, redirectUri } = req.body;
    const FULLNODE_URL = 'https://fullnode.devnet.sui.io';
    const suiClient = new SuiClient({ url: FULLNODE_URL });
    const { epoch } = await suiClient.getLatestSuiSystemState();
    
    const maxEpoch = Number(epoch) + 2;
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=id_token&redirect_uri=${redirectUri}&scope=openid&nonce=${nonce}`;
    
    res.json({ authUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/get-zk-proof', async (req, res) => {
  try {
    const { jwt, userSalt } = req.body;
    const decodedJwt = jwt_decode(jwt);
    const zkLoginUserAddress = jwtToAddress(jwt, userSalt);
    const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(ephemeralKeyPair.getPublicKey());
    
    const response = await axios.post('https://prover-dev.mystenlabs.com/v1', {
      jwt,
      extendedEphemeralPublicKey,
      maxEpoch: '10',
      jwtRandomness: '100681567828351849884072155819400689117', // Use your randomness
      salt: userSalt,
      keyClaimName: 'sub'
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
