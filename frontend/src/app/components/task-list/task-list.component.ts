import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskItem } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  filteredTasks: TaskItem[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  filterStatus: 'all' | 'pending' | 'completed' = 'all';
  searchQuery = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
  }

  toggleComplete(task: TaskItem): void {
    const dto = {
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted,
      dueDate: task.dueDate,
    };
    this.taskService.updateTask(task.id, dto).subscribe({
      next: (updated) => {
        const idx = this.tasks.findIndex((t) => t.id === task.id);
        if (idx !== -1) this.tasks[idx] = updated;
        this.applyFilters();
        this.showSuccess(updated.isCompleted ? 'Task marked as completed!' : 'Task marked as pending!');
      },
      error: (err) => (this.errorMessage = err.message),
    });
  }

  deleteTask(task: TaskItem): void {
    if (!confirm(`Delete "${task.title}"? This action cannot be undone.`)) return;
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        this.applyFilters();
        this.showSuccess('Task deleted successfully!');
      },
      error: (err) => (this.errorMessage = err.message),
    });
  }

  applyFilters(): void {
    let result = [...this.tasks];

    if (this.filterStatus === 'pending') result = result.filter((t) => !t.isCompleted);
    else if (this.filterStatus === 'completed') result = result.filter((t) => t.isCompleted);

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(
        (t) => t.title.toLowerCase().includes(q) || (t.description ?? '').toLowerCase().includes(q)
      );
    }

    this.filteredTasks = result;
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  setStatusFilter(status: 'all' | 'pending' | 'completed'): void {
    this.filterStatus = status;
    this.applyFilters();
  }

  get totalCount(): number { return this.tasks.length; }
  get completedCount(): number { return this.tasks.filter((t) => t.isCompleted).length; }
  get pendingCount(): number { return this.tasks.filter((t) => !t.isCompleted).length; }

  formatDate(date?: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  isOverdue(task: TaskItem): boolean {
    if (!task.dueDate || task.isCompleted) return false;
    return new Date(task.dueDate) < new Date();
  }

  private showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => (this.successMessage = ''), 3000);
  }
}
