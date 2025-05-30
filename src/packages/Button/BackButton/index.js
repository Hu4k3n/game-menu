import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';
import UIButton from '../UIButton';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <UIButton className="back-button" onClick={handleBack}>◄Back</UIButton>
    );
};


export default BackButton;