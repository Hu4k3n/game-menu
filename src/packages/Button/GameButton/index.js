import React from 'react';


const getSymbol = (icon) => {
    switch (icon) {
        case 'up':
            return '↑';
        case 'down':
            return '↓';
        case 'left':
            return '←';
        case 'right':
            return '→';
        case 'action':
            return 'F';
        default:
            return null;
    }
};

const GameButton = ({ onClick, children, size = 60, style = {}, icon, ...props }) => {
    const buttonStyle = {
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        background: '#3498db',
        color: '#fff',
        cursor: 'pointer',
        fontSize: size / 2.5,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        transition: 'background 0.2s',
        ...style,
    };

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
        <button
            type="button"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={buttonStyle}
            {...props}
        >
            {symbol || children}
        </button>
    );
};

export default GameButton;