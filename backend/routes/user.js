const express= require('express');
const router= express.Router();
const authMiddleware= require('../middleware/authMiddleware');
const { postLiked } = require('../controllers/userController');

router.post('/:id/liked',authMiddleware,postLiked);
router.post('/:id/disliked',authMiddleware);

module.exports= router;