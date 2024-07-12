import axios from "axios";
import LoggedinContainer from "../components/LoggedinContainer";
import React from "react";
import { useState,useEffect } from "react";

const MyPlaylists = ()=>{
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
    },[]);

    return(
        <div className="min-h-screen text-white overflow-auto bg-black bg-opacity-95" >
            <LoggedinContainer curActScreen={"My PlayLists"}>
                <div className="text-white text-xl font-semibold pl-7 pt-5">My Playlists</div>
                <div className="py-5 grid grid-gap-5 grid-cols-5">
                    {results.map((item,index) =>{
                        return <Card imgUrl={item.imgurl} title={item.name} description={""} key={index}/>
                    })}
                </div>
            </LoggedinContainer>
        </div>
    )
}

const Card=({title,description,imgUrl})=>{
  
      return(
          <div className=' bg-opacity-30 w-full rounded-md bg-gray-800 pl-10 m-10' style={{ margin: '10px' }}>
            <div className="aspect-w-1 aspect-h-1">
              <img 
                  className='object-cover h-48 w-full rounded-md'
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