export interface User {
  _id: string;
  name: string;
  email: string;
  type: string;
}
export interface AuthState {
  user?: User;
  token?: string;
  loading?: boolean;
}
