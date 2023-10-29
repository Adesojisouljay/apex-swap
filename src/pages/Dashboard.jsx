import React, { useState, useEffect } from "react";
import UserDashboard from "../components/user-dashboard/UserDashboard"
import "./dashboard.scss"
import { useDispatch } from "react-redux";
import { getUserWallet } from '../api/crypto'
import { setWallet } from "../redux/walletSlice";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=> {
    // getWallet();
  },[]);

  const getWallet = async () => {
    const wallets  = await getUserWallet();
    dispatch(setWallet(wallets))
}

  return (
    <>
      <UserDashboard 
      showModal={showModal}
      setShowModal={setShowModal}
      />        
    </>
  )
}

export default DashBoard;