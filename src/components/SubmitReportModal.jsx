import React, { useState } from 'react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';
import { sendReportEmail } from '../utils/emailService';

const SubmitReportModal = ({ isOpen, onClose, language, initialCategory = "" }) => {
  const addReport = useStore((state) => state.addReport);
  const [formData, setFormData] = useState({
    category: initialCategory,
    description: "",
    location: "",
    priority: "normal"
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);

  const categories = [
    { id: "Electricity", en: "Electricity", ur: "بجلی" },
    { id: "Water Supply", en: "Water Supply", ur: "پانی کی فراہمی" },
    { id: "Waste Management", en: "Waste Management", ur: "کچرے کا انتظام" },
    { id: "Roads & Infrastructure", en: "Roads & Infrastructure", ur: "سڑکیں اور انفراسٹرکچر" },
    { id: "Public Safety", en: "Public Safety", ur: "عوامی تحفظ" },
    { id: "Natural Gas", en: "Natural Gas", ur: "قدرتی گیس" },
    { id: "Stray Animal", en: "Stray Animal", ur: "آوارہ جانور" },
    { id: "Public Relations", en: "Public Relations", ur: "عوامی تعلقات" },
    { id: "Emergency Services", en: "Emergency Services", ur: "ہنگامی خدمات" }
  ];

  const t = {
    en: {
      title: "Submit a New Report",
      category: "Service Category",
      description: "Description of the Issue",
      location: "Location / Address",
      priority: "Urgency Level",
      uploadImage: "Upload Photo of Issue",
      changeImage: "Change Photo",
      removeImage: "Remove",
      submit: "Submit Report",
      cancel: "Cancel",
      placeholderDesc: "Please provide details about the problem...",
      placeholderLoc: "e.g. Sector G-9, Main Street",
      priorities: {
        low: "Low",
        normal: "Normal",
        urgent: "Urgent"
      },
      success: {
        title: "Report Received!",
        subtitle: "Your report has been successfully logged into our system.",
        trackingId: "Tracking ID",
        status: "Initial Status",
        pending: "Pending Verification",
        close: "Close & Return",
        note: "Our team will review your report and assign it to the relevant department within 2 hours."
      }
    },
    ur: {
      title: "نئی رپورٹ جمع کروائیں",
      category: "سروس کا زمرہ",
      description: "مسئلے کی تفصیل",
      location: "مقام / پتہ",
      priority: "فوری ضرورت کی سطح",
      uploadImage: "مسئلے کی تصویر اپ لوڈ کریں",
      changeImage: "تصویر تبدیل کریں",
      removeImage: "ختم کریں",
      submit: "رپورٹ جمع کروائیں",
      cancel: "منسوخ کریں",
      placeholderDesc: "براہ کرم مسئلے کے بارے میں تفصیلات فراہم کریں...",
      placeholderLoc: "مثلاً سیکٹر جی-9، مین اسٹریٹ",
      priorities: {
        low: "کم",
        normal: "نارمل",
        urgent: "فوری"
      },
      success: {
        title: "رپورٹ موصول ہو گئی!",
        subtitle: "آپ کی رپورٹ کامیابی کے ساتھ ہمارے سسٹم میں درج کر لی گئی ہے۔",
        trackingId: "ٹریکنگ آئی ڈی",
        status: "ابتدائی حیثیت",
        pending: "تصدیق کے منتظر",
        close: "بند کریں اور واپس جائیں",
        note: "ہماری ٹیم آپ کی رپورٹ کا جائزہ لے گی اور اسے 2 گھنٹے کے اندر متعلقہ محکمے کو تفویض کر دے گی۔"
      }
    }
  };

  const content = t[language];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleClose = () => {
    setShowSuccess(false);
    setSubmittedReport(null);
    setFormData({
      category: initialCategory,
      description: "",
      location: "",
      priority: "normal"
    });
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newReport = {
        category: formData.category,
        description: formData.description,
        location: formData.location,
        urgency: formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1),
        user: "Guest User",
        date: new Date().toISOString().split('T')[0]
      };

      addReport(newReport);
      setSubmittedReport({ ...newReport, id: Math.random().toString(36).substr(2, 9).toUpperCase() });
      setShowSuccess(true);

      // Attempt to send email, but don't block the UI if it fails
      sendReportEmail(newReport).catch(err => console.error("Email send failed:", err));

      toast.success(language === 'en' ? "Report logged!" : "رپورٹ درج کر لی گئی ہے!", {
        duration: 2000,
        style: {
          borderRadius: '20px',
          background: '#004d40',
          color: '#fff',
          padding: '16px 24px',
          fontSize: '14px',
          fontWeight: '900',
        }
      });
    } catch {
      toast.error(language === 'en' ? "Failed to submit report" : "رپورٹ جمع کرانے میں ناکامی");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center p-2 md:p-4 overflow-y-auto items-start md:items-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] flex flex-col overflow-hidden animate-modal-up border-b-8 border-emerald-600 my-4 md:my-auto">
        {showSuccess ? (
          <div className="p-8 md:p-12 flex flex-col items-center text-center space-y-8 animate-fade-in">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl shadow-lg shadow-emerald-100 ring-8 ring-emerald-50">
              <i className="fas fa-check-circle"></i>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{content.success.title}</h2>
              <p className="text-slate-500 font-medium max-w-sm mx-auto">{content.success.subtitle}</p>
            </div>

            <div className="w-full bg-slate-50 rounded-3xl p-6 md:p-8 grid grid-cols-2 gap-6 border border-slate-100">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{content.success.trackingId}</p>
                <p className="text-xl font-black text-slate-900 tracking-tight">#{submittedReport?.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{content.success.status}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                  {content.success.pending}
                </div>
              </div>
              <div className="space-y-1 col-span-2 pt-4 border-t border-slate-200/60">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{content.category}</p>
                <p className="text-sm font-bold text-slate-700">{submittedReport?.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 text-left">
              <i className="fas fa-info-circle text-emerald-600 mt-1"></i>
              <p className="text-[11px] font-medium text-emerald-800 leading-relaxed">
                {content.success.note}
              </p>
            </div>

            <button 
              onClick={handleClose}
              className="w-full py-5 rounded-[1.5rem] bg-[#004d40] text-white font-black uppercase tracking-widest shadow-xl shadow-emerald-200/50 hover:scale-[1.02] transition-all active:scale-95"
            >
              {content.success.close}
            </button>
          </div>
        ) : (
          <>
            {/* Fixed Header */}
            <div className="p-6 md:p-10 pb-4 md:pb-6 flex-shrink-0">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] mb-2 uppercase tracking-[0.3em]">
                    <span className="badge-pulse">
                      <span className="badge-pulse-ping bg-emerald-400"></span>
                      <span className="badge-pulse-dot bg-emerald-600"></span>
                    </span>
                    Civic Connect
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                    {content.title.split(' ').map((word, i) => i === 0 ? word : <span key={i} className="text-emerald-600 ml-2">{word}</span>)}
                  </h2>
                </div>
                <button onClick={handleClose} className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-50 text-slate-400 hover:bg-[#004d40] hover:text-white transition-all duration-300 flex items-center justify-center group active:scale-90 shadow-sm border border-slate-100">
                  <i className="fas fa-times text-lg md:text-xl group-hover:rotate-90 transition-transform"></i>
                </button>
              </div>
            </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto flex-grow no-scrollbar p-6 md:p-10 pt-0">
          <form onSubmit={handleSubmit} id="reportForm" className="space-y-6 md:space-y-10">
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <label className="block text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4 ml-1">{content.category}</label>
                <div className="relative group">
                  <select 
                    required
                    className="input-standard appearance-none group-hover:bg-white pr-12"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23059669\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'3\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundPosition: 'right 1.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em' }}
                  >
                    <option value="">{language === 'en' ? "Select Category" : "زمرہ منتخب کریں"}</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat[language]}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4 ml-1">{content.priority}</label>
                <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200 group hover:bg-white transition-all duration-300">
                  {Object.entries(content.priorities).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData({...formData, priority: key})}
                      className={`flex-1 py-3 px-2 rounded-xl font-black text-[10px] transition-all uppercase tracking-widest ${
                        formData.priority === key 
                          ? 'bg-[#004d40] text-white shadow-lg shadow-emerald-100' 
                          : 'text-slate-400 hover:text-emerald-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4 ml-1">{content.location}</label>
              <div className="relative group">
                <i className="fas fa-location-dot absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors"></i>
                <input 
                  required
                  type="text" 
                  placeholder={content.placeholderLoc}
                  className="input-standard pl-14 group-hover:bg-white focus:border-emerald-500"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4 ml-1">{content.description}</label>
              <textarea 
                required
                rows="4"
                placeholder={content.placeholderDesc}
                className="input-standard group-hover:bg-white resize-none focus:border-emerald-500"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div>
              <label className="block text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4 ml-1">{content.uploadImage}</label>
              <div className="flex items-start gap-4">
                {!imagePreview ? (
                  <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all cursor-pointer group bg-slate-50">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:text-emerald-600 group-hover:rotate-6 mb-4 md:mb-6 transition-all duration-500 border border-slate-100">
                      <i className="fas fa-cloud-arrow-up text-2xl md:text-3xl"></i>
                    </div>
                    <span className="text-slate-900 font-black text-xs md:text-sm uppercase tracking-[0.2em]">{content.uploadImage}</span>
                    <span className="text-slate-400 text-[9px] md:text-[10px] mt-2 md:mt-3 font-black uppercase tracking-widest">PNG, JPG up to 10MB</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                ) : (
                  <div className="relative w-full group">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 md:h-72 object-cover rounded-[2rem] md:rounded-[3rem] border-4 border-white shadow-premium transition-all duration-700 group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] md:rounded-[3rem] flex items-center justify-center gap-4 md:gap-6 backdrop-blur-sm">
                      <label className="w-16 h-16 bg-white rounded-2xl text-emerald-600 hover:bg-emerald-600 hover:text-white shadow-2xl cursor-pointer transition-all duration-300 flex items-center justify-center active:scale-90">
                        <i className="fas fa-rotate text-xl"></i>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                      <button 
                        type="button"
                        onClick={removeImage}
                        className="w-16 h-16 bg-white rounded-2xl text-rose-600 hover:bg-rose-600 hover:text-white shadow-2xl transition-all duration-300 flex items-center justify-center active:scale-90"
                      >
                        <i className="fas fa-trash-can text-xl"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 md:p-10 pt-4 md:pt-0 border-t border-slate-50 flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <button 
            type="submit" 
            form="reportForm"
            disabled={isSubmitting}
            className="flex-[2] btn-premium-primary py-4 md:py-6 text-sm md:text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              <i className="fas fa-paper-plane text-sm"></i>
            )}
            {content.submit}
          </button>
          <button 
            type="button" 
            onClick={handleClose}
            className="flex-1 px-8 py-4 md:py-6 rounded-2xl md:rounded-3xl border-2 border-slate-100 text-slate-400 font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-slate-50 transition-all"
          >
            {content.cancel}
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubmitReportModal;
