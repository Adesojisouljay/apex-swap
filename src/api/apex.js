import axios from 'axios';
import Cookies from 'js-cookie';
import { getAccessToken } from '../constants/vairables';

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:8000'; // Replace with your actual API URL
const token = getAccessToken()

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, userData);
    return response.data.message; // Registration success message
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
    try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
    });
    const token = response.data.token
    console.log("response", response)
        Cookies.set('token', token);
    return response.data; // The response from the server, which may include a token or user data
    } catch (error) {
    throw error; // If there's an error, throw it for the component to handle
    }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/profile/${userId}`);
    return response.data; // The user's profile data
  } catch (error) {
    // throw error; // If there's an error, throw it for the component to handle
  }
};

export const updateUserProfile = async (userId, updatedProfile) => {
  console.log(token)
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Assuming you're using Bearer token
    };

    const response = await axios.post(`${API_BASE_URL}/api/profile/${userId}`, updatedProfile, {headers});
    return response.data; // The response from the server, which may include a success message
  } catch (error) {
    throw error; // If there's an error, throw it for the component to handle
  }
};

export const makeTransferRequest = async (senderUsername, recipientUsername, asset, amount, memo) => {
  console.log(token)
  try {
    // Define the transfer data
    const transferData = {
      senderUsername,
      recipientUsername,
      asset,
      amount,
      memo,
    };

    // Define headers with the access token and Content-Type
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Assuming you're using Bearer token
    };

    // Make a POST request to the transfer endpoint with the headers
    const response = await axios.post(`${API_BASE_URL}/api/transfer`, transferData, { headers });
    console.log(response)
    return response;

  } catch (error) {
    // Handle the error and return an error message
    // console.error('Transfer error:', error);
    return error;
  }
};

export const convert = async (username, fromAsset, toAsset, amount) => {
  try {
    // Define the request data
    const requestData = {
      username,
      fromAsset,
      toAsset,
      amount,
    };
    console.log(token)

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Assuming you're using Bearer token
    };

    // Make a POST request to the convertAssets endpoint
    const response = await axios.post(`${API_BASE_URL}/api/transaction/convert`, requestData, { headers });

    return response
  } catch (error) {
    // Handle the error and return an error message
    return error
  }
};

// Function to fetch transaction history
export const fetchTransactionHistory = async (username) => {
  try {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Assuming you're using Bearer token
    };
    // Make a GET request to the endpoint with the username as a parameter
    const response = await axios.get(`${API_BASE_URL}/api/transaction/${username}`, {headers});
    return response;

   
  } catch (error) {
    console.error('Error:', error);
  }
};

export const sendPasswordResetToken = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    // if (!response.ok) {
    //   const data = await response.json();
    //   throw new Error(data.error || 'Password reset request failed');
    // }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error sending password reset token:', error);
    throw error;
  }
};

export const resetPassword = async (email, rtoken, newPassword) => {
  console.log(token)
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Assuming you're using Bearer token
    };
    console.log(headers)

    const response = await axios.post(`${API_BASE_URL}/api/confirm-password`, {
      email,
      rtoken,
      newPassword,
    },
    {headers}
    );

    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
