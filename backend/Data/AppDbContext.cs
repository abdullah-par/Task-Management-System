using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data
            modelBuilder.Entity<TaskItem>().HasData(
                new TaskItem
                {
                    Id = 1,
                    Title = "Set up project structure",
                    Description = "Initialize the project with proper folder structure and dependencies",
                    IsCompleted = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-7),
                    DueDate = DateTime.UtcNow.AddDays(-5)
                },
                new TaskItem
                {
                    Id = 2,
                    Title = "Design database schema",
                    Description = "Create entity models and configure EF Core with InMemory provider",
                    IsCompleted = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-6),
                    DueDate = DateTime.UtcNow.AddDays(-4)
                },
                new TaskItem
                {
                    Id = 3,
                    Title = "Implement REST API endpoints",
                    Description = "Build CRUD endpoints following RESTful conventions",
                    IsCompleted = false,
                    CreatedAt = DateTime.UtcNow.AddDays(-4),
                    DueDate = DateTime.UtcNow.AddDays(1)
                },
                new TaskItem
                {
                    Id = 4,
                    Title = "Build Angular frontend",
                    Description = "Create Angular components for listing and managing tasks",
                    IsCompleted = false,
                    CreatedAt = DateTime.UtcNow.AddDays(-3),
                    DueDate = DateTime.UtcNow.AddDays(3)
                },
                new TaskItem
                {
                    Id = 5,
                    Title = "Write unit tests",
                    Description = "Add test coverage for service and controller layers",
                    IsCompleted = false,
                    CreatedAt = DateTime.UtcNow.AddDays(-2),
                    DueDate = DateTime.UtcNow.AddDays(7)
                }
            );
        }
    }
}
