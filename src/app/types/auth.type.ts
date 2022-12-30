export interface LoginInitialValues {
  username: string;
  password: string;
}

export interface LoginResponse {
  _id: string;
  username: string;
  role: string;
  jwt: string;
}

export interface SignUpInitialValues {
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
  passwordWallet: string;
  bankNumber: string;
  bankName: string;
  bankOwn: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
  password_wallet: string;
  phone: string;
  bank_number: string;
  bank_name: string;
  bank_own: string;
}
