const express = require('express');
const router = express.Router();
const Playlist = require('../models/PlayList');
const User= require('../models/User');
const Song= require('../models/Song');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/party-mode', authMiddleware, async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user.id } });

        if (users.length < 2) {
            return res.status(400).json({ message: 'Not enough users to create a party mode playlist' });
        }

        const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 2);

        const playlistsUser1 = await Playlist.find({ user: randomUsers[0]._id });
        const playlistsUser2 = await Playlist.find({ user: randomUsers[1]._id });

        if (!playlistsUser1.length || !playlistsUser2.length) {
            return res.status(400).json({ message: 'One or both selected users have no playlists' });
        }

        const randomPlaylistUser1 = playlistsUser1[Math.floor(Math.random() * playlistsUser1.length)];
        const randomPlaylistUser2 = playlistsUser2[Math.floor(Math.random() * playlistsUser2.length)];

        const combinedSongs = [...randomPlaylistUser1.songs, ...randomPlaylistUser2.songs];

        const temporaryPlaylist = {
            name: 'Party Mode Playlist',
            songs: combinedSongs
        };

        res.status(200).json(temporaryPlaylist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
