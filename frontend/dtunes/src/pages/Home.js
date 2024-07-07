import React, { useState} from 'react';
import axios from 'axios';
// import { AuthContext } from '../context/api';
import { Link } from 'react-router-dom';

const Home = () => {
    // const { user, logout } = useContext(AuthContext);
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState([]);

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

    return (
        <div>           
            <div>
                <div>
                <nav className="bg-gray-900">
                <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
                <Link className="text-white text-lg font-semibold" to="/home">DTunes</Link>
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
                    <input className="form-input mr-2 rounded-md border border-gray-300 py-2 px-4" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="text-white border border-green-500 py-2 px-4 rounded-md hover:bg-green-500 hover:text-white" type="submit">Search</button>
                    </form>
                </div>
                </div>
            </nav>
                </div>

                    <div>
                        {playlists.map((playlist) => (
                            <div key={playlist._id}>
                                <p>{playlist.name}</p>
                            </div>
                        ))}
                    </div>
                    <p>Hello</p>
                    <button className="w-full p-2 bg-blue-500 text-white rounded">Logout</button>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for music..."
                        />
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Search</button>
                    </form>
                    <div>
                        {songs.map((song) => (
                            <div key={song._id}>
                                <p>{song.title} by {song.artist}</p>
                                <button onClick={() => handleLike(song._id)} className="w-full p-2 bg-blue-500 text-white rounded">Like</button>
                                <button onClick={() => handleDislike(song._id)} className="w-full p-2 bg-blue-500 text-white rounded">Dislike</button>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleCreatePlaylist}>
                        <input
                            type="text"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            placeholder="Playlist Name"
                            required
                        />
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create Playlist</button>
                    </form>

                </div>
        </div>
    );
};

export default Home;
