import React from 'react';
import './MainMenu.css';
import BackgroundVideo from './BackgroundVideo';
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
            <BackgroundVideo />
            <div className="main-menu-container">
                <h1 className="main-menu-title">Game Menu</h1>
                <button className="main-menu-button" onClick={onPlay}>Play</button>
                <button className="main-menu-button" onClick={onOptions}>Resume</button>
                <button className="main-menu-button" onClick={onExit}>About</button>
                <button className="main-menu-button" onClick={onExit}>Exit</button>
            </div>
        </div>
    );
}


export default MainMenu;