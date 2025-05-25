import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingPage from './packages/LoadingPage';
import MainMenu from './packages/MainMenu';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Routes>
          <Route path="/" element={<MainMenu />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
