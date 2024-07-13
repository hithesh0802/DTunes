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
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);

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

        changeSong(currentSong.url);

    },[currentSong && currentSong.url]);

    const playSound=()=>{
        if(!soundPlayed){
         return;
        } 
         soundPlayed.play();
     }

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
    }

    const pauseSound=()=>{
        soundPlayed.pause();
    }

    const togglePLayPause=()=>{
        if(isPaused){
            playSound();
            setIsPaused(false);
        }else{
            pauseSound();
            setIsPaused(true);
        }
    }
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
                <li className="nav-item">
                    <IconText iconName={"material-symbols:upload"} displayText={"Upload Song"} targetLink={"/upload"} active={curActScreen==='Upload Song'} />
                </li>
                </ul>
                <IconText onClick={()=>{setPlaylistModalopen(true)}} iconName={"material-symbols:add-box"} displayText={"Create Playlist"}/>
                <IconText iconName={"mdi:cards-heart"} displayText={"Liked Songs"}/>
            </div>
            </div>
        </nav>
        <div className='content p-8 pt-2 overflow-auto bg-black'>
            {children}
        </div>
        <div className={currentSong ? "fixed bottom-0 w-full h-1/10 bg-gray-900 bg-opacity-90 text-white flex items-center px-4": ""} style={{ display: !currentSong ? 'none': '' }}  >
      <div className='w-1/4 flex items-center'>
            <img style={{ display: currentSong ? 'block' : 'none' }}  src={currentSong.imgurl}
            alt=''
            className='h-14 w-14 rounded'></img>
            <div className='pl-4'>
              <div className='text-sm hover:underline cursor-pointer'>{currentSong.title}</div>
              <div className='text-xs text-gray-500 hover:underline cursor-pointer'>{currentSong.artist}</div>
            </div>
      </div>
        <div className={'w-1/2 flex justify-center items-center h-full bg-gray-900'} style={{ display: !currentSong ? 'none' : '' }}>
            <div className='flex  items-center w-1/2 bg-opacity-90'>
              <Icon icon="ph:shuffle-fill" className='m-4 text-2xl cursor-pointer text-gray-700 hover:text-white'></Icon>
              <Icon icon="mdi:skip-previous-outline" className='m-4 text-3xl cursor-pointer text-gray-700 hover:text-white' ></Icon>
              <Icon icon={ isPaused? "ic:baseline-play-circle" : "ic:baseline-pause-circle"} className='m-4 text-4xl cursor-pointer text-gray-700 hover:text-white' onClick={()=>{togglePLayPause();}}></Icon>
              <Icon icon="mdi:skip-next-outline" className='m-4 text-3xl cursor-pointer text-gray-700 hover:text-white'></Icon>
              <Icon icon="ic:twotone-repeat" className='m-4 text-2xl cursor-pointer text-gray-700 hover:text-white'></Icon>
            </div>
            </div>
            <div className='w-1/4 flex justify-end items-center pr-4 space-x-3 '>
                <Icon icon="ic:round-playlist-add" className='m-4 text-3xl cursor-pointer text-gray-700 hover:text-white' onClick={()=>{setAddtoPlaylistModal(true)}}></Icon>
                <Icon icon="ph:heart-bold" className='m-4 text-2xl cursor-pointer text-gray-700 hover:text-white'></Icon>
            </div>
        </div> 
    </div>
    )
}

export default LoggedinContainer;