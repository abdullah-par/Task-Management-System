using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly ILogger<TasksController> _logger;

        public TasksController(ITaskService taskService, ILogger<TasksController> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }

        /// <summary>GET /api/tasks — Get all tasks</summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<TaskDTO>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all tasks");
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);
        }

        /// <summary>GET /api/tasks/{id} — Get task by ID</summary>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(TaskDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            _logger.LogInformation("Fetching task with ID {Id}", id);
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
                return NotFound(new { message = $"Task with ID {id} not found" });

            return Ok(task);
        }

        /// <summary>POST /api/tasks — Create a new task</summary>
        [HttpPost]
        [ProducesResponseType(typeof(TaskDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] TaskCreatedDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _logger.LogInformation("Creating new task: {Title}", dto.Title);
            var created = await _taskService.CreateTaskAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        /// <summary>PUT /api/tasks/{id} — Update an existing task</summary>
        [HttpPut("{id:int}")]
        [ProducesResponseType(typeof(TaskDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, [FromBody] TaskUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _logger.LogInformation("Updating task with ID {Id}", id);
            var updated = await _taskService.UpdateTaskAsync(id, dto);
            if (updated == null)
                return NotFound(new { message = $"Task with ID {id} not found" });

            return Ok(updated);
        }

        /// <summary>DELETE /api/tasks/{id} — Delete a task</summary>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            _logger.LogInformation("Deleting task with ID {Id}", id);
            var deleted = await _taskService.DeleteTaskAsync(id);
            if (!deleted)
                return NotFound(new { message = $"Task with ID {id} not found" });

            return NoContent();
        }
    }
}
