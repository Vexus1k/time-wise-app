import { ISharingUser } from "./ISharingUser";
import { ISharingCommunity } from "./ISharingCommunity";

export interface ISharing {
  id: number;
  user: ISharingUser;
  sharedPost: ISharingCommunity;
  sharingDate: string;
}
