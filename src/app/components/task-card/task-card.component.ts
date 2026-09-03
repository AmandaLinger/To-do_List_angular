import {Component, inject, input} from '@angular/core';
import {ModalControllerService} from '../../services/modal-controller.service';
import {ITask} from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  private readonly _modalControllerService = inject(ModalControllerService);
  readonly task = input.required<ITask>();

  openEditTaskModal(){
    const dialogRef = this._modalControllerService.openEditTaskModal({
      name: this.task().name,
      description: this.task().description
    });

    dialogRef.closed.subscribe((taskForm) => {
      console.log('Tarefa editada: ', taskForm);
    });
  }
}
