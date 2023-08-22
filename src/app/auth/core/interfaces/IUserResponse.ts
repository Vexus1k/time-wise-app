import { RoleEnum } from "../enums/RoleEnum";

export interface IUserResponse {
  id: number;
  firstName: String;
  lastName: String;
  email: String;
  phoneNumber: string;
  role: RoleEnum;
  activated: boolean;
}
