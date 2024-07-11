import React, { useState } from 'react';
import axios from 'axios';
import CloudinaryUpload from '../components/CloudinaryUpload';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const UploadSong = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const API_URL= 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('songFile', file);
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('duration', duration);

    try {
      await axios.post(`${API_URL}/songs/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Song uploaded successfully');
      // Reset form fields after successful upload
      setFile(null);
      setTitle('');
      setArtist('');
      setDuration('');
    } catch (err) {
      console.error(err);
      alert('Failed to upload song');
    }
  };
  console.log(window);
  console.log(window.cloudinary);
  return (
      <div className=" min-h-screen text-white overflow-auto" style={{backgroundColor: '#070D04'}}>
  <nav className=" shadow-lg" style={{backgroundColor: "#1B2A2B"}}>
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
        <form className="flex items-center mt-3 lg:mt-0 lg:ml-6" role="search">
          <input className="form-input mr-2 rounded-md border border-gray-300 py-2 px-4 bg-gray-900 text-white" type="search" placeholder="Search" aria-label="Search"/>
          <button className="text-white border border-green-500 py-2 px-4 rounded-md hover:bg-green-500 hover:text-white" type="submit">
            <Icon icon="bx:search-alt" className='mr-2 text-white text-xl' style={{ color: 'white' }}></Icon>
          </button>
        </form>
      </div>
    </div>
  </nav>
    <CloudinaryUpload></CloudinaryUpload>
    </div>
  );
};

export default UploadSong;