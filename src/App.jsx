import React, { useState } from "react";
import ExpressionDetector from "./Components/ExpressionDetector";
import FacialExpression1 from "./Components/FacialExpression1";
import MoodSongs from "./Components/MoodSongs";

const App = () => {
    const [songs, setSongs] = useState([

  ]);
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 gap-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Real-Time Facial Expression Detector
      </h1>

      <div className="w-full max-w-4xl flex items-center justify-center bg-gray-800 p-6 rounded-2xl shadow-lg">
        {/* <ExpressionDetector /> */}
        <FacialExpression1 setSongs={setSongs} />
      </div>
      <div>
        <MoodSongs songs={songs} />
      </div>

      <p className="mt-6 text-sm text-gray-400 text-center">
        Powered by face-api.js | Made with ❤️ by Arkaprava
      </p>
    </div>
  );
};

export default App;
