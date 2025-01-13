
export interface ApiResponse{
  success?: boolean,
  message?: string,
  httpStatus?: string,
  data?: any
}

export interface LoginDetailsType {
  userName: string;
  password: string;
}

export interface RegisterDetailsType {
  userName: string;
  password: string;
  email: string;
}

export interface VerificationDetailsType {
  email: string;
  verificationCode: string;
}

export interface UserInfoDetailsType {
  firstName: string;
  lastName: string;
  bio: string;
  dob: string;
  country: string;
}

export interface ForgotPaaswordDetailsType {
  email: string;
  verificationCode: string;
  password: string;
}