const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();
const spotifyController = require('../controllers/spotifyController');
const router = express.Router();
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } = process.env;

router.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email';
    const authorizeUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope: scopes,
        redirect_uri: SPOTIFY_REDIRECT_URI,
    })}`;
    console.log('Redirecting to:', authorizeUrl);
    res.redirect(authorizeUrl);
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send('Invalid request: no code provided.');
    }
    try {
        const { data } = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        spotifyController.setTokens(accessToken, refreshToken);

        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        return res.send('Authorization successful');
    } catch (error) {
        console.error('Error exchanging code for token:', error.response ? error.response.data : error.message);
        if (error.response) {
            res.status(error.response.status).send(`Error exchanging code for token: ${error.response.data.error_description || error.response.data.error}`);
        } else {
            res.status(500).send('Error exchanging code for token');
        }
    }
});

router.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('No search query provided');
    }
    try {
        const data = await spotifyController.searchTracks(query);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error searching tracks');
    }
});

module.exports = router;
