import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoggedinContainer from '../components/LoggedinContainer';
import { Icon } from '@iconify/react';

const FriendRequests = ({ userId }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends,setFriends]=useState([]);
  const [currUser,setCurrUser]= useState([]);
  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/friends/getfriendRequests`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFriendRequests(response.data);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };
    const token= localStorage.getItem('token');
    const getFriends= async()=>{
      const response = await axios.get(`${API_URL}/user/getfriends`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
    })
        setFriends(response.data);
        console.log(response.data);
    }
    const getData= async()=>{
        const response = await axios.get(`${API_URL}/user/getdetails`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
        })
        setCurrUser(response.data);          
    }
    getFriends();
    getData();
    fetchFriendRequests();
  }, []);

  const sendFriendRequest = async (recipientId) => {
    try {
      const response = await axios.post(`${API_URL}/sendFriendRequest`, {
        senderId: userId,
        recipientId
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const acceptFriendRequest = async (senderId) => {
    try {
      const response = await axios.post(`${API_URL}/friends/acceptFriendRequest`, {
        userId: currUser.id,
        senderId
      });
      setFriendRequests(prevRequests => prevRequests.filter(request => request._id !== senderId));
      console.log(response.data);
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white">
      <h3 className=" text-xl font-semibold mb-4">Friend Requests</h3>
      <ul className="space-y-4">
        {friendRequests.length > 0 ? (
          friendRequests.map((request) => (
            <li key={request._id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
              <span>{request.username}</span>
              <button 
                className="p-2 bg-green-600 hover:bg-green-700 rounded-lg"
                onClick={() => acceptFriendRequest(request._id)}
              >
                Accept
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-400">No friend requests found.</li>
        )}
      </ul>
      
      <div className="min-h-screen text-white overflow-auto bg-gray-800">
      <div className="text-white text-xl font-semibold pt-5">My Friends</div>
      <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))
        ) : (
          <div className="text-white pt-7 ">No friends found.</div>
        )}
      </div>
      </div>
    </div>
  );
};

const FriendCard = ({ friend }) => {
  return (
    <div className='bg-opacity-30 w-full rounded-md bg-black p-5 m-5 hover:bg-opacity-50' style={{ margin: '10px' }}>
      <div className="aspect-w-1 aspect-h-1 m-2">
        <Icon icon="iconamoon:profile-fill" className="bg-gray-900 text-6xl mb-5"></Icon>
      </div>
      <div className='text-white font-semibold py-2 px-2'>{friend.username}</div>
      <div className='text-gray-300 px-2'><span className="font-bold">Email: </span>{friend.email}</div>
      <div className='text-gray-100 px-2'>
        {friend.artist ? 'Artist Account' : 'Normal Account'}
      </div>
    </div>
  );
};

export default FriendRequests;
