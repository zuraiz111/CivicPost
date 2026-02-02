const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Report = require('./models/Report');
const Staff = require('./models/Staff');
const Citizen = require('./models/Citizen');
const Message = require('./models/Message');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const reports = [
  { trackingId: "REP-001", user: "Ahmed Khan", category: "Electricity", description: "Main transformer sparking in sector G-9", status: "critical", urgency: "Critical", assignedDept: "Electricity", assignedStaff: "STF-001", location: "Sector G-9" },
  { trackingId: "REP-002", user: "Sara Ali", category: "Water Supply", description: "Pipe leakage on main boulevard", status: "progress", urgency: "Medium", assignedDept: "Water Supply", location: "Main Boulevard" },
  { trackingId: "REP-003", user: "John Doe", category: "Waste Management", description: "Garbage collection delayed for 3 days", status: "pending", urgency: "Low", location: "Street 5" },
  { trackingId: "REP-004", user: "Zainab Bibi", category: "Roads & Infrastructure", description: "Pothole fix required near city mall", status: "resolved", urgency: "Medium", assignedDept: "Roads & Infrastructure", assignedStaff: "STF-003", location: "City Mall" },
];

const staff = [
  { staffId: "STF-001", name: "Kashif Aziz", role: "Field Supervisor", department: "Electricity", status: "active", phone: "0300-1234567" },
  { staffId: "STF-002", name: "Marium Noor", role: "Support Agent", department: "Public Safety", status: "active", phone: "0321-7654321" },
  { staffId: "STF-003", name: "Zubair Shah", role: "Technical Lead", department: "Roads & Infrastructure", status: "active", phone: "0312-9876543" },
  { staffId: "STF-004", name: "Asim Riaz", role: "Maintenance Crew", department: "Water Supply", status: "active", phone: "0333-1112223" },
];

const citizens = [
  { citizenId: "CIT-001", name: "Ahmed Khan", email: "ahmed@example.com", reportsCount: 5 },
  { citizenId: "CIT-002", name: "Sara Ali", email: "sara@example.com", reportsCount: 2 },
  { citizenId: "CIT-003", name: "John Doe", email: "john@example.com", reportsCount: 1 },
];

const messages = [
  { sender: "Ahmed Khan", text: "When will the power be restored in G-9?", isAdmin: false },
  { sender: "Admin", text: "Team is on site. Expected resolution in 2 hours.", isAdmin: true },
  { sender: "Sara Ali", text: "Thank you for the quick response on the water leakage!", isAdmin: false },
];

const importData = async () => {
  try {
    console.log('Starting data import...');
    await Report.deleteMany();
    console.log('Reports deleted');
    await Staff.deleteMany();
    console.log('Staff deleted');
    await Citizen.deleteMany();
    console.log('Citizens deleted');
    await Message.deleteMany();
    console.log('Messages deleted');

    await Report.insertMany(reports);
    console.log('Reports inserted');
    await Staff.insertMany(staff);
    console.log('Staff inserted');
    await Citizen.insertMany(citizens);
    console.log('Citizens inserted');
    await Message.insertMany(messages);
    console.log('Messages inserted');

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error during import: ${error}`);
    process.exit(1);
  }
};

importData();
