
import React, { useEffect } from 'react';
import './styles.css';

function LoadingPage() {
    return (
        <div class="container">
            <div class="loadingspinner">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
            </div>    
        </div>
    );
}

export default LoadingPage;


