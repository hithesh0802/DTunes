const User= require('../models/User');
const Song= require('../models/Song');
const jwt=require('jsonwebtoken');

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
        console.log({username: currUser.username , email: currUser.email, created: currUser.createdAt});
        return res.status(200).json({username: currUser.username , email: currUser.email, created: currUser.createdAt});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}

module.exports={postLiked,checkifLiked,getLikedSongs,getdetails};