import {IComment} from './comment.interface';
import {TaskStatus} from '../types/task.status';

export interface ITask {
  id: string;
  name: string;
  description: string;
  comments: IComment[];
  status: TaskStatus;
}
