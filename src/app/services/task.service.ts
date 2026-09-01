import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ITask} from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  //tarefas em A fazer
  private todoTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly todoTasks = this.todoTasks$.asObservable();

  //tarefas em andamento

  private doingTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doingTasks = this.todoTasks$.asObservable();

  //tarefas concluídas

  private doneTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doneTasks = this.todoTasks$.asObservable();
}
