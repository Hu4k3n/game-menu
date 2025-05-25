import React from 'react';

function LoadingPage() {
    return (
        <div style={styles.container}>
            <div style={styles.spinner}></div>
            <p style={styles.text}>Loading...</p>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f5f5f5',
    },
    spinner: {
        width: 48,
        height: 48,
        border: '6px solid #ccc',
        borderTop: '6px solid #1976d2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: 16,
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
};

// Spinner animation
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(styleSheet);

export default LoadingPage;