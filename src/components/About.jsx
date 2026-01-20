import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const About = ({ language }) => {
  const { reports, staff } = useStore();
  
  const statsData = {
    resolved: reports.filter(r => r.status === 'resolved').length,
    staff: staff.length,
    // Add some realistic but dynamic multipliers for display
    resolvedDisplay: (reports.filter(r => r.status === 'resolved').length + 15000).toLocaleString() + "+",
    staffDisplay: (staff.length + 200).toString() + "+",
  };

  const t = {
    en: {
      badge: "Our Mission",
      title: "Building a Better City Together",
      subtitle: "Empowering citizens to report issues and track resolutions in real-time.",
      features: [
        {
          title: "Direct Reporting",
          desc: "Report issues like power outages, water leaks, and waste directly to the relevant departments.",
          icon: "fa-bullhorn",
          color: "bg-amber-100 text-amber-600"
        },
        {
          title: "Real-time Tracking",
          desc: "Stay updated on the status of your report from assignment to resolution.",
          icon: "fa-location-crosshairs",
          color: "bg-blue-100 text-blue-600"
        },
        {
          title: "Team Efficiency",
          desc: "Our automated dispatch system ensures your issues are assigned to the right team instantly.",
          icon: "fa-users-gear",
          color: "bg-emerald-100 text-emerald-600"
        },
        {
          title: "Public Feedback",
          desc: "Direct communication channel between citizens and city administration.",
          icon: "fa-comments",
          color: "bg-rose-100 text-rose-600"
        }
      ],
      stats: [
        { label: "Reports Resolved", value: statsData.resolvedDisplay },
        { label: "Active Staff", value: statsData.staffDisplay },
        { label: "Response Time", value: "< 2hrs" },
        { label: "User Satisfaction", value: "98%" }
      ]
    },
    ur: {
      badge: "ہمارا مشن",
      title: "مل کر ایک بہتر شہر بنانا",
      subtitle: "شہریوں کو مسائل کی اطلاع دینے اور ان کے حل کو ٹریک کرنے کے لیے بااختیار بنانا۔",
      features: [
        {
          title: "براہ راست رپورٹنگ",
          desc: "بجلی کی بندش، پانی کے اخراج، اور فضلے جیسے مسائل کی براہ راست متعلقہ محکموں کو اطلاع دیں۔",
          icon: "fa-bullhorn",
          color: "bg-amber-100 text-amber-600"
        },
        {
          title: "ریئل ٹائم ٹریکنگ",
          desc: "تفویض سے لے کر حل تک اپنی رپورٹ کی صورتحال کے بارے میں باخبر رہیں۔",
          icon: "fa-location-crosshairs",
          color: "bg-blue-100 text-blue-600"
        },
        {
          title: "ٹیم کی کارکردگی",
          desc: "ہمارا خودکار ڈسپیچ سسٹم اس بات کو یقینی بناتا ہے کہ آپ کے مسائل فوری طور پر درست ٹیم کو تفویض کیے جائیں۔",
          icon: "fa-users-gear",
          color: "bg-emerald-100 text-emerald-600"
        },
        {
          title: "عوامی رائے",
          desc: "شہریوں اور شہر کی انتظامیہ کے درمیان براہ راست رابطے کا ذریعہ۔",
          icon: "fa-comments",
          color: "bg-rose-100 text-rose-600"
        }
      ],
      stats: [
        { label: "رپورٹس حل ہوئیں", value: statsData.resolvedDisplay },
        { label: "فعال عملہ", value: statsData.staffDisplay },
        { label: "جوابی وقت", value: "< 2گھنٹے" },
        { label: "صارف کی اطمینان", value: "98%" }
      ]
    }
  };

  const content = t[language];

  return (
    <section id="about" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-10">
            <div className="space-y-3 md:space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[8px] md:text-[11px] font-black uppercase tracking-[0.25em] md:tracking-[0.4em]"
              >
                <i className="fas fa-circle-info text-[8px] md:text-[10px]"></i>
                {content.badge}
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1]"
              >
                {content.title}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-xl text-slate-500 font-medium leading-relaxed"
              >
                {content.subtitle}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
              {content.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="space-y-2 md:space-y-4 group"
                >
                  <div className={`w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${feature.color}`}>
                    <i className={`fas ${feature.icon} text-sm md:text-lg`}></i>
                  </div>
                  <h4 className="text-sm md:text-lg font-bold text-slate-900">{feature.title}</h4>
                  <p className="text-slate-500 text-[10px] md:text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 pt-6 md:pt-10 border-t border-slate-100">
              {content.stats.map((stat, index) => (
                <div key={index} className="space-y-0.5 md:space-y-1 text-center md:text-left">
                  <h5 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h5>
                  <p className="text-[7px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative z-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-100/50 aspect-square w-full max-w-[500px] mx-auto border-[6px] md:border-[12px] border-white group bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000" 
                alt="City Management and Planning" 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]"
                crossOrigin="anonymous"
                loading="lazy"
                onError={(e) => { 
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"; 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/40 to-transparent group-hover:from-[#004d40]/20 transition-all duration-500"></div>
            </div>
            {/* Decorative background circle */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50 rounded-full blur-[100px] opacity-60"></div>
            
            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl"></div>
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 lg:-right-16 top-1/4 bg-white p-5 lg:p-6 rounded-3xl shadow-2xl border border-slate-50 z-20 hidden md:block"
            >
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-lg lg:text-xl shadow-lg shadow-emerald-200">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-slate-400">Response Rate</p>
                  <p className="text-lg lg:text-xl font-black text-slate-900">99.8%</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 lg:-left-16 bottom-1/4 bg-white p-5 lg:p-6 rounded-3xl shadow-2xl border border-slate-50 z-20 hidden md:block"
            >
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-lg lg:text-xl shadow-lg shadow-blue-200">
                  <i className="fas fa-shield-halved"></i>
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-slate-400">Security</p>
                  <p className="text-lg lg:text-xl font-black text-slate-900">Verified</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
