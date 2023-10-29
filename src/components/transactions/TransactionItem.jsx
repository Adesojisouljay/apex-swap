import React, {useEffect, useState} from "react";
import { getUsername } from "../../helpers/username";
import { useSelector } from "react-redux";

const TransactionItem = ({ i, type, amount, date, sender, receiver, user, toAsset, amountReceived }) => {
  // console.log(type)
  // const [activeUser, setActiveUser] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sendingUser, setSendingUser] = useState("");

  const activeUser = useSelector(state=> state.user.userData)
  console.log(activeUser)

  useEffect(() => {
    getNames()
  }, [])

  //need to be properly handled to avoid unneccessary reredner
  const getNames = async () => {
    const send = await getUsername(sender)
    const rec = await getUsername(receiver)
    const use = await getUsername(user)

    // setActiveUser(use)
    setRecipient(rec)
    setSendingUser(send)
  }
 
  return (
    <>
        <tr className="transaction-item">
          <td>{i}</td>
          <td>{type}</td>
          <td style={{ color: activeUser.username === sendingUser ? "red" : "green"}}>{activeUser.username === sendingUser ? "-" + amount : "+" + amount}</td>
          <td style={{ color: "green"}}>{ amountReceived ? "+" + amountReceived + toAsset : "---"}</td>
          <td>{date}</td>
          <td>{type === "conversion" ? activeUser.username : sendingUser }</td>
          <td>{type === "conversion" ? activeUser.username : recipient}</td>
        </tr>
    </>
  );
};

export default TransactionItem;
