import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoContentComponent } from './components/todo-content/todo-content.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

const routes: Routes = [
  {
    path: '',
    component: TodoContentComponent,
  },  
  {
    path: 'cadastrar',
    component: TodoFormComponent,
  },
  {
    path: 'editar/:id',
    component: TodoFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TodoItemsRoutingModule {}
