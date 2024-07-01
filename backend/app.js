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

const PORT=  5000;

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

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
