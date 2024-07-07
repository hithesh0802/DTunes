import React, { useState} from 'react';
import { registerUser } from '../context/api';
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md">
            <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="Username" required className="w-full p-2 mb-4 border border-gray-300 rounded"/>
            <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" required className="w-full p-2 mb-4 border border-gray-300 rounded"/>
            <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 mb-4 border border-gray-300 rounded"/>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
        </form>
    );
};

export default Register;
