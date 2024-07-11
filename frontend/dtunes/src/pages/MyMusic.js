import React,{useEffect, useState} from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import SingleSongCard from "../components/SingleSongCard";

const MyMusic = () => {
    const navigate= useNavigate();
    const API_URL= 'http://localhost:5000/api';
    const [results,setResults]= useState([]);

    useEffect(()=>{
        const getSongs = async()=>{
            const token= localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/songs/mysongs`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
            });
            setResults(response.data);
            // console.log(response.data);
        }
    
        getSongs();
    },[])
    

    const songData =[{
        title:"Peaceful Piano",
        artist:"James Drake",
        url:"https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=0e1e39881f83497d8a103902839be497",
        imgurl:"https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:"Relax and Indulge with beautiful piano pieces",
        duration:"0:29"
    }]

  return (
    <div className="min-h-screen text-white overflow-auto" style={{ backgroundColor: '#070D04' }}>
      <nav className="shadow-lg" style={{ backgroundColor: "#1B2A2B" }}>
        <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
          <Link className="flex items-center text-white text-2xl font-bold" to="/home">
            <Icon icon="noto-v1:radio" className="mr-2"></Icon>DTunes
          </Link>
          <button 
            className="text-white focus:outline-none lg:hidden" 
            type="button" 
            onClick={() => document.getElementById('navbarSupportedContent').classList.toggle('hidden')}
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="w-full lg:flex lg:items-center lg:w-auto hidden" id="navbarSupportedContent">
            <ul className="flex flex-col lg:flex-row lg:space-x-6 lg:mr-6">
              <li className="nav-item">
                <Link className="text-white text-lg px-3 py-2 rounded-md font-medium hover:bg-gray-700" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/playlists" className="text-white text-lg px-3 py-2 rounded-md font-medium hover:bg-gray-700">Your Playlists</Link>
              </li>
              <li className="nav-item">
                <Link to="/favourites" className="text-white text-lg px-3 py-2 rounded-md font-medium hover:bg-gray-700">Favourites</Link>
              </li>
            </ul>
            <div className="flex items-center mt-3 lg:mt-0 lg:ml-6" role="search">
              <input className="form-input mr-2 rounded-md border border-gray-300 py-2 px-4 bg-gray-900 text-white" type="search" placeholder="Search" aria-label="Search"/>
              <button className="text-white border border-green-500 py-2 px-4 rounded-md hover:bg-green-500 hover:text-white" type="submit">
                <Icon icon="bx:search-alt" className='mr-2 text-white text-xl' style={{ color: 'white' }}></Icon>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4 overflow-auto">
        <div className="text-white text-lg font-semibold pb-4 pl-2">My Songs</div>
        <div className="space-y-3 overflow-auto">
            {results.map((item,index)=>{     
                return <SingleSongCard info={item} key={index}/>
            })}
        </div>
      </div>
          
    </div>
  );
};

export default MyMusic;