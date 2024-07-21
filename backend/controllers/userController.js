const User= require('../models/User');
const Song= require('../models/Song');
const jwt=require('jsonwebtoken');
const ytdl = require('ytdl-core');

const postLiked= async(req,res)=>{
    const {id}= req.params.id;
    const {token}= req.body;
    const decoded = jwt.verify(token, process.env.JWT);
    const userId= decoded.id;
    console.log(userId,"userId");
    const currUser= await User.findById(userId);
    
    try{
    if (!currUser) return res.status(404).json({ message: 'User not found' });

    const song= await Song.findById(req.params.id);
    // console.log(id,req.params,song);
    if(!song){
        return res.status(301).json({message: "song not valid/available"});
    }
    console.log(currUser.likedSongs);

    if (currUser.likedSongs.includes(req.params.id)) {
        return res.status(200).json({ message: 'Song already liked' });
    }

    currUser.likedSongs.push(req.params.id);
    await currUser.save();
    res.status(200).json(currUser);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const checkifLiked= async(req,res)=>{
    const {id}= req.params.id;
    const {token}= req.body;
    const decoded = jwt.verify(token, process.env.JWT);
    const userId= decoded.id;
    console.log(userId,"userId");
    const currUser= await User.findById(userId);
    
    try{
    if (!currUser) return res.status(404).json({ message: 'User not found' });

    const song= await Song.findById(req.params.id);
    // console.log(id,req.params,song);
    if(!song){
        return res.status(301).json({message: "song not valid/available"});
    }
    console.log(currUser.likedSongs);

    if (currUser.likedSongs.includes(req.params.id)) {
        return res.status(200).json(true);
    }else{
        return res.status(200).json(false);
    }

    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const getLikedSongs= async(req,res)=>{
    const currUser=await User.findById(req.user.id);
    try{
        const likedSongs = await Promise.all(
            currUser.likedSongs.map(async (item) => {
                return await Song.findById(item);
            })
        );
        return res.status(200).json(likedSongs);

    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

const getdetails=async(req,res)=>{
    const currUser=await User.findById(req.user.id);
    try{
        console.log({username: currUser.username , email: currUser.email, created: currUser.createdAt , id: currUser._id});
        return res.status(200).json({username: currUser.username , email: currUser.email, created: currUser.createdAt, artist:currUser.artist, id: currUser._id});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

const geturl=async(req,res)=>{
    try {
        const videoUrl = 'https://www.youtube.com/watch?v=Yl_thbk40A0'; 
        
        if (!ytdl.validateURL(videoUrl)) {
          return res.status(400).json({ error: 'Invalid YouTube URL' });
        }
    
        const info = await ytdl.getInfo(videoUrl);
        const audioUrl = info.formats.find(format => format.hasAudio).url;
    
        res.json({ audioUrl });
      } catch (error) {
        console.error('Error extracting audio URL:', error);
        res.status(500).json({ error: 'Failed to fetch audio URL from YouTube' });
      }
}

const getUserbyUserName= async(req,res)=>{
    const username= req.query.q ; 
    console.log(req.query.q,username);
    try{
        const users=await User.find({username: req.query.q});
        return res.status(200).json(users);      
    }catch (error) {
        console.error('Error extracting users:', error);
        res.status(500).json({ error: 'error fetching users' });
    }
}

const getFriends= async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).populate('friends');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friends = user.friends;

    return res.status(200).json(friends);
    }catch (error) {
        console.error('Error extracting users:', error);
        res.status(500).json({ error: 'error fetching users' });
    }
}

module.exports={postLiked,checkifLiked,getLikedSongs,getdetails,geturl,getFriends,getUserbyUserName};