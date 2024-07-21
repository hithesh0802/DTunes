const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' ,default:[]}],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imgurl: { type: String, required: true },
    owner:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    isPrivate: { type: Boolean, default: false },
    artist:{type: String},
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);
