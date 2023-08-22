import { RoleEnum } from "../enums/RoleEnum";

export interface IRegisterRequest {
  id: Number;
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  role: RoleEnum;
}
