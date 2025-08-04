export type LoginRequest = {
  email: string;
  password: string;
}

export type LoginResponse = {
  status: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}