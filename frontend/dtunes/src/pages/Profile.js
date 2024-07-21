import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import axios from "axios";

const Profile=()=>{
    const [results,setResults]=useState([]);
    const [created,setCreated]=useState('');
    const API_URL= 'http://localhost:5000/api';
    useEffect(()=>{
        const token= localStorage.getItem('token');
        const getData= async()=>{
            const response = await axios.get(`${API_URL}/user/getdetails`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
            })
            await setResults(response.data);
            if (response.data && response.data.created) {
                const createdAtDate = response.data.created.toString();
                const date = createdAtDate.split('T')[0];
                setCreated(date);
            }
            
        }    
        getData();
    },[]);

    return(
        <div className=" bg-black min-h-screen text-white p-4">
            <div className="container mx-auto p-4 shadow-lg bg-blue-950  rounded-lg">
                <h1 className="text-3xl font-bold mb-4">My Profile</h1>
                <Icon icon="iconamoon:profile-fill" className="bg-blue-950 text-6xl mb-5"/>
                <div className="mb-4">
                    <p className="text-xl">Username: <span className="font-semibold">{results.username}</span></p>
                </div>
                <div className="mb-4">
                    <p className="text-xl">Email: <span className="font-semibold">{results.email}</span></p>
                </div>
                <div className="mb-4">
                    <p className="text-xl">Created At: <span className="font-semibold">{created}</span></p>
                </div>
                <div className="mb-4">
                    <p className="text-xl"><span className="font-semibold">{results.artist ? 'Artist Account' : 'Normal Account'}</span></p>
                </div>
                
                <div className="mt-8">
                    <Link to="/home" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Go Back
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile;