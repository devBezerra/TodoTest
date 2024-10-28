import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:5139/api';

  constructor(private http: HttpClient) {}

  findUserById(id: number): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/Users/${id}`);
  }
}
