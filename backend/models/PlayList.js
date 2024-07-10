const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    thumbnail: { type: String },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imgurl: { type: String, required: true },
    owner:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);
