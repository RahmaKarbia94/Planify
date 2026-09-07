import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
register(credentials: { fullName: string; email: string; password: string }) {
  return this.http.post('http://localhost:3000/api/auth/register', credentials);
}
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
