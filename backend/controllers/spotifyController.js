const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } = process.env;

let accessToken = null;
let refreshToken = null;
let tokenExpiryTime = null;

const getNewAccessToken = async () => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        accessToken = response.data.access_token;
        tokenExpiryTime = Date.now() + response.data.expires_in * 1000;
    } catch (error) {
        console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
    }
};

const ensureValidAccessToken = async () => {
    if (!accessToken || Date.now() > tokenExpiryTime) {
        await getNewAccessToken();
    }
};

const searchTracks = async (query) => {
    await ensureValidAccessToken();
    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query,
                type: 'track',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching tracks:', error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = {
    setTokens: (access, refresh) => {
        accessToken = access;
        refreshToken = refresh;
        tokenExpiryTime = Date.now() + 3600 * 1000; // 1 hour
    },
    searchTracks,
};
