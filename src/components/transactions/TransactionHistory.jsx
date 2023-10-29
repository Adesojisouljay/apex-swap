import React, { useEffect, useState } from "react";
import "./transaction.scss";
import TransactionItem from "./TransactionItem";
import { fetchTransactionHistory } from "../../api/apex";
import { formatDate } from "../../helpers/dateFomertter";
import Loading from "../loading/Loading";
import { useSelector } from "react-redux";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [loading, setLoading] = useState(false)

  const userData = useSelector(state => state.user.userData)

  useEffect(() => {
    getHistory();
  }, [currentPage]);

  const getHistory = async () => {
    try {
      setLoading(true)
      const transaction = await fetchTransactionHistory(userData.username);
      if (transaction?.data?.accountHistory){
        setTransactions(transaction?.data?.accountHistory);
        setLoading(false)
      }
      
    } catch (error) {
      
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions?.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <div className="transaction">
      {loading ? <Loading /> : <div className="transaction-history">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Received</th>
              <th>Date</th>
              <th>Sender</th>
              <th>Beneficiary</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions?.map((transaction, i) => (
              <TransactionItem
                key={transaction?._id}
                i={i + 1 + (currentPage - 1) * transactionsPerPage}
                type={transaction.type}
                amount={transaction.amount || transaction.amountConverted}
                date={formatDate(transaction.timestamp)}
                sender={transaction.sender}
                receiver={transaction?.recipient}
                user={transaction?.user}
                toAsset={transaction?.toAsset}
                amountReceived={transaction?.amountReceived?.toFixed(2)}
              />
            ))}
          </tbody>
        </table>
        {/* Pagination controls */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              indexOfLastTransaction >= transactions?.length
            }
          >
            Next
          </button>
        </div>
      </div>}
    </div>
  );
};

export default TransactionHistory;
