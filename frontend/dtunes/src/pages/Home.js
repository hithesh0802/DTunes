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
    // const { user, logout } = useContext(AuthContext);
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState([]);
    // const [resFocus, setResFocus] = useState([]);
    // const [soundplayed,setSoundPlayed]= useState(null);
    // const [playlistModalopen,setPlaylistModalopen]= useState(false);
    // const [isPaused,setIsPaused]=useState(true);

    const navigate= useNavigate();
  //   const handleSearch = async (e) => {
  //       e.preventDefault();
  //       const res = await axios.get(`/api/songs/search?query=${query}`);
  //       setSongs(res.data);
  //   };

  //   const playSound=(songSrc)=>{
  //     if(soundplayed){
  //      soundplayed.stop();
  //     } 
  //      var sound = new Howl({
  //          src: [songSrc],
  //          html5: true
  //      });

  //    setSoundPlayed(sound); 
  //      sound.play();
  //  }

  //  const pauseSound=()=>{
  //     soundplayed.pause();
  //  }

  //  const togglePLayPause=()=>{
  //   if(isPaused){
  //     playSound("https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=0e1e39881f83497d8a103902839be497");
  //     setIsPaused(false);
  //   }else{
  //     pauseSound();
  //     setIsPaused(true);
  //   }
  //  }

    const handleLike = async (id) => {
        const res = await axios.post(`/api/songs/${id}/like`);
        setSongs(songs.map(song => song._id === id ? res.data : song));
    };

    const handleDislike = async (id) => {
        const res = await axios.post(`/api/songs/${id}/dislike`);
        setSongs(songs.map(song => song._id === id ? res.data : song));
    };

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
      
    {/* <div className=" p-6 rounded-lg shadow-lg" style={{backgroundColor: "#2A2B30"}}>
        <h2 className="text-2xl font-bold mb-4">Songs</h2>
        <div className="space-y-4">
          {songs.map((song) => (
            <div key={song._id} className="bg-gray-900 p-4 rounded-lg">
              <p className="text-lg">{song.title} by {song.artist}</p>
              <div className="flex space-x-2 mt-2">
                <button onClick={() => handleLike(song._id)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Like</button>
                <button onClick={() => handleDislike(song._id)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Dislike</button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      
    {/* <div className=" p-6 rounded-lg shadow-lg mt-6" style={{backgroundColor: "#2A2B30"}}>
      <h2 className="text-2xl font-bold mb-4">Create Playlist</h2>
      <form onSubmit={handleCreatePlaylist} className="space-y-4">
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Playlist Name"
          required
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200">Create Playlist</button>
      </form>
    </div> */}

    {/* <div className=" p-6 rounded-lg shadow-lg mt-6">
      <button onClick={handleLogout} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200">Logout</button>
    </div> */}
  </div>

  {/* /*{ <div className="fixed bottom-0 w-full h-1/10 bg-gray-900 bg-opacity-90 text-white flex items-center px-4">
      <div className='w-1/4 flex items-center'>
            <img src='https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='currentSongThumbnail'
            className='h-14 w-14 rounded'></img>
            <div className='pl-4'>
              <div className='text-sm hover:underline cursor-pointer'>Curtains</div>
              <div className='text-xs text-gray-500 hover:underline cursor-pointer'>Ed sheeran</div>
            </div>
      </div>
      <div className='w-1/2 flex justify-center items-center h-full bg-gray-900'>
            <div className='flex justify-between items-center w-1/2 bg-opacity-90'>
              <Icon icon="ph:shuffle-fill" className='m-4 text-2xl cursor-pointer text-gray-700 hover:text-white'></Icon>
              <Icon icon="mdi:skip-previous-outline" className='m-4 text-3xl cursor-pointer text-gray-700 hover:text-white' ></Icon>
              <Icon icon={ isPaused? "ic:baseline-play-circle" : "ic:baseline-pause-circle"} className='m-4 text-4xl cursor-pointer text-gray-700 hover:text-white' onClick={()=>{togglePLayPause();}}></Icon>
              <Icon icon="mdi:skip-next-outline" className='m-4 text-3xl cursor-pointer text-gray-700 hover:text-white'></Icon>
              <Icon icon="ic:twotone-repeat" className='m-4 text-2xl cursor-pointer text-gray-700 hover:text-white'></Icon>
            </div>
      </div>
  </div> } */}
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
                className='w-full rounded-md'
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
        description:"Keep Calm and Focused",
        imgUrl: "https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioUrl: "https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=0e1e39881f83497d8a103902839be497"
    },{
        title:"Instrumental Study" ,
        description:"Focus with soft study music in the background",
        imgUrl: "https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
        audioUrl: "https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=0e1e39881f83497d8a103902839be497"
    },{
        title:"Focus Flow" ,
        description:"Uptempo hip hop instrumental beats",
        imgUrl: "https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioUrl: "https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=0e1e39881f83497d8a103902839be497"
    },{ 
        title:"Beats to think to" ,
        description:"Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1720371300677-ba4838fa0678?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioUrl: "https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=0e1e39881f83497d8a103902839be497"
    },
]
export default Home;
