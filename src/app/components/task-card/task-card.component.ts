import {Component, inject, input} from '@angular/core';
import {ModalControllerService} from '../../services/modal-controller.service';
import {ITask} from '../../interfaces/task.interface';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {

  private readonly _taskService = inject(TaskService);
  private readonly _modalControllerService = inject(ModalControllerService);
  readonly task = input.required<ITask>();

  openEditTaskModal(){
    const dialogRef = this._modalControllerService.openEditTaskModal({
      name: this.task().name,
      description: this.task().description
    });

    dialogRef.closed.subscribe((taskForm) => {
      console.log('Tarefa editada: ', taskForm);

      if(taskForm){
        this._taskService.updateTaskNameAndDescription(this.task().id, this.task().status,
          taskForm.name, taskForm.description);
      }
    });
  }
}
