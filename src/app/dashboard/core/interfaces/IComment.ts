import { ICommentUser } from "./ICommentUser";

export interface IComment {
  id: number;
  content: string;
  commentDate: string;
  user: ICommentUser;
}
