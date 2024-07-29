const express = require('express');
const { createPlaylist, addSongToPlaylist, getPlaylistbyId,partyMode, getMyPlaylists } = require('../controllers/playListController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const Playlist = require('../models/PlayList');
const User= require('../models/User');
const Song= require('../models/Song');

router.post('/create', authMiddleware, createPlaylist);
router.post('/add-song', authMiddleware, addSongToPlaylist);
router.get('/get/:playlistId',authMiddleware,getPlaylistbyId);
router.get('/getplaylists', authMiddleware,getMyPlaylists);
// router.get('/get/artist/:artistid',authMiddleware,getPlaylistby);
router.post('/party-mode', authMiddleware, partyMode);

module.exports = router;
