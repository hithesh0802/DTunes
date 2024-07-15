import React, { useState} from 'react';
import { registerUser } from '../context/api';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import dtunesLogo from '../components/noto-v1--radio.png';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await registerUser({ username, email, password });
          console.log('API response:', response, response.token); // Log the response for debugging
          localStorage.setItem('token', response.token);
          navigate('/login');
      } catch (error) {
          console.log('Registration error:', error);
          setError('User with the same username/email already exists.'); // Handle registration errors
      }
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-gray-800 text-white rounded-lg shadow-lg">
              <div className="flex items-center justify-center mb-6">
                  <img src={dtunesLogo} alt="DTunes Logo" className="h-12 mr-2" />
                  <h1 className="text-3xl font-bold">Join DTunes</h1>
              </div>
              <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                      <label htmlFor="username" className="block text-sm font-medium">Username</label>
                      <input
                          type="text"
                          id="username"
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter your username"
                          required
                          className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>
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
                          className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>
                  <p className="text-red-500 text-sm mb-4">{error}</p>
                  <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-green-600 transition duration-200"
                  >
                      Register
                  </button>
              </form>
              <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400">Already have an account?</p>
                  <button
                      onClick={() => navigate('/login')}
                      className="text-sm font-medium text-blue-500 hover:text-blue-400 focus:outline-none"
                  >
                      Login here
                  </button>
              </div>
          </div>
      </div>
  );
};

export default Register;
