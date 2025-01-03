import React from 'react';
import videoSource from '../../components/images/vid2.mp4'; // Ensure the path is correct

export const ImageSlider: React.FC = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSource}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};