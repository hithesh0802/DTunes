const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();
const spotifyController = require('../controllers/spotifyController');
const router = express.Router();
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } = process.env;
let accessToken = '';
let refreshToken = '';

router.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email';
    const authUrl= `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope: scopes,
        redirect_uri: SPOTIFY_REDIRECT_URI,
    })}`;
    console.log(authUrl);
    res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { data } = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        accessToken = data.access_token;
        refreshToken = data.refresh_token;
        console.log(data.access_token,data.refresh_token);
        return res.send('Authorization successful');
    } catch (error) {
        console.error('Error exchanging code for token', error);
        res.status(500).send('Error exchanging code for token');
    }
});

const refreshAccessToken = async () => {
    try {
        const { data } = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            params: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        accessToken = data.access_token;
        console.log('Access token refreshed:', accessToken);
    } catch (error) {
        console.error('Error refreshing access token:', error.response.data);
    }
};

router.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('No search query provided');
    }
    try {
        const result = await searchTracks(query);
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('No tracks found');
        }
    } catch (error) {
        console.error('Error searching tracks:', error.response.data);
        res.status(500).send('Error searching tracks');
    }
});

const searchTracks = async (query) => {
    try {
        const { data } = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query,
                type: 'track',
                limit: 10
            },
        });

        const formattedTracks = data.tracks.items.map(track => ({
            track_name: track.name,
            artist_name: track.artists.map(artist => artist.name).join(', '),
            image_url: track.album.images[0].url, // Taking the first image
            preview_url: track.preview_url
        }));

        return formattedTracks;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await refreshAccessToken();
            return await searchTracks(query);
        }
        throw error;
    }
};

module.exports = router;
