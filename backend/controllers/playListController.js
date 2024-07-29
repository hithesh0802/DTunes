const Playlist = require('../models/PlayList');
const Song = require('../models/Song');
const User=require('../models/User');
const createPlaylist = async (req, res) => {
    const { name, imgurl,songs } = req.body;
    const userId = req.user.id;
    try {
        const newPlaylist = new Playlist({ name, imgurl, user: req.user.id, songs: songs });
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

        console.log(playlist.user.toString() , req.user.id);
        if(playlist.user.toString() !== req.user.id ){
            return res.status(301).json({message: "only owner allowed to edit"});
        }

        const song= await Song.findById(songId);
        if(!song){
            return res.status(301).json({message: "song not valid/available"});
        }
        console.log(song);
        playlist.songs.push(songId);
        await playlist.save();
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPlaylistbyId= async(req,res)=>{
    const playlistId= req.params.playlistId.toString();
    console.log(playlistId, req.params.playlistId , req.params.playlistId.toString());
    try{
        const playlist= await Playlist.findById(req.params.playlistId).populate("songs");
        if (!playlist) return res.status(200).json({ message: 'Playlist not found' });

        return res.status(200).json(playlist);
    }catch(error){
        res.status(500).json({ error: error.message });
    }   
}

const getMyPlaylists = async(req,res)=>{
    const userId = req.user.id;
    const songId = req.body.songId;
    try{
        const user = await User.findById(req.user.id).populate('likedSongs');
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        let likedSongsPlaylist = await Playlist.findOne({ user: userId, name: 'Liked Songs' });
        if (!likedSongsPlaylist) {
        likedSongsPlaylist = new Playlist({
            name: 'Liked Songs',
            isPrivate: true,
            user: userId,
            songs: [],
            imgurl: "https://plus.unsplash.com/premium_photo-1683727986626-355d473cb936?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        });
        }
        likedSongsPlaylist.songs = user.likedSongs.map(song => song._id);
        await likedSongsPlaylist.save();

        const playlists= await Playlist.find({user: req.user.id});
        if (!playlists) return res.status(200).json({ message: 'You currently have no playlists ' });
        // playlists.push(likedSongsPlaylist);
        return res.status(200).json(playlists);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

const partyMode =async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user.id } });

        if (users.length < 2) {
            return res.status(400).json({ message: 'Not enough users to create a party mode playlist' });
        }

        const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 2);

        const playlistsUser1 = await Playlist.find({ user: randomUsers[0]._id });
        const playlistsUser2 = await Playlist.find({ user: randomUsers[1]._id });

        if (!playlistsUser1.length || !playlistsUser2.length) {
            return res.status(400).json({ message: 'One or both selected users have no playlists' });
        }

        const randomPlaylistUser1 = playlistsUser1[Math.floor(Math.random() * playlistsUser1.length)];
        const randomPlaylistUser2 = playlistsUser2[Math.floor(Math.random() * playlistsUser2.length)];

        const combinedSongs = [...randomPlaylistUser1.songs, ...randomPlaylistUser2.songs];

        const temporaryPlaylist = {
            name: 'Party Mode Playlist',
            songs: combinedSongs
        };

        res.status(200).json(temporaryPlaylist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createPlaylist, addSongToPlaylist ,getPlaylistbyId,getMyPlaylists,partyMode};
