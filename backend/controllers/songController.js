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
    const { query } = req.query;
    try {
        const songs = await Song.find({ title: { $regex: query, $options: 'i' } });
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    const { id } = req.user?.id;
    const {title ,artist, thumbnail, url } = req.body;
    try {
        let song= await Song.findOne({url: url});
        if (song) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newsong =  new Song({userid: id , title,artist,thumbnail,url});
        await newsong.save();
        console.log(newsong);

        res.status(200).json(newsong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { searchSongs, streamSong, likeSong, dislikeSong,createSong };

