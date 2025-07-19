import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const FacialExpression1 = ({ setSongs }) => {
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
      });
  };

  const detectMood = async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    let mostProbableExpression = 0;
    let mood = "";

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProbableExpression) {
        mostProbableExpression = detections[0].expressions[expression];
        mood = expression;
      }
    }

    try {
      const response = await axios.get(`http://localhost:3000/songs?mood=${mood}`);
      console.log("Mood detected:", mood);
      console.log("Songs for mood:", response.data.songs);
      setSongs(response.data.songs);
    } catch (error) {
      console.error("Error fetching mood songs:", error);
    }
  };

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center p-8 gap-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-gray-700 w-full max-w-6xl mx-auto">
      <h2 className="text-3xl text-white font-bold tracking-wide text-center">
        😊 Detect Your Mood with AI
      </h2>

      <div className="rounded-2xl overflow-hidden border-4 border-gray-100 shadow-xl">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-[90vw] sm:w-[720px] h-[440px] object-cover bg-black"
        />
      </div>

      <button
        onClick={detectMood}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold tracking-wide px-8 py-3 rounded-xl shadow-md transition-all duration-300 text-lg"
      >
        🎯 Detect Mood
      </button>
    </div>
  );
};

export default FacialExpression1;
