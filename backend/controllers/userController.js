const User= require('../models/User');
const Song= require('../models/Song');

const postLiked= async(req,res)=>{
    const {id}= req.params.id;
    const currUser= await User.findById(req.user.id);
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

module.exports={postLiked};