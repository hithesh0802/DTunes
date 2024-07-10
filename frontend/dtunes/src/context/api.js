import axios from 'axios';

const API_URL = 'http://localhost:5000/api' ;

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  };
  
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  };

export const searchSongs =async(userData) =>{
  const response= await axios.get(`${API_URL}/songs/search`, userData);
  return response.data();
}

export const fetchTracks= async(query) =>{
  try {
    console.log(`${API_URL}/api/music/search?q=${query}`);
    const response = await axios.get(`${API_URL}/music/search?q=${query}`);
    // console.log(response);
    
    const data = await response.data;
    console.log(data.tracks.items);
    return data.tracks.items; // Array of tracks from Spotify API
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
}

