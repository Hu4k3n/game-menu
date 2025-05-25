import React from 'react';

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
        <div style={styles.container}>
            <h1 style={styles.title}>Game Menu</h1>
            <button style={styles.button} onClick={onPlay}>Play</button>
            <button style={styles.button} onClick={onOptions}>Options</button>
            <button style={styles.button} onClick={onExit}>Exit</button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#222',
    },
    title: {
        color: '#fff',
        marginBottom: '2rem',
    },
    button: {
        width: '200px',
        padding: '1rem',
        margin: '0.5rem',
        fontSize: '1.2rem',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        background: '#444',
        color: '#fff',
        transition: 'background 0.2s',
    }
};

export default MainMenu;