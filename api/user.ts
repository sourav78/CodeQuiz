import axios from 'axios';
import { BASE_URL } from '../constants/GlobalConstant';
import { LoginDetailsType } from '../constants/types';

const requestHeader = {
  'Content-Type': 'application/json',
}

export const loginHandler = async (user:LoginDetailsType) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, user, {
    headers: requestHeader
  });
  return response.data;
}