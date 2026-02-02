# CivicPost - Frontend

This is the user interface for the **CivicPost** application, built to be modern, responsive, and easy to use for citizens and administrators.

## 🚀 Technologies Used
- **React**: A library for building component-based user interfaces.
- **Vite**: A fast build tool and development server.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Zustand**: A lightweight state management library.
- **Axios**: For making HTTP requests to the backend.
- **Framer Motion**: For smooth animations.
- **Lucide React**: For beautiful iconography.

## 📂 Project Structure
- `src/components/`: Reusable UI components (Navbar, Hero, Dashboard, Modals).
- `src/store/`: State management logic using Zustand (`useStore.js`).
- `src/utils/`: Utility functions like email services.
- `App.jsx`: Main application component and routing logic.
- `main.jsx`: Entry point for React.

## 🔗 How it Works (For Viva)

### 1. State Management (Zustand)
The app uses a central store (`src/store/useStore.js`) to manage data. Instead of passing data manually between components, any component can access the `reports` or `staff` data directly from the store.

### 2. Backend Connection
The frontend connects to the backend API via **Axios**.
- In `useStore.js`, we define `API_URL = 'http://localhost:5000/api'`.
- Functions like `fetchReports()` make a `GET` request to `${API_URL}/reports` and save the result into the state.

### 3. Responsive Design
The UI is built with **Tailwind CSS**, making it fully responsive. We use a grid system for the dashboard and flexbox for the layout.

### 4. Interactive Features
- **Submit Report**: Opens a modal where citizens can fill in details.
- **Admin Dashboard**: Allows authorized staff to change report statuses (Pending → In Progress → Resolved).
- **Real-time feel**: After adding or updating a report, the UI updates instantly without a full page refresh.

## 🛠️ How to Run
1. Navigate to the frontend folder: `cd Frontend`
2. Install dependencies: `npm install`
3. Start the app: `npm run dev`
4. Open the link provided (usually `http://localhost:5173`)
