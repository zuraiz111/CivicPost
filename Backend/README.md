# CivicPost - Backend

This is the backend server for the **CivicPost** application, a community reporting and management system. It is built using the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Technologies Used
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB Atlas**: Cloud-hosted NoSQL database.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **dotenv**: For managing environment variables.
- **CORS**: For handling Cross-Origin Resource Sharing.

## 📂 Project Structure
- `config/`: Contains database connection logic (`db.js`).
- `controllers/`: Contains the logic for handling API requests (e.g., `reportController.js`).
- `models/`: Mongoose schemas defining the data structure (Reports, Staff, Citizens, Messages).
- `routes/`: Express routes that map URL paths to controller functions.
- `index.js`: The main entry point of the server.
- `seeder.js`: A script to populate the database with initial test data.

## 🔗 How it Works (For Viva)

### 1. Database Connection
The server connects to MongoDB Atlas using a connection string stored in the `.env` file. The logic in `config/db.js` uses `mongoose.connect()` to establish this link.

### 2. Data Flow
- **Models**: We define how a "Report" or "Staff" looks. For example, a Report has a `trackingId`, `category`, and `status`.
- **Controllers**: This is the "brain" of the backend. When a user sends a request (like getting all reports), the controller uses Mongoose to find data in MongoDB and sends it back as JSON.
- **Routes**: These are the "addresses" for the API. For example, `GET /api/reports` is handled by `reportRoutes.js`.

### 3. API Endpoints
- `GET /api/reports`: Fetches all citizen reports.
- `POST /api/reports`: Submits a new report.
- `GET /api/staff`: Fetches all department staff members.
- `GET /api/citizens`: Fetches all registered citizens.
- `GET /api/messages`: Fetches community chat/messages.

## 🛠️ How to Run
1. Navigate to the backend folder: `cd Backend`
2. Install dependencies: `npm install`
3. Start the server: `npm start` (or `npm run dev` for development with nodemon)
