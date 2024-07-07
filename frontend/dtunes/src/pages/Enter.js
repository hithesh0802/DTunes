import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/api';

const Enter = () => {
    // const { user, logout } = useContext(AuthContext);
    const navigate= useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        navigate('/login');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div>
            <h1>WELCOME TO DASARATHAN TUNES</h1>
                <div>
                    <p>A website for all your favourite songs</p>
                    <button onClick={handleLogin} className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
                    <button onClick={handleRegister} className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
                </div>
        </div>
    );
};

export default Enter;