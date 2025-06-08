import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';
import UIButton from '../UIButton';


const BackButton = (props) => {
    const navigate = useNavigate();
    const [musicOn, setMusicOn] = React.useState(!!props.bgAudioObject);

    const handleBack = () => {
        navigate('/');
    };

    const onMusic = () => {
        if (musicOn) {
            props.onPause && props.onPause();
        } else {
            props.onPlay && props.onPlay();
        }
        setMusicOn(!musicOn);
    };

    React.useEffect(() => {
        setMusicOn(!!props.bgAudioObject);
    }, [props.bgAudioObject]);

    return (
        <div className="back-button-row">
            <UIButton className="back-button" onClick={handleBack}>◄Back</UIButton>
            <UIButton className="music-button" onClick={onMusic}>{musicOn ? 'Music: On' : 'Music: Off'}</UIButton>
        </div>
    );
};


export default BackButton;