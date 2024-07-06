import React, { useState, useContext } from 'react';
import axios from 'axios';
// import { AuthContext } from '../context/api';

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
            <h1>Welcome to DTunes</h1>
            
                <div>
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
                    <div>
                        {playlists.map((playlist) => (
                            <div key={playlist._id}>
                                <p>{playlist.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
};

export default Home;
