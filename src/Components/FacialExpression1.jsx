import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FacialExpression1 = () => {
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

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    let mostProableExpression = 0;
    let _expression = "";

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProableExpression) {
        mostProableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }

    console.log("Detected mood:", _expression);
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="relative flex  items-center gap-6 p-6 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700">
      <div className="overflow-hidden rounded-xl border-4 border-white shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-[720px] h-[560px] object-cover"
        />
      </div>
      <button
        onClick={detectMood}
        className="bg-[#2E2E2E] hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200"
      >
        Detect Mood
      </button>
    </div>
  );
};

export default FacialExpression1;
