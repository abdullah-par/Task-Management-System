using backend.DTOs;
using backend.Models;
using backend.Repositories;
using Microsoft.Extensions.Logging;

namespace backend.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;
        private readonly ILogger<TaskService> _logger;

        public TaskService(ITaskRepository repository, ILogger<TaskService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<IEnumerable<TaskDTO>> GetAllTasksAsync()
        {
            _logger.LogInformation("Retrieving all tasks from repository");
            var tasks = await _repository.GetAllAsync();
            return tasks.Select(MapToTaskDto);
        }

        public async Task<TaskDTO?> GetTaskByIdAsync(int id)
        {
            _logger.LogInformation("Retrieving task {Id} from repository", id);
            var task = await _repository.GetByIdAsync(id);
            return task != null ? MapToTaskDto(task) : null;
        }

        public async Task<TaskDTO> CreateTaskAsync(TaskCreatedDto dto)
        {
            _logger.LogInformation("Saving new task: {Title}", dto.Title);
            var task = new TaskItem
            {
                Title = dto.Title.Trim(),
                Description = dto.Description?.Trim(),
                DueDate = dto.DueDate
            };

            var created = await _repository.CreateAsync(task);
            return MapToTaskDto(created);
        }

        public async Task<TaskDTO?> UpdateTaskAsync(int id, TaskUpdateDto dto)
        {
            _logger.LogInformation("Updating task {Id}: {Title}", id, dto.Title);
            var task = new TaskItem
            {
                Title = dto.Title.Trim(),
                Description = dto.Description?.Trim(),
                IsCompleted = dto.IsCompleted,
                DueDate = dto.DueDate
            };

            var updated = await _repository.UpdateAsync(id, task);
            return updated != null ? MapToTaskDto(updated) : null;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            _logger.LogWarning("Deleting task {Id} from repository", id);
            return await _repository.DeleteAsync(id);
        }

        /// <summary>Manual Mapper — maps model to DTO</summary>
        private static TaskDTO MapToTaskDto(TaskItem task)
        {
            return new TaskDTO
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt,
                DueDate = task.DueDate
            };
        }
    }
}
