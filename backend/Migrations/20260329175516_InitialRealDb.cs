using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialRealDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "CreatedAt", "Description", "DueDate", "IsCompleted", "Title", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 3, 22, 17, 55, 15, 535, DateTimeKind.Utc).AddTicks(9243), "Initialize the project with proper folder structure and dependencies", new DateTime(2026, 3, 24, 17, 55, 15, 535, DateTimeKind.Utc).AddTicks(9699), true, "Set up project structure", new DateTime(2026, 3, 29, 17, 55, 15, 535, DateTimeKind.Utc).AddTicks(7826) },
                    { 2, new DateTime(2026, 3, 23, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(134), "Create entity models and configure EF Core with InMemory provider", new DateTime(2026, 3, 25, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(135), true, "Design database schema", new DateTime(2026, 3, 29, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(133) },
                    { 3, new DateTime(2026, 3, 25, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(137), "Build CRUD endpoints following RESTful conventions", new DateTime(2026, 3, 30, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(138), false, "Implement REST API endpoints", new DateTime(2026, 3, 29, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(137) },
                    { 4, new DateTime(2026, 3, 26, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(140), "Create Angular components for listing and managing tasks", new DateTime(2026, 4, 1, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(140), false, "Build Angular frontend", new DateTime(2026, 3, 29, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(139) },
                    { 5, new DateTime(2026, 3, 27, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(142), "Add test coverage for service and controller layers", new DateTime(2026, 4, 5, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(142), false, "Write unit tests", new DateTime(2026, 3, 29, 17, 55, 15, 536, DateTimeKind.Utc).AddTicks(141) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tasks");
        }
    }
}
