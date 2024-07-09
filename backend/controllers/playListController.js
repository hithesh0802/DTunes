const Playlist = require('../models/PlayList');
const Song = require('../models/Song');

const createPlaylist = async (req, res) => {
    const { name, thumbnail,songs } = req.body;
    const userId = req.user;
    try {
        const newPlaylist = new Playlist({ name, thumbnail, user: userId, songs: songs });
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addSongToPlaylist = async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
        const currentUser= req.user;
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

        if(playlist.owner !== currentUser._id ){
            return res.status(301).json({message: "only owner allowed to edit"});
        }

        const song= await Song.findById(songId);
        if(!song){
            return res.status(301).json({message: "song not valid/available"});
        }
        
        playlist.songs.push(songId);
        await playlist.save();
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPlaylistbyId= async(req,res)=>{
    const playlistId= req.params.playlistid;
    try{
        const playlist= await Playlist.findOne({_id : playlistId});
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

        res.status(200).json(playlist);
    }catch(error){
        res.status(500).json({ error: error.message });
    }   
}

module.exports = { createPlaylist, addSongToPlaylist ,getPlaylistbyId};
