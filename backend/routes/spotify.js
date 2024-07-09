const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const router = express.Router();

const client_id = '6c74d0eb3de74e929dd80a715e783d4e'; // Replace with your client ID
const client_secret = 'e4c8b151384d4e338a45f3381f16f5dd'; // Replace with your client secret
const redirect_uri = 'http://localhost:5000/api/spotify/callback'; // Replace with your redirect URI

router.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
    const authUrl = 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
        });
    console.log("hi" ,authUrl);
    res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
    });

    const options = {
        headers: {
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        const response = await axios.post(tokenUrl, data, options);
        const { access_token, refresh_token } = response.data;
        console.log( access_token );
        // Store tokens in a session or database for use in your application
        req.session.access_token = access_token;
        req.session.refresh_token = refresh_token;

        res.redirect('http://localhost:3000'); // Redirect to your app's home page
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
