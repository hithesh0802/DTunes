const express = require('express');
const { searchSongs, streamSong, createSong,getMySongs, getSongsByArtist, getSongsByTitle } = require('../controllers/songController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/search', searchSongs);
router.get('/stream/:id', streamSong);
// router.post('/:id/like', likeSong);
// router.post('/:id/dislike', dislikeSong);
router.post('/create', authMiddleware, createSong);
router.get('/mysongs',authMiddleware,getMySongs);
router.get('/songsbyartist',getSongsByArtist);
router.get('/songsbytitle',getSongsByTitle);

module.exports = router;
