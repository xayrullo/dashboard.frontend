export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "female" | "male" | "other";
  image: string;
}

export interface IRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "female" | "male" | "other";
  image: string;
}
