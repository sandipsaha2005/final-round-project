import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { CardDemo } from './components/Card/App';
import Footer from './components/Footer/App';
import { CardHoverEffectDemo } from './components/Hover Effect/app';
import { App1 } from './components/3dRoller';

function App() {
  return (
    <>
      <App1 /> {/* Add this if you want to include the 3D Roller component */}
    </>
  );
}

export default App;
