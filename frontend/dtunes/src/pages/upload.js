import React, { useState } from 'react';
import axios from 'axios';
import CloudinaryUpload from '../components/CloudinaryUpload';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LoggedinContainer from '../components/LoggedinContainer';
import TextInput from '../components/TextInput';

const UploadSong = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [imgurl, setImgurl] = useState('');
  const [uploadedfilename,setUploadedfilename] = useState('');
  const [description,setDescription]= useState('');
  const [duration, setDuration]= useState('');

  const navigate= useNavigate();
  const API_URL= 'http://localhost:5000/api';

  const handleSubmit = async () => {
    try {
      const token =localStorage.getItem('token');
      const body= {
        title: title,
        artist: artist,
        url: url,
        imgurl: imgurl,
        description: description,
        duration: duration
      };
      console.log(body);
      const response =await axios.post(`${API_URL}/songs/create`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log(response.data);
      if(response.err){
      alert('Song uploaded successfully');
      return;
      }
      // Reset form fields after successful upload
      setTitle('');
      setArtist('');
      setImgurl('');
      setUrl('');
      setUploadedfilename('');
      setDescription('');
      setDuration('');
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Failed to upload song');
    }
  };

  return (
    <div className="min-h-screen text-white overflow-auto bg-black " >
      <LoggedinContainer curActScreen={"Upload Song"}>

      <div className=" bg-black container mx-auto p-4">
          <div>
            <label className="block text-yellow-300 text-lg font-medium mb-2">Title</label>
            <TextInput
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-yellow-300 text-lg font-medium mb-2">Artist</label>
            <TextInput
                placeholder="Artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-yellow-300 text-lg font-medium mb-2">Description</label>
            <TextInput
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-yellow-300 text-lg font-medium mb-2">Thumbnail (Image) url</label>
            <TextInput
                placeholder="Thumbnail image Url"
                value={imgurl}
                onChange={(e) => setImgurl(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-yellow-300 text-lg font-medium mb-2">Duration</label>
            <TextInput
                placeholder="Minutes: Seconds"
                value={duration}
                onChange={(e) => setDuration(e.target.value)} 
            />
          </div>
          <div className='pt-5 '>{
            uploadedfilename ? 
            <div className='bg-white text-black rounded-full p-3 w-1/3 font-semibold '>
              {uploadedfilename.substring(0,20)}...
              </div>
              : 
              <CloudinaryUpload setUrl={setUrl} setUploadedfilename={setUploadedfilename} />
          }
          </div>
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="w-40 py-2 px-4 mt-4 border border-blue-700 rounded-md hover:bg-blue-500 bg-opacity-10 text-yellow-200 font-medium focus:outline-none"
          >
            Submit
          </button>
      </div>
      </LoggedinContainer>
    </div>
  );
};

export default UploadSong;