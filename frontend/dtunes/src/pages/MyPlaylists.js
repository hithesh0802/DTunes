import axios from "axios";
import LoggedinContainer from "../components/LoggedinContainer";
import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyPlaylists = ()=>{
    const [results,setResults]= useState([]);
    const API_URL= 'http://localhost:5000/api';
    // const navigate= useNavigate();
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
    },[]);

    return(
        <div className="min-h-screen text-white overflow-auto bg-black " >
            <LoggedinContainer curActScreen={"My PlayLists"}>
                <div className="text-white text-xl font-semibold pl-7 pt-5">My Playlists</div>
                <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {results.map((item,index) =>{
                        return <Card imgUrl={item.imgurl} title={item.name} description={""} key={index} playlistId={item._id} />
                    })}
                </div>
            </LoggedinContainer>
        </div>
    )
}

const Card=({title,description,imgUrl,playlistId})=>{
    const navigate= useNavigate();
    
      return(
          <div className=' bg-opacity-30 w-full rounded-md bg-gray-900 p-5 m-5 hover:bg-opacity-50' style={{ margin: '10px' }} onClick={()=>{navigate("/playlists/"+playlistId)}}>
            <div className="aspect-w-1 aspect-h-1 m-5">
              <img 
                  className='object-cover h-48 w-48 rounded-md'
                  src={imgUrl}
                  alt='label image'
              />
              </div>
              <div className='text-white font-semibold py-2 px-2'>{title}</div>
              <div className='text-gray-500 px-2'>{description}</div>
          </div>
      )
}

export default MyPlaylists;