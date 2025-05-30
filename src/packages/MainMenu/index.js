import React from 'react';
import './MainMenu.css';
import UIButton from '../Button/UIButton';
import BackgroundVideo from './BackgroundVideo';
import bgArtVideo from '../../assets/bg/bgArt.mp4';
import { useNavigate } from 'react-router-dom';


function MainMenu() {
    const navigate = useNavigate();
    const onPlay = () => {
        console.log("Play button clicked");
        navigate('/game');
    };
    const onOptions = () => {
        console.log("Options button clicked");
        // Add logic to open options menu
    };
    const onExit = () => {
        console.log("Exit button clicked");
        // Add logic to exit the game
    };

    return (
        <div className="main-menu-background-wrapper">
            <BackgroundVideo videoPath={bgArtVideo} />
            <div className="main-menu-container">
                <h1 className="main-menu-title">Game Menu</h1>
                <UIButton onClick={onPlay}>Play</UIButton>
                <UIButton onClick={onOptions}>See my Resume</UIButton>
                <UIButton onClick={onExit}>About</UIButton>
            </div>
        </div>
    );
}


export default MainMenu;