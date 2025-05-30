import React from 'react';
import './GameButton.css';

const getSymbol = (icon) => {
    switch (icon) {
        case 'up':
            return '▲';
        case 'down':
            return '▼';
        case 'left':
            return '◄';
        case 'right':
            return '►';
        case 'action':
            return '█';
        default:
            return null;
    }
};


const GameButton = ({ onClick, children, size = 60, icon, ...props }) => {
    const symbol = icon ? getSymbol(icon) : null;

    // Map icon to keyboard event key
    const iconToKey = {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
        action: 'f',
    };


    // Send keydown on press, keyup on release
    const handlePointerDown = (e) => {
        if (icon && iconToKey[icon]) {
            const event = new KeyboardEvent('keydown', { key: iconToKey[icon], code: iconToKey[icon], bubbles: true });
            window.dispatchEvent(event);
            const canvas = document.getElementById('canvas');
            if (canvas) {
                canvas.dispatchEvent(event);
                if (typeof canvas.focus === 'function') {
                    canvas.focus();
                }
            }
        }
        if (onClick) {
            onClick(e);
        }
    };

    const handlePointerUp = (e) => {
        if (icon && iconToKey[icon]) {
            const event = new KeyboardEvent('keyup', { key: iconToKey[icon], code: iconToKey[icon], bubbles: true });
            window.dispatchEvent(event);
            const canvas = document.getElementById('canvas');
            if (canvas) {
                canvas.dispatchEvent(event);
            }
        }
    };

    return (
        <div className="game-button-container">    
            <button
            type="button"
            className="game-button"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            {...props}
            >
                {symbol || children}
            </button>
        </div>
    );
};

export default GameButton;