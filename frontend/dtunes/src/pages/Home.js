import React, { useState} from 'react';
import axios from 'axios';
// import { AuthContext } from '../context/api';
import {Icon} from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import {Howl, Howler} from 'howler';
import IconText from '../components/IconText';
import LoggedinContainer from '../components/LoggedinContainer';

const Home = () => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState([]);

    const navigate= useNavigate();


    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/playlists/create', { name: playlistName });
        setPlaylists([...playlists, res.data]);
        setPlaylistName('');
    };

    const handleLogout = async() =>{
        navigate('/');
    }
    
    return (
        <div className=" h-full text-white overflow-auto bg-black" >
          <div className='h-9/10 w-full'>
      <LoggedinContainer curActScreen={"home"}>
      <div className="container mx-auto p-6">
    
      <div className=" p-6 rounded-lg shadow-lg bg-black" >
        <h2 className="text-2xl font-bold mb-4">Top Picks for You</h2>
        <PlayListView key={'a'} titletext="Focus" focusCardsData={focusCardsData}></PlayListView>
        <PlayListView key={'b'} titletext="Trending Now" focusCardsData={focusCardsData}></PlayListView>
        <PlayListView key={'c'} titletext="Sound of India" focusCardsData={focusCardsData}></PlayListView>
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="bg-gray-700 p-4 rounded-lg">
              <p className="text-lg">{playlist.name}</p>
            </div>
          ))}
        </div>
      </div>
      
  </div>
  </LoggedinContainer >
  </div>
  
</div>

    );
};

const PlayListView=({titletext,focusCardsData})=>{
    return (
        <div className='text-white'>
            <div className ='text-xl font-semibold' style={{margin: "10px 1px 1px 1px"}}>{titletext}</div>
            <div className='w-full flex justify-between space-x-4 bg-black bg-opacity-85' >
                {
                focusCardsData.map((item,index) => {
                    return (
                        <Card key={index} title={item.title} description={item.description} imgUrl={item.imgUrl} audioUrl={item.audioUrl}/>
                    )
                })
            }
            </div>  
        </div>
    )
}

const Card=({title,description,imgUrl,audioUrl})=>{
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

    return(
        <div className=' bg-opacity-30 w-1/6 rounded-md bg-gray-800' style={{ margin: '10px'}}>
            <img 
                className='w-full h-48 object-cover rounded-md'
                src={imgUrl}
                alt='label image'
            />
            <audio ref={audioRef} src={audioUrl}></audio>
            <div className='text-white py-2 px-2'>{title}</div>
            <div className='text-gray-500 px-2'>{description}</div>
            <button 
              onClick={togglePlayPause} 
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    )
}

const focusCardsData=[
    {
        title:"Peaceful Piano",
        description:"Relax and Indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioUrl: "https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=0e1e39881f83497d8a103902839be497"
    },
    {
        title:"Deep Focus" ,
        description:"Keep Calm to Stay fresh and Focused",
        imgUrl: "https://images.unsplash.com/photo-1571139341274-3bac059ed3a4?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioUrl: `${process.env.PUBLIC_URL}/Augury.mp3`
    },{
        title:"Instrumental Study" ,
        description:"Focus with soft study music in the background",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
        audioUrl: `${process.env.PUBLIC_URL}/Augury.mp3`
    },{
        title:"Focus Flow" ,
        description:"Uptempo hip hop instrumental beats",
        imgUrl: "https://plus.unsplash.com/premium_photo-1675530497996-fc9a9561038e?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioUrl: "https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=0e1e39881f83497d8a103902839be497"
    },{ 
        title:"Beats to think to" ,
        description:"Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1520390244437-6f1c5eae66ff?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioUrl: "https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=0e1e39881f83497d8a103902839be497"
    },
]
export default Home;
