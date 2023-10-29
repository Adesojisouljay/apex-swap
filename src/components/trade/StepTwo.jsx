import React, { useState} from 'react'
import "./step-two.scss"
import { convert } from '../../api/apex'
import ButtonSpinner from '../loading/Spinner'


const StepTwo = (props) => {
    const {usdtAmount, inputAmount, selectedCrypto, transactionFee, setStep, setError, setMsg, isSuccess, setIsuccess, user} = props;

    const [loading, setLoading] = useState(false);

    const handleConversion = async () => {
      try {
        setLoading(true)
        const resp = await convert(user.userData.username, selectedCrypto, "USDT", inputAmount);

        if (resp?.status === 200) {
          setMsg(resp?.data?.message);
          setIsuccess(true)
          setLoading(false)
          setStep(3)
        } else {
          setError(resp?.response?.data?.error)
          setStep(3)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }

  return (
    <div className='step-two-main'>
    <div className="step-two">
        <h3>You are paying {inputAmount} {selectedCrypto} for {usdtAmount} USDT </h3>
        <spam>You will be charged {transactionFee}USDT</spam>
        <div className="buttons">
            <button type="button" 
            onClick={() => setStep(1)}
            >
                Back
            </button>
            {/* <button onClick={()=> handleConversion()}> Proceed </button> */}
            <ButtonSpinner isLoading={loading} onClick={()=> handleConversion()}>
              Confirm
            </ButtonSpinner>
        </div>
    </div>
    </div>
  )
}

export default StepTwo;