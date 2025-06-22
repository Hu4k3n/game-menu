import React from 'react';
import './MainMenu.css';
import UIButton from '../Button/UIButton';
import BackgroundVideo from './BackgroundVideo';
import bgArtVideo from '../../assets/bg/bgArt.mp4';
import { useNavigate } from 'react-router-dom';


function MainMenu(props) {
    const navigate = useNavigate();
    const [musicOn, setMusicOn] = React.useState(!!props.bgAudioObject);

    const onPlay = () => {
        console.log("Play button clicked");
        setTimeout(() => {
            props.onPlay && props.onPlay();
        },3000)
        navigate('/game');
    };
    const onResume = () => {
        console.log("Options button clicked");
    };
    const onMusic = () => {
        if (musicOn) {
            props.onPause && props.onPause();
        } else {
            props.onPlay && props.onPlay();
        }
        setMusicOn(!musicOn);
    };
    const onAbout = () => {
        navigate('/')
    };

    React.useEffect(() => {
        setMusicOn(!!props.bgAudioObject);
    }, [props.bgAudioObject]);

    return (
        <div className="main-menu-background-wrapper">
            <BackgroundVideo videoPath={bgArtVideo} />
            <div className="main-menu-container">
                <h1 className="main-menu-title">Game Menu</h1>
                <UIButton onClick={onPlay}>Play</UIButton>
                <UIButton onClick={onResume}>See my Resume</UIButton>
                <UIButton onClick={onMusic}>{musicOn ? 'Music: On' : 'Music: Off'}</UIButton>
                <UIButton onClick={onAbout}>About Me</UIButton>
            </div>
        </div>
    );
}


export default MainMenu;