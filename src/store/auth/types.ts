export interface AuthState {
  auth: any | null;
  userData: {
    id: string,
    image: string;
    name: string,
    phoneNumber: string,
    email: string;
    address: string,
    bio: string,
  };
}