const express= require('express');
const mongoose=require('mongoose');
const app= express();
const dotenv= require('dotenv');
const dbConfig = require('./config/db');
const bodyparser= require('body-parser');
const cors= require('cors');
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/songs');
const playlistRoutes = require('./routes/playlist');
const userRoutes= require('./routes/user');
const spotify=require('./routes/spotify');
const friends=require('./routes/friends');
const PORT=  5000;
const session = require('express-session');
const path= require('path');
const fs = require('fs');
// const userRoutes=require('./routes/user');

dotenv.config();

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log('connected!');
  }).catch(err=>{
    console.log('failed',err);
  });

app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.JWT, // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true } // Set to true if using HTTPS
}));

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/user',userRoutes);
app.use('/api/spotify',spotify);
app.use('/api/friends',friends);

// app.use('/api/users', userRoutes);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
