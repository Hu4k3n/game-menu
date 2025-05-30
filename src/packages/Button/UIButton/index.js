import React from 'react';
import '../GameButton/index.js';

function UIButton({ children, className = '', onClick, ...props }) {
    return (
        <button className={`main-menu-button ${className}`} onClick={onClick} {...props}>
            {children}
        </button>
    );
}

export default UIButton;
