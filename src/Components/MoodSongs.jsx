import React, { useRef, useState } from "react";

const MoodSongs = ({ songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const audioRefs = useRef([]);

  const handlePlayPause = (index) => {
    const currentAudio = audioRefs.current[index];

    if (!currentAudio) return;

    if (isPlaying === index) {
      currentAudio.pause();
      setIsPlaying(null);
    } else {
      // Pause any previously playing audio
      if (isPlaying !== null && audioRefs.current[isPlaying]) {
        audioRefs.current[isPlaying].pause();
        audioRefs.current[isPlaying].currentTime = 0;
      }

      currentAudio.play();
      setIsPlaying(index);
    }
  };

  return (
    <div className="mood-songs w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 space-y-6">
      <h2 className="text-3xl font-extrabold text-white text-center tracking-wide">
        🎵 Recommended Songs
      </h2>

      {songs.map((song, index) => (
        <div
          key={index}
          className={`flex items-center justify-between bg-gray-700/50 p-4 rounded-xl hover:bg-gray-600/60 transition duration-200 ${
            isPlaying === index ? "ring-2 ring-green-500" : ""
          }`}
        >
          <div className="text-white space-y-1">
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p className="text-sm text-gray-300">{song.artist}</p>
          </div>

          <div className="flex items-center gap-4">
            <audio
              src={song.audio}
              ref={(el) => (audioRefs.current[index] = el)}
              onEnded={() => setIsPlaying(null)}
              style={{ display: "none" }}
            />
            <button
              onClick={() => handlePlayPause(index)}
              className={`text-white text-xl px-4 py-2 rounded-full shadow-md transition-all duration-300 ${
                isPlaying === index
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <i
                className={`${
                  isPlaying === index ? "ri-pause-line" : "ri-play-fill"
                }`}
              ></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSongs;
