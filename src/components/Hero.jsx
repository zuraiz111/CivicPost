import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ language, onReportClick, onGuidelinesClick }) => {
  const t = {
    en: {
      badge: "Citizen Response System",
      title: "Empowering communities for a",
      titleAccent: "better tomorrow.",
      description: "A premium platform for reporting local issues, tracking service status, and building a more responsive city infrastructure together.",
      ctaPrimary: "File a Report",
      ctaSecondary: "View Guidelines",
      stats: [
        { label: "Reports Resolved", value: "2,480+" },
        { label: "Active Agents", value: "150+" },
        { label: "Avg Response", value: "< 2hrs" }
      ]
    },
    ur: {
      badge: "شہری رسپانس سسٹم",
      title: "بہتر مستقبل کے لیے برادریوں کو",
      titleAccent: "بااختیار بنانا۔",
      description: "مقامی مسائل کی اطلاع دینے، سروس کی صورتحال پر نظر رکھنے، اور مل کر ایک بہتر شہر کا بنیادی ڈھانچہ بنانے کے لیے ایک بہترین پلیٹ فارم۔",
      ctaPrimary: "رپورٹ درج کریں",
      ctaSecondary: "ہدایات دیکھیں",
      stats: [
        { label: "رپورٹس حل ہوئیں", value: "+2,480" },
        { label: "فعال ایجنٹس", value: "+150" },
        { label: "اوسط جواب", value: "گھنٹے 2 >" }
      ]
    }
  };

  const content = t[language];

  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden bg-slate-50">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#004d40]/10 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-600/5 rounded-full blur-[100px] animate-pulse" />
        
        {/* Particle Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 md:space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl bg-white shadow-premium border border-slate-100/50 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-emerald-600 animate-pulse ring-4 ring-emerald-50" />
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-500">{content.badge}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 md:space-y-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black text-slate-900 tracking-tighter leading-[0.9] md:leading-[0.85]">
                {content.title}
                <span className="block text-gradient mt-2 md:mt-4 pb-2">{content.titleAccent}</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
                {content.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <button 
                onClick={onReportClick}
                className="btn-premium-primary group px-8 md:px-10 py-4 md:py-5 text-base md:text-lg w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-3">
                  {content.ctaPrimary}
                  <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
                </span>
              </button>
              <button 
                onClick={onGuidelinesClick}
                className="btn-premium-outline px-8 md:px-10 py-4 md:py-5 text-base md:text-lg w-full sm:w-auto"
              >
                {content.ctaSecondary}
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 pt-10 md:pt-12 border-t border-slate-200/60"
            >
              {content.stats.map((stat, i) => (
                <div key={i} className="group cursor-default flex flex-col items-center sm:items-start">
                  <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter group-hover:text-emerald-600 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.3, duration: 1.5 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative z-10 rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(5,150,105,0.2)] border-[8px] md:border-[12px] border-white group">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=1000&fit=crop" 
                alt="Community Empowerment" 
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                crossOrigin="anonymous"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=1000&fit=crop"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </div>
            
            {/* Floating Interaction Cards */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 p-8 bg-white rounded-[3rem] shadow-premium-hover z-20 hidden xl:flex items-center gap-6 border border-slate-100"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                <i className="fas fa-check-double text-2xl"></i>
              </div>
              <div>
                <div className="text-lg font-black text-slate-900 leading-tight">Fast Resolution</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Priority Protocol Active</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 p-8 bg-white rounded-[3rem] shadow-premium-hover z-20 hidden xl:flex items-center gap-6 border border-slate-100"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-[#004d40] to-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                <i className="fas fa-shield-halved text-2xl"></i>
              </div>
              <div>
                <div className="text-lg font-black text-slate-900 leading-tight">Verified Data</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secure Citizen Portal</div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50/50 rounded-full blur-[100px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
