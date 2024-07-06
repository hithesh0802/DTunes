const express = require('express');
const { searchSongs, streamSong } = require('../controllers/songController');
const router = express.Router();

router.get('/search', searchSongs);
router.get('/stream/:id', streamSong);
// router.post('/:id/like', likeSong);
// router.post('/:id/dislike', dislikeSong);

module.exports = router;
