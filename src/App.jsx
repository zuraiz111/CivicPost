import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import SubmitReportModal from './components/SubmitReportModal';
import AdminLoginModal from './components/AdminLoginModal';
import GuidelinesModal from './components/GuidelinesModal';
import { Toaster } from 'react-hot-toast';
import useStore from './store/useStore';

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
};

const AppLayout = ({ 
  language, 
  setLanguage, 
  isAdmin, 
  openLoginModal, 
  handleAdminLogout, 
  openReportModal, 
  sendAlert, 
  handleAdminLogin, 
  isReportModalOpen, 
  setIsReportModalOpen, 
  selectedCategory, 
  isAdminLoginModalOpen, 
  setIsAdminLoginModalOpen, 
  activeAlert, 
  closeAlert,
  isChatOpen,
  setIsChatOpen,
  isGuidelinesModalOpen,
  setIsGuidelinesModalOpen
}) => {
  const location = useLocation();
  const { messages, sendMessage } = useStore();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen ${language === 'ur' ? 'rtl' : 'ltr'} bg-slate-50`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
      {!isAdminPage && (
        <Navbar 
          language={language} 
          setLanguage={setLanguage} 
          isAdmin={isAdmin} 
          onAdminClick={openLoginModal}
          onLogout={handleAdminLogout}
          onReportClick={() => openReportModal()}
        />
      )}
      <main className={isAdminPage ? "" : "pt-20"}>
        <Routes>
          <Route path="/" element={
            <>
              <Hero 
                language={language} 
                onReportClick={() => openReportModal()} 
                onGuidelinesClick={() => setIsGuidelinesModalOpen(true)}
              />
              <About language={language} />
              <Dashboard language={language} onCategoryClick={(cat) => openReportModal(cat)} />
              <Reports language={language} isAdmin={false} />
            </>
          } />
          <Route path="/admin" element={
            isAdmin ? (
              <AdminDashboard language={language} setLanguage={setLanguage} onSendAlert={sendAlert} onLogout={handleAdminLogout} />
            ) : (
              <Navigate to="/" />
            )
          } />
          <Route path="/reports" element={
            <div className="pt-10">
              <Reports language={language} isAdmin={isAdmin} isFullPage={true} />
            </div>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      
      {!isAdminPage && (
        <Footer 
          language={language} 
          onAdminClick={openLoginModal}
        />
      )}

      {isReportModalOpen && (
        <SubmitReportModal 
          isOpen={isReportModalOpen} 
          onClose={() => setIsReportModalOpen(false)} 
          initialCategory={selectedCategory}
          language={language}
        />
      )}

      {isAdminLoginModalOpen && (
        <AdminLoginModal 
          isOpen={isAdminLoginModalOpen}
          onClose={() => setIsAdminLoginModalOpen(false)}
          onLogin={handleAdminLogin}
          language={language}
        />
      )}

      {isGuidelinesModalOpen && (
        <GuidelinesModal 
          isOpen={isGuidelinesModalOpen}
          onClose={() => setIsGuidelinesModalOpen(false)}
          language={language}
        />
      )}

      {activeAlert && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-rose-100 animate-modal-up">
            <div className="bg-rose-600 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <i className="fas fa-bullhorn text-9xl -rotate-12"></i>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm animate-pulse">
                <i className="fas fa-triangle-exclamation text-4xl text-white"></i>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight relative z-10">
                EMERGENCY ALERT
              </h2>
              <div className="inline-block px-3 py-1 bg-rose-500/50 rounded-full text-xs font-black text-rose-100 uppercase tracking-widest mt-2 border border-rose-400/30">
                Urgent Broadcast
              </div>
            </div>
            
            <div className="p-8 text-center">
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-4">Message Details</p>
              <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 mb-8">
                <p className="text-slate-900 text-xl font-bold leading-relaxed">
                  &quot;{activeAlert.message}&quot;
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={closeAlert}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                  Acknowledge & Close
                </button>
                <p className="text-slate-400 text-[10px] font-bold uppercase">
                  Received on {new Date().toLocaleTimeString()} • Source: Civic Authority
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Public Chat/Feedback Widget */}
      {!isAdminPage && (
        <div className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[200]">
          {isChatOpen ? (
            <div className="bg-white w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] md:w-[400px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-modal-up">
              <div className="bg-[#004d40] p-6 md:p-8 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    <i className="fas fa-headset text-white text-lg md:text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white text-sm md:text-base font-black tracking-tight">Support Chat</h3>
                    <p className="text-emerald-300 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Always Online</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all">
                  <i className="fas fa-times text-sm md:text-base"></i>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 md:space-y-6 bg-slate-50/50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] md:max-w-[80%] p-4 md:p-5 rounded-[1.2rem] md:rounded-[1.5rem] ${
                      msg.isAdmin 
                        ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm' 
                        : 'bg-[#004d40] text-white rounded-tr-none shadow-lg shadow-emerald-100'
                    }`}>
                      <p className="text-xs md:text-sm font-medium leading-relaxed">{msg.text}</p>
                      <p className={`text-[7px] md:text-[8px] mt-2 font-bold uppercase tracking-widest ${msg.isAdmin ? 'text-slate-400' : 'text-emerald-300'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 md:p-6 bg-white border-t border-slate-50 shrink-0">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.target.elements.msg;
                  if (!input.value.trim()) return;
                  sendMessage({ sender: 'Citizen', text: input.value, isAdmin: false });
                  input.value = '';
                }} className="flex gap-2 md:gap-3">
                  <input 
                    name="msg"
                    placeholder="Ask us anything..."
                    className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-emerald-100 transition-all font-medium text-xs md:text-sm"
                  />
                  <button type="submit" className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#004d40] text-white flex items-center justify-center shadow-lg shadow-emerald-200 shrink-0">
                    <i className="fas fa-paper-plane text-sm md:text-base"></i>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setIsChatOpen(true)}
              className="w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem] md:rounded-[2.5rem] bg-[#004d40] text-white shadow-2xl shadow-emerald-200 flex items-center justify-center hover:scale-110 hover:-rotate-12 transition-all group relative"
            >
              <i className="fas fa-comment-dots text-2xl md:text-3xl group-hover:scale-110 transition-transform"></i>
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-rose-500 rounded-full border-2 md:border-4 border-white text-[8px] md:text-[10px] font-black flex items-center justify-center animate-bounce">
                1
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [language, setLanguage] = useState('en');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeAlert, setActiveAlert] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const openReportModal = (category = "") => {
    setSelectedCategory(category);
    setIsReportModalOpen(true);
  };

  const openLoginModal = () => {
    setIsAdminLoginModalOpen(true);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  const sendAlert = (alert) => {
    setActiveAlert(alert);
  };

  const closeAlert = () => {
    setActiveAlert(null);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <Router>
      <ScrollToHash />
      <Toaster position="top-right" />
      <AppLayout 
        language={language}
        setLanguage={setLanguage}
        isAdmin={isAdmin}
        openLoginModal={openLoginModal}
        handleAdminLogout={handleAdminLogout}
        openReportModal={openReportModal}
        sendAlert={sendAlert}
        handleAdminLogin={handleAdminLogin}
        isReportModalOpen={isReportModalOpen}
        setIsReportModalOpen={setIsReportModalOpen}
        selectedCategory={selectedCategory}
        isAdminLoginModalOpen={isAdminLoginModalOpen}
        setIsAdminLoginModalOpen={setIsAdminLoginModalOpen}
        activeAlert={activeAlert}
        closeAlert={closeAlert}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        isGuidelinesModalOpen={isGuidelinesModalOpen}
        setIsGuidelinesModalOpen={setIsGuidelinesModalOpen}
      />
    </Router>
  );
}

export default App;
