import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App = () => {
    const [currentSong,setCurrentSong]= useState("");
    const [soundPlayed,setSoundPlayed]= useState(null);
    const [isPaused,setIsPaused]=useState(true);
    const token= localStorage.getItem('token');
    return (
        // <AuthProvider>
        <div className='min-h-screen w-full font-poppins'>
            <Router>
                { token ? (
                    <songContext.Provider value={{currentSong,setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused}}>
                <Routes>
                    
                        <Route path="/home" element={<Home /> } />
                        <Route path='/MyMusic' element={<MyMusic></MyMusic>} ></Route>
                        <Route path='/upload' element={<UploadSong></UploadSong>}></Route>                      
                        <Route path="/search" element={<SearchPage></SearchPage>}></Route>
                        <Route path="/playlists" element={<MyPlaylists></MyPlaylists>}></Route>
                        <Route path="/playlists/:playlistId" element={<SinglePlaylistView></SinglePlaylistView>}></Route>
                </Routes>
                </songContext.Provider>
                ) : (
                    <Routes>
                        <Route path="/" element={<Enter></Enter>} ></Route>
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                    </Routes>
                )
                }
            </Router>
        </div>
        // {/* </AuthProvider> */}
    );
};

export default App;

