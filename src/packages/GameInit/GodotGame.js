
import React, { useEffect } from 'react';

// This component renders the Godot game canvas and status overlays, then runs the Godot loader
function GodotGame() {
    useEffect(() => {
        // Dynamically load the Godot engine script if not already loaded
        const godotScriptId = 'godot-engine-script';
        if (!document.getElementById(godotScriptId)) {
            const script = document.createElement('script');
            script.id = godotScriptId;
            script.src = '/index.js'; // CHANGED: now at public root
            script.async = false;
            script.onload = () => {
                // After engine is loaded, load the init script
                loadInitScript();
            };
            document.body.appendChild(script);
        } else {
            loadInitScript();
        }

        function loadInitScript() {
            // Load the init_godot_game.js and call init_godot_game()
            const initScriptId = 'godot-init-script';
            if (!document.getElementById(initScriptId)) {
                const script = document.createElement('script');
                script.id = initScriptId;
                script.src = '/init_godot_game.js';
                script.onload = () => {
                    if (window.init_godot_game) window.init_godot_game();
                };
                document.body.appendChild(script);
            } else {
                if (window.init_godot_game) window.init_godot_game();
            }
        }
        // Cleanup: remove canvas/status on unmount
        return () => {
            const canvas = document.getElementById('canvas');
            if (canvas) canvas.remove();
            const status = document.getElementById('status');
            if (status) status.remove();
        };
    }, []);

    // The Godot loader expects these elements to exist in the DOM
    return (
        <>
            <canvas id="canvas" style={{ display: 'block', width: '100vw', height: '100vh', background: 'black' }}>
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

export default GodotGame;
