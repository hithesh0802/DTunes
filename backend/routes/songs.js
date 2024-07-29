const express = require('express');
const Song= require('../models/Song');
const User= require('../models/User');
const { searchSongs,dislikeSong, streamSong, createSong,getMySongs,getSongById, getSongsByArtist, uploadSong, getSongsByTitle ,likeSong} = require('../controllers/songController');
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
router.get('/:id/getSongs',authMiddleware,getSongById);
router.post('/like', authMiddleware, async (req, res) => {
    console.log(req.body.id);
    const id= req.body.id.toString();
      const song = await Song.findById(req.body.id);
      if (!song) return res.status(404).send('Song not found');
  
      if (!song.likes.includes(req.user.id)) {
        song.likes.push(req.user.id);
        song.dislikes.pull(req.user.id); // Remove dislike if it exists
      }
  
      await song.save();
      res.status(200).send(song);
    
  });

  router.post('/:id/dislike', authMiddleware, async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);
      if (!song) return res.status(404).send('Song not found');
        
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).send('User not found');

      if (!song.dislikes.includes(req.user.id)) {
        song.dislikes.push(req.user.id);
        song.likes.pull(req.user.id);
        user.likedSongs.pull(req.params.id); // Remove like if it exists
      }
      await user.save();
      await song.save();
      res.status(200).send(song);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

module.exports = router;
