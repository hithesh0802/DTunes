import React, { useState} from 'react';
import { loginUser } from '../context/api';
import {Icon} from '@iconify/react';
import dtunesLogo from '../components/noto-v1--radio.png';

// import { AuthContext } from '../context/api';
import { useNavigate } from 'react-router-dom';
const Login = ({ onLogin }) => {
    // const { login } = useContext(AuthContext);
    const [email,setEmail]= useState('');
    const [password,setPassword]=useState('');
    const navigate= useNavigate();
    const [error,setError]=useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try{
        const response= await loginUser({email,password});
        console.log('API response:', response, response.token); // Log the response for debugging
        onLogin(response.token);
        localStorage.setItem('token', response.token);
        navigate('/home',{replace: true});
        }catch(error){
            console.log('Login error',error);
            setError('Login error: Please enter correct password or enter a new email/username');
            throw error;
        }
    };

    return (
<div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
<div className="w-full max-w-md p-8 bg-gray-800 text-white rounded-lg shadow-lg">
    <div className="flex items-center justify-center mb-6">
        <img src={dtunesLogo} alt="DTunes Logo" className="h-12 mr-2" />
        <h1 className="text-3xl font-bold">Welcome back to DTunes</h1>
    </div>
    <form onSubmit={handleSubmit}>
        <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-green-600 transition duration-200"
        >
            Login
        </button>
    </form>
    <div className='text-red-600 text-sm'> {error}</div>
    <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">Don't have an account yet?</p>
        <button
            onClick={() => navigate('/register')}
            className="text-sm font-medium text-blue-500 hover:text-blue-400 focus:outline-none"
        >
            Register here
        </button>
    </div>
</div>
</div>
    );
};

export default Login;
