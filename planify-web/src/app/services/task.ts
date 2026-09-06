import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasksByProject(projectId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/project/${projectId}`);
  }

  createTask(taskData: any): Observable<any> {
    return this.http.post(this.apiUrl, taskData);
  }

  updateTaskStatus(taskId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${taskId}`, { status });
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`);
  }
}