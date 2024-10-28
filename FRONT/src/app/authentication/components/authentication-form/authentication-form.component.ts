import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidateRequired } from '../../../shared/validators/required.validator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-authentication-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CardModule
  ],
  templateUrl: './authentication-form.component.html',
  styleUrl: './authentication-form.component.scss',
})
export class AuthenticationFormComponent {
  constructor(
    private readonly service: AuthenticationService,
    public router: Router
  ) {}

  public hidePassword = true;
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [ValidateRequired]),
    password: new FormControl('', [ValidateRequired]),
  });

  onLoginSubmit(): void {
    this.service.login(this.form.value).subscribe((res) => {
      this.service.saveUser(res.token);
      void this.router.navigateByUrl('inicio');
    });
  }

  toRegister(): void {
    void this.router.navigateByUrl('registro');
  }
}
