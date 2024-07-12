import React from "react";
import { useState } from "react";
import TextInput from "../components/TextInput";
import axios from "axios";

const CreatePlaylist =({closeModal})=>{
    const [title,setTitle]= useState('');
    const [imgurl,setImgurl]= useState('');
    const API_URL = "http://localhost:5000/api";

    const createPlaylist =async() =>{
        const token= localStorage.getItem('token');
        const body={
            name: title,
            imgurl: imgurl
        };
        console.log(body,token);
        const response = await axios.post(`${API_URL}/playlists/create`,body,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
        });
        console.log(response.data);
        // if(response._id){
        //     closeModal();
        // }
    }

    return(
        <div className="absolute bg-gray-800 bg-opacity-20 overflow-auto flex justify-center items-center w-screen h-screen" onClick={closeModal}>
            <div className="w-1/3 bg-gray-600 p-8 text-xl rounded-md mb-5" onClick={(e) =>{e.stopPropagation()}}>
                <div className="text-2xl font-bold">
                    Create Playlist
                </div>
                <div className="flex flex-col justify-center pt-2">
                    <label className="block text-lg text-white font-semibold mb-2">Playlist Name</label>
                <TextInput
                    placeholder="PlayList Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-300 text-sm text-black font-semibold space-y-1"
                />
                <label className="block text-lg text-white font-semibold mb-2">Thumbnail Image Url</label>
                <TextInput
                    placeholder="Thumbnail image Url"
                    className="bg-gray-300 text-sm text-black font-semibold space-y-1"
                    value={imgurl}
                    onChange={(e) => setImgurl(e.target.value)}
                />
                </div>
                <form onSubmit={createPlaylist}>
                <button type="submit" className="bg-white w-1/3  mt-3 py-1 font-semibold text-black rounded flex justify-center items-center cursor-pointer" >
                    Create Playlist
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePlaylist;