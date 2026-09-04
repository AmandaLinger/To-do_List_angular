import {Injectable} from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {ITask} from '../interfaces/task.interface';
import {ITaskFormControls} from '../interfaces/task-form-controls.interface';
import {TaskStatusEnum} from '../enums/task-status-enum';
import {generateUniqueIdWithTimestamp} from '../utils/generate-unique-id-with-timestamp';
import {TaskStatus} from '../types/task.status';
import {IComment} from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  //tarefas em A fazer
  private todoTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly todoTasks = this.todoTasks$.asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  //tarefas em andamento

  private doingTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doingTasks = this.doingTasks$.asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  //tarefas concluídas

  private doneTasks$ = new BehaviorSubject<ITask[]>([]);
  readonly doneTasks = this.doneTasks$.asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  addTask(taskInfos: ITaskFormControls) {
    const newTask: ITask = {
      ...taskInfos,
      status: TaskStatusEnum.TODO,
      id: generateUniqueIdWithTimestamp(),
      comments: [],
    };

    const currentList = this.todoTasks$.value;

    this.todoTasks$.next([
      ...currentList,
      newTask
    ]);
  }

  updateTaskStatus(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    droppedColumn: string,
    previousIndex: number,
    currentIndex: number
  ) {
    const taskNewStatus = this.getStatusByColumn(droppedColumn);
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const taskIndex = currentTaskList.value.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return;
    }

    if (taskCurrentStatus === taskNewStatus) {
      const reorderedTasks = [...currentTaskList.value];
      const [task] = reorderedTasks.splice(previousIndex, 1);
      reorderedTasks.splice(currentIndex, 0, task);
      currentTaskList.next(reorderedTasks);
      return;
    }

    const destinationTaskList = this.getTaskListByStatus(taskNewStatus);
    const sourceTasks = [...currentTaskList.value];
    const [task] = sourceTasks.splice(taskIndex, 1);
    const destinationTasks = [...destinationTaskList.value];

    destinationTasks.splice(currentIndex, 0, {...task, status: taskNewStatus});
    currentTaskList.next(sourceTasks);
    destinationTaskList.next(destinationTasks);
  }

  updateTaskNameAndDescription(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    newTaskName: string,
    newTaskDescription: string){

    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const currentTaskIndex = currentTaskList.value.findIndex((task) => task.id === taskId);

    if(currentTaskIndex > -1){
      const updatedTaskList = [...currentTaskList.value];

      updatedTaskList[currentTaskIndex] = {
        ...updatedTaskList[currentTaskIndex],
        name: newTaskName,
        description: newTaskDescription
      };

      currentTaskList.next(updatedTaskList);
    }
  }

  private getTaskListByStatus(taskStatus: TaskStatus): BehaviorSubject<ITask[]> {
    switch (taskStatus) {
      case TaskStatusEnum.TODO:
        return this.todoTasks$;
      case TaskStatusEnum.DOING:
        return this.doingTasks$;
      case TaskStatusEnum.DONE:
        return this.doneTasks$;
      default:
        throw Error('Status da tarefa não identificado.')
    }
  }

  private getStatusByColumn(columnId: string): TaskStatus {
    switch (columnId) {
      case 'to-do-column':
        return TaskStatusEnum.TODO;
      case 'doing-column':
        return TaskStatusEnum.DOING;
      case 'done-column':
        return TaskStatusEnum.DONE;
      default:
        throw Error('Coluna não identificada.');
    }
  }

  updateTaskComments(taskId: string, taskCurrentStatus: TaskStatus, newTaskComments: IComment[]) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);

    const currentTaskIndex = currentTaskList.value.findIndex((task) => task.id === taskId);

    if (currentTaskIndex > -1) {
      const updatedTaskList = [...currentTaskList.value];

      updatedTaskList[currentTaskIndex] = {
        ...updatedTaskList[currentTaskIndex],
        comments: [...newTaskComments]
      };

      currentTaskList.next(updatedTaskList);
    }
  }

  carregarListaAtualDeTodos(){
    console.log("Lista atual To-Do: ", this.todoTasks$.value);
  }
}
