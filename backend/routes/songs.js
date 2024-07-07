const express = require('express');
const { searchSongs, streamSong, createSong } = require('../controllers/songController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/search', searchSongs);
router.get('/stream/:id', streamSong);
// router.post('/:id/like', likeSong);
// router.post('/:id/dislike', dislikeSong);
router.post('/create', authMiddleware, createSong);

module.exports = router;
