import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project';
import { ThemeService } from '../services/theme';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  analytics = { totalProjects: 0, activeTasks: 0, completionRate: 0 };
  isModalOpen = false;
  editingProject: any = null;
  projectForm = { name: '', description: '' };

  constructor(
    private projectService: ProjectService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadAnalytics();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data: any) => this.projects = data,
      error: (err: any) => console.error(err)
    });
  }

  loadAnalytics(): void {
    this.projectService.getAnalytics().subscribe({
      next: (data: any) => this.analytics = data,
      error: (err: any) => console.error(err)
    });
  }

  openModal(project: any = null, event: Event | null = null): void {
    if (event) event.stopPropagation();
    this.isModalOpen = true;
    if (project) {
      this.editingProject = project;
      this.projectForm = { name: project.name, description: project.description };
    } else {
      this.editingProject = null;
      this.projectForm = { name: '', description: '' };
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.editingProject = null;
    this.projectForm = { name: '', description: '' };
  }

  saveProject(): void {
    if (this.editingProject) {
      this.projectService.updateProject(this.editingProject._id, this.projectForm).subscribe({
        next: (updated: any) => {
          const index = this.projects.findIndex(p => p._id === updated._id);
          if (index !== -1) this.projects[index] = updated;
          this.loadAnalytics();
          this.closeModal();
        },
        error: (err: any) => console.error(err)
      });
    } else {
      this.projectService.createProject(this.projectForm).subscribe({
        next: (project: any) => {
          this.projects.push(project);
          this.loadAnalytics();
          this.closeModal();
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  viewProject(projectId: string): void {
    this.router.navigate(['/tasks'], { queryParams: { projectId } });
  }

  deleteProject(projectId: string, event: Event): void {
    event.stopPropagation();
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        this.projects = this.projects.filter(p => p._id !== projectId);
        this.loadAnalytics();
      },
      error: (err: any) => console.error(err)
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }
}