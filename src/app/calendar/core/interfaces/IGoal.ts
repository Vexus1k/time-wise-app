import { GoalStatusEnum } from "../enums/GoalStatusEnum";
import { IProgress } from "./IProgress";

export interface IGoal {
  id: number;
  content: string;
  createdDate: string;
  progressList?: IProgress[];
  deadline: string;
  status: GoalStatusEnum;
}
