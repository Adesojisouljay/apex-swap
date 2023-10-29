import React, { useEffect, useState } from "react";
import "./menu.scss"
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate, useLocation } from "react-router-dom";
import profileImage from "../../assets/souljay.jpeg"
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../redux/userSlice";
import { logout } from "../../redux/authSlice";
import { removeWallet } from "../../redux/walletSlice";
import { removeAccessToken } from "../../constants/vairables";


const Menu = () => {
    const user = useSelector(state =>state.user)
    useEffect(()=>{
        // console.log(user)
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (route) => {
        return location.pathname === route ? "active" : "";
      };

    const handleLogout = () =>{
        dispatch(logout())
        dispatch(clearUserData())
        dispatch(removeWallet())
        removeAccessToken()
        navigate("/")
    }
  return (    
    <div className="menu">
        <div className="menu-items">
            <div className="user-profile">
                <div className="top-wrapper">
                    <div className="user">  
                        <img src={profileImage} alt="" />                  
                    <div className="user-name">
                        <span>{`Hi, ${user?.userData?.lastName} ${user?.userData?.firstName}`}</span>
                    </div>
                    </div>
                    <span>@{user?.userData?.username}</span>
                </div>
            </div>
            <hr/>
            <Link to="/">
                <div className="item">
                    <HomeIcon/>
                    <span>Home</span>
                </div>
            </Link>
            <Link to={`/dashboard`} className={isActive("/dashboard")}>
                <div className="item">
                    <AccountBalanceWalletOutlinedIcon/>
                    <span>Dashboard</span>
                </div>
            </Link>
            <Link to={`/wallet`} className={isActive("/wallet")}>
                <div className="item">
                    <AccountBalanceWalletOutlinedIcon/>
                    <span>Wallet</span>
                </div>
            </Link>
            <Link to={`/transactions`} className={isActive("/transactions")}>
                <div className="item">
                    <HistoryIcon/>
                    <span>Transacttions</span>
                </div>
            </Link>
            <Link to={`/profile`} className={isActive("/profile")}>
                <div className="item">
                    <SettingsIcon/>
                    <span>Profile settings</span>
                </div>
            </Link>
            <Link to={`/crypto-news`} className={isActive("/crypto-news")}>
                <div className="item">
                    <NewspaperIcon/>
                    <span>Crypto News</span>
                </div>
            </Link>
            <Link to={`/support`} className={isActive("/support")}>
                <div className="item">
                    <HelpOutlineIcon/>
                    <span>Contact Support</span>
                </div>
            </Link>
            <Link to={`/notification`} className={isActive("/notification")}>
                <div className="item">
                    <NotificationsIcon/>
                    <span>Notifications</span>
                </div>
            </Link>
            {/* <Link to={`/`}> */}
            <div className="theme-icon">
                <DarkModeOutlinedIcon/>
                <span>Switch Mode</span>
            </div>
            {/* </Link> */}
            {/* <Link to="/"> */}
                <div className="item" onClick={handleLogout}>
                    <LogoutIcon/>
                    <span>Logout</span>
                </div>
            {/* </Link> */}
        </div>
    </div>
    // </div>
  )
}

export default Menu