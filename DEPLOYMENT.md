# Deployment Guide: Task Management System

This guide outlines the steps to deploy the system with the **Frontend on Vercel** and the **Backend on Render**.

---

## 1. Backend Deployment (Render)

The backend is configured to run in a Docker container.

### Step-by-Step
1.  **Create a New Web Service** on Render ([render.com](https://dashboard.render.com)).
2.  **Connect your repository**.
3.  **Configure Service**:
    -   **Root Directory**: `backend`
    -   **Project Type**: `Web Service`
    -   **Runtime**: `Docker`
4.  **Add Environment Variables**:
    -   `ASPNETCORE_ENVIRONMENT`: `Production`
5.  **Render Settings**: Ensure Render detects the `Dockerfile` in the `backend/` directory.

---

## 2. Frontend Deployment (Vercel)

The frontend uses Angular and is configured to handle API URLs dynamically during the build process.

### Step-by-Step
1.  **Create a New Project** on Vercel ([vercel.com](https://vercel.com)).
2.  **Connect your repository**.
3.  **Config Project**:
    -   **Framework Preset**: `Angular`
    -   **Root Directory**: `frontend`
4.  **Add Environment Variables**:
    -   `API_URL`: The URL of your deployed Render backend (e.g., `https://your-backend.onrender.com/api/tasks`).
5.  **Build and Deploy**: Vercel will automatically run `npm run build`, which now includes:
    1.  Running `set-env.js` to create the production environment file with your `API_URL`.
    2.  Building the Angular application with production optimizations.

---

## Technical Details

### Backend Changes:
-   **Dockerfile**: Created to allow containerized deployment on Render.
-   **CORS**: Updated `Program.cs` to allow dynamic origins for production.
-   **Port binding**: Set to listen on port `10000` via `ASPNETCORE_URLS`.

### Frontend Changes:
-   **vercel.json**: Added to route all client-side paths to `index.html`.
-   **set-env.js**: Script to inject the `API_URL` environment variable during the Vercel build.
-   **package.json**: Added `config` script and updated `build` to use it.
-   **angular.json**: Configured the production build to use `environment.prod.ts`.
