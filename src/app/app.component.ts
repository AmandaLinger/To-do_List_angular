import {Component, inject} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {MainContentComponent} from './components/main-content/main-content.component';
import {ModalControllerService} from './services/modal-controller.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  //fazendo a injeção de dependências
  private readonly _modalControllerService = inject(ModalControllerService);

  openModal(){
    this._modalControllerService.openTaskCommentsModal();
  }
}
