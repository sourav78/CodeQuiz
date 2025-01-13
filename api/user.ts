import axios from 'axios';
import { BASE_URL } from '../constants/GlobalConstant';
import { ForgotPaaswordDetailsType, LoginDetailsType, RegisterDetailsType, UserInfoDetailsType, VerificationDetailsType } from '../constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const requestHeader = {
  'Content-Type': 'application/json',
}

// Function to get headers with token
const getRequestHeaderWithToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

//Login
export const loginHandler = async (user:LoginDetailsType) => {
  const response = await axios.post(`${BASE_URL}/api/auth/login`, user, {
    headers: requestHeader
  });
  return response.data;
}

//Register
export const registerHandler = async (registerUser:RegisterDetailsType) => {
  const response = await axios.post(`${BASE_URL}/api/auth/register`, registerUser, {
    headers: requestHeader
  });
  return response.data;
}

//Verify OTP
export const optVerificationHandler = async (otpDetails:VerificationDetailsType) => {
  const response = await axios.post(`${BASE_URL}/api/auth/verify`, otpDetails, {
    headers: requestHeader
  });
  return response.data;
}

//Resend OTP
export const resendOtpHandler = async (email:string) => {
  const response = await axios.get(`${BASE_URL}/api/auth/resend-verification?email=${email}`, {
    headers: requestHeader
  });
  return response.data;
}

//Resend OTP
export const forgotPasswordOtpHandler = async (email:string) => {
  const response = await axios.get(`${BASE_URL}/api/auth/password-verify?email=${email}`, {
    headers: requestHeader
  });
  return response.data;
}

//Verify OTP
export const onboardingHandler = async (userInfo:UserInfoDetailsType) => {
  const response = await axios.post(`${BASE_URL}/api/user/info`, userInfo, {
    headers: await getRequestHeaderWithToken()
  });
  return response.data;
}

//Verify OTP
export const forgotPasswordHandler = async (passwordDetails:ForgotPaaswordDetailsType) => {
  const response = await axios.post(`${BASE_URL}/api/auth/forgot-password`, passwordDetails, {
    headers: requestHeader
  });
  return response.data;
}
