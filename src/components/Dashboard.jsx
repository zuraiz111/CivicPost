import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ language, onCategoryClick }) => {
  const t = {
    en: {
      title: "Service Categories",
      subtitle: "What can we help you with today?",
      categories: [
        { id: "Electricity", name: "Electricity", icon: "fa-bolt", color: "amber", desc: "Power outages, sparking, or billing issues" },
        { id: "Stray Animal", name: "Stray Animal", icon: "fa-paw", color: "emerald", desc: "Report stray or abandoned animals in your area" },
        { id: "Water Supply", name: "Water Supply", icon: "fa-droplet", color: "blue", desc: "Leakages, low pressure, or contamination" },
        { id: "Waste Management", name: "Waste Management", icon: "fa-trash-can", color: "green", desc: "Garbage collection or illegal dumping" },
        { id: "Roads & Infrastructure", name: "Roads & Infrastructure", icon: "fa-road", color: "slate", desc: "Potholes, street lights, or construction" },
        { id: "Public Safety", name: "Public Safety", icon: "fa-shield-heart", color: "rose", desc: "Security concerns or emergency hazards" },
        { id: "Natural Gas", name: "Natural Gas", icon: "fa-fire-flame-simple", color: "orange", desc: "Gas leaks or low pressure reports" },
        { id: "Public Relations", name: "Public Relations", icon: "fa-bullhorn", color: "indigo", desc: "General inquiries, feedback, and city updates" },
        { id: "Emergency Services", name: "Emergency Services", icon: "fa-truck-medical", color: "red", desc: "Urgent assistance and critical city incidents" }
      ]
    },
    ur: {
      title: "سروس کے زمرے",
      subtitle: "آج ہم آپ کی کیا مدد کر سکتے ہیں؟",
      categories: [
        { id: "Electricity", name: "بجلی", icon: "fa-bolt", color: "amber", desc: "بجلی کی بندش، سپارکنگ یا بلنگ کے مسائل" },
        { id: "Stray Animal", name: "آوارہ جانور", icon: "fa-paw", color: "emerald", desc: "اپنے علاقے میں آوارہ یا لاوارث جانوروں کی اطلاع دیں" },
        { id: "Water Supply", name: "پانی کی فراہمی", icon: "fa-droplet", color: "blue", desc: "لیکیج، کم دباؤ یا آلودگی" },
        { id: "Waste Management", name: "فضلے کا انتظام", icon: "fa-trash-can", color: "green", desc: "کچرا اٹھانا یا غیر قانونی ڈمپنگ" },
        { id: "Roads & Infrastructure", name: "سڑکیں اور انفراسٹرکچر", icon: "fa-road", color: "slate", desc: "گڑھے، اسٹریٹ لائٹس یا تعمیرات" },
        { id: "Public Safety", name: "عوامی تحفظ", icon: "fa-shield-heart", color: "rose", desc: "سیکیورٹی خدشات یا ہنگامی خطرات" },
        { id: "Natural Gas", name: "قدرتی گیس", icon: "fa-fire-flame-simple", color: "orange", desc: "گیس لیک یا کم پریشر کی رپورٹ" },
        { id: "Public Relations", name: "عوامی تعلقات", icon: "fa-bullhorn", color: "indigo", desc: "عام پوچھ گچھ، فیڈ بیک اور شہر کی اپ ڈیٹس" },
        { id: "Emergency Services", name: "ہنگامی خدمات", icon: "fa-truck-medical", color: "red", desc: "فوری امداد اور اہم شہر کے واقعات" }
      ]
    }
  };

  const content = t[language];

  return (
    <section id="dashboard" className="py-20 md:py-32 bg-[#fdfdfd] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#004d40]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#004d40] text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-lg shadow-emerald-200/50"
          >
            <i className="fas fa-layer-group text-[10px]"></i>
            Civic Connect Services
          </motion.div>
          
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter"
            >
              {content.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-wider opacity-60"
            >
              {content.subtitle}
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {content.categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => onCategoryClick(cat.id)}
              className="group cursor-pointer"
            >
              <div className={`h-full p-5 md:p-10 rounded-[1.2rem] md:rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 relative overflow-hidden border-b-[4px] md:border-b-8 ${
                cat.color === 'amber' ? 'border-b-amber-500' :
                cat.color === 'emerald' ? 'border-b-[#004d40]' :
                cat.color === 'blue' ? 'border-b-blue-500' :
                cat.color === 'green' ? 'border-b-emerald-600' :
                cat.color === 'rose' ? 'border-b-rose-500' :
                cat.color === 'indigo' ? 'border-b-indigo-500' :
                cat.color === 'red' ? 'border-b-red-500' :
                cat.color === 'orange' ? 'border-b-orange-500' : 'border-b-slate-900'
              }`}>
                <div className="relative z-10 space-y-4 md:space-y-8">
                  <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg ${
                    cat.color === 'amber' ? 'bg-amber-100 text-amber-600 shadow-amber-100' :
                    cat.color === 'emerald' ? 'bg-emerald-100 text-[#004d40] shadow-emerald-100' :
                    cat.color === 'blue' ? 'bg-blue-100 text-blue-600 shadow-blue-100' :
                    cat.color === 'green' ? 'bg-emerald-100 text-emerald-600 shadow-emerald-100' :
                    cat.color === 'rose' ? 'bg-rose-100 text-rose-600 shadow-rose-100' :
                    cat.color === 'indigo' ? 'bg-indigo-100 text-indigo-600 shadow-indigo-100' :
                    cat.color === 'red' ? 'bg-red-100 text-red-600 shadow-red-100' :
                    cat.color === 'orange' ? 'bg-orange-100 text-orange-600 shadow-orange-100' : 'bg-slate-100 text-slate-900 shadow-slate-100'
                  }`}>
                    <i className={`fas ${cat.icon} text-sm md:text-2xl`}></i>
                  </div>
                  
                  <div className="space-y-1 md:space-y-3">
                    <h3 className="text-base md:text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <p className="text-slate-500 text-[10px] md:text-sm leading-relaxed font-medium">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-600 transition-all duration-300">
                    <span>Report Now</span>
                    <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-2"></i>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
