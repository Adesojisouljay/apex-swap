import Cookies from 'js-cookie';
import { getUserProfile } from '../api/apex';

const accessToken = Cookies.get('token'); // Get the access token from cookies

export const isAccessTokenExpired = () => {
  if (accessToken) {
    const tokenParts = accessToken.split('.');
    if (tokenParts.length === 3) {
      try {
        const payload = JSON.parse(atob(tokenParts[1]));
        const currentTime = Date.now() / 1000; // Convert to seconds
        return payload.exp < currentTime; // Check if token is expired
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }
  return true; // No valid token found or an error occurred, consider it expired
};

export const getActiveUser = async () => {
  const tokenParts = accessToken?.split('.');
  
  try {
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    const userId = payload.userId;

    if (!userId) {
      throw new Error('User ID not found in token payload');
    }

    const user = await getUserProfile(userId);

    if (!user) {
      throw new Error('User profile not found');
    }

    return user;
  } catch (error) {
    console.error('Error fetching active user:', error);
    return null; // Return null or handle the error appropriately
  }
};


