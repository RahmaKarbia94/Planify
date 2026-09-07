import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  showModal = false;
  newProject = { name: '', description: '' };

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data: any) => this.projects = data,
      error: (err: any) => console.error('Error loading projects', err)
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newProject = { name: '', description: '' };
  }

  createProject(): void {
    this.projectService.createProject(this.newProject).subscribe({
      next: (res: any) => {
        this.projects.push(res);
        this.closeModal();
      },
      error: (err: any) => console.error('Error creating project', err)
    });
  }

  viewProject(projectId: string): void {
    this.router.navigate(['/tasks'], { queryParams: { projectId } });
  }
  deleteProject(projectId: string, event: Event): void {
    event.stopPropagation();
    this.projectService.deleteProject(projectId).subscribe({
      next: () => this.projects = this.projects.filter(p => p._id !== projectId),
      error: (err: any) => console.error(err)
    });
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }
}