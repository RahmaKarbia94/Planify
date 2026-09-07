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
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAnalytics(): Observable<any> {
    return this.http.get('http://localhost:3000/api/projects/analytics', this.getHeaders());
  }

  getProjects(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHeaders());
  }

  createProject(project: any): Observable<any> {
    return this.http.post(this.apiUrl, project, this.getHeaders());
  }

  updateProject(projectId: string, projectData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${projectId}`, projectData, this.getHeaders());
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${projectId}`, this.getHeaders());
  }
}