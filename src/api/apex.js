import axios from 'axios';
import Cookies from 'js-cookie';
import { getAccessToken } from '../constants/vairables';

const API_BASE_URL = 'http://localhost:8000';
const token = getAccessToken()

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, userData);
    return response.data.message;
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
        Cookies.set('token', token);
    return response.data;
    } catch (error) {
    throw error;
    }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/profile/${userId}`);
    return response.data;
  } catch (error) {
  }
};

export const updateUserProfile = async (userId, updatedProfile) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const response = await axios.post(`${API_BASE_URL}/api/profile/${userId}`, updatedProfile, {headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const makeTransferRequest = async (senderUsername, recipientUsername, asset, amount, memo) => {
  try {
    const transferData = {
      senderUsername,
      recipientUsername,
      asset,
      amount,
      memo,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    };

    const response = await axios.post(`${API_BASE_URL}/api/transfer`, transferData, { headers });
    return response;

  } catch (error) {

    return error;
  }
};

export const convert = async (username, fromAsset, toAsset, amount) => {
  try {
    const requestData = {
      username,
      fromAsset,
      toAsset,
      amount,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const response = await axios.post(`${API_BASE_URL}/api/transaction/convert`, requestData, { headers });

    return response
  } catch (error) {
    return error
  }
};

export const fetchTransactionHistory = async (username) => {
  try {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending password reset token:', error);
    throw error;
  }
};

export const resetPassword = async (email, rtoken, newPassword) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

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
