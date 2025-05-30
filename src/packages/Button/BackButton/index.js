import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <button className="back-button" onClick={handleBack}>
            {'<'}
        </button>
    );
};


export default BackButton;