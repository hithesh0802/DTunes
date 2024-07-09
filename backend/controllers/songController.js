const Song = require('../models/Song');

const likeSong = async (req, res) => {
    const { id } = req.params;
    try {
        const song = await Song.findById(id);
        if (!song) return res.status(404).json({ message: 'Song not found' });

        song.likes += 1;
        await song.save();

        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const dislikeSong = async (req, res) => {
    const { id } = req.params;
    try {
        const song = await Song.findById(id);
        if (!song) return res.status(404).json({ message: 'Song not found' });

        song.dislikes += 1;
        await song.save();

        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const searchSongs = async (req, res) => {
    const query = req.query.q;
    const token = req.session.access_token;

    const options = {
        headers: {
            'Authorization': `${token}`
        }
    };

    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, options);
        const tracks = response.data.tracks.items.map(track => ({
            id: track.id,
            title: track.name,
            artist: track.artists[0].name,
            url: track.preview_url,
        }));

        res.json(tracks);
    } catch (error) {
        res.status(500).send(error);
    }
};

const streamSong = async (req, res) => {
    const { id } = req.params;
    try {
        const song = await Song.findById(id);
        if (!song) return res.status(404).json({ message: 'Song not found' });

        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createSong = async (req, res) => {
    const { userId } = req.user?.id;
    const {title ,artist, thumbnail, url } = req.body;
    console.log(req.user.id, userId , req.user);
    try {
        let song= await Song.findOne({url: url});
        if (song) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newsong =  new Song({ user: req.user.id , title,artist,thumbnail,url});
        await newsong.save();
        console.log(newsong);

        res.status(200).json(newsong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMySongs = async (req, res) => {
    const { id } =await req.user?.id;
    console.log(id);
    try {
        let songs= await Song.find({user: req.user.id});
        if(!songs){
            res.status(200).json({message: "No songs found."})
        }

        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSongsByArtist = async (req, res) => {
    const { artist } = req.body.artist.toString();
    console.log(artist, req.body, req.body.artist);
    try {
        let songs= await Song.find({artist: req.body.artist});
        if(songs[0] === ''){
            res.status(200).json({message: "No songs found."})
        }
        console.log(songs);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSongsByTitle = async (req, res) => {
    try {
        let songs= await Song.find({title: req.body.title});
        if(songs[0] === ''){
            res.status(200).json({message: "No songs found."})
        }
        console.log(songs);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { searchSongs, streamSong, likeSong, dislikeSong,createSong ,getMySongs,getSongsByArtist,getSongsByTitle};

