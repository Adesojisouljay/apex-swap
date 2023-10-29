import React,{ useState, useEffect} from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import CoinChart from '../components/coin-chart/Chart';
import { useSelector } from 'react-redux';
import { WithdrawalModal, DepositModal, TransferModal } from '../components/modal/Modal';
import ("./user-wallet.scss")

const UseraWallet = () => {

    const [totalBalance, setTotalBalance] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isDeposit, setIsDeposit] = useState(false)
    const [isTransfer, setIsTransfer] = useState(false)
    const [isWithdrawal, setIsWithdrawal] = useState(false)
    const [copied, setCopied] = useState(false);

    const userWallets = useSelector(state =>state.wallet.userWallets);
    // const { userWallets } = user.wallet;

    useEffect(() => {
        calBalance()
    },[])

    const calBalance = () => {
        const totalSum = userWallets.reduce((accumulator, currentValue) => {
            const balanceTimesUsdValue = currentValue.balance * currentValue.coinData.usdPrice;
            return accumulator + balanceTimesUsdValue;
          }, 0)
          setTotalBalance(totalSum.toFixed(2))
    }


  return (
    <div className="wallet">
        <div className='test'>
            <div className="wallet-container">
            <div className='asset-wrapper'>
                    <h3> Your Assets</h3>
                    <div className='assets'>
                        {userWallets?.map(a => (
                            <div className="asset-card">
                                <div className="coin-info">
                                    <div className="bal">
                                        <img src={a.coinData.image} alt="" />
                                        <h3>{`${a.balance.toFixed(2)} ${a.type}`}</h3>
                                        <span>value: ${(a.balance * a.coinData.usdPrice).toFixed(2)}</span>
                                    </div>
                                    <div className="info">
                                        <button
                                        onClick={()=>{
                                            setShowModal(true)
                                            setIsDeposit(true)
                                            setIsWithdrawal(false)
                                            setIsTransfer(false)
                                        }}
                                        > <ArrowDownwardIcon/> </button>
                                        <button
                                        onClick={()=> {
                                            setShowModal(true);
                                            setIsWithdrawal(true)
                                            setIsDeposit(false)
                                            setIsTransfer(false)
                                        }}
                                        > <ArrowUpwardIcon/> </button>
                                
                                        <button
                                        onClick={()=> {
                                            setShowModal(true)
                                            setIsTransfer(true)
                                            setIsDeposit(false)
                                            setIsWithdrawal(false)
                                        }}
                                        > <MultipleStopIcon/> </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='summary-wrapper'>
                    <h3>Portfolio</h3>
                    <div className="wallet-summary">
                        <div className="header">
                            <div className="info">
                                <h3>Overall balance: ${totalBalance}</h3>
                            </div>
                        </div>
                    </div>
                    <>
                        <CoinChart userWallets={userWallets}/>
                    </>
                </div>
            </div>
        </div>
        <>
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
        </>
    </div>
  )
}

export default UseraWallet