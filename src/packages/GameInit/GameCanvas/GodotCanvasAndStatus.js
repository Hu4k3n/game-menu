import React, { useRef, useEffect } from 'react';
import './GodotGame.css';
import './GodotCanvasBorder.css';
// Renders the Godot canvas and status overlay elements
function GodotCanvasAndStatus() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.focus();
        }
    }, []);

    const handleBlur = () => {
        if (canvasRef.current) {
            canvasRef.current.focus();
        }
    };

    return (
        <>
            <canvas
                className="godot-canvas-wrapper"
                id="canvas"
                ref={canvasRef}
                tabIndex={0}
                onBlur={handleBlur}
            >
                Your browser does not support the canvas tag.
            </canvas>
            <div id="status" style={{
                backgroundColor: '#242424',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                visibility: 'hidden', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0
            }}>
                <img id="status-splash" className="show-image--true fullsize--true use-filter--true" src="/index.png" alt="" style={{ maxHeight: '100%', maxWidth: '100%', margin: 'auto' }} />
                <progress id="status-progress" style={{ bottom: '10%', width: '50%', margin: '0 auto', display: 'none' }}></progress>
                <div id="status-notice" style={{
                    backgroundColor: '#5b3943', borderRadius: '0.5rem', border: '1px solid #9b3943', color: '#e0e0e0',
                    fontFamily: 'Noto Sans, Droid Sans, Arial, sans-serif', lineHeight: 1.3, margin: '0 2rem', overflow: 'hidden',
                    padding: '1rem', textAlign: 'center', zIndex: 1, display: 'none'
                }}></div>
            </div>
        </>
    );
}

export default GodotCanvasAndStatus;