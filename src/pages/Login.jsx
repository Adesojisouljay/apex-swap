import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { loginUser } from "../api/apex";
import Cookies from 'js-cookie';
import { getActiveUser } from "../helpers/access-token";
import { setUser } from "../redux/userSlice";
import { setWallet } from "../redux/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import ButtonSpinner from "../components/loading/Spinner";
import { getUserWallet } from "../api/crypto";
import { login } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    try {
      const token = Cookies.get('token');
      if (token) {

        if (token) {
          try {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const tokenExpiration = tokenPayload.exp * 1000;
        
            const currentTimestamp = Date.now();
        
            if (currentTimestamp < tokenExpiration) {
             
              console.log('Token is valid');
            } else {
              console.log('session has expired');
            }
          } catch (error) {
            console.error('Token decoding or parsing error:', error);
          }
        } else {
          console.log('User is not authenticated');
        }

      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      const response = await loginUser(formData.email, formData.password);
      const user = await getActiveUser();
      const wallets = await getUserWallet();
  
      dispatch(login({accessToken: response.token}));
      dispatch(setUser(user));
      dispatch(setWallet(wallets));
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
  
      if (error?.response?.data?.error) {
        setLoginError(error.response.data.error);
      } else {
        setLoginError('An error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login">
      <div className="section">
        <h4>Login</h4>
        <div className="warning">
          <span>{loginError}</span>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          {/* <button onClick={handleLogin}>Login</button> */}
          <ButtonSpinner isLoading={loading} onClick={handleLogin}>
            Login
          </ButtonSpinner>
        </form>
        <div className="new-here">
          <span>
            New here? <Link to="/register">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
