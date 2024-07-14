const express= require('express');
const router= express.Router();
const authMiddleware= require('../middleware/authMiddleware');
const { postLiked, checkifLiked, getLikedSongs, getdetails } = require('../controllers/userController');

router.post('/:id/liked',postLiked);
router.post('/:id/checkifLiked',checkifLiked);
router.get('/getLikedSongs',authMiddleware,getLikedSongs);
router.get('/getdetails',authMiddleware,getdetails);
router.post('/:id/disliked',authMiddleware);

module.exports= router;