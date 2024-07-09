import React, { useState} from 'react';
import { registerUser } from '../context/api';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Register = () => {
    // const { register } = useContext(AuthContext);
    const [username,setUsername]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const navigate= useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await registerUser({  email, password ,username});
          console.log('API response:', response, response.token); // Log the response for debugging
          localStorage.setItem('token', response.token);
          navigate('/login');
        } catch (error) {
          console.log('Login error: User With same UserName/Email already Exists');
          if (error.response && error.response.data) {
            console.error('Error response data:', error.response.data);
          }
        }
      };

    return (
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">DTunes</h1>
        <Icon icon="noto-v1:radio" className="text-4xl"></Icon>
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          value={username} 
          onChange={(e)=> setUsername(e.target.value)} 
          placeholder="Enter your username" 
          required 
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
        Register
      </button>
    </form>
    
    );
};

export default Register;
