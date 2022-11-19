import React, { FC } from 'react';

import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import './App.css';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import CardLink from './pages/CardLink/CardLink';
import { ProcessReview } from './pages/ProcessReview/ProcessReview';
import { Account } from './pages/Account/Account';
import { NavMenu } from './components';
import { LotPlacement } from './pages/LotPlacement/LotPlacement';
import { Market } from './pages/Market/Market';
import { Profile } from './pages/Profile/Profile';

const App: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div>
        Тут должна быть шапка
        <button onClick={() => navigate(-1)}>Назад</button>
      </div>
        <NavMenu />
        <Routes>
          <Route path="*" element={(
            <>
              <p><Link to={"/login"}>Login</Link></p>
              <p><Link to={"/register"}>Register</Link></p>
              <p><Link to={"/cards/append"}>AppendCard</Link></p>
              <p><Link to={"/review"}>Review</Link></p>
              <p><Link to={"/dashboard"}>Account</Link></p>
              <p><Link to={"/lotPlacement"}>Lot placement</Link></p>
              <p><Link to={"/market"}>Market</Link></p>
              <p><Link to={"/profile"}>Profile</Link></p>

              {/* {user !== null && (
                <Navigate to="/dashboard" replace={true} />
              )} */}
            </>
          )} />

          <Route path="/login" element={<Login />} />
          <Route path="/lotPlacement" element={<LotPlacement />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/review" element={<ProcessReview />} />
          <Route path="/cards/append" element={<CardLink />} />
          <Route path="/dashboard" element={<Account />} />
          <Route path="/market" element={<Market />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </div>
  );
}

export default App;
