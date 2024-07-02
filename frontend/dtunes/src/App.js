import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './context/authContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';

const App = () => {
    return (
        // <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home /> } />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
            </Router>
        // {/* </AuthProvider> */}
    );
};

export default App;

