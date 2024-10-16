export interface AuthState {
  auth: any | null;
  userData: {
    id: string,
    avatar: string;
    name: string,
    phoneNumber: string,
    email: string;
  };
}