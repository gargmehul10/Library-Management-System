import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <BrowserRouter>
      <div>
        <MainComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
