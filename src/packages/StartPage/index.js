

import React, { use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

function StartPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = () => navigate('/main');
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    const handleClick = () => {
        navigate('/main');
    };

    return (
        <div
            className="start-page"
            onClick={handleClick}
            tabIndex={0}
        >
            <h1>Click or Press Any Key to Start</h1>
        </div>
    );
}

export default StartPage;


