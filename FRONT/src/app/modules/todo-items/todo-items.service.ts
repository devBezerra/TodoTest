import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {
  private apiUrl = 'http://localhost:5139/api';

  constructor(private http: HttpClient) {}

  findAllByUserId(page?: number, rows?:number): Observable<any>{
    const pageNumber = page || 1;
    const pageSize = rows || 10;
    return this.http.get<any[]>(`${this.apiUrl}/TodoItems?pageNumber=${pageNumber}&&pageSize=${pageSize}`);
  }

  create(todoItem: any): Observable<any> {
    return this.http.post<any[]>(`${this.apiUrl}/TodoItems`, todoItem)
  }

  findById(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/TodoItems/${id}`)
  }

  update(todoItem: any, id:number): Observable<any> {
    return this.http.put<any[]>(`${this.apiUrl}/TodoItems/${id}`, todoItem)
  }

  delete(id:number): Observable<any> {
    return this.http.delete<any[]>(`${this.apiUrl}/TodoItems/${id}`)
  }
}
