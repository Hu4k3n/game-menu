
import React from 'react';


const BackgroundVideo = ({ videoPath }) => (
    <video
        className="main-menu-bg-video"
        src={videoPath}
        autoPlay
        loop
        muted
        playsInline
    />
);

export default BackgroundVideo;
