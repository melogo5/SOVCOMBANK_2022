import React, { FC } from 'react';

import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import './App.css';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import CardLink from './pages/CardLink/CardLink';
import { ProcessReview } from './pages/ProcessReview/ProcessReview';
import { Account } from './pages/Account/Account';

const App: FC = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={(
            <>
              <p><Link to={"/login"}>Login</Link></p>
              <p><Link to={"/register"}>Register</Link></p>
              <p><Link to={"/cards/append"}>AppendCard</Link></p>
              <p><Link to={"/review"}>Review</Link></p>
              <p><Link to={"/dashboard"}>Account</Link></p>

              {/* {user !== null && (
                <Navigate to="/dashboard" replace={true} />
              )} */}
            </>
          )} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/review" element={<ProcessReview />} />
          <Route path="/cards/append" element={<CardLink />} />
          <Route path="/dashboard" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
