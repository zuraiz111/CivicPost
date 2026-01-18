import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ language, setLanguage, isAdmin, onAdminClick, onLogout, onReportClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminPage) return null;

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
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

  const navLinks = [
    { name: 'Home', ur: 'ہوم', path: '/' },
    { name: 'About', ur: 'ہمارے بارے میں', path: '/#about' },
    { name: 'Categories', ur: 'زمرے', path: '/#dashboard' },
    { name: 'Activity', ur: 'سرگرمی', path: '/#reports' },
  ];

  const t = {
    en: {
      brand: "Civic",
      brandSub: "Connect",
      admin: "Admin Panel",
      report: "New Report",
      logout: "Logout"
    },
    ur: {
      brand: "سیوک",
      brandSub: "کنیکٹ",
      admin: "ایڈمن پینل",
      report: "نئی رپورٹ",
      logout: "لاگ آؤٹ"
    }
  };

  const content = t[language];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
      isScrolled ? 'py-4' : 'py-4 md:py-8'
    }`}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className={`relative flex items-center justify-between p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 ${
          isScrolled ? 'bg-white shadow-xl shadow-slate-200/50 border border-slate-100' : 'bg-transparent border-transparent'
        }`}>
          {/* Logo */}
          <button onClick={() => handleNavigation('/')} className="flex items-center gap-2 md:gap-3 group text-left">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#004d40] text-white flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:bg-emerald-600 transition-colors duration-500">
              <i className="fas fa-landmark text-lg md:text-xl group-hover:scale-110 transition-transform"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black text-slate-900 tracking-tighter leading-none uppercase">{content.brand}</span>
              <span className="text-[8px] md:text-[10px] font-black text-emerald-600 tracking-[0.3em] uppercase">{content.brandSub}</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.path)}
                className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                {language === 'ur' ? link.ur : link.name}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Switcher */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-100 hover:shadow-sm transition-all"
            >
              <i className="fas fa-globe text-xs md:text-sm"></i>
            </button>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-2 md:gap-3">
              <button 
                onClick={onReportClick}
                className="px-4 lg:px-6 py-2.5 lg:py-3.5 rounded-xl lg:rounded-2xl bg-emerald-600 text-white text-[10px] lg:text-[11px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all flex items-center gap-2 lg:gap-3"
              >
                <i className="fas fa-plus-circle text-[9px] lg:text-[10px]"></i>
                <span className="hidden sm:inline">{content.report}</span>
              </button>

              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleNavigation('/admin')}
                    className="px-4 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl bg-emerald-50 text-emerald-600 text-[9px] lg:text-[10px] font-black uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition-all"
                  >
                    {content.admin}
                  </button>
                  <button 
                    onClick={onLogout}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <i className="fas fa-power-off text-sm lg:text-base"></i>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onAdminClick}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all"
                >
                  <i className="fas fa-user-shield text-sm lg:text-base"></i>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-slate-50 text-slate-900 flex items-center justify-center"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-sm`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 p-8 glass rounded-[3rem] shadow-2xl z-[80] space-y-6"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.path)}
                  className="block w-full px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all text-left"
                >
                  {language === 'ur' ? link.ur : link.name}
                </button>
              ))}
            </div>
            
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <button 
                onClick={() => { onReportClick(); setIsMobileMenuOpen(false); }}
                className="w-full btn-premium-accent py-5 flex items-center justify-center gap-3"
              >
                <i className="fas fa-plus-circle"></i>
                {content.report}
              </button>
              
              {!isAdmin ? (
                <button 
                  onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }}
                  className="w-full btn-premium-outline py-5 flex items-center justify-center gap-3"
                >
                  <i className="fas fa-user-shield"></i>
                  {content.admin}
                </button>
              ) : (
                <button 
                  onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-red-50 text-red-500 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px]"
                >
                  {content.logout}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
