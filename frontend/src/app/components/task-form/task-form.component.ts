import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  taskId: number | null = null;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      this.loadTask(this.taskId);
    }
  }

  buildForm(): void {
    this.taskForm = this.fb.group({
      title:       ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(1000)]],
      isCompleted: [false],
      dueDate:     [''],
    });
  }

  loadTask(id: number): void {
    this.isLoading = true;
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title:       task.title,
          description: task.description ?? '',
          isCompleted: task.isCompleted,
          dueDate:     task.dueDate ? task.dueDate.split('T')[0] : '',
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const v = this.taskForm.value;
    const dto = {
      title:       v.title.trim(),
      description: v.description?.trim() || undefined,
      isCompleted: v.isCompleted,
      dueDate:     v.dueDate || undefined,
    };

    const request$ = this.isEditMode && this.taskId
      ? this.taskService.updateTask(this.taskId, dto)
      : this.taskService.createTask(dto);

    request$.subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => {
        this.errorMessage = err.message;
        this.isSubmitting = false;
      },
    });
  }

  get f() { return this.taskForm.controls; }

  isInvalid(field: string): boolean {
    const ctrl = this.taskForm.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  getError(field: string): string {
    const ctrl = this.taskForm.get(field);
    if (!ctrl?.errors) return '';
    if (ctrl.errors['required'])   return `${this.label(field)} is required.`;
    if (ctrl.errors['minlength'])  return `${this.label(field)} must be at least ${ctrl.errors['minlength'].requiredLength} characters.`;
    if (ctrl.errors['maxlength'])  return `${this.label(field)} cannot exceed ${ctrl.errors['maxlength'].requiredLength} characters.`;
    return 'Invalid value.';
  }

  private label(field: string): string {
    return ({ title: 'Title', description: 'Description', dueDate: 'Due Date' } as Record<string,string>)[field] ?? field;
  }
}
