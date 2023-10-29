import React, { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import DashBoard from './pages/Dashboard';
import Profile from './pages/Profile';
import './style.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import TransactionHistory from './components/transactions/TransactionHistory';
import SessionExpiredModal from './components/extra-info-pages/SessionExpired';
import Cookies from 'js-cookie';
import UseraWallet from './pages/UseraWallet';
import Menu from './components/menu/Menu';
import ContactSupport from './pages/ContactSupport';
import Notifications from './pages/Notifications';
import CryptoNew from './pages/CryptoNews';
import { useSelector } from 'react-redux';
import PrivateRoute from './private-routes/PrivateRoutes';

function App() {
  const location = useLocation();
  const userData = useSelector((state) => state);
  // console.log(userData);
  const excludedPaths = ['/', '/login', '/register', '/test-keychain'];
  const shouldRenderSideBar = userData && !excludedPaths.includes(location.pathname);
  const currentUser = true;

  return (
    <div className="App">
      <Navbar currentUser={currentUser} />
      <div className="page-container">
        {shouldRenderSideBar && (
          <div className="sidebar-container">
            <Menu />
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
          <Route path="/login" element={<Login currentUser={currentUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><TransactionHistory /></PrivateRoute>} />
          <Route path="/wallet" element={<PrivateRoute><UseraWallet /></PrivateRoute>} />
          <Route path="/support" element={<PrivateRoute><ContactSupport /></PrivateRoute>} />
          <Route path="/crypto-news" element={<PrivateRoute><CryptoNew /></PrivateRoute>} />
          <Route path="/notification" element={<PrivateRoute><Notifications /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
