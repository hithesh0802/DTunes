import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoggedinContainer from "../components/LoggedinContainer";
import axios from "axios";
// import SingleSongCard from "../components/SingleSongCard";
import { useContext } from "react";
import songContext from "../context/songContext";

const SinglePlaylistView=()=>{
    const {playlistId}= useParams();
    const [playlistDetails,setPlaylistDetails]=useState([]);
    const API_URL= 'http://localhost:5000/api';

    useEffect(()=>{
        const getData=async()=>{
            const token= localStorage.getItem('token');
            console.log(`${API_URL}/playlists/get/${playlistId}`);
            const response= await axios.get(`${API_URL}/playlists/get/${playlistId}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
            });
            setPlaylistDetails(response.data);
            console.log(response.data);
        }
        
        getData();
    },[]);

    return(
        <div className="min-h-screen text-white overflow-auto bg-black">
            {playlistDetails._id && (
            <LoggedinContainer curActScreen={"My Playlists"} >
                <div className="text-white text-xl font-semibold pl-7 pt-5">
                    {playlistDetails.name}
                </div>
                <div className="pt-7 space-y-2 bg-black">
                    {playlistDetails.songs.map((item,index)=>{
                        return <SingleSongCard info={item} key={index} playSound={()=>{}}></SingleSongCard>
                    })}
                </div>
            </LoggedinContainer>
            )}
        </div>
    )
}

const SingleSongCard=({info, playSound})=>{
    const {currentSong,setCurrentSong}= useContext(songContext);
    // console.log(val);
    console.log(info);
    return(
        <div className="flex bg-black hover:bg-gray-600 hover:bg-opacity-30 p-2 rounded-sm " onClick={()=>{setCurrentSong(info)}}>
            <div className="w-12 h-12 bg-cover bg-center"
            style={{
                backgroundImage: `url("${info.imgurl}")`
            }}
            >
            </div>
            <div className=" flex w-full ">
            <div className="text-white flex justify-center flex-col pl-4 w-5/6">
                <div className="cursor-pointer hover:underline">
                    {info.title}
                </div>
                <div className="text-xs text-gray-400 hover:underline">
                    {info.artist}
                </div>
            </div>
            <div className="w-1/6 flex items-center justify-center text-gray-400 ">
                <div>{info.duration}</div>
                {/* <div className="bg-white text-gray-400 flex items-center justify-center pl-3">...</div> */}
            </div>
            </div>
        </div>
    )
}

export default SinglePlaylistView;