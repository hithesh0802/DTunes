const express = require('express');
const { searchSongs,dislikeSong, streamSong, createSong,getMySongs, getSongsByArtist, uploadSong, getSongsByTitle ,likeSong} = require('../controllers/songController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const upload = require('../utils/multer');

router.get('/search',getSongsByTitle);
router.get('/stream/:id', streamSong);
router.put('/:id/likes', likeSong);
router.put('/:id/dislikes', dislikeSong);
router.post('/create', authMiddleware, createSong);
router.get('/mysongs',authMiddleware,getMySongs);
router.get('/songsbyartist',getSongsByArtist);
router.post('/upload', upload.single('songFile'), uploadSong);

module.exports = router;
