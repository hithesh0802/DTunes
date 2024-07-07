const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    thumbnail: {type: String},
    userid: {type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Song', SongSchema);
