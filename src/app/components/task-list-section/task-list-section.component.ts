import {Component, inject} from '@angular/core';
import {TaskCardComponent} from '../task-card/task-card.component';
import {TaskService} from '../../services/task.service';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {ITask} from '../../interfaces/task.interface';
import {AsyncPipe} from '@angular/common';

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
      const taskId = event.item.data.id;
      const taskCurrentStatus = event.item.data.status;
      const droppedColumn = event.container.id;

      this._taskService.updateTaskStatus(
        taskId,
        taskCurrentStatus,
        droppedColumn,
        event.previousIndex,
        event.currentIndex
      );
    }
}
