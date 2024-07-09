const express = require('express');
const axios = require('axios');
const router = express.Router();
router.get('/search', async (req, res) => {
    const query = req.query.q;
    const token = req.session.access_token; // Assuming access_token is stored in session

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('Access Token:', token); // Log the access token

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, options);
        const tracks = response.data.tracks.items.map(track => ({
            id: track.id,
            title: track.name,
            artist: track.artists[0].name,
            url: track.preview_url,
        }));

        res.json(tracks);
    } catch (error) {
        console.error('Error fetching data from Spotify:', error);
        res.status(500).send(error);
    }
});

module.exports = router;
