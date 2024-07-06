import React, { useState, useContext } from 'react';
import { loginUser } from '../context/api';
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
        navigate('/');
        }catch(error){
            console.log('Login error',error);
            throw error;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md">
            <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" required  className="w-full p-2 mb-4 border border-gray-300 rounded"/>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required  className="w-full p-2 mb-4 border border-gray-300 rounded"/>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        </form>
    );
};

export default Login;
