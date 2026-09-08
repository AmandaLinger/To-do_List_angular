import {Component, inject} from '@angular/core';
import {HeaderComponent} from './core/layout/header/header.component';
import {MainContentComponent} from './features/tasks/components/main-content/main-content.component';
import {ModalControllerService} from './core/services/modal-controller.service';
import {ITask} from './domain/tasks/interfaces/task.interface';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  //fazendo a injeção de dependências
  private readonly _modalControllerService = inject(ModalControllerService);

  openModal(task: ITask) {
    this._modalControllerService.openTaskCommentsModal(task);
  }
}
