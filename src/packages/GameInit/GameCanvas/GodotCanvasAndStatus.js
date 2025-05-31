import React, { useRef, useEffect } from 'react';
import './GodotGame.css';
import './GodotCanvasBorder.css';
import './GodotCanvasAndStatus.css';
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
            <div id="status">
                <progress id="status-progress"></progress>
                <div id="status-notice"></div>
            </div>
        </>
    );
}

export default GodotCanvasAndStatus;