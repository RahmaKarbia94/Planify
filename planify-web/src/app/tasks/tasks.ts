import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  projectId: string = '';
  isModalOpen = false;
  taskForm = { title: '', description: '', status: 'To Do', project: '' };
  searchTerm: string = '';
  statusFilter: string = 'All';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
      this.taskForm.project = this.projectId;
      if (this.projectId) this.loadTasks();
      else this.goBack();
    });
  }

  loadTasks(): void {
    this.taskService.getTasks(this.projectId).subscribe({
      next: (data: any) => this.tasks = data,
      error: (err: any) => console.error(err)
    });
  }

  get filteredTasks(): any[] {
    return this.tasks.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          t.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.statusFilter === 'All' || t.status === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }

  openModal(): void { this.isModalOpen = true; }

  closeModal(): void {
    this.isModalOpen = false;
    this.taskForm = { title: '', description: '', status: 'To Do', project: this.projectId };
  }

  createTask(): void {
    this.taskService.createTask(this.taskForm).subscribe({
      next: (task: any) => {
        this.tasks.push(task);
        this.closeModal();
      },
      error: (err: any) => console.error(err)
    });
  }

  updateStatus(task: any, event: any): void {
    const newStatus = event.target.value;
    this.taskService.updateTaskStatus(task._id, newStatus).subscribe({
      next: (updated: any) => task.status = updated.status,
      error: (err: any) => console.error(err)
    });
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => this.tasks = this.tasks.filter(t => t._id !== taskId),
      error: (err: any) => console.error(err)
    });
  }

  goBack(): void { this.router.navigate(['/dashboard']); }
}