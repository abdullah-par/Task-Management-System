Use Case: Task Management System (Mini To-Do App)
📌 Problem Statement
Build a Task Management Web Application where users can create, view, update, and delete tasks. The application should demonstrate full-stack capabilities using .NET Core 6 (MVC + Web API) for the backend and Angular for the frontend.
🎯 Functional Requirements
👤 User Features
View a list of tasks
Add a new task
Edit an existing task
Delete a task
Mark a task as “Completed” or “Pending”
⚙️ Backend Requirements (C# + .NET Core 6 Web API)
Create a Task API with endpoints:
GET /api/tasks → Get all tasks
GET /api/tasks/{id} → Get task by ID
POST /api/tasks → Create a new task
PUT /api/tasks/{id} → Update task
DELETE /api/tasks/{id} → Delete task
Use Entity Framework Core (or in-memory DB for simplicity)
Implement proper model validation
Use basic layered architecture (Controller → Service → Repository)
🖥️ Frontend Requirements (Angular)
Create a simple UI with:
Task list table/grid
Form to add/edit tasks
Use Angular services to call the Web API
Implement:  
Routing (List & Create/Edit pages)
Basic form validation
🧱 MVC Requirement (Optional but Recommended)
Create a simple .NET Core MVC page (Razor View) to:
Display tasks (server-side rendering)
OR consume the API and show results
