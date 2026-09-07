import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/projects';

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

  getProjects(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHeaders());
  }

  createProject(project: { name: string; description: string }): Observable<any> {
    return this.http.post(this.apiUrl, project, this.getHeaders());
  }
  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${projectId}`, this.getHeaders());
  }
}