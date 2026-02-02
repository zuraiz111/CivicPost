import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const useStore = create((set, get) => ({
  reports: [],
  staff: [],
  citizens: [],
  messages: [],
  loading: false,
  error: null,

  // Fetch all data
  fetchReports: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${API_URL}/reports`);
      set({ reports: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchStaff: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${API_URL}/staff`);
      set({ staff: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCitizens: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${API_URL}/citizens`);
      set({ citizens: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchMessages: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${API_URL}/messages`);
      set({ messages: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addReport: async (report) => {
    try {
      const { data } = await axios.post(`${API_URL}/reports`, report);
      set((state) => ({ reports: [data, ...state.reports] }));
      return data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateReportStatus: async (id, status, comment = null) => {
    try {
      const { data } = await axios.put(`${API_URL}/reports/${id}/status`, { status, adminComment: comment });
      set((state) => ({
        reports: state.reports.map((r) => (r._id === id ? data : r)),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  assignReport: async (id, dept, staffId, comment = null) => {
    try {
      const { data } = await axios.put(`${API_URL}/reports/${id}/assign`, { 
        assignedDept: dept, 
        assignedStaff: staffId, 
        adminComment: comment 
      });
      set((state) => ({
        reports: state.reports.map((r) => (r._id === id ? data : r)),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteReport: async (id) => {
    try {
      await axios.delete(`${API_URL}/reports/${id}`);
      set((state) => ({
        reports: state.reports.filter((r) => r._id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  addStaff: async (member) => {
    try {
      const { data } = await axios.post(`${API_URL}/staff`, member);
      set((state) => ({ staff: [data, ...state.staff] }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  removeStaff: async (id) => {
    try {
      await axios.delete(`${API_URL}/staff/${id}`);
      set((state) => ({
        staff: state.staff.filter((s) => s._id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateStaffStatus: async (id, status) => {
    try {
      const { data } = await axios.put(`${API_URL}/staff/${id}/status`, { status });
      set((state) => ({
        staff: state.staff.map((s) => (s._id === id ? data : s)),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  removeCitizen: async (id) => {
    try {
      await axios.delete(`${API_URL}/citizens/${id}`);
      set((state) => ({
        citizens: state.citizens.filter((c) => c._id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  sendMessage: async (msg) => {
    try {
      const { data } = await axios.post(`${API_URL}/messages`, msg);
      set((state) => ({ messages: [...state.messages, data] }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useStore;
