import { IUserResponse } from "./IUserResponse";

export interface IAuthenticationResponse {
  refresh_token: string;
  access_token: string;
  user: IUserResponse;
}
