import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./authentication/authentication-routing.module').then(
        (m) => m.AuthenticationRoutingModule
      ),
  },
  {
    path: 'inicio',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/todo-items/todo-items-routing.module').then(
        (m) => m.TodoItemsRoutingModule
      ),
  },
];
