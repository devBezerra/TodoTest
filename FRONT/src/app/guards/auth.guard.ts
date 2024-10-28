/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService) {}

  canActivate(): boolean {
    const user = this.authService.user.subscribe();

    if (!user) {
      this.authService.logout();
      return false;
    }

    return true;
  }
}
