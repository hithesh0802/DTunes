const mongoose = require('mongoose');
const Schema= mongoose.Schema ;

const SongSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    thumbnail: {type: String},
}, { timestamps: true });

module.exports = mongoose.model('Song', SongSchema);
