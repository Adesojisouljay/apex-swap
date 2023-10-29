import React, { useEffect, useState } from 'react'
import "./modal.scss"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCopyToClipboard } from "usehooks-ts"
import axios from 'axios';
import { makeTransferRequest } from '../../api/apex';
import { useSelector } from 'react-redux';
import ButtonSpinner from '../loading/Spinner';

export const WithdrawalModal = (props) => {
    const { setShowModal, showModal } = props;
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [selectedToken, setSelectedToken] = useState('hive');
    const [step, setStep] = useState(1);
    const [error, setError] = useState("")

  const handleWithdrawal = () => {
  
    console.log(`Withdrawal amount: ${withdrawalAmount}`);
    
  };

  return (
    <div 
        className={`withdrawal-modal ${showModal ? 'open' : ''}`} 
    >
      <div className="modal-content">
            <span className="close-button" onClick={()=> setShowModal(false)}>
            X
            </span>
            <div className='header'>
                <h2>Withdraw Funds</h2>
            </div>
            <hr/>
        {step === 1 && <>
            <div>Select the token you want to withdraw</div>
            <div className='inputs'>
            <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
            >
                <option value="hive">Hive</option>
                <option value="usdt">USDT</option>
                <option value="hbd">HBD</option>
            </select>
            </div>
            <div className='inputs'>
                <label>Address</label>
                <input
                type="text"
                placeholder="Enter withdrawal address"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                />
            </div>
            <div className='inputs'>
                <label>Amount</label>
                <input
                type="text"
                placeholder="Enter withdrawal amount"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                />
            </div>
            <button onClick={()=> setStep(2)}>Withdraw</button>
        </>}
        {step === 2 && <>
        <div className='confirm'>
            <div>
                <h3>Are you sure?</h3>
            </div>
            <div className="buttons">
                <button onClick={()=> setStep(1)}>Cancel</button>
                <button onClick={()=> setStep(3)}>Confirm</button>
            </div>
        </div>
        </>}
        {step === 3 && <>
        <div className='completed'>
            <div className={error ? "warning" : ""}>
                <h3 style={{color: error ? "red" : ""}}>{!error ? "Congratulations🎉" : "Failed❌"}</h3>
            </div>
           {!error && <span>You transaction has been submitted for proccessing✅</span>}
           {error && <span>You transaction has been aborted, please try again⛔</span>}
            <div className="buttons">
                <button onClick={() => setShowModal(false)}>Okay</button>
            </div>
        </div>
        </>}
      </div>
    </div>
  );
};

export const DepositModal = (props) => {
  const { setShowModal, showModal, setCopied } = props;

  const [value, copy] = useCopyToClipboard();
  const [selectedToken, setSelectedToken] = useState("hive");

  const user = useSelector(state =>state.user);
    const { userWallets } = user.wallet

    // const compressedBtcAddress = `${btcAddress.substring(0, 3)
    // }...${btcAddress.substring(btcAddress.length - 3)}`;

    const compressAddress = (a)=> {
      const res = `${a.substring(0, 10)
    }...${a.substring(a.length - 10)}`
    return res;
    }


  const tokenInfo = {};

  userWallets.forEach((token) => {
    const tokenType = token.type.toLowerCase();
    const tokenAddress = token.address;
    const tokenMemo = token.userMemo;
  
    tokenInfo[tokenType] = {
      address: tokenAddress,
      memo: tokenMemo,
    };
  });

  const selectedTokenInfo = tokenInfo[selectedToken];

  return (
    <div className={`withdrawal-modal ${showModal ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close-button" onClick={() => setShowModal(false)}>
          X
        </span>
        <div className="header">
          <h2>Deposit Funds</h2>
        </div>
        <hr />
        <div>Select the token you want to deposit</div>
        <div className="inputs">
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
          >
            <option value="hive">Hive</option>
            <option value="usdt">USDT</option>
            <option value="hbd">HBD</option>
          </select>
        </div>
        <div className="address-wrapper">
          <p className="warning">
            Please send only {selectedToken} to this address
          </p>
          <div className="address">
            <span>{selectedTokenInfo.address}</span>
            <span
                className="copy-icon"
                onClick={() => {
                setCopied(true);
                copy(selectedTokenInfo.address);
              }}
            >
              {" "}
              <ContentCopyIcon />{" "}
            </span>
          </div>
          <div className="memo">
            <span>Memo: {selectedTokenInfo.memo}</span>
            <span
              className="copy-icon"
              onClick={() => {
              setCopied(true);
              copy(selectedTokenInfo.memo);
            }}
            >
              <ContentCopyIcon />{" "}
            </span>
          </div>
        </div>
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};


export const TransferModal = (props) => {
  const { setShowModal, showModal } = props;

  const [loading, setLoading] = useState('');
  const [recipientUsername, setRecipientUsername] = useState('');
  const [asset, setAsset] = useState('Hive');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const userData = useSelector(state => state.user.userData)

  const canProceed = amount && recipientUsername && asset

  const handleTransfer = async () => {
    try {
      setLoading(true)
      const response = await makeTransferRequest(
        userData.username,
        recipientUsername,
        asset,
        Number(amount),
        memo
        );
        
        if (response.status === 200 && response.data.success) {
        setMsg(response?.data?.message);
        setStep(3);
        setLoading(false)
      } else {
        setError(response.response?.data?.message || response.response?.data?.error);
        setLoading(false)
        setStep(3);
      }
    } catch (error) {
      console.error('Transfer error:', error);
      setLoading(false)
      setStep(3);
      setError(error.response.data.error);
    }
  };  

  return (
    <div className={`withdrawal-modal ${showModal ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close-button" onClick={() => setShowModal(false)}>
          X
        </span>
        <div className='header'>
          <h2>Transfer to apex user</h2>
        </div>
        <hr />
        {step === 1 && (
          <>
            <div className='inputs'>
              <label>Select the token you want to transfer</label>
              <select
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
              >
                <option value="Hive">Hive</option>
                <option value="USDT">USDT</option>
                <option value="HBD">HBD</option>
              </select>
            </div>
            <div className='inputs'>
              <label>Recipient Username</label>
              <input
                type="text"
                placeholder="Enter recipient's username"
                value={recipientUsername}
                onChange={(e) => setRecipientUsername(e.target.value)}
              />
            </div>
            <div className='inputs'>
              <label>Amount</label>
              <input
                type="text"
                placeholder="Enter transfer amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className='inputs'>
              <label>Memo</label>
              <input
                type="text"
                placeholder="Enter memo (optional)"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>
            <button
            disabled={!canProceed}
            onClick={() => setStep(2)}
            >
              Withdraw
            </button>
          </>
        )}
        {step === 2 && (
          <div className='confirm'>
            <div>
              <h3>Are you sure?</h3>
            </div>
            <div className="buttons">
              <button onClick={() => setStep(1)}>Cancel</button>
                <ButtonSpinner 
                isLoading={loading}
                onClick={()=>{
                 handleTransfer()
                 }}
                >
                  Confirm
                </ButtonSpinner>
            </div>
          </div>
        )}
       {step === 3 && (
          <div className='completed'>
            <div className={error ? 'warning' : ''}>
              <h3 style={{ color: error ? 'red' : '' }}>
                {error ? 'Failed❌' : 'Congratulations🎉'}
              </h3>
            </div>
            <span>
              {error
                ? `${error}⛔`
                : `${msg}✅`}
            </span>
            <div className="buttons">
              <button onClick={() => setShowModal(false)}>Okay</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

