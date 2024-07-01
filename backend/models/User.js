const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }]
}, { timestamps: true });

// UserSchema.pre('save', async function(next) {
//     if (this.isModified('password') || this.isNew) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// UserSchema.methods.comparePassword = function(password) {
//     return bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model('User', UserSchema);
