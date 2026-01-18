import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GuidelinesModal = ({ isOpen, onClose, language }) => {
  const t = {
    en: {
      title: "Reporting Guidelines",
      subtitle: "Follow these steps for faster resolution",
      close: "Got it, thanks!",
      steps: [
        {
          title: "Select Correct Category",
          desc: "Choose the department that best matches your issue to ensure it reaches the right team immediately.",
          icon: "fa-list-check",
          color: "blue"
        },
        {
          title: "Provide Clear Details",
          desc: "Mention specific landmarks, street names, or house numbers in the description for our field teams.",
          icon: "fa-location-dot",
          color: "emerald"
        },
        {
          title: "Check for Duplicates",
          desc: "Browse the 'Recent Reports' list to see if your issue has already been reported by someone else.",
          icon: "fa-magnifying-glass",
          color: "amber"
        },
        {
          title: "Track Your Status",
          desc: "Keep your Report ID safe. You can check the progress of your complaint in the public log anytime.",
          icon: "fa-clock-rotate-left",
          color: "purple"
        }
      ]
    },
    ur: {
      title: "رپورٹنگ کی ہدایات",
      subtitle: "تیز تر حل کے لیے ان مراحل پر عمل کریں",
      close: "ٹھیک ہے، شکریہ!",
      steps: [
        {
          title: "درست زمرہ منتخب کریں",
          desc: "ایسے محکمے کا انتخاب کریں جو آپ کے مسئلے سے بہترین مطابقت رکھتا ہو تاکہ یہ فوری طور پر صحیح ٹیم تک پہنچ جائے۔",
          icon: "fa-list-check",
          color: "blue"
        },
        {
          title: "واضح تفصیلات فراہم کریں",
          desc: "ہماری فیلڈ ٹیموں کے لیے تفصیل میں مخصوص نشانات، گلیوں کے نام، یا گھر کے نمبروں کا ذکر کریں۔",
          icon: "fa-location-dot",
          color: "emerald"
        },
        {
          title: "پہلے سے موجود رپورٹس چیک کریں",
          desc: "یہ دیکھنے کے لیے 'حالیہ رپورٹس' کی فہرست دیکھیں کہ آیا آپ کے مسئلے کی اطلاع پہلے ہی کسی اور نے تو نہیں دی ہے۔",
          icon: "fa-magnifying-glass",
          color: "amber"
        },
        {
          title: "اپنی صورتحال پر نظر رکھیں",
          desc: "اپنی رپورٹ آئی ڈی کو محفوظ رکھیں۔ آپ کسی بھی وقت پبلک لاگ میں اپنی شکایت کی پیشرفت چیک کر سکتے ہیں۔",
          icon: "fa-clock-rotate-left",
          color: "purple"
        }
      ]
    }
  };

  const content = t[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border border-slate-100"
          >
            {/* Header */}
            <div className="bg-[#004d40] p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                <i className="fas fa-book-open text-[10rem] text-white"></i>
              </div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative z-10"
              >
                <h2 className="text-4xl font-black text-white tracking-tight mb-3">
                  {content.title}
                </h2>
                <p className="text-emerald-300 font-bold uppercase tracking-[0.2em] text-xs">
                  {content.subtitle}
                </p>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-12">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {content.steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex gap-5 group"
                  >
                    <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110 shadow-lg ${
                      step.color === 'blue' ? 'bg-blue-50 text-blue-600 shadow-blue-100' :
                      step.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 shadow-emerald-100' :
                      step.color === 'amber' ? 'bg-amber-50 text-amber-600 shadow-amber-100' :
                      'bg-purple-50 text-purple-600 shadow-purple-100'
                    }`}>
                      <i className={`fas ${step.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={onClose}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#004d40] transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
              >
                {content.close}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GuidelinesModal;
