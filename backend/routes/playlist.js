const express = require('express');
const { createPlaylist, addSongToPlaylist, getPlaylistbyId, getMyPlaylists } = require('../controllers/playListController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createPlaylist);
router.post('/add-song', authMiddleware, addSongToPlaylist);
router.get('/get/:playlistid',authMiddleware,getPlaylistbyId);
router.get('/getplaylists', authMiddleware,getMyPlaylists);
// router.get('/get/artist/:artistid',authMiddleware,getPlaylistby);

module.exports = router;
