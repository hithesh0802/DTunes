import React,{ useEffect, useState } from "react";
import LoggedinContainer from "../components/LoggedinContainer";
import axios from "axios";
import songContext from "../context/songContext";
import { useContext } from "react";
import SingleSongCard from "../components/SingleSongCard";
import { Howl,Howler } from "howler";

const LikedSongs =()=>{
    const [results,setResults]= useState([]);
    const API_URL= 'http://localhost:5000/api';
    // const navigate= useNavigate();
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
        const getData = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(`${API_URL}/user/getLikedSongs`);
                const response = await axios.get(`${API_URL}/user/getLikedSongs`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                setResults(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching liked songs:", error);
            }
        };
        getData();
    },[]);

    return(
        <div className="min-h-screen text-white overflow-auto bg-black" >
            <LoggedinContainer curActScreen={"Liked Songs"}>
            <div className="container mx-auto p-4 overflow-auto">
        <div className="text-white text-lg font-semibold pb-4 pl-2">My Liked Songs</div>
        <div className="space-y-3 overflow-auto">
        {results && results.length > 0 ? (
            results.map((item, index) => (
                <SingleSongCard info={item} key={index} playSound={playSound} />
            ))
        ) : (
            <div className="text-white">No liked songs found.</div>
        )}
        </div>
        
      </div>
            </LoggedinContainer>
        </div>
    )
}


export default LikedSongs;