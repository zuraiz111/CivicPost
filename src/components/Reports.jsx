import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Reports = ({ language, isFullPage = false }) => {
  const navigate = useNavigate();
  const allReports = useStore((state) => state.reports);
  
  const reports = isFullPage ? allReports : allReports.slice(0, 4);

  const categories = [
    { id: "Electricity", icon: "fa-bolt", ur: "بجلی" },
    { id: "Water Supply", icon: "fa-droplet", ur: "پانی کی فراہمی" },
    { id: "Waste Management", icon: "fa-trash-can", ur: "کچرے کا انتظام" },
    { id: "Roads & Infrastructure", icon: "fa-road", ur: "سڑکیں اور انفراسٹرکچر" },
    { id: "Public Safety", icon: "fa-shield-heart", ur: "عوامی تحفظ" },
    { id: "Natural Gas", icon: "fa-fire-flame-simple", ur: "قدرتی گیس" },
    { id: "Stray Animal", icon: "fa-paw", ur: "آوارہ جانور" },
    { id: "Public Relations", icon: "fa-bullhorn", ur: "عوامی تعلقات" },
    { id: "Emergency Services", icon: "fa-truck-medical", ur: "ہنگامی خدمات" }
  ];

  const t = {
    en: {
      title: "Recent Reports",
      fullTitle: "All Service Reports",
      viewAll: "View All Reports",
      back: "Back to Home",
      assignedTo: "Assigned To",
      noTeam: "Not Assigned",
      update: "Admin Update",
      status: {
        pending: "Pending",
        progress: "In Progress",
        resolved: "Resolved",
        critical: "Critical"
      }
    },
    ur: {
      title: "حالیہ رپورٹس",
      fullTitle: "تمام سروس رپورٹس",
      viewAll: "تمام رپورٹس دیکھیں",
      back: "ہوم پر واپس جائیں",
      assignedTo: "تفویض کردہ",
      noTeam: "تفویض نہیں کیا گیا",
      update: "ایڈمن اپ ڈیٹ",
      status: {
        pending: "زیر التواء",
        progress: "جاری ہے",
        resolved: "حل شدہ",
        critical: "شدید"
      }
    }
  };

  const content = t[language];

  return (
    <section id="reports" className={`py-20 md:py-32 ${isFullPage ? 'bg-[#fdfdfd] min-h-screen' : 'bg-white'} relative overflow-hidden`}>
      {/* Decorative Background Elements */}
      {!isFullPage && (
        <>
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-50/50 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#004d40]/5 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </>
      )}

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
          <div className="animate-fade-in w-full md:w-auto">
            {isFullPage && (
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-900 hover:text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] mb-6 md:mb-8 transition-all group"
              >
                <i className="fas fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
                {content.back}
              </button>
            )}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#004d40] text-white text-[9px] md:text-[10px] font-black mb-4 md:mb-6 shadow-lg shadow-emerald-200/50 uppercase tracking-[0.2em]">
              <i className="fas fa-history"></i>
              Real-time Activity
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
              {isFullPage ? content.fullTitle : content.title}
            </h2>
          </div>
          {!isFullPage && (
            <button 
              onClick={() => navigate('/reports')}
              className="w-full md:w-auto px-6 md:px-8 py-3.5 md:py-4 rounded-2xl md:rounded-[1.5rem] bg-white border-2 border-slate-900 text-slate-900 font-black uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-3 group shadow-xl shadow-slate-200/50"
            >
              {content.viewAll} 
              <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
            </button>
          )}
        </div>

        <div className="grid gap-4 md:gap-6">
          {reports.map((report, index) => {
            const catInfo = categories.find(c => c.id === report.category);
            return (
              <div 
                key={report.id} 
                className="group bg-white p-4 md:p-7 rounded-[1.2rem] md:rounded-[2.2rem] shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 animate-fade-in border border-slate-100 border-b-[4px] md:border-b-8 border-b-slate-900"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  borderBottomColor: report.status === 'resolved' ? '#10b981' : report.status === 'progress' ? '#f59e0b' : report.status === 'critical' ? '#e11d48' : '#0f172a'
                }}
              >
                <div className="flex-1 flex items-start md:items-center gap-3 md:gap-6">
                  <div className={`shrink-0 w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-105 shadow-md ${
                    report.status === 'critical' ? 'bg-rose-50 text-rose-600 shadow-rose-100/50' : 
                    report.status === 'progress' ? 'bg-amber-50 text-amber-600 shadow-amber-100/50' : 
                    report.status === 'resolved' ? 'bg-emerald-50 text-emerald-600 shadow-emerald-100/50' : 'bg-slate-50 text-slate-900 shadow-slate-100/50'
                  }`}>
                    <i className={`fas text-base md:text-2xl ${catInfo?.icon || 'fa-file-alt'}`}></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-0.5 md:mb-1.5">
                      <span className="text-[7px] md:text-[10px] font-black tracking-[0.15em] uppercase text-slate-400">
                        Case #{report.id}
                      </span>
                      <span className="text-slate-400 text-[7px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-1 md:gap-1.5">
                        <i className="far fa-calendar-alt text-emerald-600"></i> {report.date}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-xl font-black text-slate-900 tracking-tight group-hover:text-[#004d40] transition-colors uppercase truncate">
                      {language === 'ur' ? catInfo?.ur : report.category}
                    </h3>
                    {report.adminComment && (
                      <p className="mt-1.5 md:mt-2.5 text-[9px] md:text-xs font-medium text-slate-500 bg-slate-50/80 p-2 md:p-3 rounded-lg md:rounded-xl border border-slate-100/50 italic">
                        <span className="font-black uppercase text-[6px] md:text-[8px] tracking-widest text-emerald-600 block mb-0.5 md:mb-1">{content.update}:</span>
                        &quot;{report.adminComment}&quot;
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-row md:flex-row items-center justify-between md:justify-end gap-3 md:gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-50">
                  <div className="flex flex-col items-start md:items-end shrink-0">
                    <span className={`px-2.5 md:px-4 py-1 md:py-1.5 rounded-full text-[7px] md:text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] shadow-sm ${
                      report.status === 'critical' ? 'bg-rose-600 text-white' : 
                      report.status === 'progress' ? 'bg-amber-500 text-white' : 
                      report.status === 'resolved' ? 'bg-[#004d40] text-white' : 'bg-slate-900 text-white'
                    }`}>
                      {content.status[report.status]}
                    </span>
                  </div>
                  <div className="w-[1px] h-6 md:h-10 bg-slate-100 hidden md:block"></div>
                  <div className="flex flex-col items-end md:items-start text-right md:text-left">
                    <span className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{content.assignedTo}</span>
                    <span className="text-[9px] md:text-xs font-black text-slate-900 uppercase truncate max-w-[100px] md:max-w-none">
                      {report.assignedDept || content.noTeam}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Reports;
