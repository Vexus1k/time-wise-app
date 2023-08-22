import { ISharingUser } from "./ISharingUser";
import { IComment } from "./IComment";

export interface ISharingCommunity {
  id: number;
  user: ISharingUser;
  content: string;
  publicationDate: string;
  comments: IComment[];
  userLiked: boolean;
  likesCount: number;
}
