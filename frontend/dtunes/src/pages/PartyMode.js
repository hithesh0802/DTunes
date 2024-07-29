import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import SingleSongCard from '../components/SingleSongCard';
import LoggedinContainer from '../components/LoggedinContainer';
import { Howl } from 'howler';
import songContext from '../context/songContext';
import { useContext } from 'react';
const PartyModePlaylist = () => {
    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);
    const API_URL = 'http://localhost:5000/api';
    const songDetails = [];
    const token= localStorage.getItem("token");
    const [soundplayed,setSoundPlayed]= useState(null);
    const playSound=(songSrc)=>{
        if(soundplayed){
         soundplayed.stop();
        } 
         var sound = new Howl({
             src: [songSrc],
             html5: true
         });
 
       setSoundPlayed(sound); 
       console.log(sound); 
         sound.play();
     }

    useEffect(() => {
        console.log(token);
        const fetchPlaylist = async () => {
            try {
                const response = await axios.post(`${API_URL}/playlists/party-mode`,{

                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPlaylist(response.data);
                console.log(response.data);
                

                // Fetch song details for each song ID
                for (const songId of response.data.songs) {
                    try {
                        const result = await axios.get(`${API_URL}/songs/${songId}/getSongs`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        console.log(result.data);
                        songDetails.push(result.data); // Add the song detail to the array
                    } catch (error) {
                        console.error(`Error fetching song ${songId}:`, error);
                    }
                }

                setSongs(songDetails.filter(song => song !== null));
            } catch (error) {
                console.error('Error fetching party mode playlist', error);
            }
        };

        fetchPlaylist();
    }, []);

    if (!playlist) return <div>Loading...</div>;

    return (

        <div className="min-h-screen text-white overflow-auto bg-black" >
      <LoggedinContainer curActScreen={"Party Mode"}>
      <div className="container mx-auto p-4 overflow-auto">
        <div className="text-white text-lg font-semibold pb-4 pl-2">Party Mode</div>
        <div className="space-y-3 overflow-auto">
            {songs.map((item,index)=>{     
                return <SingleSongCard info={item} key={index} playSound={playSound(item.url)}/>
            })}
        </div>
        
      </div>
      </LoggedinContainer>
          
    </div>
        
    );
};

export default PartyModePlaylist;

const SingleSongCard=({info, playSound})=>{
    // console.log(info.likes,info.dislikes,"bola hu",info);
    const { currentSong, setCurrentSong, togglePlayPause, isPaused } = useContext(songContext);
    const handlePlayPause = () => {
          setCurrentSong(info);
        //   togglePlayPause();       
      };

    return(
        <div className="flex hover:bg-gray-600 hover:bg-opacity-30 p-2 rounded-sm " onClick={handlePlayPause}>
            <div className="w-12 h-12 bg-cover bg-center"
            style={{
                backgroundImage: `url("${info.imgurl || info.image_url}")`
            }}
            >
            </div>
            <div className=" flex w-full ">
            <div className="text-white flex justify-center flex-col pl-4 w-5/6">
                <div className="cursor-pointer hover:underline">
                    {info.title || info.track_name}
                </div>
                <div className="text-xs text-gray-400 hover:underline">
                    {info.artist || info.artist_name}
                </div>
            </div>
            
            <div className="w-1/6 flex items-center justify-center text-gray-400 ">
                <div>{info.duration ||"0.29"}</div>
                
                {/* <div className="bg-white text-gray-400 flex items-center justify-center pl-3">...</div> */}
            </div>
            {/* {
                info.likes ? ( <div className="pr-5">
                <div className="flex justify-center items-center">
                <Icon icon="weui:like-filled" className="m-2 text-sm  text-gray-500"></Icon>
                <span className="text-gray-500 text-sm">{info.likes.length}</span>
                </div>
                <div className="flex justify-center items-center">
                <Icon icon="iconamoon:dislike-fill" className="m-2 text-sm  text-gray-500"></Icon>
                <span className="text-gray-500 text-sm">{info.dislikes.length}</span>
                </div>
            </div> ) : (
                <div>
                    </div>
            )
            } */}
            
            </div>
        </div>
    )
}