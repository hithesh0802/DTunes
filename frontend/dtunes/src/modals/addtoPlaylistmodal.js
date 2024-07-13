import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

const AddSongToPlaylist=({closeModal,addsongtoPlaylist})=>{
    const [results,setResults]= useState([]);
    const API_URL= 'http://localhost:5000/api';

    useEffect(()=>{
        const getData= async()=>{
            const token= localStorage.getItem("token");
            const response= await axios.get(`${API_URL}/playlists/getplaylists`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
            });
            setResults(response.data);
        };
        getData();
        console.log(addsongtoPlaylist);
    },[]);

    const handlePlaylistClick = async(playlistId) => {
        console.log("bih");
        await addsongtoPlaylist(playlistId);
        closeModal();
    };

    return(
        <div className="absolute bg-gray-800 bg-opacity-20 overflow-auto flex justify-center items-center w-screen h-screen" onClick={closeModal}>
            <div className="w-1/3 bg-gray-600 p-8 text-xl rounded-md mb-5" onClick={(e) =>{e.stopPropagation()}}>
                <div className="text-2xl mb-2 font-bold">
                    Select Playlist
                </div>
                <div className="space-y-4 flex flex-col justify-center  items-center">
                    {results.map((item,index)=>{
                        return <PlaylistComponent info={item} key={index} handlePlaylistClick={handlePlaylistClick}/>
                    })}
                </div>
            </div>
        </div>
    )
}


const PlaylistComponent=({info,handlePlaylistClick})=>{
    const handleClick = () =>{
        console.log("jij");
        handlePlaylistClick(info._id);
    }

    return (
        <div className="bg-gray-800 bg-opacity-70 rounded-sm flex w-full items-center space-x-4 p-3 hover:bg-opacity-80 cursor-pointer hover:bg-gray-700" onClick={handleClick}>
            <div>
                <img src={info.imgurl} className="w-10 h-10 rounded" alt="Thumbnail"/>
            </div>
            <div className="text-white font-semibold text-sm">
                {info.name}
            </div>
        </div>
    )
}
export default AddSongToPlaylist;