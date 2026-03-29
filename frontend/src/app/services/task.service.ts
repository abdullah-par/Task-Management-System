import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskItem, CreateTaskDto, UpdateTaskDto } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:5046/api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getTaskById(id: number): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createTask(dto: CreateTaskDto): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, dto).pipe(catchError(this.handleError));
  }

  updateTask(id: number, dto: UpdateTaskDto): Observable<TaskItem> {
    return this.http.put<TaskItem>(`${this.apiUrl}/${id}`, dto).pipe(catchError(this.handleError));
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unexpected error occurred';
    if (error.status === 0) {
      message = 'Cannot reach the server. Is the backend running?';
    } else if (error.status === 404) {
      message = 'Task not found.';
    } else if (error.status === 400) {
      message = 'Invalid data submitted.';
    }
    return throwError(() => new Error(message));
  }
}
