import React, { FC } from 'react';

import Login from './pages/Login/Login';

import './App.css';
import Registration from './pages/Registration/Registration';

const App: FC = () => {

  return (
    <div className="App">
      <Login />
      {/* <Registration /> */}
    </div>
  );
}

export default App;
