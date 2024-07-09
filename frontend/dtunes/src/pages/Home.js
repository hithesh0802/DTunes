import React, { useState} from 'react';
import axios from 'axios';
// import { AuthContext } from '../context/api';
import {Icon} from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    // const { user, logout } = useContext(AuthContext);
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const navigate= useNavigate();
    const handleSearch = async (e) => {
        e.preventDefault();
        const res = await axios.get(`/api/songs/search?query=${query}`);
        setSongs(res.data);
    };

    const handleLike = async (id) => {
        const res = await axios.post(`/api/songs/${id}/like`);
        setSongs(songs.map(song => song._id === id ? res.data : song));
    };

    const handleDislike = async (id) => {
        const res = await axios.post(`/api/songs/${id}/dislike`);
        setSongs(songs.map(song => song._id === id ? res.data : song));
    };

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/playlists/create', { name: playlistName });
        setPlaylists([...playlists, res.data]);
        setPlaylistName('');
    };

    const handleLogout = async() =>{
        navigate('/');
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white">
  <nav className="bg-gray-800 shadow-lg">
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
          <button className="text-white border border-green-500 py-2 px-4 rounded-md hover:bg-green-500 hover:text-white" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>

  <div className="container mx-auto p-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Playlists</h2>
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="bg-gray-700 p-4 rounded-lg">
              <p className="text-lg">{playlist.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Songs</h2>
        <div className="space-y-4">
          {songs.map((song) => (
            <div key={song._id} className="bg-gray-700 p-4 rounded-lg">
              <p className="text-lg">{song.title} by {song.artist}</p>
              <div className="flex space-x-2 mt-2">
                <button onClick={() => handleLike(song._id)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Like</button>
                <button onClick={() => handleDislike(song._id)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Dislike</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Create Playlist</h2>
      <form onSubmit={handleCreatePlaylist} className="space-y-4">
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Playlist Name"
          required
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200">Create Playlist</button>
      </form>
    </div>

    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
      <button onClick={handleLogout} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200">Logout</button>
    </div>
  </div>
</div>

    );
};

export default Home;
