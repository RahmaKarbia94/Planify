import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'x-auth-token': token || '', 
        'Authorization': `Bearer ${token}` 
      })
    };
  }

  getTasks(projectId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${projectId}`, this.getHeaders());
  }

  createTask(projectId: string, task: { title: string; description: string; status: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${projectId}`, task, this.getHeaders());
  }
  updateTask(taskId: string, updates: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/tasks/${taskId}`, updates, this.getHeaders());
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/tasks/${taskId}`, this.getHeaders());
  }
}
