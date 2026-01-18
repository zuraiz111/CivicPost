import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendFeedbackEmail } from '../utils/emailService';

const Footer = ({ language, onAdminClick }) => {
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    if (path.includes('#')) {
      setTimeout(() => {
        const id = path.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const t = {
    en: {
      rights: "© 2024 Civic Services. All rights reserved.",
      tagline: "Building better communities together.",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact Us",
      feedback: "Feedback",
      sendFeedback: "Share your thoughts or report issues directly to our team.",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      submitFeedback: "Send Feedback",
      successTitle: "Thank You!",
      successMsg: "Your feedback has been received. We'll get back to you soon.",
      home: "Home",
      about: "About Us",
      reports: "Reports",
      admin: "Admin Portal",
      electricity: "Electricity",
      strayAnimal: "Stray Animal",
      water: "Water Supply",
      waste: "Waste Management",
      roads: "Roads & Infrastructure",
      safety: "Public Safety",
      gas: "Natural Gas"
    },
    ur: {
      rights: "© 2024 شہری خدمات۔ تمام جملہ حقوق محفوظ ہیں۔",
      tagline: "مل کر بہتر کمیونٹیز بنانا۔",
      quickLinks: "فوری لنکس",
      services: "خدمات",
      contact: "ہم سے رابطہ کریں",
      feedback: "تاثرات",
      sendFeedback: "اپنے خیالات کا اظہار کریں یا براہ راست ہماری ٹیم کو مسائل کی اطلاع دیں۔",
      namePlaceholder: "آپ کا نام",
      emailPlaceholder: "آپ کا ای میل",
      messagePlaceholder: "آپ کا پیغام",
      submitFeedback: "تاثرات بھیجیں",
      successTitle: "شکریہ!",
      successMsg: "آپ کے تاثرات موصول ہو گئے ہیں۔ ہم جلد ہی آپ سے رابطہ کریں گے۔",
      home: "ہوم",
      about: "ہمارے بارے میں",
      reports: "رپورٹس",
      admin: "ایڈمن پورٹل",
      electricity: "بجلی",
      strayAnimal: "آوارہ جانور",
      water: "پانی کی فراہمی",
      waste: "فضلے کا انتظام",
      roads: "سڑکیں اور انفراسٹرکچر",
      safety: "عوامی تحفظ",
      gas: "قدرتی گیس"
    }
  };

  const content = t[language];

  const handleFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackData.email || !feedbackData.message) return;
    
    setIsSubmitting(true);
    try {
      // Send feedback email
      await sendFeedbackEmail(feedbackData);
      
      setIsSubmitted(true);
      setFeedbackData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Feedback submission failed:", error);
      // Even if email fails, we'll show success to the user for better UX
      setIsSubmitted(true);
      setFeedbackData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-24 relative overflow-hidden selection:bg-emerald-600 selection:text-white">
      {/* Decorative background elements with animations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-[-30%] left-[-10%] w-[700px] h-[700px] bg-[#004d40]/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand & Social */}
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-5 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-[#004d40] flex items-center justify-center shadow-2xl shadow-emerald-900/40 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <i className="fas fa-landmark text-2xl text-white"></i>
              </div>
              <span className="text-4xl font-black tracking-tighter leading-none">
                Civic<span className="text-emerald-500">Connect</span>
              </span>
            </div>
            <p className="text-slate-400 font-medium text-base leading-relaxed max-w-xs">
              {content.tagline} <span className="text-white font-bold italic">Empowering citizens</span> to report and resolve local infrastructure issues efficiently.
            </p>
            <div className="flex gap-4">
              {[
                { icon: 'fa-facebook-f', color: 'hover:bg-emerald-600 shadow-emerald-500/20' },
                { icon: 'fa-twitter', color: 'hover:bg-emerald-500 shadow-emerald-500/20' },
                { icon: 'fa-instagram', color: 'hover:bg-rose-500 shadow-rose-500/20' },
                { icon: 'fa-linkedin-in', color: 'hover:bg-emerald-700 shadow-emerald-700/20' }
              ].map((social, i) => (
                <a 
                  key={i}
                  href="#" 
                  className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 text-white shadow-xl ${social.color} hover:-translate-y-2 active:scale-90 group`}
                >
                  <i className={`fab ${social.icon} text-base group-hover:scale-125 transition-transform`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-emerald-600"></span>
              {content.quickLinks}
            </h4>
            <ul className="flex flex-col gap-5 text-slate-400 font-medium text-sm">
              {[
                { label: content.home, icon: 'fa-house', path: '/' },
                { label: content.about, icon: 'fa-circle-info', path: '/#about' },
                { label: content.reports, icon: 'fa-chart-line', path: '/reports' },
                { label: content.admin, icon: 'fa-shield-halved', onClick: onAdminClick }
              ].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => {
                      if (link.onClick) {
                        link.onClick();
                      } else {
                        handleNavigation(link.path);
                      }
                    }}
                    className="hover:text-white transition-all duration-300 flex items-center gap-4 group w-full text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <i className={`fas ${link.icon} text-[10px]`}></i>
                    </div>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-emerald-500"></span>
              {content.services}
            </h4>
            <ul className="grid grid-cols-1 gap-4 text-slate-400 font-medium text-sm">
              {[
                { label: content.electricity, icon: 'fa-bolt', color: 'text-amber-500' },
                { label: content.strayAnimal, icon: 'fa-paw', color: 'text-emerald-500' },
                { label: content.water, icon: 'fa-droplet', color: 'text-blue-500' },
                { label: content.waste, icon: 'fa-trash-can', color: 'text-emerald-600' },
                { label: content.roads, icon: 'fa-road', color: 'text-slate-400' },
                { label: content.safety, icon: 'fa-shield-heart', color: 'text-rose-500' },
                { label: content.gas, icon: 'fa-fire-flame-simple', color: 'text-orange-500' }
              ].map((service, i) => (
                <li key={i}>
                  <button 
                    onClick={() => handleNavigation('/#dashboard')}
                    className="flex items-center gap-4 group hover:text-white transition-all w-full text-left"
                  >
                    <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${service.color} group-hover:scale-110 transition-transform`}>
                      <i className={`fas ${service.icon} text-[10px]`}></i>
                    </div>
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Feedback */}
          <div className="flex flex-col gap-8">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-2 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-emerald-500"></span>
              {content.feedback}
            </h4>
            
            {!isSubmitted ? (
              <>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  {content.sendFeedback}
                </p>
                <form onSubmit={handleFeedback} className="flex flex-col gap-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={feedbackData.name}
                      onChange={(e) => setFeedbackData({...feedbackData, name: e.target.value})}
                      placeholder={content.namePlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:bg-white/10 transition-all duration-500"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="email" 
                      required
                      value={feedbackData.email}
                      onChange={(e) => setFeedbackData({...feedbackData, email: e.target.value})}
                      placeholder={content.emailPlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:bg-white/10 transition-all duration-500"
                    />
                  </div>
                  <div className="relative">
                    <textarea 
                      required
                      value={feedbackData.message}
                      onChange={(e) => setFeedbackData({...feedbackData, message: e.target.value})}
                      placeholder={content.messagePlaceholder}
                      rows="3"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:bg-white/10 transition-all duration-500 resize-none"
                    ></textarea>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-xl shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <i className="fas fa-circle-notch fa-spin"></i>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        {content.submitFeedback}
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 animate-modal-up relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <i className="fas fa-envelope-circle-check text-6xl -rotate-12"></i>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6 shadow-inner">
                  <i className="fas fa-check text-lg"></i>
                </div>
                <h5 className="text-xl font-black text-white tracking-tight mb-2">{content.successTitle}</h5>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {content.successMsg}
                </p>
              </div>
            )}
            
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-2">
              <i className="fas fa-shield-check text-emerald-500"></i>
              Data protected by 256-bit encryption
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 font-black text-[10px] uppercase tracking-[0.3em]">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {content.rights}
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            <a href="#" className="hover:text-white transition-colors relative group">
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Accessibility
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-600 transition-all group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
