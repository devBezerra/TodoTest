import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidateRequired } from '../../../shared/validators/required.validator';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-authentication-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CardModule
  ],
  templateUrl: './authentication-register-form.component.html',
  styleUrl: './authentication-register-form.component.scss',
})
export class AuthenticationRegisterFormComponent {
  constructor(
    private readonly service: AuthenticationService,
    public router: Router
  ) {}

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [ValidateRequired]),
    password: new FormControl('', [ValidateRequired]),
    confirmPassword: new FormControl('', [ValidateRequired]),
  });

  onRegisterSubmit(): void {
    this.service.register(this.form.value).subscribe((res) => {
      if (!!res) {
        this.service.login({
          name: this.form.get('name')?.value,
          password: this.form.get('password')?.value,
        }).subscribe((res) => {
          this.service.saveUser(res.token);
          void this.router.navigateByUrl('inicio');
        });
      }
    });
  }

  toLogin(): void {
    void this.router.navigateByUrl('');
  }
}
