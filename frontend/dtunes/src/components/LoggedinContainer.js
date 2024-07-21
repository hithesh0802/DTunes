import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
// import { AuthContext } from '../context/api';
import {Icon} from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import {Howl, Howler} from 'howler';
import songContext from '../context/songContext';
import IconText from './IconText';
import CreatePlaylist from '../modals/createPlaylistmodal';
import AddSongToPlaylist from '../modals/addtoPlaylistmodal';

const LoggedinContainer=({children,curActScreen})=>{
    const [playlistModalopen,setPlaylistModalopen]= useState(false);
    const [addtoplaylistModal,setAddtoPlaylistModal]= useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [artist,setArtist]=useState(true);
    const API_URL= 'http://localhost:5000/api';

    const addsongtoPlaylist = async (Playlistid) => {
        console.log("bella");
        const songId= currentSong._id;
        const payload= {playlistId: Playlistid,songId};
        const token= localStorage.getItem("token");
        const response= await axios.post(`${API_URL}/playlists/add-song`,payload,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
        })

        console.log(response.data);
        console.log("see",response._id,response.data._id);
        if(response.data._id){
            setAddtoPlaylistModal(false);
        }
    };

    const {
        currentSong,
        liked,
        setIsLiked,
        disliked,
        setIsdisLiked,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
        
    } = useContext(songContext);

    console.log(liked,disliked);
    // const {} =useContext(songContext);
    const firstUpdate= useRef(true);
    // const [soundPlayed,setSoundPlayed]= useState(null);
    // const [isPaused,setIsPaused]=useState(true);

    useEffect(()=>{
        if(firstUpdate.current){
            firstUpdate.current= false;
            // setCurrentSong(null);
            return;
        }

        if(!currentSong){
            return ;
        }

        changeSong(currentSong.preview_url || currentSong.url);
        checkifLiked();
    },[currentSong && currentSong.url]);

    useEffect(()=>{
        const token= localStorage.getItem('token');
        const getData= async()=>{
            const response = await axios.get(`${API_URL}/user/getdetails`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
            })
            setArtist(response.data.artist);
            console.log(response.data,response.data.artist);         
        }    
        getData();
    },[]);

    const playSound=()=>{
        if(!soundPlayed){
         return;
        } 
         soundPlayed.play();
     };

    const changeSong=(songSrc)=>{
        if(soundPlayed){
            soundPlayed.stop();
           } 
            var sound = new Howl({
                src: [songSrc],
                html5: true
            });
    
          setSoundPlayed(sound); 
          console.log(sound); 
          sound.play();
          setIsPaused(false);
    };

    const pauseSound=()=>{
        soundPlayed.pause();
    };

    const togglePLayPause=()=>{
        if(isPaused){
            playSound();
            setIsPaused(false);
        }else{
            pauseSound();
            setIsPaused(true);
        }
    };

    const changeLiked = async () => {
        if (!currentSong) return;  
        const token = localStorage.getItem("token");
        console.log(liked,`${API_URL}/user/${currentSong._id}/liked`, `Bearer ${token}`);
        try {
            if(!liked){
                const body={
                    token: token
                };
                const response = await axios.post(`${API_URL}/user/${currentSong._id}/liked`,body, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data, liked);
                setIsLiked(!liked);
                if(disliked){
                    setIsdisLiked(false);
                }
            }          
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    const checkifLiked =async ()=>{
        if (!currentSong) return;  
        const token = localStorage.getItem("token");
        console.log(liked,`${API_URL}/user/${currentSong._id}/liked`, `Bearer ${token}`);
        try {
                const body={
                    token: token
                };
                const response = await axios.post(`${API_URL}/user/${currentSong._id}/checkifLiked`,body, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data, liked,"hola");
                setIsLiked(response.data);        
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    }

    const changeddisLiked = async () => {
        if (!currentSong) return;  
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`${API_URL}/songs/${currentSong._id}/dislikes`, {
                disliked: !disliked
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data, disliked);
            setIsdisLiked(!disliked);
            if(liked){
                setIsLiked(true);
            }
        } catch (error) {
            console.error("Error updating dislikes:", error);
        }
    };

    console.log(currentSong,"hi");
    return(
        <div className="overflow-auto" style={{ backgroundColor: '#070D04' }}>
            {playlistModalopen && <CreatePlaylist closeModal={()=>{setPlaylistModalopen(false)}} />}
            {addtoplaylistModal && <AddSongToPlaylist closeModal={()=>{setAddtoPlaylistModal(false)}} addsongtoPlaylist={addsongtoPlaylist}/>}
            <nav className=" shadow-lg bg-blue-950 bg-opacity-80" >
            <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
            <Link className="flex items-center text-white text-2xl font-bold" to="/home">
                <Icon icon="noto-v1:radio" className="mr-2"></Icon>DTunes
            </Link>
            <button 
                className="text-white focus:outline-none lg:hidden" 
                type="button" 
                onClick={() => document.getElementById('navbarSupportedContent').classList.toggle('hidden')}
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="w-full lg:flex lg:items-center lg:w-auto hidden" id="navbarSupportedContent">
                <ul className="flex flex-col lg:flex-row lg:space-x-6 lg:mr-6">
                <li className="nav-item">
                <IconText iconName={"material-symbols:home"} displayText={"Home"} targetLink={"/home"} active={curActScreen==='home'} />
                </li>
                <li className="nav-item">
                <IconText iconName={"solar:playlist-outline"} displayText={"My PlayLists"} targetLink={"/playlists"} active={curActScreen==='My PlayLists'} />
                </li>
                <li className="nav-item">
                    <IconText iconName={"material-symbols:library-music-sharp"} displayText={"My Music"} targetLink={"/MyMusic"} active={curActScreen==='My Music'} />
                </li>
                <li className="nav-item">
                    <IconText iconName={"material-symbols:search-rounded"} displayText={"Search"} targetLink={"/search"} active={curActScreen==='Search'} />
                </li>
                {artist && <li className="nav-item">
                    <IconText iconName={"material-symbols:upload"} displayText={"Upload Song"} targetLink={"/upload"} active={curActScreen==='Upload Song'} />
                </li>
                }
                
                <li className="nav-item">
                    <IconText iconName={"mdi:cards-heart"} displayText={"Liked Songs"} targetLink={"/LikedSongs"} active={curActScreen==='Liked Songs'} />
                </li>
                </ul>
                {artist && <IconText onClick={()=>{setPlaylistModalopen(true)}} iconName={"material-symbols:add-box"} displayText={"Create Playlist"}/>}
                
                <div >
                        <button
                            className="text-white focus:outline-none ml-6 mt-1"
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <Icon icon="feather:menu" className="text-2xl"></Icon>
                        </button>
                        {dropdownOpen && (
                            <div className="bg-blue-950 bg-opacity-80 text-white p-4 absolute right-0 mt-4 w-48">
                                <ul>
                                    <li className="py-2"><Link to="/profile">Profile</Link></li>
                                    <li className="py-2"><Link to="/">Friends</Link></li>
                                    <li className="py-2"><Link to="/logout">Logout</Link></li>
                                </ul>
                            </div>
                        )}
                    </div>
                {/* <IconText iconName={"mdi:cards-heart"} displayText={"Liked Songs"}/> */}
            </div>
            </div>
        </nav>
        <div className='content p-8 pt-2 overflow-auto bg-black'>
            {children}
        </div>
        <div className={currentSong ? "fixed bottom-0 w-full h-1/10 bg-gray-900 bg-opacity-90 text-white flex items-center px-4": ""} style={{ display: !currentSong ? 'none': '' }}  >
      <div className='w-1/4 flex items-center'>
            <img style={{ display: currentSong ? 'block' : 'none' }}  src={currentSong.image_url ||currentSong.imgurl }
            alt=''
            className='h-14 w-14 rounded'></img>
            <div className='pl-4'>
              <div className='text-sm hover:underline cursor-pointer'>{currentSong.title || currentSong.track_name}</div>
              <div className='text-xs text-gray-500 hover:underline cursor-pointer'>{currentSong.artist || currentSong.artist_name}</div>
            </div>
      </div>
        <div className={'w-1/2 flex justify-center items-center h-full bg-gray-900'} style={{ display: !currentSong ? 'none' : '' }}>
            <div className='flex  items-center w-1/2 bg-opacity-90'>
            </div>
            </div>
            <div className='w-1/4 flex justify-end items-center pr-4 space-x-3 '>
                <button onClick={()=>{togglePLayPause()}}>
            <Icon icon={ isPaused? "ic:baseline-play-circle" : "ic:baseline-pause-circle"} className='m-4 text-4xl cursor-pointer text-gray-700 hover:text-white' ></Icon>
            </button>
                <Icon icon="ic:round-playlist-add" className='m-4 text-3xl cursor-pointer text-gray-700 hover:text-white' onClick={()=>{setAddtoPlaylistModal(true)}}></Icon>
                <Icon icon="weui:like-filled" className={`m-4 text-2xl cursor-pointer hover:text-gray-400 ${liked ? "text-red-600" : "text-gray-700"}`} onClick={()=>{changeLiked()}} style={{ color: liked ? "red" : "gray" }}></Icon>
                {/* <Icon icon="iconamoon:dislike-fill" className={`m-4 text-2xl cursor-pointer hover:text-gray-400 ${disliked ? "text-red-900" : "text-gray-700"}`} onClick={()=>{changeddisLiked()}} style={{ color: disliked ? "maroon" : "gray" }}></Icon> */}
                
            </div>
        </div> 
    </div>
    )
}

export default LoggedinContainer;