export function playAudio(filePath) {
    const audio = new Audio(filePath);
    audio.loop = true;
    audio.play().catch((err) => {
        console.error('Error playing audio:', err);
    });
    return audio;
}

export const handleMusicToggle = () => {
        console.log("Music toggle clicked");
        if (bgAudio) {
            bgAudio.pause();
            setBgAudio(null);
        } else {
            setBgAudio(playAudio(bgMusic));
        }
}