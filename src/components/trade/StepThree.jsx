import React, { useState } from 'react'
import "./step-three.scss"

const StepThree = (props) => {
    const { setStep, msg, error, setInputAmount, setUsdtAmount} = props;

    const returnHome = () =>{
        setInputAmount("")
        setUsdtAmount("")
        setStep(1)
    }

  return (
    <div className='step-three-main'>
    { !error ? <div className="step-three">
        <h3 className='success'>Congratulations🎉</h3>
        <span>{msg}✅</span>
        <div className="buttons">
            <button onClick={() => returnHome()} > Return </button>
        </div>
    </div> : <div className="step-three">
        <h3 className='failed'>Failed❌</h3>
        <span>{error}⛔</span>
        <div className="buttons">
            <button onClick={() => returnHome()} > Return </button>
        </div>
    </div>}
    </div>
  )
}

export default StepThree;