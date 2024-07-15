import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Enter = () => {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        navigate('/login');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
            <div className="w-full max-w-3xl p-8 bg-gray-800 rounded-lg shadow-lg">
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-4xl font-bold">Welcome to Dhasarathan Tunes</h1>
                    <Icon icon="noto-v1:radio" className="text-5xl ml-4"></Icon>
                </div>
                <p className="text-lg mb-6 text-center">A website for all your favourite songs</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button onClick={handleLogin} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200">
                        Login
                    </button>
                    <button onClick={handleRegister} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200">
                        Register
                    </button>
                </div>
                <div className="mt-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Explore Dhasarathan Tunes</h2>
                    <p className="text-md mb-4">Discover new music, create your playlists, and enjoy seamless music streaming experience. Here’s what you can do:</p>
                    <ul className="list-disc list-inside mb-6">
                        <li>Search for your favorite songs and artists</li>
                        <li>Create and manage your personal playlists</li>
                        <li>Like and dislike songs to personalize your experience</li>
                        <li>Stream music with high quality audio</li>
                    </ul>
                    <p className="text-md">Join us today and immerse yourself in the world of music!</p>
                </div>
            </div>
        </div>
    );
};

export default Enter;
