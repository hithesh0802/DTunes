const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/sendFriendRequest', async (req, res) => {
  const { senderId, recipientId } = req.body;
    console.log(req.body.senderId, req.body.recipientId);
  try {
    const recipient = await User.findById(req.body.recipientId);

    if (!recipient) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (recipient.friendRequests.includes(req.body.senderId)) {
      return res.status(200).json({ Message: 'Friend request already sent' });
    }

    recipient.friendRequests.push(req.body.senderId);
    await recipient.save();
    console.log(recipient.friendRequests);
    res.status(200).json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending friend request' });
  }
});


router.get('/getfriendRequests', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('friendRequests', 'username email artist');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.friendRequests);
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/acceptFriendRequest', async (req, res) => {
  const { userId, senderId } = req.body;

  try {
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const requestIndex = user.friendRequests.indexOf(req.body.senderId);

    if (requestIndex === -1) {
      return res.status(400).json({ error: 'Friend request not found' });
    }

    user.friendRequests.splice(requestIndex, 1);
    user.friends.push(req.body.senderId);

    const sender = await User.findById(req.body.senderId);
    sender.friends.push(req.body.userId);

    await user.save();
    await sender.save();
    console.log(user.friends);
    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ error: 'Error accepting friend request' });
  }
});


module.exports = router;
