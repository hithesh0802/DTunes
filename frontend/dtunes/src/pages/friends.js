import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoggedinContainer from '../components/LoggedinContainer';

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
      <h3 className="text-xl font-semibold mb-4">Friend Requests</h3>
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
      <div>

      </div>

      {/* <h3 className="text-xl font-semibold mt-6 mb-4">Send Friend Request</h3>
      <div className="flex space-x-3">
        <input 
          type="text" 
          placeholder="Recipient ID" 
          id="recipientId" 
          className="p-2 bg-gray-700 rounded-lg flex-grow"
        />
        <button 
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          onClick={() => sendFriendRequest(document.getElementById('recipientId').value)}
        >
          Send
        </button>
      </div> */}
    </div>
  );
};

export default FriendRequests;
