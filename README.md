# 📝 Task Management System (Enterprise Edition)

A professional, high-performance task management application built with a **Clean Layered Architecture** (.NET 9 Web API) and a **Reactive Frontend** (Angular 19+ with Signals).

---

## 🏗 Technology Stack

- **Backend:** .NET 9 Web API (C#)
- **Frontend:** Angular 19+ (Standalone Components & Signals)
- **Architecture:** Layered Pattern (Controller -> Service -> Repository)
- **Database:** Entity Framework Core (In-Memory for demonstration)
- **Design:** GitHub-inspired Dark Theme (Enterprise CSS)

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### 1. Prerequisites
- **.NET SDK 9.0+**
- **Node.js 20+**
- **Angular CLI (`npm install -g @angular/cli`)**

### 2. Clone the Repository
```bash
git clone https://github.com/abdullah-par/Task-Management-System.git
cd Task-Management-System
```

### 3. Run the Backend API
```bash
cd backend
dotnet restore
dotnet run --launch-profile http
```
- **API URL:** `https://localhost:7051/api/tasks` (Standard)
- **Swagger UI:** `https://localhost:7051/openapi/v1.json` (OpenAPI Spec)

### 4. Run the Angular Frontend
Open a **new** terminal in the root directory:
```bash
cd frontend
npm install
npm start
```
- **Frontend URL:** `http://localhost:4200`

---

## 🛠 Key Features

- **Full CRUD Support:** Create, Read, Update, and Delete tasks. 📝
- **Reactive UI:** Uses Angular **Signals** for instant data updates without page reloads. ⚡
- **Enterprise Dark Mode:** Calibrated cool-grey surfaces for maximum readability. 🌙
- **Status Badges:** Real-time visibility of Pending (Amber) and Completed (Green) tasks. 🏷️
- **Automatic History:** Tracks `CreatedAt` and `UpdatedAt` timestamps for every task. 🕒

---

## 🛡️ Architecture Highlights
- **Service Layer Pattern:** Business logic is isolated from the Controllers.
- **Repository Pattern:** Database operations are abstracted for easy testing.
- **DTO-Based Communication:** Clear input/output separation for better security and structure.

---

## 📄 License
This project is for educational and training purposes.
