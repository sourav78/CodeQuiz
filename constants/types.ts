
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