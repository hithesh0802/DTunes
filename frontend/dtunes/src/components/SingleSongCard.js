const SingleSongCard=({info})=>{
    return(
        <div className="flex hover:bg-gray-600 hover:bg-opacity-30 p-2 rounded-sm">
            <div className="w-12 h-12 bg-cover bg-center"
            style={{
                backgroundImage: `url("${info.imgurl}")`
            }}
            >
            </div>
            <div className=" flex w-full ">
            <div className="text-white flex justify-center flex-col pl-4 w-5/6">
                <div className="cursor-pointer hover:underline">
                    {info.title}
                </div>
                <div className="text-xs text-gray-400 hover:underline">
                    {info.artist}
                </div>
            </div>
            <div className="w-1/6 flex items-center justify-center text-gray-400 ">
                <div>{info.duration}</div>
                {/* <div className="bg-white text-gray-400 flex items-center justify-center pl-3">...</div> */}
            </div>
            </div>
        </div>
    )
}

export default SingleSongCard ;