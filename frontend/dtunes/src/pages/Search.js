import React,{useEffect, useState} from "react";
import axios from 'axios';
import {Howl, Howler} from 'howler';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import SingleSongCard from "../components/SingleSongCard";
import { useContext } from "react";
import songContext from "../context/songContext";
import LoggedinContainer from "../components/LoggedinContainer";

const SearchPage = ()=>{
    const [isFocused,setIsFocused]= useState(false);
    const [searchtext,setSearchText]= useState("");
    const [songdata,setSongData]= useState([]);
    const {currentSong,setCurrentSong}= useContext(songContext);

    const API_URL= 'http://localhost:5000/api';
    const searchSong = async () => {
        try {
          const response = await axios.get(`${API_URL}/spotify/search`, {
            params: {
              q: searchtext // Correct query parameter
            },
            headers: {
              'Content-Type': 'application/json'
            }
          });
          setSongData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error searching songs:', error);
        }
      };
    
      return (
        <div className="min-h-screen text-white overflow-auto" style={{ backgroundColor: '#070D04' }}>
          <LoggedinContainer curActScreen={"Search"} />
    
          <div className="w-full py-6 pl-5">
            <div className={`w-1/3 p-3 text-sm rounded-full bg-gray-900 px-5 flex text-white space-x-3 items-center ${isFocused ? "border border-white" : ""}`}>
              <Icon icon="ic:outline-search" className="text-xl" />
              <input
                type="text"
                placeholder="What do you want to listen to?"
                className="w-full bg-gray-900 focus:outline-none"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={searchtext}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchSong();
                  }
                }}
              />
            </div>
            <div>
                
            </div>
            {songdata.length > 0 ? (
              <div className="pt-7 space-y-2">
                <div className="text-white">
                  Showing search results for "<span className="font-bold">{searchtext}</span>":
                </div>
                {songdata.map((item, index) => (
                  <SingleSongCard info={item} key={index} playSound={() => {}} />
                ))}
              </div>
            ) : (
              <div className="text-white pt-7 pl-5">Nothing to show here.</div>
            )}
          </div>
        </div>
      );
    };

export default SearchPage;