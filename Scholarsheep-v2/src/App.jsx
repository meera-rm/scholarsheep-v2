import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './Components/common/nav';
import Footer from './Components/common/Footer';
import AnimatedRoutes from './Components/common/AnimatedRoutes';
import SkipToContent from './Components/common/SkipToContent';

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const App = () => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const preferredMode = localStorage.getItem('preferredMode');
    if (preferredMode) {
      setMode(preferredMode);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('preferredMode', mode);
  }, [mode]);

  const switchMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  const darkModeButton = (
    <button id="themebutton" aria-label="Toggle dark mode" className='switchThemeButton' onClick={switchMode}>
      {mode === 'light' ? <BsFillSunFill size={30} /> : <BsFillMoonFill size={30} />}
    </button>
  );

  return (
    <div className='App'>
      <SkipToContent />
      <main id="main-content" role="main">
        <NavBar darkModeButton={darkModeButton} mode={mode} />
        <AnimatedRoutes />
        <Footer />
      </main>
    </div>
  );
};

export default App;
