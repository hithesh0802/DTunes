import { useContext } from "react";
import songContext from "../context/songContext";
import { Icon } from "@iconify/react";
import { useState } from "react";
const SingleSongCard=({info, playSound})=>{
    console.log(info.likes,info.dislikes);
    const { currentSong, setCurrentSong, togglePlayPause, isPaused } = useContext(songContext);
    const handlePlayPause = () => {
          setCurrentSong(info);
          togglePlayPause();
        
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
                <div>{info.duration}</div>
                
                {/* <div className="bg-white text-gray-400 flex items-center justify-center pl-3">...</div> */}
            </div>
            <div className="pr-5">
                <div className="flex justify-center items-center">
                <Icon icon="weui:like-filled" className="m-2 text-sm  text-gray-500"></Icon>
                <span className="text-gray-500 text-sm">{info.likes}</span>
                </div>
                <div className="flex justify-center items-center">
                <Icon icon="iconamoon:dislike-fill" className="m-2 text-sm  text-gray-500"></Icon>
                <span className="text-gray-500 text-sm">{info.dislikes}</span>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SingleSongCard ;