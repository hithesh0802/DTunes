import { createContext } from "react";

const songContext= createContext({
    currentSong: null,
    setCurrentSong: (currentSong)=>{},
    soundPlayed: null,
    setSoundPlayed: (soundPlayed)=>{},
    isPaused: null,
    setIsPaused: (isPaused)=>{},
})

export default songContext;