import React, { useState} from 'react';
import { loginUser } from '../context/api';
import {Icon} from '@iconify/react';

// import { AuthContext } from '../context/api';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    // const { login } = useContext(AuthContext);
    const [email,setEmail]= useState('');
    const [password,setPassword]=useState('');
    const navigate= useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try{
        const response= await loginUser({email,password});
        console.log('API response:', response, response.token); // Log the response for debugging
        localStorage.setItem('token', response.token);
        navigate('/home');
        }catch(error){
            console.log('Login error',error);
            throw error;
        }
    };

    return (<form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">DTunes</h1>
      <Icon icon="noto-v1:radio" className="text-4xl"></Icon>
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        value={email} 
        onChange={(e)=> setEmail(e.target.value)} 
        placeholder="Enter your email" 
        required 
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-6">
      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        value={password} 
        onChange={(e)=> setPassword(e.target.value)} 
        placeholder="Enter your password" 
        required 
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button 
      type="submit" 
      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
    >
      Login
    </button>
  </form>
  
    );
};

export default Login;
