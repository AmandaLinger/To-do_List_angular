import {Component, inject} from '@angular/core';
import {TaskCardComponent} from '../task-card/task-card.component';
import {TaskService} from '../../services/task.service';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ITask} from '../../interfaces/task.interface';
import {AsyncPipe} from '@angular/common';
import {TaskStatus} from '../../types/task.status';
import {TaskStatusEnum} from '../../enums/task-status-enum';

@Component({
  selector: 'app-task-list-section',
  imports: [
    TaskCardComponent,
    CdkDropList,
    CdkDrag,
    AsyncPipe
  ],
  templateUrl: './task-list-section.component.html',
  styleUrl: './task-list-section.component.css'
})
export class TaskListSectionComponent {
    readonly _taskService = inject(TaskService);
    readonly emptyTasks: ITask[] = [];

    onCardDrop(event: CdkDragDrop<ITask[]>) {
      this.moveCardToColumn(event);

      const taskId = event.item.data.id;
      const taskCurrentStatus = event.item.data.status;
      const droppedColumn = event.container.id;


      this.updateTaskStatus(taskId, taskCurrentStatus, droppedColumn);
    }

  private updateTaskStatus(taskId: string, taskCurrentStatus: TaskStatus, droppedColumn: string) {

      let taskNewStatus: TaskStatus;

      switch (droppedColumn) {
        case 'to-do-column':
          taskNewStatus = TaskStatusEnum.TODO;
          break;

        case 'doing-column':
          taskNewStatus = TaskStatusEnum.DOING;
          break;

        case 'done-column':
          taskNewStatus = TaskStatusEnum.DONE;
          break;

        default:
          throw Error('Coluna não identificada.')
      }
  }

  private moveCardToColumn(event: CdkDragDrop<ITask[]>) {
      console.log('Evento de drop: ', event);
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
}
