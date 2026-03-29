import { Component, OnInit, signal, computed } from '@angular/core';
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
  // Signals for reactivity
  tasks = signal<TaskItem[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');
  
  filterStatus = signal<'all' | 'pending' | 'completed'>('all');
  searchQuery = signal<string>('');

  // Computed signal for the filtered list — updates automatically!
  filteredTasks = computed(() => {
    let result = [...this.tasks()];
    const status = this.filterStatus();
    const query = this.searchQuery().toLowerCase().trim();

    if (status === 'pending') result = result.filter(t => !t.isCompleted);
    else if (status === 'completed') result = result.filter(t => t.isCompleted);

    if (query) {
      result = result.filter(t => 
        t.title.toLowerCase().includes(query) || 
        (t.description ?? '').toLowerCase().includes(query)
      );
    }
    return result;
  });

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.isLoading.set(false);
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
        this.tasks.update(prev => prev.map(t => t.id === task.id ? updated : t));
        this.showSuccess(updated.isCompleted ? 'Task marked as completed!' : 'Task marked as pending!');
      },
      error: (err) => this.errorMessage.set(err.message),
    });
  }

  deleteTask(task: TaskItem): void {
    if (!confirm(`Delete "${task.title}"? This action cannot be undone.`)) return;
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks.update(prev => prev.filter(t => t.id !== task.id));
        this.showSuccess('Task deleted successfully!');
      },
      error: (err) => this.errorMessage.set(err.message),
    });
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  setStatusFilter(status: 'all' | 'pending' | 'completed'): void {
    this.filterStatus.set(status);
  }

  get totalCount(): number { return this.tasks().length; }
  get completedCount(): number { return this.tasks().filter(t => t.isCompleted).length; }
  get pendingCount(): number { return this.tasks().filter(t => !t.isCompleted).length; }

  formatDate(date?: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  isOverdue(task: TaskItem): boolean {
    if (!task.dueDate || task.isCompleted) return false;
    return new Date(task.dueDate) < new Date();
  }

  private showSuccess(msg: string): void {
    this.successMessage.set(msg);
    setTimeout(() => this.successMessage.set(''), 3000);
  }
}
