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
    const [currUser,setCurrUser]= useState([]);
    const [searchtext,setSearchText]= useState("");
    const [songdata,setSongData]= useState([]);
    const {currentSong,setCurrentSong}= useContext(songContext);
    const [searchType, setSearchType] = useState("songs");
    const [userData, setUserData] = useState([]);
    const [friendRequest,setFriendRequest]= useState("");
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
          setCurrUser(response.data);          
      }    
      getData();
    },[]);

    const searchSong = async () => {
      if (searchType === "songs") {
        try {
          const response = await axios.get(`${API_URL}/spotify/search`, {
            params: {
              q: searchtext // Correct query parameter
            },
            headers: {
              'Content-Type': 'application/json'
            }
          });

          const artistResponse = await axios.get(`${API_URL}/songs/search`, {
            params: {
              title: searchtext // Assuming similar query parameter
            },
            headers: {
              'Content-Type': 'application/json'
            }
          });

          const combinedResults = [...artistResponse.data,...response.data];
          setSongData(combinedResults);
          console.log(combinedResults);
        } catch (error) {
          console.error('Error searching songs:', error);
        }
      }

      else if (searchType === "users") {
        try {
          const response = await axios.get(`${API_URL}/user/search`, {
            params: {
              q: searchtext
            },
            headers: {
              'Content-Type': 'application/json'
            }
          });
          setUserData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error searching users:', error);
        }
      }
    };

    const sendFriendRequest = async (recipientId) => {
    try {
      console.log(currUser.id ,currUser);
      const response = await axios.post(`${API_URL}/friends/sendFriendRequest`, {
        senderId: currUser.id, // Assuming `currentSong._id` is the logged-in user ID
        recipientId
      });
      console.log(response.data);
      setFriendRequest("Friend Request already sent");
    } catch (error) {
      console.error('Error sending friend request:', error);
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
              <div className="flex mt-2">
              <button 
                onClick={() => setSearchType("songs")} 
                className={`p-2 rounded-lg ${searchType === "songs" ? 'bg-blue-600' : 'bg-gray-800'} text-white focus:outline-none mr-2`}
              >
                Songs
              </button>
              <button 
                onClick={() => setSearchType("users")} 
                className={`p-2 rounded-lg ${searchType === "users" ? 'bg-blue-600' : 'bg-gray-800'} text-white focus:outline-none`}
              >
                Users
              </button>
            </div>
            </div>
            <div>

            </div>
            {searchType === "songs" && songdata.length > 0 ? (
              <div className="pt-7 space-y-2">
                <div className="text-white">
                  Showing search results for "<span className="font-bold">{searchtext}</span>":
                </div>
                {songdata.map((item, index) => (
                  <SingleSongCard info={item} key={index} playSound={() => {}} />
                ))}
              </div>
            ): searchType === "users" && userData.length > 0 ? (
              <div className="pt-7 space-y-2">
                <div className="text-white">
                  Showing search results for "<span className="font-bold">{searchtext}</span>":
                </div>
                {userData && userData.map((user) => (
                  user._id !== currUser._id && (
                    <div key={user._id} className="text-white">
                      <UserCard user={user} key={user._id} sendFriendRequest={sendFriendRequest} friendRequest={friendRequest}/>
                    </div>
                  )
                ))}
                
              </div>
            ) : (
              <div className="text-white pt-7 pl-5">Nothing to show here.</div>
            )} 
          </div>
        </div>
      );
    };


const UserCard = ({ user, sendFriendRequest,friendRequest }) => {
  const [isNotFriend, setIsNotFriend] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const checkFriendStatus = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_URL}/user/getdetails`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        setResults(response.data);
        console.log(response.data);
        if (response.data.friends.includes(user._id) || (user._id === response.data.id)) {
          setIsNotFriend(false);  
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }finally{
        setIsLoading(false);
      }
    };

    checkFriendStatus();
  }, []);

  return (
      <div className=' bg-opacity-30 w-1/5 rounded-md bg-gray-700 p-5 m-5 hover:bg-opacity-50' style={{ margin: '10px' }} >
              <div className='text-white font-semibold py-2 px-2'><span className="font-bold">Username: </span> {user.username}</div>
              <div className='text-gray-300 px-2'><span className="font-bold">Email: </span>{user.email}</div>
              {user.artist ? (<div className='text-gray-100 font-semibold px-2 py-1'>
                    Artist Account
                </div>) : (<div className='text-gray-100 font-semibold px-2 py-1'>
                    Normal Account
                </div> )
              }
              {isNotFriend && <button
        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        onClick={() => sendFriendRequest(user._id)}
      >
        Send Friend Request
      </button>}
          </div>
  );
};

export default SearchPage;