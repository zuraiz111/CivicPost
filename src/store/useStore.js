import { create } from 'zustand';

const useStore = create((set) => ({
  reports: [
    { id: "REP-001", user: "Ahmed Khan", category: "Electricity", description: "Main transformer sparking in sector G-9", status: "critical", date: "2024-03-15", urgency: "Critical", assignedDept: "Electricity", assignedStaff: "STF-001" },
    { id: "REP-002", user: "Sara Ali", category: "Water Supply", description: "Pipe leakage on main boulevard", status: "progress", date: "2024-03-14", urgency: "Medium", assignedDept: "Water Supply", assignedStaff: null },
    { id: "REP-003", user: "John Doe", category: "Waste Management", description: "Garbage collection delayed for 3 days", status: "pending", date: "2024-03-13", urgency: "Low", assignedDept: null, assignedStaff: null },
    { id: "REP-004", user: "Zainab Bibi", category: "Roads & Infrastructure", description: "Pothole fix required near city mall", status: "resolved", date: "2024-03-12", urgency: "Medium", assignedDept: "Roads & Infrastructure", assignedStaff: "STF-003" },
  ],
  addReport: (report) => set((state) => ({ 
    reports: [
      { 
        ...report, 
        id: `REP-00${state.reports.length + 1}`, 
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        assignedDept: null,
        assignedStaff: null
      }, 
      ...state.reports 
    ] 
  })),
  updateReportStatus: (id, status, comment = null) => set((state) => ({
    reports: state.reports.map(r => r.id === id ? { 
      ...r, 
      status, 
      adminComment: comment || r.adminComment 
    } : r)
  })),
  assignReport: (id, dept, staffId, comment = null) => set((state) => ({
    reports: state.reports.map(r => r.id === id ? { 
      ...r, 
      status: 'progress', 
      assignedDept: dept, 
      assignedStaff: staffId,
      adminComment: comment || r.adminComment
    } : r)
  })),
  deleteReport: (id) => set((state) => ({
    reports: state.reports.filter(r => r.id !== id)
  })),

  // Staff Management
  staff: [
    { id: "STF-001", name: "Kashif Aziz", role: "Field Supervisor", department: "Electricity", status: "active", phone: "0300-1234567" },
    { id: "STF-002", name: "Marium Noor", role: "Support Agent", department: "Public Safety", status: "active", phone: "0321-7654321" },
    { id: "STF-003", name: "Zubair Shah", role: "Technical Lead", department: "Roads & Infrastructure", status: "active", phone: "0312-9876543" },
    { id: "STF-004", name: "Asim Riaz", role: "Maintenance Crew", department: "Water Supply", status: "active", phone: "0333-1112223" },
    { id: "STF-005", name: "Hina Khan", role: "Inspector", department: "Waste Management", status: "active", phone: "0345-4445556" },
    { id: "STF-006", name: "Faisal Qureshi", role: "Emergency Responder", department: "Emergency Services", status: "active", phone: "0311-7778889" },
    { id: "STF-007", name: "Sana Javed", role: "Support Agent", department: "Public Relations", status: "active", phone: "0322-9990001" },
    { id: "STF-008", name: "Usman Ghani", role: "Technical Lead", department: "Natural Gas", status: "active", phone: "0301-2223334" },
    { id: "STF-009", name: "Nadia Ali", role: "Field Supervisor", department: "Stray Animal", status: "active", phone: "0315-5556667" },
  ],
  addStaff: (member) => set((state) => ({
    staff: [{ ...member, id: `STF-00${state.staff.length + 1}`, status: "active" }, ...state.staff]
  })),
  removeStaff: (id) => set((state) => ({
    staff: state.staff.filter(s => s.id !== id)
  })),
  updateStaffStatus: (id, status) => set((state) => ({
    staff: state.staff.map(s => s.id === id ? { ...s, status } : s)
  })),
  assignStaffRole: (id, role, department) => set((state) => ({
    staff: state.staff.map(s => s.id === id ? { ...s, role, department } : s)
  })),

  // Citizen Management
  citizens: [
    { id: "CIT-001", name: "Ahmed Khan", email: "ahmed@example.com", reports: 5, joinDate: "2024-01-10" },
    { id: "CIT-002", name: "Sara Ali", email: "sara@example.com", reports: 2, joinDate: "2024-02-15" },
    { id: "CIT-003", name: "John Doe", email: "john@example.com", reports: 1, joinDate: "2024-03-01" },
  ],
  removeCitizen: (id) => set((state) => ({
    citizens: state.citizens.filter(c => c.id !== id)
  })),

  // Feedback/Chat System
  messages: [
    { id: 1, sender: "Ahmed Khan", text: "When will the power be restored in G-9?", time: "10:30 AM", isAdmin: false },
    { id: 2, sender: "Admin", text: "Team is on site. Expected resolution in 2 hours.", time: "10:35 AM", isAdmin: true },
    { id: 3, sender: "Sara Ali", text: "Thank you for the quick response on the water leakage!", time: "11:15 AM", isAdmin: false },
  ],
  sendMessage: (msg) => set((state) => ({
    messages: [...state.messages, { ...msg, id: Date.now(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
  })),
}));

export default useStore;
