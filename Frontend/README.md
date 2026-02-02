# CivicPost - Smart City Governance Portal 🏙️

A modern, high-tech governance and response system for citizens to report, track, and resolve local infrastructure issues. This platform bridges the gap between citizens and municipal authorities through a transparent, efficient, and bilingual digital interface.

## 🚀 Features

### **Citizen Portal**
- **Dynamic Splash Screen**: Professional entrance with real-time loading progress and glassmorphism aesthetic.
- **Instant Reporting**: Streamlined submission system for various categories (Electricity, Water, Waste, etc.) with urgency levels.
- **Multilingual Support**: Fully localized interface in **English** and **Urdu** to ensure accessibility for all citizens.
- **Public Transparency**: Real-time dashboard showing community reports, status updates, and resolution progress.
- **Interactive Guidelines**: Built-in help system to guide users through the reporting process.

### **Admin Portal (Management Suite)**
- **Centralized Dashboard**: Comprehensive overview of city-wide statistics, active reports, and recent activities.
- **Staff Management**: Full HR suite to register, authorize, and assign roles/departments to field personnel.
- **Report Lifecycle Control**: Manage reports from submission to resolution—approve, assign, or reject with visual feedback.
- **Emergency Broadcast**: Global alert system to notify citizens of urgent infrastructure or safety issues instantly.
- **Citizen Feedback**: Integrated communication channel to view and respond to citizen inquiries.
- **Data Analytics**: Visual data representation using Recharts for better decision-making.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Lightweight, scalable state)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Glassmorphism & Custom Animations)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/) (Interactive data visualization)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & FontAwesome 6
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 📂 Project Structure

```text
src/
├── components/      # Reusable UI components (Modals, Hero, Dashboard, etc.)
├── store/           # Zustand state management
├── App.jsx          # Main application routing and layout
├── main.jsx         # Application entry point
└── index.css        # Global styles and Tailwind directives
```

## 📦 Getting Started

### **Prerequisites**
- Node.js (Latest LTS version)
- npm or yarn

### **Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd CivicPost
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### **Running the Application**
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## � Admin Access
To access the management suite, click the **Admin Board** button and use:
- **Username**: `admin`
- **Password**: `admin123`

---
Built with ❤️ for smarter, more connected communities.
