import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtServiceUtil } from '../shared/utils/jwt.util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:5139/api';
  bearer: BehaviorSubject<any> = new BehaviorSubject(null);
  user: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient, public router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any[]>(`${this.apiUrl}/Auth/login`, credentials);
  }

  register(credentials: any): Observable<any> {
    return this.http.post<any[]>(`${this.apiUrl}/Auth/register`, credentials);
  }

  saveUser(jwt: string): boolean | unknown {
    try {
      const jwtDecoded = JwtServiceUtil.getDecodedAccessToken(jwt);
      if (!jwtDecoded) {
        throw new Error();
      }

      const user = { id: jwtDecoded.id, name: jwtDecoded.username };

      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('access_token', jwt);

      this.user.next(user);
      this.bearer.next(jwt);
      return true;
    } catch (error) {
      return error;
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.user.next(null);
    void this.router.navigate(['/']);
  }
}
