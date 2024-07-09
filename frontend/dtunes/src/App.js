import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './context/authContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';
import Enter from './pages/Enter';

const App = () => {
    return (
        // <AuthProvider>
        <div className='min-h-screen w-full font-poppins'>
            <Router>
                <Routes>
                    <Route path="/home" element={<Home /> } />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/" element={<Enter></Enter>} ></Route>
                </Routes>
            </Router>
        </div>
        // {/* </AuthProvider> */}
    );
};

export default App;

