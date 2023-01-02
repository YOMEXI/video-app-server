export interface Error {
  status?: number;
  message?: string | undefined;
}

export interface SignUp {
  name: string;
  email: string;
  password: string;
}
