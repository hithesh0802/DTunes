import React, { useState } from 'react';
import axios from 'axios';
import CloudinaryUpload from '../components/CloudinaryUpload';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

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
    <div className="min-h-screen text-white overflow-auto" style={{ backgroundColor: '#070D04' }}>
      <nav className="shadow-lg" style={{ backgroundColor: "#1B2A2B" }}>
        <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
          <Link className="flex items-center text-white text-2xl font-bold" to="/home">
            <Icon icon="noto-v1:radio" className="mr-2"></Icon>DTunes
          </Link>
          <button 
            className="text-white focus:outline-none lg:hidden" 
            type="button" 
            onClick={() => document.getElementById('navbarSupportedContent').classList.toggle('hidden')}
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="w-full lg:flex lg:items-center lg:w-auto hidden" id="navbarSupportedContent">
            <ul className="flex flex-col lg:flex-row lg:space-x-6 lg:mr-6">
              <li className="nav-item">
                <Link className="text-white text-lg px-3 py-2 rounded-md font-medium hover:bg-gray-700" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/playlists" className="text-white text-lg px-3 py-2 rounded-md font-medium hover:bg-gray-700">Your Playlists</Link>
              </li>
              <li className="nav-item">
                <Link to="/favourites" className="text-white text-lg px-3 py-2 rounded-md font-medium hover:bg-gray-700">Favourites</Link>
              </li>
            </ul>
            <div className="flex items-center mt-3 lg:mt-0 lg:ml-6" role="search">
              <input className="form-input mr-2 rounded-md border border-gray-300 py-2 px-4 bg-gray-900 text-white" type="search" placeholder="Search" aria-label="Search"/>
              <button className="text-white border border-green-500 py-2 px-4 rounded-md hover:bg-green-500 hover:text-white" type="submit">
                <Icon icon="bx:search-alt" className='mr-2 text-white text-xl' style={{ color: 'white' }}></Icon>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
          <div>
            <label className="block text-white text-lg font-medium mb-2">Title</label>
            <input 
              type="text" 
              placeholder="Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-md bg-gray-900 text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white text-lg font-medium mb-2">Artist</label>
            <input 
              type="text" 
              placeholder="Artist" 
              value={artist} 
              onChange={(e) => setArtist(e.target.value)} 
              className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-md bg-gray-900 text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white text-lg font-medium mb-2">Description</label>
            <input 
              type="text" 
              placeholder="Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-md bg-gray-900 text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white text-lg font-medium mb-2">Thumbnail (Image) url</label>
            <input 
              type="text" 
              placeholder="Thumbnail image Url" 
              value={imgurl} 
              onChange={(e) => setImgurl(e.target.value)} 
              className="w-full py-2 px-4 mb-4 border border-gray-300 rounded-md bg-gray-900 text-white focus:outline-none"
            />
          </div>
          <div className='pt-5'>{
            uploadedfilename ? 
            <div className='bg-white text-black rounded-full p-3 w-1/3 font-semibold'>
              {uploadedfilename.substring(0,20)}...
              </div>
              : 
              <CloudinaryUpload setUrl={setUrl} setUploadedfilename={setUploadedfilename} />
          }
          </div>
          <div>
            <label className="block text-white text-lg font-medium mb-2">Thumbnail (Image) url</label>
            <input 
              type="text" 
              placeholder="Minutes: Seconds" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)} 
              className="w-full py-2 px-4 mb-4 border border-gray-300 rounded-md bg-gray-900 text-white focus:outline-none"
            />
          </div>
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="w-40 py-2 px-4 mt-4 border border-green-500 rounded-md hover:bg-green-500 text-white font-medium focus:outline-none"
          >
            Submit
          </button>
      </div>
    </div>
  );
};

export default UploadSong;