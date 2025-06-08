import { useState, useEffect } from 'react';
import bgm from './assets/sound/bgm.mp3';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './packages/StartPage';
import MainMenu from './packages/MainMenu';
import GodotGame from './packages/GameInit/GameCanvas/GodotGame';

function App() {
  const [isStartPage, setIsStartPage] = useState(true);
  const [bgAudioObject, setBgAudioObject] = useState(null);

  function playAudio() {
    if (!bgAudioObject) {
      console.log('Playing background audio');
      const audio = new Audio(bgm);
      audio.loop = true;
      audio.play().catch((err) => {
        console.error('Error playing audio:', err);
      });
      setBgAudioObject(audio);
    } else {
      console.warn('Background audio is already playing');
    }
  }

  function pauseAudio() {
    if (bgAudioObject) {
      console.log('Pausing background audio');
      bgAudioObject.pause();
    }
    setBgAudioObject(null);
  }
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={
              <StartPage 
              />} />
            <Route path="/main" element={
              <MainMenu 
                onPlay={playAudio} 
                onPause={pauseAudio}
                bgAudioObject={bgAudioObject}
              />} />
            <Route path="/game" element={
              <GodotGame 
                onPlay={playAudio} 
                onPause={pauseAudio}
                bgAudioObject={bgAudioObject}
              />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
