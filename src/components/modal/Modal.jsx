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
    // Add logic to handle the withdrawal action here
    // You can access the withdrawalAmount state to get the amount entered by the user
    // Don't forget to validate and perform any necessary actions
    // Once the action is complete, you can call onClose() to close the modal
    // Example: Withdraw funds and then close the modal
    console.log(`Withdrawal amount: ${withdrawalAmount}`);
    // Perform withdrawal logic here...
    
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
    console.log("wallet modal", userWallets)

    // const compressedBtcAddress = `${btcAddress.substring(0, 3)
    // }...${btcAddress.substring(btcAddress.length - 3)}`;

    const compressAddress = (a)=> {
      const res = `${a.substring(0, 10)
    }...${a.substring(a.length - 10)}`
    return res;
    }


  // Define the token info mapping
  const tokenInfo = {};

  // Populate the mapping object
  userWallets.forEach((token) => {
    const tokenType = token.type.toLowerCase();
    const tokenAddress = token.address;
    const tokenMemo = token.userMemo;
  
    // Assign the address and memo to the token type in the mapping object
    tokenInfo[tokenType] = {
      address: tokenAddress,
      memo: tokenMemo,
    };
  });

  // Get the selected token's info
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
        // Transfer was successful
        setMsg(response?.data?.message);
        setStep(3);
        console.log(msg)
        setLoading(false)
      } else {
        console.log(response)
        // Transfer failed, display the error message from the response
        setError(response.response?.data?.message || response.response?.data?.error);
        setLoading(false)
        setStep(3);
      }
    } catch (error) {
      console.error('Transfer error:', error);
      // Handle other errors here
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
              {/* <button onClick={()=>{
                 console.log(amount)
                 console.log(Number(amount))
                handleTransfer()
                }}>Confirm</button> */}
                <ButtonSpinner 
                isLoading={loading}
                onClick={()=>{
                  console.log(amount)
                  console.log(Number(amount))
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

