import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await register(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md">
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className="w-full p-2 mb-4 border border-gray-300 rounded"/>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 mb-4 border border-gray-300 rounded"/>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full p-2 mb-4 border border-gray-300 rounded"/>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
        </form>
    );
};

export default Register;
