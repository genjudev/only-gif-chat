import React from 'react';
import './App.css';

import { socketApi } from './services/SocketAPI';
import TestInput from './components/TestInput';

function App() {
  console.log("SOCKET API", socketApi);
  return (
    <div className="App">
      <TestInput />
    </div>
  );
}

export default App;
