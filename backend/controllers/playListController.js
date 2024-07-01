const Playlist = require('../models/PlayList');

const createPlaylist = async (req, res) => {
    const { name, thumbnail } = req.body;
    const userId = req.user;
    try {
        const newPlaylist = new Playlist({ name, thumbnail, user: userId });
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addSongToPlaylist = async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

        playlist.songs.push(songId);
        await playlist.save();
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPlaylist, addSongToPlaylist };
