import React,{useEffect, useState} from "react";
import axios from 'axios';
import {Howl, Howler} from 'howler';
import { Link} from 'react-router-dom';
import { Icon } from '@iconify/react';
import SingleSongCard from "../components/SingleSongCard";
import CreatePlaylist from "../modals/createPlaylistmodal";
import IconText from "../components/IconText";
import LoggedinContainer from "../components/LoggedinContainer";

const MyMusic = () => {
    const API_URL= 'http://localhost:5000/api';
    const [results,setResults]= useState([]);
    const [soundplayed,setSoundPlayed]= useState(null);
    const [playlistModalopen,setPlaylistModalopen]= useState(false);

    const playSound=(songSrc)=>{
       if(soundplayed){
        soundplayed.stop();
       } 
        var sound = new Howl({
            src: [songSrc],
            html5: true
        });

      setSoundPlayed(sound); 
      console.log(sound); 
        sound.play();
    }

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
    <div className="min-h-screen text-white overflow-auto bg-black" >
      <LoggedinContainer curActScreen={"My Music"}>
      <div className="container mx-auto p-4 overflow-auto">
        <div className="text-white text-lg font-semibold pb-4 pl-2">My Songs</div>
        <div className="space-y-3 overflow-auto">
            {results.map((item,index)=>{     
                return <SingleSongCard info={item} key={index} playSound={playSound}/>
            })}
        </div>
        
      </div>
      </LoggedinContainer>
          
    </div>
  );
};

export default MyMusic;