import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FacialExpression = () => {
  const videoRef = useRef();
  // const canvasRef = useRef();
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
            // videoRef.current.play(); // important to start video playback
          }
        })
        .catch((err) => {
          console.error("Error accessing webcam: ", err);
        });
    };
    // const handleVideoPlay = () => {
    //   setInterval(async () => {
    //     const detections = await faceapi
    //       .detectAllFaces(
    //         videoRef.current,
    //         new faceapi.TinyFaceDetectorOptions()
    //       )
    //       .withFaceExpressions();
    //     // const canvas = canvasRef.current;
    //     // const displaySize = {
    //     //   width: videoRef.current.width,
    //     //   height: videoRef.current.height,
    //     // };
    //     // faceapi.matchDimensions(canvas, displaySize);
    //     // const resized = faceapi.resizeResults(detections, displaySize);
    //     // canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    //     // faceapi.draw.drawDetections(canvas, resized);
    //     // faceapi.draw.drawFaceExpressions(canvas, resized);
    //     let mostProableExpression = 0
    //     let _expression = ""
    //     if (!detections || detections.length === 0) {
    //       console.log("No face detected");
    //       return;
    //     }
    //     for(const expression of Object.keys(detections[0].expressions)) {
    //       if (detections[0].expressions[expression] > mostProableExpression) {
    //         mostProableExpression = detections[0].expressions[expression];
    //         _expression = expression;
    //       }
    //     }
    //     console.log(_expression)
    //   }, 2000);
    // };
    async function detectMood() {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();
      // const canvas = canvasRef.current;
      // const displaySize = {
      //   width: videoRef.current.width,
      //   height: videoRef.current.height,
      // };
      // faceapi.matchDimensions(canvas, displaySize);
      // const resized = faceapi.resizeResults(detections, displaySize);
      // canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      // faceapi.draw.drawDetections(canvas, resized);
      // faceapi.draw.drawFaceExpressions(canvas, resized);
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
      console.log(_expression);
    }
  useEffect(() => {
  

    loadModels().then(startVideo);

    // videoRef.current.addEventListener("play", handleVideoPlay);
  }, []);
  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: "720px", height: "560px" }}
      />
      {/* <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0,width:'720px', height:'560px' }} /> */}
      <button onClick={detectMood}>Detect Mood</button>
    </div>
  );
};

export default FacialExpression;
