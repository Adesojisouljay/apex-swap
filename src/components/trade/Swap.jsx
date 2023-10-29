import React, { useState } from 'react';
import StepTwo from './StepTwo';
import "./swap.scss"
import StepThree from './StepThree';
import { useSelector } from 'react-redux'

const Swap = (props) => {
  const { setIsuccess, isSuccess } = props;
  const conversionRates = {
    Hive: 0.25, // 1 HIVE = 0.25 USDT
    HBD: 0.98, // 1 HBD = 0.98 USDT
  };

  const [selectedCrypto, setSelectedCrypto] = useState("Hive");
  const [inputAmount, setInputAmount] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [transactionFee, setTransactionFee] = useState(0);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const user = useSelector(state => state.user);

  const transactionFeePercentage = 2; // 2% transaction fee
  const canProceed = usdtAmount !== "" && inputAmount !== "" && selectedCrypto !== "";

  const handleCryptoChange = (e) => {
    setSelectedCrypto(e.target.value);
    // When the cryptocurrency is changed, clear the input fields and reset the transaction fee
    setInputAmount("");
    setUsdtAmount("");
    setTransactionFee(0);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setInputAmount(value);
    // Automatically calculate the equivalent USDT amount as you type
    if (value !== "") {
      calculateUsdtAmount(value);
    } else {
      setUsdtAmount("");
    }
  };

  const handleUsdtChange = (e) => {
    const value = e.target.value;
    setUsdtAmount(value);
    // Automatically calculate the equivalent input amount as you type
    if (value !== "") {
      calculateInputAmount(value);
    } else {
      setInputAmount("");
    }
  };

  const calculateUsdtAmount = (amount) => {
    if (!(selectedCrypto in conversionRates)) {
      return;
    }

    if (amount !== "") {
      const equivalentUsdtAmount = amount * conversionRates[selectedCrypto];
      setUsdtAmount(equivalentUsdtAmount);
    }
    calculateFee(amount);
  };

  const calculateInputAmount = (amount) => {
    if (!(selectedCrypto in conversionRates)) {
      return;
    }

    if (amount !== "") {
      const equivalentInputAmount = amount / conversionRates[selectedCrypto];
      setInputAmount(equivalentInputAmount);
    }
    calculateFee(amount);
  };

  const calculateFee = (amount) => {
    const fee = amount * transactionFeePercentage / 100;
    setTransactionFee(fee)
  }

  const resetForm = () => {
    setInputAmount("");
    setUsdtAmount("");
    setTransactionFee(0);
  };

  return (
    <>
      <div className="swap">
        {step === 1 && (
          <div className='form-wrapper'>
            <div className="swap-header">
              <h4>Swap Coin</h4>
            </div>
            <div className="form-group">
              <form>
                <select onChange={handleCryptoChange} value={selectedCrypto}>
                  <option value="Hive">Hive</option>
                  <option value="HBD">HBD</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter Amount"
                  name="amount"
                  value={inputAmount}
                  onChange={handleAmountChange}
                />
                <label htmlFor="usdt">
                  <strong>USDT</strong>
                </label>
                <input
                  type="text"
                  placeholder="USDT Amount"
                  name="usdt"
                  value={usdtAmount}
                  onChange={handleUsdtChange}
                />
                <p>Transaction Fee: {transactionFee} USDT</p>
                {/* <div className=""> */}
                  <button 
                  disabled={!canProceed}
                  onClick={() => setStep(2)}>
                    Proceed
                  </button>
                  {/* <button 
                  disabled={!canProceed}
                  onClick={() => setStep(2)}>
                    Proceed
                  </button> */}
                {/* </div> */}
              </form>
            </div>
          </div>
        )}
        {step === 2 && (
          <StepTwo
            inputAmount={inputAmount}
            usdtAmount={usdtAmount}
            selectedCrypto={selectedCrypto}
            transactionFee={transactionFee}
            setStep={setStep}
            setError={setError}
            setMsg={setMsg}
            setIsuccess={setIsuccess}
            isSuccess={isSuccess}
            user={user}
          />
        )}
        {step === 3 && (
          //show success or failure
          <StepThree
            setStep={setStep}
            selectedCrypto={selectedCrypto}
            inputAmount={inputAmount}
            error={error}
            msg={msg}
            setInputAmount={setInputAmount}
            setUsdtAmount={setUsdtAmount}
          />
        )}
      </div>
    </>
  );
};

export default Swap;
