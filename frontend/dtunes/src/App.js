import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/authContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';
import Enter from './pages/Enter';
import UploadSong from './pages/upload';
import MyMusic from './pages/MyMusic';
import songContext from './context/songContext';
import { useContext } from 'react';
import SearchPage  from './pages/Search';
import MyPlaylists from './pages/MyPlaylists';
import SinglePlaylistView from './pages/SinglePlaylistView';
import LikedSongs from './pages/LikedSongs';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import { useState,useEffect } from 'react';
import FriendRequests from './pages/friends';

const App = () => {
    const [currentSong,setCurrentSong]= useState("");
    const [soundPlayed,setSoundPlayed]= useState(null);
    const [isPaused,setIsPaused]=useState(true);
    const [liked,setIsLiked]=useState(false);
    const [disliked,setIsdisLiked]=useState(false);

    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (!token) {
            localStorage.removeItem('token');
        }
    }, [token]);

    const handleLogin = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setToken(null);
    };

    return (
        // <AuthProvider>
        <div className='min-h-screen w-full font-poppins'>
            <Router>
                { token ? (
                    <songContext.Provider value={{currentSong,setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused,liked,disliked,setIsdisLiked,setIsLiked}}>
                <Routes>
                    
                        <Route path="/home" element={<Home /> } />
                        <Route path='/MyMusic' element={<MyMusic></MyMusic>} ></Route>
                        <Route path='/upload' element={<UploadSong></UploadSong>}></Route>                      
                        <Route path="/search" element={<SearchPage></SearchPage>}></Route>
                        <Route path="/playlists" element={<MyPlaylists></MyPlaylists>}></Route>
                        <Route path="/playlists/:playlistId" element={<SinglePlaylistView></SinglePlaylistView>}></Route>
                        <Route path="/LikedSongs" element={<LikedSongs></LikedSongs>} ></Route>
                        <Route path='/profile' element={<Profile></Profile>}></Route>
                        <Route path='/logout' element={<Logout onLogout={handleLogout} />} />
                        <Route path='/friends' element={<FriendRequests></FriendRequests>}></Route>
                        <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
                </songContext.Provider>
                ) : (
                    <Routes>
                        <Route path="/" element={<Enter></Enter>} ></Route>
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login onLogin={handleLogin}/>} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                )
                }
            </Router>
        </div>
        // {/* </AuthProvider> */}
    );
};

export default App;

