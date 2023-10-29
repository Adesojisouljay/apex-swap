import React, { useState } from "react";
import { sendPasswordResetToken, resetPassword } from "../../api/apex";
import { useSelector } from "react-redux";
import ("./password-reset.scss");

export const ResetPasswordForm = () => {
  // State to store form input values
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState("1")

  const userData = useSelector(state => state.user.userData)

  // State to handle success or error messages
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("newPassword", newPassword, "token", token, "confirmPassword", confirmPassword)
    
    // Check if password and confirmPassword match
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match");
      setTimeout(() =>{
        setResetError("")
      }, 3000);
      return;
    }

    try {
      const res = await resetPassword(userData.email, token, newPassword );

      if (res.success) {
        setResetSuccess(true);
        setStep("success")
      } else {
        setStep("fail")
      }
     console.log(res)

    } catch (error) {
      // Handle any errors that occur during the password reset
      console.error("Error resetting password:", error);
      setResetError(error.response.data.error);
      setTimeout(() =>{
        setResetError("")
      }, 3000)
    }
  };

  const sendRestToken = async () => {
    try {
      const token = await sendPasswordResetToken(userData.email)
      console.log(token)
      setStep("2")
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="reset-password">
      <div className="header">
        <h1>Account Security</h1>
        <h3>Reset Password</h3>
      </div>
      {resetError && <p className="error">{resetError}</p>}
      {step === "2" ? 
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Reset token</label>
          <input
            type="text"
            id="token"
            placeholder="Enter your 6 digit token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
        </div>
        <div className="buttons">
        <button
        className="cancel" 
        onClick={() => {
          setStep(1)
          }}>Cancel</button>
        <button type="submit">Reset Password</button>
        </div>
      </form> : step === "1" ?
      <div className="toggle-reset">
        <button onClick={()=> sendRestToken()}>Reset</button>
      </div> : step === "success" ? 
      <div className="status">
        <h3>Password rest successful</h3>
        <button onClick={()=> setStep("1")}>Finish</button>
      </div> : step === "fail" ?
      <di className="buttons">
        <h3>We are sorry something went wrong</h3>
        <button>Return</button>
      </di> : <></>
      }
    </div>
  );
};
