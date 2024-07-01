const express = require('express');
const { createPlaylist, addSongToPlaylist } = require('../controllers/playListController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createPlaylist);
router.post('/add-song', authMiddleware, addSongToPlaylist);

module.exports = router;
