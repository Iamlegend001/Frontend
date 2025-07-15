import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const ExpressionDetector = () => {
  const videoRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => (videoRef.current.srcObject = stream))
        .catch(err => console.error('Camera error:', err));
    };

    loadModels();
  }, []);

  useEffect(() => {
    const detect = async () => {
      const options = new faceapi.TinyFaceDetectorOptions();
      const result = await faceapi
        .detectSingleFace(videoRef.current, options)
        .withFaceExpressions();

      if (result) {
        const expr = result.expressions;
        const dominant = Object.keys(expr).reduce((a, b) => expr[a] > expr[b] ? a : b);
        console.log('Expression:', dominant); // 👈 use this in UI
      }
    };

    const interval = setInterval(() => {
      if (videoRef.current) detect();
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="720"
        height="560"
        style={{ border: '2px solid #ccc' }}
      />
    </div>
  );
};

export default ExpressionDetector;
