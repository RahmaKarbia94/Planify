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
  projectId: string = '';
  tasks: any[] = [];
  showModal = false;
  newTask = { title: '', description: '', status: 'To Do' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
      if (this.projectId) {
        this.loadTasks();
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  loadTasks(): void {
    this.taskService.getTasks(this.projectId).subscribe({
      next: (data: any) => this.tasks = data,
      error: (err: any) => console.error('Error loading tasks', err)
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newTask = { title: '', description: '', status: 'To Do' };
  }

  createTask(): void {
    this.taskService.createTask(this.projectId, this.newTask).subscribe({
      next: (res: any) => {
        this.tasks.push(res);
        this.closeModal();
      },
      error: (err: any) => console.error('Error creating task', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
  updateStatus(task: any, newStatus: string): void {
    this.taskService.updateTask(task._id, { status: newStatus }).subscribe({
      next: (updated) => task.status = updated.status,
      error: (err) => console.error(err)
    });
  }

  deleteTask(taskId: string, event: Event): void {
    event.stopPropagation();
    this.taskService.deleteTask(taskId).subscribe({
      next: () => this.tasks = this.tasks.filter(t => t._id !== taskId),
      error: (err) => console.error(err)
    });
  }
}