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
        <PlayListView key={'d'} titletext="Trending in India" focusCardsData={TrendingNow}></PlayListView>       
        <PlayListView key={'b'} titletext="All Time Favorites" focusCardsData={TopTrending}></PlayListView>
        <PlayListView key={'c'} titletext="Top Sound India Hits" focusCardsData={SouthIndiaData}></PlayListView>
        <PlayListView key={'a'} titletext="Focus" focusCardsData={focusCardsData}></PlayListView>
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
        audioUrl: "https://p.scdn.co/mp3-preview/eed4e290bba29419253b956bcc5bc4f445974e6b?cid=113b2f443cf541ca96893bc6d6147ef7"
    },
    {
        title:"Deep Focus" ,
        description:"Keep Calm to Stay fresh and Focused",
        imgUrl: "https://images.unsplash.com/photo-1571139341274-3bac059ed3a4?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioUrl: "https://p.scdn.co/mp3-preview/41cb5904890237fe7bb5fac70c3a1b1ed1c4a81d?cid=113b2f443cf541ca96893bc6d6147ef7"
    },{
        title:"Instrumental Study" ,
        description:"Focus with soft study music in the background",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
        audioUrl: `${process.env.PUBLIC_URL}/Augury.mp3`
    },{
        title:"Focus Flow" ,
        description:"Uptempo hip hop instrumental beats",
        imgUrl: "https://plus.unsplash.com/premium_photo-1675530497996-fc9a9561038e?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioUrl: "https://p.scdn.co/mp3-preview/a7e352c9f8fc9139ece2053a08e6d56959446fc0?cid=113b2f443cf541ca96893bc6d6147ef7"
    },{ 
        title:"Beats to think to" ,
        description:"Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1520390244437-6f1c5eae66ff?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        audioUrl: "https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=0e1e39881f83497d8a103902839be497"
    },
];

const SouthIndiaData=[
  {
      title:"Ordinary Person (from Leo)",
      description:"By Anirudh Ravichander",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e0229369874cd836dc35a40a980",
      audioUrl: "https://p.scdn.co/mp3-preview/ab2cc69d76a3e390cc878c6dadd21ac6b7b365a6?cid=113b2f443cf541ca96893bc6d6147ef7"
  },
  {
      title:"Hukum - Thalaivar Alappara (From Jailer)" ,
      description:"By Anirudh Ravichander",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e02915c0a9491052bebed419720",
      audioUrl: "https://p.scdn.co/mp3-preview/25de2a42aced5bd37e33eab44d0aa5aba04305e8?cid=113b2f443cf541ca96893bc6d6147ef7"
  },{
      title:"Badass (From Leo)" ,
      description:"By Anirudh Ravichander",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e02c812fd378635732ad755733d" ,
      audioUrl: "https://p.scdn.co/mp3-preview/bad0ae7a9ef842f2917aced9e9bd470b2d4c4228?cid=113b2f443cf541ca96893bc6d6147ef7"
  },{
      title:"Kadharalz" ,
      description:"By Anirudh Ravichander",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e02605a640e7636ce440c8d9323",
      audioUrl: "https://p.scdn.co/mp3-preview/1875f5fd88f7d124abf296eb44b3bd1b01319ffd?cid=113b2f443cf541ca96893bc6d6147ef7"
  },{ 
      title:"Dippam Dappam (From Kaathuvaakula Rendu Kaadhal)" ,
      description:"By Anirudh Ravichander",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e02e7bfeb6289d915b6f93bb8de",
      audioUrl: "https://p.scdn.co/mp3-preview/cec5daffa2f3f4931b10db2212fd1243acba3e2f?cid=113b2f443cf541ca96893bc6d6147ef7"
  },
];

const TopTrending=[
  {
      title:"Worldwide",
      description:"By artist Mxrci",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e02df3d675dfa0d07c7c0a4ae9c",
      audioUrl: "https://p.scdn.co/mp3-preview/1f38f6ab62339fd78c89e899b86c4bfc9cd44749?cid=113b2f443cf541ca96893bc6d6147ef7"
  },
  {
      title:"Swagg Star (feat. Tori D)" ,
      description:"By artist TZ",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e02e29f5390dba687afe504412f",
      audioUrl: "https://p.scdn.co/mp3-preview/7bb7b471f0250723ef6faa008df17f078f2f44a9?cid=113b2f443cf541ca96893bc6d6147ef7"
  },{
      title:"Please, Please, Please, Let Me Get What I Want - 2011 Remaster" ,
      description:"By The Smiths",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e02786b44c75ebf915866523f5b" ,
      audioUrl: "https://p.scdn.co/mp3-preview/5ce66bb51b706d64d0c951f0773b0277ffbf3349?cid=113b2f443cf541ca96893bc6d6147ef7"
  },{
      title:"Cruel Summer" ,
      description:"By The Bananarama",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e02b20af9c8ff56d8b178cefec0",
      audioUrl: "https://p.scdn.co/mp3-preview/1235a574e69b590f34d91ab41adac01be9709579?cid=113b2f443cf541ca96893bc6d6147ef7"
  },{ 
      title:"Vainko" ,
      description:"By Brodha V",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e0291a97523b77900c64acb50db",
      audioUrl: "https://p.scdn.co/mp3-preview/621eaf07a99dd5b882081b1ca245b58ae7a00430?cid=113b2f443cf541ca96893bc6d6147ef7"
  },
]

const TrendingNow=[
  {
      title:"Pushpa Pushpa From Pushpa 2 The Rule [MALAYALAM]",
      description:"By Devi Sri Prasad",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e020279c4f1db2fbd4dbee0488d",
      audioUrl: "https://p.scdn.co/mp3-preview/ba7e0db5166dda579cc73c92c5395d02acb65263?cid=113b2f443cf541ca96893bc6d6147ef7"
  },
  {
      title:"Ta Takkara (Complex Song)" ,
      description:"By Santhosh Narayanan",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e020bff72b526c4426b679602e7",
      audioUrl: "https://p.scdn.co/mp3-preview/df99254c6c1f1cbb533064dc6915c7b9f2ba6335?cid=113b2f443cf541ca96893bc6d6147ef7"
  },{
      title:"Lokiverse 2.0" ,
      description:"By Anirudh Ravichander",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e027f8c4008eef517ae4d2a5b2d" ,
      audioUrl: "https://p.scdn.co/mp3-preview/93c3dbfa9ab204fae96b61c78c156cb1fd0a502f?cid=113b2f443cf541ca96893bc6d6147ef7"
  },{
      title:"Ishq Tera" ,
      description:"By Osho Jain",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e02360f11e82f59073aa28fb118",
      audioUrl: "https://p.scdn.co/mp3-preview/fc679f335e6f70fc9a640fae34b8edb5e0f3e6a5?cid=113b2f443cf541ca96893bc6d6147ef7"
  },{ 
      title:"Chathiyan" ,
      description:"By Dabzee and M.H.R",
      imgUrl: "https://i.scdn.co/image/ab67616d00001e020a80e7c9f36dd942f36e56d2",
      audioUrl: "https://p.scdn.co/mp3-preview/be45ff9bec942767290cdbeabe05dc5a0a446657?cid=113b2f443cf541ca96893bc6d6147ef7"
  },
]
export default Home;
