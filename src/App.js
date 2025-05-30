import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingPage from './packages/LoadingPage';
import MainMenu from './packages/MainMenu';
import GodotGame from './packages/GameInit/GameCanvas/GodotGame';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Router>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/game" element={<GodotGame />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
