import { IComment } from "./IComment";
import { ICommunityUser } from "./ICommunityUser";

export interface ICommunity {
  id: number;
  content: string;
  publicationDate: string;
  user: ICommunityUser;
  comments: IComment[];
  likesCount: number;
  userLiked: boolean;
}
