const express= require('express');
const mongoose=require('mongoose');
const app= express();
const dotenv= require('dotenv');
const bodyparser= require('body-parser');
const cors= require('cors');

const PORT= process.env.PORT || 5000;

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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
