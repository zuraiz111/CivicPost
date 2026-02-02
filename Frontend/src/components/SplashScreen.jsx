import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + (100 / 25); // Increment over 2.5 seconds
      });
    }, 100);

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 1000);
    }, 2800);

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div 
      id="splash-screen" 
      className={`fixed inset-0 flex items-center justify-center transition-all duration-1000 bg-[#0f172a] ${isVisible ? 'opacity-100' : 'opacity-0 scale-110 pointer-events-none'} z-[200]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/30 via-[#0f172a] to-[#0f172a]"></div>
      
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-[#004d40]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="text-center relative z-10 w-full px-4 md:px-0 scale-[0.85] sm:scale-90 md:scale-100 animate-fade-in">
        <div className="mb-8 md:mb-16">
          <div className="relative inline-block mb-6 md:mb-10 group">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[40px] md:blur-[60px] rounded-full group-hover:bg-emerald-500/40 transition-all duration-700 animate-pulse"></div>
            <div className="relative w-16 h-16 md:w-28 md:h-28 bg-white/5 backdrop-blur-3xl rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 flex items-center justify-center shadow-2xl animate-float">
              <i className="fas fa-landmark text-2xl md:text-5xl text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"></i>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-none px-2">
            Civic<span className="text-gradient-accent drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">Connect</span>
          </h1>
          <div className="flex items-center justify-center gap-3 md:gap-6 px-4">
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-emerald-500/50"></div>
            <p className="text-slate-400 text-[10px] md:text-sm font-black tracking-[0.3em] md:tracking-[0.6em] uppercase opacity-60 whitespace-nowrap">
              Future <span className="text-white">Urban</span> OS
            </p>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-emerald-500/50"></div>
          </div>
        </div>
        
        <div className="relative w-full max-w-[280px] md:max-w-80 mx-auto px-4">
          <div className="h-1.5 md:h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner p-[1px]">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-600 bg-[length:200%_100%] animate-shimmer rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-4 md:mt-6 flex justify-between items-center px-1">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-[8px] md:text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap">
                {progress < 30 ? 'Synchronizing' : progress < 70 ? 'Encrypted Link' : 'System Ready'}
              </span>
            </div>
            <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tabular-nums tracking-widest">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
