import axios from 'axios';
import { getAccessToken } from '../constants/vairables';

const API_BASE_URL = 'http://localhost:8000'; // Replace with your actual API URL
const token = getAccessToken();

export const getCryptoPrices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/crypto-prices`);
    const responseData = response.data; // Extract the response data

    return responseData;
  } catch (error) {
    console.error('Error making API request:', error.message);
    return null;
  }
};

export const getUserWallet = async () => {

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.userId
    const response = await axios.get(`${API_BASE_URL}/api/wallet/${userId}`);
    // console.log(response)
    return response.data.matchingData;
  } catch (error) {
    
  }
}
