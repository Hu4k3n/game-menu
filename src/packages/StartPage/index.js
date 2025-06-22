import React, { use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';
import ProfileCard from '../ProfileCard';
import pic from '../../assets/avatar/avatar-pic.png'
import Cubes from '../Cubes';
import Aurora from '../BgWaves';
import ScrollReveal from '../ScrollReveal';

function StartPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = () => navigate('/main');
        // window.addEventListener('keydown', handleKeyDown);
        // return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    const handleClick = () => {
        navigate('/main');
    };

    const renderProfileCard = () => { 
        return (
            <ProfileCard
                    name="Arjun Syam"
                    title="Software Engineer @ Cisco"
                    handle="huraken.0w0"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl={pic}
                    showUserInfo={false}
                    enableTilt={true}
                    onContactClick={() => console.log('Contact clicked')}
                />
        )
    }

    const scrollBox = (value) => {
        return (
        <div style={{ height: `${value}vh` }}></div>
        )
    }

    const scrollText = (text) => {
        return (
            <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    rotationEnd="top center" // Start animating when ProfileCard is off screen
                    wordAnimationEnd="top center"
                >
                    {text}
                </ScrollReveal>
        )
    } 

    return (
        <div
            className="start-page"
            // onClick={handleClick}
            tabIndex={0}
        >
            <div className="cubes-bg">
                <Aurora
                colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
                />
            </div>
            <div className="start-page-content">
                {scrollBox(10)}
                {renderProfileCard()}
                {scrollText("Hello there!")}
                {scrollBox(50)}
                {scrollText("I'm a Full Stack developer")}
                {scrollBox(50)}
            </div>
            
        </div>
    );
}

export default StartPage;


