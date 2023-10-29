import React, { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '../api/apex'; 
import ButtonSpinner from "../components/loading/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const message = await registerUser(formData);
      console.log('Registration successful:', message);
      navigate("/login")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register">
      <div className="section">
        <h4>Register</h4>
        <form>
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          {/* <button onClick={handleSubmit}>Register</button> */}
          <ButtonSpinner isLoading={loading} onClick={handleSubmit}>
            Register
          </ButtonSpinner>
        </form>
        <div className="new-here">
          <span>Already have an account? <Link to={`/login`}>Login</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Register;
