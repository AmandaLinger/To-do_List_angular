import {Component, inject} from '@angular/core';
import {DIALOG_DATA} from '@angular/cdk/dialog';

@Component({
  selector: 'app-task-comments-modal',
  imports: [],
  templateUrl: './task-comments-modal.component.html',
  styleUrl: './task-comments-modal.component.css'
})
export class TaskCommentsModalComponent {

  readonly _task = inject(DIALOG_DATA);

}
