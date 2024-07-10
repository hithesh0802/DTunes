const express = require('express');
const router = express.Router();
const axios = require('axios');
const { getAccessToken } = require('../middleware/spotifyAuth'); // Adjust the path as needed

// Middleware to get access token
router.use(async (req, res, next) => {
    try {
        const token = await getAccessToken();
        req.accessToken = token;
        next();
    } catch (error) {
        res.status(500).send('Error getting access token');
    }
});

// Search for music
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const accessToken = 'BQBa-ll7L3X_9nbCMxFFreolBb3zDKwWR_jrye-oCF8mKjgfr9HPP3LIwElOvBKEjX20lfqgXaPntc3Dcr335FkqZRWpFqnRHYxFV6i8c73Aa9ccDF7qKDo1dkMUmdbEWgayH0Z2qJnl9UNY7jdGeEYT2LvknynvpXL4iEsEC05xKgwZvriBh5iHAjuc1UOSKO7Ya3tB8AheGPkwYxQdXA'; 
        const searchEndpoint = `https://api.spotify.com/v1/search?q=${query}&type=track`;
    
        const response = await axios.get(searchEndpoint, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
    
        res.json(response.data);
      } catch (error) {
        console.error('Error searching tracks:', error.response.data);
        res.status(500).json({ error: 'Failed to search tracks' });
      }
});

router.get('/playlists', async (req, res) => {
    try {
        // Example endpoint to fetch user's playlists from Spotify
        const endpoint = 'https://api.spotify.com/v1/me/playlists';

        const accessToken = 'BQBOiM9auLXRmY8kIDXmzdjU2KthgQaLdMNGYvXZKPxYyS-zqS_si1p7cz7WmKm08KMvJIezzFlD12hNRdBVZMwbX3yK8A4sS1SsuuXQOfsULzlqLVo';
        
        const response = await axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const playlists = response.data.items;
        res.json(playlists);
    } catch (error) {
        console.error('Error fetching playlists:', error);
        res.status(500).json({ error: 'Failed to fetch playlists' });
    }
});

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

// Example route to search tracks by genre
router.get('/tracks', async (req, res) => {
  const { genre } = req.query;
  
  try {
    // Fetch access token from a secure storage or variable
    const accessToken = 'BQBOiM9auLXRmY8kIDXmzdjU2KthgQaLdMNGYvXZKPxYyS-zqS_si1p7cz7WmKm08KMvJIezzFlD12hNRdBVZMwbX3yK8A4sS1SsuuXQOfsULzlqLVo'; // Replace with your actual access token
    
    // Make a request to Spotify API to search tracks by genre
    const response = await axios.get(`${SPOTIFY_API_URL}/search`, {
      params: {
        q: `genre:${genre}`,
        type: 'track',
        limit: 10 // Adjust limit as needed
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    const tracks = response.data.tracks.items;
    
    // Respond with the retrieved tracks
    res.json({ tracks });
  } catch (error) {
    console.error('Error fetching tracks:', error.response.data);
    res.status(error.response.status).json({ error: 'Failed to fetch tracks' });
  }
});

module.exports = router;
