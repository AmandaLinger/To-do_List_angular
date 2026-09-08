import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {IComment} from '../../../../domain/tasks/interfaces/comment.interface';
import {generateUniqueIdWithTimestamp} from '../../../../shared/utils/generate-unique-id-with-timestamp';
import {ITask} from '../../../../domain/tasks/interfaces/task.interface';

@Component({
  selector: 'app-task-comments-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-comments-modal.component.html',
  styleUrl: './task-comments-modal.component.css'
})
export class TaskCommentsModalComponent {
  taskCommentsChanged = false;
  commentControl = new FormControl('', [Validators.required]);

  @ViewChild('commentInput') commentInputRef!: ElementRef<HTMLInputElement>;

  readonly _task : ITask = inject(DIALOG_DATA);
  readonly _dialogRef: DialogRef<boolean> = inject(DialogRef);

  onAddComment(){
    console.log('Comentário: ', this.commentControl.value);

    //cria um novo comentário
    const newComment : IComment = {
      id : generateUniqueIdWithTimestamp(),
      description: this.commentControl.value ? this.commentControl.value : ''
    };

    //adiciona um novo comentário na lista de comentários da tarefa
    this._task.comments.unshift(newComment);

    //reset no form control
    this.commentControl.reset();

    //atualiza a flag/prop se houve alteração nos comentários
    this.taskCommentsChanged = true;

    //focando no elemento de input
    this.commentInputRef.nativeElement.focus();
  }

  onCloseModal(){
    this._dialogRef.close(this.taskCommentsChanged);
  }

  onRemoveComments(commentId : string){
    this._task.comments = this._task.comments.filter( (comment) => {
      return comment.id !== commentId
    });

    this.taskCommentsChanged = true;
  }
}
