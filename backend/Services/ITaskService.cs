using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDTO>> GetAllTasksAsync();
        Task<TaskDTO?> GetTaskByIdAsync(int id);
        Task<TaskDTO> CreateTaskAsync(TaskCreatedDto dto);
        Task<TaskDTO?> UpdateTaskAsync(int id, TaskUpdateDto dto);
        Task<bool> DeleteTaskAsync(int id);
    }
}
