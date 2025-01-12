import axios from 'axios';
import { BASE_URL } from '../constants/GlobalConstant';
import { LoginDetailsType, RegisterDetailsType } from '../constants/types';

const requestHeader = {
  'Content-Type': 'application/json',
}

export const loginHandler = async (user:LoginDetailsType) => {
  const response = await axios.post(`${BASE_URL}/api/auth/login`, user, {
    headers: requestHeader
  });
  return response.data;
}

export const registerHandler = async (registerUser:RegisterDetailsType) => {
  const response = await axios.post(`${BASE_URL}/api/auth/register`, registerUser, {
    headers: requestHeader
  });
  return response.data;
}