import { TaskPriorityEnum } from "../enums/TaskPriorityEnum";
import { TaskStatusEnum } from "../enums/TaskStatusEnum";

export interface ITask {
  id: number;
  content: string;
  createdDate: string;
  priority: TaskPriorityEnum;
  status: TaskStatusEnum;
  relatedTagsOrCategories: string[];
}
