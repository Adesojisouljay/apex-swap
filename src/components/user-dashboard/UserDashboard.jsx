import React from "react";
import "./userdasboard.scss"
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../loading/Loading.jsx";
import { DepositModal, WithdrawalModal, TransferModal } from "../modal/Modal";
import Swap from "../trade/Swap";
import { getCryptoPrices } from "../../api/crypto";
import { useSelector } from "react-redux";

const UserDashboard = (props) => {

    const { setShowModal, showModal } = props;

    const [coinData, setCoinData] = useState([]);
    const [copied, setCopied] = useState(false);
    const [isDeposit, setIsDeposit] = useState(false)
    const [isTransfer, setIsTransfer] = useState(false);
    const [isWithdrawal, setIsWithdrawal] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);
    const [isSuccess, setIsuccess] = useState(false)

    const userWallets = useSelector(state =>state.wallet.userWallets);    
    
    useEffect(() => {
      cryptoPrices();
      calBalance();
    },[isSuccess]);

      const cryptoPrices = async () => {
        const prices = await getCryptoPrices()
        setCoinData(prices.cryptoData)
      }
      
      const calBalance = () => {
        const totalSum = userWallets?.reduce((accumulator, currentValue) => {
            const balanceTimesUsdValue = currentValue.balance * currentValue.coinData.usdPrice;
            return accumulator + balanceTimesUsdValue;
          }, 0)
          setTotalBalance(totalSum?.toFixed(2))
      }
    
  return (
    <div className="main">
        <div className="wallet">
          <div className="top">
            <div className="top-container">
                <div className="balance">
                    <h3>Total Balance: ${totalBalance}</h3>
                </div>
                <div className="deposit">
                    <button onClick={()=> {
                      setShowModal(true)
                      setIsDeposit(true)
                      setIsWithdrawal(false)
                      setIsTransfer(false)
                      }}>Deposit</button>
                </div>
                <div className="withdraw">
                    <button onClick={()=> {
                      setShowModal(true);
                      setIsWithdrawal(true)
                      setIsDeposit(false)
                      setIsTransfer(false)
                      }}>Withdraw</button>
                </div>
                <div className="deposit">
                    <button onClick={()=> {
                      setShowModal(true)
                      setIsTransfer(true)
                      setIsDeposit(false)
                      setIsWithdrawal(false)
                      }}>Transfer</button>
                </div>
            </div>
          </div>

          <div className="wallet-container">
            {!coinData ? <Loading/> :<div className="left">
              {userWallets?.map(data => (
              <div className="asset" key={data._id}>
                  <div className="top">                    
                      <div className="token">                   
                          <img src={data.coinData.image}/> 
                          <span>{data.type}</span>
                      </div>
                      <div className="price">                           
                          <span>${data.coinData.usdPrice}</span>
                      </div>
                  </div>
                  <div style={{color: "whitesmoke"}} className="bottom">                    
                      <span>Balance: {data.balance}</span>
                      <span style={{color: data.coinData.percentageChange < 0 ? "red" : "green"}}>
                        {data.coinData.percentageChange}%
                      </span>
                  </div>
              </div>
              ))}            
            </div>}       

            <div className="center">       
              <>
                <Swap setIsuccess={setIsuccess} isSuccess={isSuccess} />
              </>
            </div>
          </div>
    
            {copied && <div className="copied">
                <span>Address copied to clipboard</span>
            </div>}
        </div>
      
            {/* <TransactionHistory /> */}
        {showModal && isWithdrawal &&
          <WithdrawalModal 
          setShowModal={setShowModal} 
          showModal={showModal} 
        />}
        {showModal && isDeposit && 
          <DepositModal 
          setShowModal={setShowModal} 
          showModal={showModal}
          setCopied={setCopied}
          // copy={copy}
          />}
        {showModal && isTransfer && 
          <TransferModal 
          setShowModal={setShowModal} 
          showModal={showModal} 
        />}
    </div>
  )
}

export default UserDashboard;