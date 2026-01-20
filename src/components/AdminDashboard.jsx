import React, { useState } from 'react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import { sendAssignmentEmail, sendResolutionEmail } from '../utils/emailService';

const AdminDashboard = ({ language, setLanguage, onSendAlert, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { 
    reports, updateReportStatus, deleteReport, assignReport,
    staff, addStaff, removeStaff, updateStaffStatus, assignStaffRole,
    citizens, removeCitizen,
    messages, sendMessage
  } = useStore();
  const [activeView, setActiveView] = useState('overview');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [alertData, setAlertData] = useState({ message: '', type: 'all' });
  const [newStaff, setNewStaff] = useState({ name: '', role: '', department: '', phone: '' });
  const [assignmentData, setAssignmentData] = useState({ staffId: '', role: '', department: '' });
  const [reportAssignment, setReportAssignment] = useState({ reportId: '', department: '', staffId: '', comment: '' });
  const [resolutionData, setResolutionData] = useState({ reportId: '', comment: '' });
  const [chatMessage, setChatMessage] = useState('');

  const availableRoles = [
    "Field Supervisor", "Technical Lead", "Inspector", "Support Agent", "Maintenance Crew", "Emergency Responder"
  ];

  const availableDepartments = [
    "Electricity", "Water Supply", "Waste Management", "Roads & Infrastructure", "Public Safety", "Natural Gas", "Stray Animal", "Public Relations", "Emergency Services"
  ];

  const categories = [
    { name: "Electricity", icon: "fa-bolt", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
    { name: "Stray Animal", icon: "fa-paw", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
    { name: "Water Supply", icon: "fa-droplet", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
    { name: "Waste Management", icon: "fa-trash-can", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
    { name: "Roads & Infrastructure", icon: "fa-road", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" },
    { name: "Public Safety", icon: "fa-shield-heart", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-200" },
    { name: "Natural Gas", icon: "fa-fire-flame-simple", color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
    { name: "Public Relations", icon: "fa-bullhorn", color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200" },
    { name: "Emergency Services", icon: "fa-truck-medical", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
  ];

  const filteredReports = selectedCategory === 'All' 
    ? reports 
    : reports.filter(r => r.category === selectedCategory);

  const t = {
    en: {
      brand: "Civic Connect",
      panel: "Admin Panel",
      welcome: "Welcome back, Admin!",
      subtitle: "Here's what's happening with your city today.",
      stats: [
        { icon: "fa-users", value: staff.length.toString(), label: "Total Staff", change: "+12%", color: "emerald", border: "border-emerald-500" },
        { icon: "fa-file-lines", value: reports.length.toString(), label: "Total Reports", change: "+8%", color: "blue", border: "border-blue-500" },
        { icon: "fa-clock", value: reports.filter(r => r.status === 'pending' || r.status === 'critical').length.toString(), label: "Pending Tasks", change: "-5%", color: "amber", border: "border-amber-500" },
        { icon: "fa-circle-check", value: reports.filter(r => r.status === 'resolved').length.toString(), label: "Completed", change: "+23%", color: "green", border: "border-green-500" }
      ],
      sidebar: {
        dashboard: "Dashboard",
        addAlert: "Add Alert",
        reports: "Reports List",
        staff: "Staff Management",
        users: "Citizens",
        chats: "Public Feedback",
        settings: "Settings",
        logout: "Logout"
      },
      quickActions: {
        title: "Quick Actions",
        items: [
          { icon: "fa-plus", title: "Create New Alert", desc: "Broadcast emergency info to city", id: "alerts" },
          { icon: "fa-users-gear", title: "Manage Staff", desc: "View and assign personnel", id: "staff" }
        ]
      },
      recentActivity: {
        title: "Recent Activity",
        items: [
          { type: "green", text: "New report received", time: "2 minutes ago", dept: "Electricity" },
          { type: "blue", text: "Alert dispatched to Sector G-9", time: "1 hour ago", dept: "Public Safety" },
          { type: "amber", text: "Staff assigned to task", time: "3 hours ago", dept: "Waste Management" }
        ]
      },
      status: {
        pending: "New",
        progress: "Assigned",
        resolved: "Completed",
        critical: "Urgent"
      },
      toasts: {
        settingsSaved: "Global configurations applied successfully.",
        staffRegistered: "New personnel registered and authorized.",
        alertSent: "Emergency broadcast has been dispatched."
      }
    },
    ur: {
      brand: "سیوک کنیکٹ",
      panel: "ایڈمن پینل",
      welcome: "خوش آمدید، ایڈمن!",
      subtitle: "آج آپ کے شہر میں کیا ہو رہا ہے۔",
      stats: [
        { icon: "fa-users", value: staff.length.toString(), label: "کل عملہ", change: "+12%", color: "emerald", border: "border-emerald-500" },
        { icon: "fa-file-lines", value: reports.length.toString(), label: "کل رپورٹس", change: "+8%", color: "blue", border: "border-blue-500" },
        { icon: "fa-clock", value: reports.filter(r => r.status === 'pending' || r.status === 'critical').length.toString(), label: "زیر التواء", change: "-5%", color: "amber", border: "border-amber-500" },
        { icon: "fa-circle-check", value: reports.filter(r => r.status === 'resolved').length.toString(), label: "مکمل شدہ", change: "+23%", color: "green", border: "border-green-500" }
      ],
      sidebar: {
        dashboard: "ڈیش بورڈ",
        addAlert: "الرٹ شامل کریں",
        reports: "رپورٹس کی فہرست",
        staff: "عملے کا انتظام",
        users: "شہری",
        chats: "عوامی رائے",
        settings: "ترتیبات",
        logout: "لاگ آؤٹ"
      },
      quickActions: {
        title: "فوری اقدامات",
        items: [
          { icon: "fa-plus", title: "نیا الرٹ بنائیں", desc: "شہر کو ہنگامی معلومات نشر کریں", id: "alerts" },
          { icon: "fa-users-gear", title: "عملے کا انتظام", desc: "اہلکار دیکھیں اور تفویض کریں", id: "staff" }
        ]
      },
      recentActivity: {
        title: "حالیہ سرگرمی",
        items: [
          { type: "green", text: "نئی رپورٹ موصول ہوئی", time: "2 منٹ پہلے", dept: "بجلی" },
          { type: "blue", text: "سیکٹر جی-9 کو الرٹ بھیج دیا گیا", time: "1 گھنٹہ پہلے", dept: "عوامی تحفظ" },
          { type: "amber", text: "عملہ کام پر لگا دیا گیا", time: "3 گھنٹے پہلے", dept: "فضلے کا انتظام" }
        ]
      },
      status: {
        pending: "نیا",
        progress: "تفویض کردہ",
        resolved: "مکمل",
        critical: "فوری"
      },
      toasts: {
        settingsSaved: "عالمی ترتیبات کامیابی سے لاگو ہو گئیں۔",
        staffRegistered: "نیا عملہ رجسٹرڈ اور مجاز کر دیا گیا ہے۔",
        alertSent: "ہنگامی نشریات روانہ کر دی گئی ہیں۔"
      }
    }
  };

  const content = t[language];

  const handleAction = (id, type) => {
    if (type === 'approve') {
      const report = reports.find(r => r.id === id);
      if (report) {
        // Fallback: if category isn't in availableDepartments, use first dept
        const initialDept = availableDepartments.includes(report.category) 
          ? report.category 
          : availableDepartments[0];
          
        setReportAssignment({ 
          reportId: id, 
          department: initialDept, 
          staffId: '' 
        });
        setActiveModal('assignReport');
      }
    } else if (type === 'resolve') {
      setResolutionData({ reportId: id, comment: '' });
      setActiveModal('resolveReport');
    } else if (type === 'delete') {
      deleteReport(id);
      toast.error("Report deleted.");
    }
  };

  const handleLaunchAlert = (e) => {
    e.preventDefault();
    if (onSendAlert) {
      onSendAlert({
        message: alertData.message,
        type: alertData.type
      });
      toast.success(content.toasts.alertSent);
      setAlertData({ message: '', type: 'all' });
    }
  };

  const sidebarItems = [
    { id: 'overview', icon: 'fa-chart-pie', label: content.sidebar.dashboard },
    { id: 'alerts', icon: 'fa-plus', label: content.sidebar.addAlert },
    { id: 'reports', icon: 'fa-file-lines', label: content.sidebar.reports },
    { id: 'staff', icon: 'fa-users-gear', label: content.sidebar.staff },
    { id: 'users', icon: 'fa-users', label: content.sidebar.users },
    { id: 'chats', icon: 'fa-comment-dots', label: content.sidebar.chats },
    { id: 'settings', icon: 'fa-sliders', label: content.sidebar.settings },
  ];

  return (
    <div className="bg-[#f8fafb] min-h-screen flex relative selection:bg-emerald-600 selection:text-white font-sans text-slate-900">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 w-64 md:w-72 bg-[#004d40] h-screen flex flex-col z-[70] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } shrink-0`}>
        <div className="p-5 md:p-8 mb-2 md:mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-white font-black text-xl md:text-2xl tracking-tight leading-none">Civic Connect</h2>
            <p className="text-emerald-400 text-[9px] md:text-xs font-bold uppercase tracking-widest mt-1.5 md:mt-2 opacity-80">Admin Panel</p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white/70 hover:text-white"
          >
            <i className="fas fa-xmark text-lg"></i>
          </button>
        </div>

        <nav className="flex-1 px-3 md:px-4 py-2 md:py-4 space-y-1 md:space-y-2 overflow-y-auto no-scrollbar">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-lg md:rounded-xl transition-all duration-200 group ${
                activeView === item.id 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/20' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <i className={`fas ${item.icon} text-base md:text-lg w-5 md:w-6 transition-transform group-hover:scale-110`}></i>
              <span className="font-bold text-xs md:text-sm tracking-wide">{item.label}</span>
              {item.id === 'reports' && reports.filter(r => r.status === 'pending').length > 0 && (
                <span className={`ml-auto w-4 h-4 md:w-5 md:h-5 rounded-full text-[9px] md:text-[10px] flex items-center justify-center font-bold ${
                  activeView === item.id ? 'bg-white text-emerald-600' : 'bg-rose-500 text-white'
                }`}>
                  {reports.filter(r => r.status === 'pending').length}
                </span>
              )}
            </button>
          ))}
          
          <div className="pt-4 mt-4 border-t border-emerald-800/50">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-lg md:rounded-xl text-white/70 hover:bg-rose-50/10 hover:text-rose-400 transition-all group"
            >
              <i className="fas fa-power-off text-base md:text-lg w-5 md:w-6"></i>
              <span className="font-bold text-xs md:text-sm tracking-wide">{content.sidebar.logout}</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-10 shrink-0 z-40">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all"
            >
              <i className="fas fa-bars-staggered"></i>
            </button>
            <h1 className="text-sm md:text-xl font-bold text-slate-800 capitalize truncate max-w-[100px] md:max-w-none">{activeView}</h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-6">
            {/* Language Toggle */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:text-emerald-600 hover:border-emerald-100 transition-all group"
            >
              <i className="fas fa-globe text-[10px] md:text-sm group-hover:rotate-12 transition-transform"></i>
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                {language === 'en' ? 'اردو' : 'English'}
              </span>
            </button>

            <div className="text-right hidden md:block">
              <p className="text-xs md:text-sm font-bold text-slate-500">Welcome, Admin</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] md:text-sm font-black border-2 border-emerald-50 shrink-0">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-[#f8fafb]">
          {activeView === 'overview' && (
            <div className="animate-fade-in space-y-6 md:space-y-12">
              <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
                <div className="w-full md:w-auto">
                  <div className="flex items-center gap-3 md:gap-5 text-emerald-600 font-black text-[8px] md:text-[11px] mb-3 md:mb-6 uppercase tracking-[0.3em] md:tracking-[0.5em]">
                    <span className="w-8 md:w-14 h-[2px] bg-emerald-600"></span>
                    System Intelligence
                  </div>
                  <h1 className="text-2xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight md:leading-none mb-3 md:mb-6">
                    {content.welcome.split(',')[0]} <span className="text-gradient-accent">{content.welcome.split(',')[1]}</span>
                  </h1>
                  <p className="text-slate-500 font-medium text-xs md:text-lg max-w-xl">{content.subtitle}</p>
                </div>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {content.stats.map((stat, i) => (
                  <div key={i} className={`glass p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border-l-4 md:border-l-8 ${stat.border} hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500`}>
                    <div className="flex items-center justify-between mb-3 md:mb-6">
                      <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center text-base md:text-2xl shadow-inner`}>
                        <i className={`fas ${stat.icon}`}></i>
                      </div>
                      <span className={`text-[7px] md:text-[10px] font-black text-${stat.color}-600 bg-${stat.color}-50 px-2 md:px-3 py-1 rounded-full`}>{stat.change}</span>
                    </div>
                    <h3 className="text-xl md:text-5xl font-black text-slate-900 mb-0.5 md:mb-2">{stat.value}</h3>
                    <p className="text-slate-400 text-[7px] md:text-xs font-black uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Department Categories Grid */}
              <div className="space-y-3 md:space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm md:text-xl font-bold text-slate-900">Department Categories</h3>
                  <p className="text-slate-400 text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">Click to view reports</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-2 md:gap-4">
                  {categories.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setActiveView('reports');
                      }}
                      className={`p-2.5 md:p-6 rounded-[1rem] md:rounded-[2rem] border ${cat.bg} ${cat.border} hover:shadow-xl hover:-translate-y-1 transition-all group text-center flex flex-col items-center gap-1.5 md:gap-4`}
                    >
                      <div className={`w-7 h-7 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-white shadow-sm flex items-center justify-center ${cat.color} text-[10px] md:text-2xl group-hover:scale-110 transition-transform`}>
                        <i className={`fas ${cat.icon}`}></i>
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-black text-[5px] md:text-[10px] uppercase tracking-wider text-slate-800 leading-tight">
                          {cat.name}
                        </p>
                        <p className="text-[4px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          {reports.filter(r => r.category === cat.name).length} Reports
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
                <div className="lg:col-span-2 space-y-4 md:space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">{content.quickActions.title}</h2>
                  </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {content.quickActions.items.map((action, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveView(action.id)}
                      className="glass p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] text-left hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100 transition-all group border-white/60"
                    >
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-900 text-white flex items-center justify-center text-base md:text-xl mb-3 md:mb-6 group-hover:bg-emerald-600 transition-colors">
                        <i className={`fas ${action.icon}`}></i>
                      </div>
                      <h3 className="text-sm md:text-xl font-black text-slate-900 mb-1 md:mb-2">{action.title}</h3>
                      <p className="text-slate-500 text-[9px] md:text-sm font-medium">{action.desc}</p>
                    </button>
                  ))}
                </div>
                </div>

                <div className="space-y-4 md:space-y-8">
                  <h2 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">{content.recentActivity.title}</h2>
                  <div className="glass p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] space-y-4 md:space-y-8 border-white/60">
                    {content.recentActivity.items.map((item, i) => (
                      <div key={i} className="flex gap-3 md:gap-6">
                        <div className={`h-8 md:h-12 w-1 md:w-1.5 rounded-full bg-${item.type}-500 shrink-0`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-slate-800 font-bold text-xs md:text-base">{item.text}</p>
                            {item.dept && (
                              <span className="text-[6px] md:text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200">
                                {item.dept}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-[8px] md:text-xs font-bold uppercase tracking-widest">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'reports' && (
          <div className="animate-fade-in space-y-6 md:space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
              <div className="w-full md:w-auto">
                <div className="flex items-center gap-3 md:gap-5 text-blue-600 font-black text-[8px] md:text-[11px] mb-3 md:mb-6 uppercase tracking-[0.3em] md:tracking-[0.5em]">
                  <span className="w-8 md:w-14 h-[2px] bg-blue-600"></span>
                  Operations
                </div>
                <h1 className="text-2xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight md:leading-none mb-3 md:mb-6">
                  Service <span className="text-gradient-accent">Log</span>
                </h1>
                {selectedCategory !== 'All' && (
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className="flex items-center gap-2 text-[7px] md:text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <i className="fas fa-times-circle"></i>
                    Filtered by {selectedCategory} • Clear Filter
                  </button>
                )}
              </div>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full md:w-auto">
                <div className="relative w-full sm:w-auto">
                  <label htmlFor="report-category-filter" className="sr-only">Filter by Category</label>
                  <select 
                    id="report-category-filter"
                    name="category"
                    className="w-full px-4 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl bg-white border border-slate-200 text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-sm outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <button className="w-full sm:w-auto px-4 md:px-6 py-2.5 md:py-4 rounded-xl md:rounded-2xl bg-slate-900 text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 md:gap-3 hover:bg-slate-800 transition-colors">
                  <i className="fas fa-file-export"></i>
                  Export CSV
                </button>
              </div>
            </header>

            <div className="grid gap-4 md:gap-6">
              {filteredReports.map((report) => (
                <div key={report.id} className="glass p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col lg:flex-row lg:items-center justify-between border-white/60 group hover:shadow-premium transition-all duration-500 gap-4 md:gap-6">
                  <div className="flex items-start md:items-center gap-4 md:gap-8">
                    <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center text-base md:text-xl shadow-lg ${
                      report.status === 'critical' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <i className={`fas ${
                        categories.find(c => c.name === report.category)?.icon || 'fa-file-alt'
                      }`}></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-1 md:mb-2">
                        <span className="text-[7px] md:text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 md:px-3 py-0.5 md:py-1 rounded-lg border border-slate-200">
                          {report.id}
                        </span>
                        <span className="text-slate-400 text-[7px] md:text-[10px] font-bold uppercase tracking-wider truncate">
                          <i className="far fa-user mr-1 md:mr-2 text-blue-500"></i> {report.user}
                        </span>
                      </div>
                      <h3 className="text-base md:text-xl font-black text-slate-900 mb-0.5 md:mb-1">{report.category}</h3>
                      <p className="text-slate-500 text-[10px] md:text-sm font-medium mb-2 md:mb-3 line-clamp-2">{report.description}</p>
                      {report.assignedDept && (
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                          <span className="text-[7px] md:text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-lg border border-emerald-100 flex items-center gap-1 md:gap-2">
                            <i className="fas fa-building"></i>
                            {report.assignedDept}
                          </span>
                          {report.assignedStaff && (
                            <span className="text-[7px] md:text-[9px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 md:px-3 py-0.5 md:py-1 rounded-lg border border-blue-100 flex items-center gap-1 md:gap-2">
                              <i className="fas fa-user-check"></i>
                              {staff.find(s => s.id === report.assignedStaff)?.name || 'Assigned'}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-3 md:gap-8 border-t lg:border-t-0 border-slate-100 pt-3 md:pt-0">
                    <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                      <span className={`px-2.5 md:px-5 py-1 md:py-2 rounded-lg md:rounded-xl text-[7px] md:text-[9px] font-black uppercase tracking-widest border ${
                        report.status === 'critical' ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200' : 
                        report.status === 'progress' ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-200' : 
                        report.status === 'resolved' ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-200' : 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-200'
                      }`}>
                        {report.status}
                      </span>
                      <div className="flex items-center gap-1.5 sm:hidden">
                        {report.status !== 'resolved' && (
                          <button 
                            onClick={() => handleAction(report.id, 'approve')}
                            className={`w-8 h-8 rounded-lg text-white transition-all flex items-center justify-center shadow-lg ${
                              report.status === 'progress' 
                                ? 'bg-emerald-600 shadow-emerald-200' 
                                : 'bg-blue-600 shadow-blue-200'
                            }`}
                          >
                            <i className="fas fa-arrow-right text-[10px]"></i>
                          </button>
                        )}
                        {report.status === 'progress' && (
                          <button 
                            onClick={() => handleAction(report.id, 'resolve')}
                            className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200"
                          >
                            <i className="fas fa-check-double text-[10px]"></i>
                          </button>
                        )}
                        <button 
                          onClick={() => handleAction(report.id, 'delete')}
                          className="w-8 h-8 rounded-lg bg-white text-rose-500 border border-rose-100 flex items-center justify-center"
                        >
                          <i className="fas fa-trash-can text-[10px]"></i>
                        </button>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2">
                      {report.status !== 'resolved' && (
                        <button 
                          onClick={() => handleAction(report.id, 'approve')}
                          className={`px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-white transition-all flex items-center justify-center gap-2 shadow-lg group/btn ${
                            report.status === 'progress' 
                              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' 
                              : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                          }`}
                        >
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                            {report.status === 'progress' ? 'Reassign' : 'Assign'}
                          </span>
                          <i className="fas fa-arrow-right text-[8px] md:text-[10px] group-hover/btn:translate-x-1 transition-transform"></i>
                        </button>
                      )}
                      {report.status === 'progress' && (
                        <button 
                          onClick={() => handleAction(report.id, 'resolve')}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center justify-center shadow-lg shadow-emerald-200"
                        >
                          <i className="fas fa-check-double text-sm md:text-base"></i>
                        </button>
                      )}
                      <button 
                        onClick={() => handleAction(report.id, 'delete')}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center"
                      >
                        <i className="fas fa-trash-can text-sm md:text-base"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'alerts' && (
          <div className="animate-fade-in space-y-6 md:space-y-12">
            <header>
              <div className="flex items-center gap-3 md:gap-5 text-rose-600 font-black text-[8px] md:text-[11px] mb-3 md:mb-6 uppercase tracking-[0.3em] md:tracking-[0.5em]">
                <span className="w-8 md:w-14 h-[2px] bg-rose-600"></span>
                Emergency Broadcast
              </div>
              <h1 className="text-2xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight md:leading-none mb-3 md:mb-6">
                System <span className="text-rose-600">Alerts</span>
              </h1>
            </header>

            <div className="max-w-2xl glass p-5 md:p-12 rounded-[1.5rem] md:rounded-[3.5rem] border-rose-100 bg-rose-50/20">
              <form onSubmit={handleLaunchAlert} className="space-y-4 md:space-y-8">
                <div>
                  <label className="block text-slate-400 font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-4">Target Audience</label>
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    {['all', 'staff', 'critical'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setAlertData({...alertData, type})}
                        className={`py-2.5 md:py-4 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest border transition-all ${
                          alertData.type === type ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-500 border-slate-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="alert-message" className="block text-slate-400 font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-4">Broadcast Message</label>
                  <textarea 
                    id="alert-message"
                    name="message"
                    required
                    value={alertData.message}
                    onChange={(e) => setAlertData({...alertData, message: e.target.value})}
                    className="w-full h-32 md:h-48 bg-white rounded-[1.2rem] md:rounded-[2rem] border border-slate-100 p-4 md:p-8 outline-none focus:ring-4 focus:ring-rose-100 transition-all font-medium text-slate-700 text-xs md:text-base"
                    placeholder="Enter the emergency message to be broadcasted to all citizens..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-4 md:py-6 rounded-xl md:rounded-[2rem] bg-rose-600 text-white font-black uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-2xl shadow-rose-200 hover:bg-rose-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 md:gap-4 text-[9px] md:text-base">
                  <i className="fas fa-tower-broadcast animate-pulse"></i>
                  Launch Protocol
                </button>
              </form>
            </div>
          </div>
        )}

        {activeView === 'staff' && (
          <div className="animate-fade-in space-y-6 md:space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
              <div className="w-full md:w-auto">
                <div className="flex items-center gap-3 md:gap-5 text-emerald-600 font-black text-[8px] md:text-[11px] mb-3 md:mb-6 uppercase tracking-[0.3em] md:tracking-[0.5em]">
                  <span className="w-8 md:w-14 h-[2px] bg-emerald-600"></span>
                  Human Resources
                </div>
                <h1 className="text-2xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight md:leading-none mb-3 md:mb-6">
                  Staff <span className="text-gradient-accent">Portal</span>
                </h1>
              </div>
              <button 
                onClick={() => setActiveModal('add-staff')}
                className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-[#004d40] text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-200 flex items-center justify-center gap-2.5 hover:-translate-y-1 transition-all"
              >
                <i className="fas fa-user-plus"></i>
                Add Member
              </button>
            </header>

            <div className="grid gap-4 md:gap-6">
              {staff.map((member) => (
                <div key={member.id} className="glass p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col lg:flex-row lg:items-center justify-between border-white/60 gap-4 md:gap-6">
                  <div className="flex items-start md:items-center gap-3 md:gap-6">
                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-emerald-50 text-emerald-600 flex-shrink-0 flex items-center justify-center text-lg md:text-2xl shadow-inner">
                      <i className="fas fa-user-tie"></i>
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 md:gap-3 mb-0.5 md:mb-1">
                        <h3 className="text-base md:text-xl font-black text-slate-900 truncate">{member.name}</h3>
                        <span className="text-[7px] md:text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">{member.id}</span>
                      </div>
                      <p className="text-slate-500 text-[8px] md:text-sm font-bold uppercase tracking-wider truncate">{member.role} • {member.department}</p>
                      <p className="text-slate-400 text-[8px] md:text-xs mt-0.5 md:mt-1"><i className="fas fa-phone mr-1 md:mr-2"></i>{member.phone}</p>
                    </div>
                  </div>
                    <div className="flex items-center gap-2 md:gap-4 border-t lg:border-t-0 border-slate-100 pt-3 md:pt-0">
                    <button 
                      onClick={() => {
                        setAssignmentData({ staffId: member.id, role: member.role, department: member.department });
                        setActiveModal('assign-role');
                      }}
                      className="flex-1 lg:flex-none px-2.5 md:px-4 py-2 md:py-2 rounded-lg md:rounded-xl bg-blue-50 text-blue-600 border border-blue-100 text-[7px] md:text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap"
                    >
                      <i className="fas fa-tasks mr-1 md:mr-2"></i>
                      Assign
                    </button>
                    <select 
                      value={member.status}
                      onChange={(e) => updateStaffStatus(member.id, e.target.value)}
                      className={`flex-1 lg:flex-none px-2.5 md:px-4 py-2 md:py-2 rounded-lg md:rounded-xl text-[7px] md:text-[10px] font-black uppercase tracking-widest border outline-none transition-all ${
                        member.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                      }`}
                    >
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                    </select>
                    <button 
                      onClick={() => removeStaff(member.id)}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shrink-0"
                    >
                      <i className="fas fa-trash-can text-xs md:text-base"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {activeModal === 'assign-role' && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
                <div className="bg-white w-full max-w-md rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl animate-modal-up my-auto max-h-[90dvh] overflow-y-auto no-scrollbar">
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg md:text-xl">
                      <i className="fas fa-user-gear"></i>
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Assign Duty</h2>
                      <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Update Role & Department</p>
                    </div>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    assignStaffRole(assignmentData.staffId, assignmentData.role, assignmentData.department);
                    setActiveModal(null);
                    toast.success("Staff assignment updated successfully.");
                  }} className="space-y-4 md:space-y-6">
                    <div>
                      <label htmlFor="assign-role" className="block text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">Assign Role</label>
                      <select 
                        id="assign-role"
                        name="role"
                        required
                        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-xs md:text-sm appearance-none cursor-pointer"
                        value={assignmentData.role}
                        onChange={(e) => setAssignmentData({...assignmentData, role: e.target.value})}
                      >
                        {availableRoles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="assign-department" className="block text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">Assign Department</label>
                      <select 
                        id="assign-department"
                        name="department"
                        required
                        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-xs md:text-sm appearance-none cursor-pointer"
                        value={assignmentData.department}
                        onChange={(e) => setAssignmentData({...assignmentData, department: e.target.value})}
                      >
                        {availableDepartments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-3 md:gap-4 pt-4 md:pt-6">
                      <button 
                        type="button" 
                        onClick={() => setActiveModal(null)} 
                        className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-100 text-slate-500 font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-slate-200 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-[9px] md:text-[10px] shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeModal === 'add-staff' && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
                <div className="bg-white w-full max-w-md rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl animate-modal-up my-auto max-h-[90dvh] overflow-y-auto no-scrollbar">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 md:mb-8 tracking-tight">Add Member</h2>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    addStaff(newStaff);
                    setNewStaff({ name: '', role: '', department: '', phone: '' });
                    setActiveModal(null);
                    toast.success("New staff member added.");
                  }} className="space-y-4 md:space-y-6">
                    <div>
                      <label htmlFor="staff-name" className="block text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 ml-2">Full Name</label>
                      <input 
                        id="staff-name"
                        name="name"
                        required placeholder="Full Name" 
                        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-bold text-xs md:text-sm"
                        value={newStaff.name} onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="staff-role" className="block text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 ml-2">Select Role</label>
                      <select 
                        id="staff-role"
                        name="role"
                        required
                        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-bold text-xs md:text-sm appearance-none cursor-pointer"
                        value={newStaff.role} onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                      >
                        <option value="" disabled>Select Role</option>
                        {availableRoles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="staff-department" className="block text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 ml-2">Select Department</label>
                      <select 
                        id="staff-department"
                        name="department"
                        required
                        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-bold text-xs md:text-sm appearance-none cursor-pointer"
                        value={newStaff.department} onChange={(e) => setNewStaff({...newStaff, department: e.target.value})}
                      >
                        <option value="" disabled>Select Department</option>
                        {availableDepartments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="staff-phone" className="block text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 ml-2">Phone Number</label>
                      <input 
                        id="staff-phone"
                        name="phone"
                        required placeholder="Phone Number" 
                        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-bold text-xs md:text-sm"
                        value={newStaff.phone} onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-3 md:gap-4 pt-4 md:pt-6">
                      <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-100 text-slate-500 font-black uppercase tracking-widest text-[9px] md:text-[10px]">Cancel</button>
                      <button type="submit" className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl bg-[#004d40] text-white font-black uppercase tracking-widest text-[9px] md:text-[10px] shadow-lg shadow-emerald-200">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === 'users' && (
          <div className="animate-fade-in space-y-8 md:space-y-12">
            <header>
              <div className="flex items-center gap-3 md:gap-5 text-indigo-600 font-black text-[9px] md:text-[11px] mb-4 md:mb-6 uppercase tracking-[0.3em] md:tracking-[0.5em]">
                <span className="w-8 md:w-14 h-[2px] bg-indigo-600"></span>
                Community
              </div>
              <h1 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 md:mb-6">
                Registered <span className="text-indigo-600">Citizens</span>
              </h1>
            </header>

            <div className="grid gap-4 md:gap-6">
              {citizens.map((citizen) => (
                <div key={citizen.id} className="glass p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col sm:flex-row items-start sm:items-center justify-between border-white/60 gap-6">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-indigo-50 text-indigo-600 flex-shrink-0 flex items-center justify-center text-lg md:text-2xl border-2 border-white shadow-sm">
                      {citizen.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg md:text-xl font-black text-slate-900 mb-0.5 md:mb-1 truncate">{citizen.name}</h3>
                      <p className="text-slate-500 text-xs md:text-sm font-medium truncate">{citizen.email}</p>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                          {citizen.reports} Reports
                        </span>
                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">
                          Joined {citizen.joinDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeCitizen(citizen.id)}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-sm self-end sm:self-auto"
                  >
                    <i className="fas fa-user-slash text-sm md:text-base"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'chats' && (
          <div className="animate-fade-in h-[calc(100vh-120px)] md:h-[calc(100vh-160px)] flex flex-col space-y-6 md:space-y-8">
            <header>
              <div className="flex items-center gap-3 md:gap-5 text-blue-600 font-black text-[9px] md:text-[11px] mb-4 md:mb-6 uppercase tracking-[0.3em] md:tracking-[0.5em]">
                <span className="w-8 md:w-14 h-[2px] bg-blue-600"></span>
                Communication
              </div>
              <h1 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                Public <span className="text-gradient-accent">Feedback</span>
              </h1>
            </header>

            <div className="flex-1 glass rounded-[1.5rem] md:rounded-[3rem] border-white/60 overflow-hidden flex flex-col shadow-inner bg-white/40">
                <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-3 md:space-y-6 no-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] md:max-w-[70%] p-3 md:p-6 rounded-[1rem] md:rounded-[2rem] ${
                      msg.isAdmin 
                        ? 'bg-[#004d40] text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
                    }`}>
                      {!msg.isAdmin && <p className="text-[7px] md:text-[9px] font-black uppercase tracking-widest mb-1 md:mb-2 opacity-50">{msg.sender}</p>}
                      <p className="font-medium leading-relaxed text-xs md:text-base">{msg.text}</p>
                      <p className={`text-[6px] md:text-[8px] mt-1 md:mt-2 font-bold uppercase tracking-widest ${msg.isAdmin ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 md:p-8 bg-white border-t border-slate-50">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!chatMessage.trim()) return;
                  sendMessage({ sender: 'Admin', text: chatMessage, isAdmin: true });
                  setChatMessage('');
                }} className="flex gap-2 md:gap-4">
                  <div className="flex-1 relative">
                    <label htmlFor="chat-message" className="sr-only">Type your response</label>
                    <input 
                      id="chat-message"
                      name="message"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Response..."
                      className="w-full px-4 md:px-8 py-2.5 md:py-5 rounded-lg md:rounded-[2rem] bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-medium text-xs md:text-base"
                    />
                  </div>
                  <button type="submit" className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#004d40] text-white flex-shrink-0 flex items-center justify-center shadow-lg shadow-emerald-200 hover:scale-105 active:scale-95 transition-all">
                    <i className="fas fa-paper-plane text-xs md:text-xl"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeView === 'settings' && (
          <div className="animate-fade-in space-y-8 md:space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="w-full md:w-auto">
                <div className="flex items-center gap-3 md:gap-5 text-slate-600 font-black text-[9px] md:text-[11px] mb-4 md:mb-6 uppercase tracking-[0.3em] md:tracking-[0.5em]">
                  <span className="w-8 md:w-14 h-[2px] bg-slate-600"></span>
                  Configuration
                </div>
                <h1 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 md:mb-6">
                  System <span className="text-slate-600">Settings</span>
                </h1>
              </div>
            </header>
            <div className="glass p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border-white/60 text-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <i className="fas fa-sliders text-2xl md:text-4xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 md:mb-4">System Configuration</h3>
              <p className="text-slate-500 font-medium text-sm md:text-base">Global system parameters and user permissions can be configured here.</p>
            </div>
          </div>
        )}

        {activeModal === 'assignReport' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white w-full max-w-md rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl animate-modal-up my-auto max-h-[90dvh] overflow-y-auto no-scrollbar">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg md:text-xl">
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Assign Work</h2>
                  <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Select Department & Team</p>
                </div>
              </div>

              <form onSubmit={async (e) => {
                e.preventDefault();
                const report = reports.find(r => r.id === reportAssignment.reportId);
                assignReport(reportAssignment.reportId, reportAssignment.department, reportAssignment.staffId, reportAssignment.comment);
                
                // Send notification email
                if (report) {
                  sendAssignmentEmail(report, reportAssignment.department, reportAssignment.comment)
                    .catch(err => console.error("Assignment email failed:", err));
                }

                setActiveModal(null);
                toast.success("Work assigned successfully.");
              }} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="assign-dept" className="block text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">Responsible Department</label>
                  <select 
                    id="assign-dept"
                    name="department"
                    required
                    className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-bold text-xs md:text-sm appearance-none cursor-pointer"
                    value={reportAssignment.department}
                    onChange={(e) => setReportAssignment({...reportAssignment, department: e.target.value})}
                  >
                    {availableDepartments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="assign-staff" className="block text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">Assign Lead Personnel</label>
                  <select 
                    id="assign-staff"
                    name="staffId"
                    className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-bold text-xs md:text-sm appearance-none cursor-pointer"
                    value={reportAssignment.staffId}
                    onChange={(e) => setReportAssignment({...reportAssignment, staffId: e.target.value})}
                  >
                    <option value="">Select Staff (Optional)</option>
                    {staff
                      .filter(s => s.department === reportAssignment.department && s.status === 'active')
                      .map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                      ))
                    }
                  </select>
                </div>

                <div>
                  <label htmlFor="assign-comment" className="block text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">Admin Instructions / Updates</label>
                  <textarea 
                    id="assign-comment"
                    name="comment"
                    placeholder="Enter instructions for the team or update for the citizen..."
                    className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-medium text-xs md:text-sm min-h-[100px] resize-none"
                    value={reportAssignment.comment}
                    onChange={(e) => setReportAssignment({...reportAssignment, comment: e.target.value})}
                  />
                </div>

                <div className="flex gap-3 md:gap-4 pt-2 md:pt-4">
                  <button 
                    type="button" 
                    onClick={() => setActiveModal(null)} 
                    className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-100 text-slate-500 font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl bg-emerald-600 text-white font-black uppercase tracking-widest text-[9px] md:text-[10px] shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeModal === 'resolveReport' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white w-full max-w-md rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl animate-modal-up my-auto max-h-[90dvh] overflow-y-auto no-scrollbar">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-lg md:text-xl">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Resolve Report</h2>
                  <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Mark as Completed</p>
                </div>
              </div>

              <form onSubmit={async (e) => {
                e.preventDefault();
                const report = reports.find(r => r.id === resolutionData.reportId);
                updateReportStatus(resolutionData.reportId, 'resolved', resolutionData.comment);
                
                // Send notification email
                if (report) {
                  sendResolutionEmail(report, resolutionData.comment)
                    .catch(err => console.error("Resolution email failed:", err));
                }

                setActiveModal(null);
                toast.success("Report marked as resolved.");
              }} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="resolve-comment" className="block text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-3 ml-2">Resolution Note</label>
                  <textarea 
                    id="resolve-comment"
                    name="comment"
                    placeholder="Describe how the issue was resolved..."
                    required
                    className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-green-100 transition-all font-medium text-xs md:text-sm min-h-[120px] resize-none"
                    value={resolutionData.comment}
                    onChange={(e) => setResolutionData({...resolutionData, comment: e.target.value})}
                  />
                </div>

                <div className="flex gap-3 md:gap-4 pt-2 md:pt-4">
                  <button 
                    type="button" 
                    onClick={() => setActiveModal(null)} 
                    className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-100 text-slate-500 font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl bg-green-600 text-white font-black uppercase tracking-widest text-[9px] md:text-[10px] shadow-lg shadow-green-200 hover:bg-green-700 transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
);
};

export default AdminDashboard;
