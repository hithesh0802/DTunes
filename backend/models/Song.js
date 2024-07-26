const mongoose = require('mongoose');
const Schema= mongoose.Schema ;

const SongSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    url: { type: String, required: true },
    imgurl: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',default:[] }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',default:[]  }],
    thumbnail: {type: String},
    description: {type:String, required:true},
    duration: {type:String, required:true}
}, { timestamps: true });

module.exports = mongoose.model('Song', SongSchema);
