import React from 'react';

const BackgroundVideo = () => (
    <video
        className="main-menu-bg-video"
        src={require('../../assets/bg/bgArt.mp4')}
        autoPlay
        loop
        muted
        playsInline
    />
);

export default BackgroundVideo;
