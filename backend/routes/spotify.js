const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const router = express.Router();

router.get('/login', (req, res) => {
  const scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scopes,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }));
});

router.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
    },
    json: true
  };

  try {
    const response = await axios.post(authOptions.url, querystring.stringify(authOptions.form), {
      headers: authOptions.headers
    });
    const accessToken = response.data.access_token;
    console.log(accessToken);
    res.send({ accessToken });
  } catch (error) {
    res.status(400).send(error.response.data);
  }
});

module.exports = router;

