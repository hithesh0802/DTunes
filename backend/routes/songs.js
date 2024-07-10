const express = require('express');
const { searchSongs, streamSong, createSong,getMySongs, getSongsByArtist, uploadSong } = require('../controllers/songController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const upload = require('../utils/multer');

router.get('/search', searchSongs);
router.get('/stream/:id', streamSong);
// router.post('/:id/like', likeSong);
// router.post('/:id/dislike', dislikeSong);
router.post('/create', authMiddleware, createSong);
router.get('/mysongs',authMiddleware,getMySongs);
router.get('/songsbyartist',getSongsByArtist);
router.post('/upload', upload.single('songFile'), uploadSong);

module.exports = router;
