import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';
import { AuthenticationRegisterFormComponent } from './components/authentication-register-form/authentication-register-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationFormComponent,
  },
  {
    path: 'registro',
    component: AuthenticationRegisterFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthenticationRoutingModule {}
