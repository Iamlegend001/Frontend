import React, { useState } from "react";

const MoodSongs = () => {
  const [songs, setSongs] = useState([
    {
      title: "Happy Song",
      artist: "Artist 1",
      url: "test_url_1",
    },
    {
      title: "Sad Song",
      artist: "Artist 2",
      url: "test_url_2",
    },
    {
      title: "Angry Song",
      artist: "Artist 3",
      url: "test_url_3",
    },
  ]);
  return (
    <>
      {" "}
      <div className="mood-songs flex flex-col items-center w-[55rem] justify-center p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="font-bold text-2xl">Recomended Songs</h2>
      
          {songs.map((song, index) => (
            <div className=" flex items-center justify-between w-full border-b border-gray-700 py-2" key={index}>
             <div className="title">
                <h3 className="font-bold">{song.title}</h3>
                <p>{song.artist}</p>
             </div>
             <div className="play-pause-button text-xl cursor-pointer flex items-center gap-2">
              <i class="ri-pause-line"></i>
              <i class="ri-play-fill"></i>
             </div>
            </div>
          ))}
        
      </div>
    </>
  );
};

export default MoodSongs;
