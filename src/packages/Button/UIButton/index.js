import React from 'react';
import '../GameButton/index.js';
import './UIButton.css';

function UIButton({ children, className = '', onClick, ...props }) {
    return (
        <button className={`main-menu-button ${className}`} onClick={onClick} {...props}>
            {children}
        </button>
    );
}

export default UIButton;
