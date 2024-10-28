import { Component } from '@angular/core';
import { UserInterface } from '../../../../authentication/interfaces/user.interface';
import { AuthenticationService } from '../../../../authentication/authentication.service';
import { ButtonModule } from 'primeng/button';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { DialogModule } from 'primeng/dialog';
import { TodoAddDialogComponent } from '../todo-add-dialog/todo-add-dialog.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-todo-content',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TodoListComponent,
    DialogModule,
    TodoAddDialogComponent,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './todo-content.component.html',
  styleUrl: './todo-content.component.scss',
})
export class TodoContentComponent {
  visible: boolean = false;
  public user!: UserInterface | null;

  constructor(
    private readonly authService: AuthenticationService,
    private confirmationService: ConfirmationService,
    public router: Router
  ) {}

  toAdd(): void {
    this.router.navigateByUrl('inicio/cadastrar');
  }

  logout(): void {
    this.confirmationService.confirm({
      message: 'Deseja sair?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.authService.logout();
      },
      reject: () => {},
    });
  }

  showAddDialog(): void {
    this.visible = true;
  }
}
