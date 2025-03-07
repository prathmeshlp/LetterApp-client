export interface User {
  _id: string;
  googleId: string;
  displayName: string;
  email: string;
  photo?: string;
  refreshToken?: string;
  createdAt: string;
}