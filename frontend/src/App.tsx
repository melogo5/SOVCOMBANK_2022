import React, { FC } from 'react';

import Login from './pages/Login/Login';

import './App.css';
import Registration from './pages/Registration/Registration';
import CardLink from './pages/CardLink/CardLink';
import { ProcessReview } from './pages/ProcessReview/ProcessReview';

const App: FC = () => {

  return (
    <div className="App">
      <CardLink />
      <Login />
      <Registration />
      <ProcessReview />
    </div>
  );
}

export default App;
