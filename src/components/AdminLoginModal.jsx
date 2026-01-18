import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginModal = ({ isOpen, onClose, onLogin, language }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const t = {
    en: {
      title: 'Admin Access',
      subtitle: 'Please enter your credentials to access the management portal.',
      username: 'Username',
      password: 'Password',
      login: 'Sign In',
      error: 'Invalid username or password',
      back: 'Back to Portal'
    },
    ur: {
      title: 'ایڈمن رسائی',
      subtitle: 'انتظامی پورٹل تک رسائی کے لیے براہ کرم اپنی اسناد درج کریں۔',
      username: 'صارف کا نام',
      password: 'پاس ورڈ',
      login: 'سائن ان کریں',
      error: 'غلط صارف نام یا پاس ورڈ',
      back: 'پورٹل پر واپس جائیں'
    }
  };

  const content = t[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock login logic - in a real app this would be an API call
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        onLogin();
        onClose();
        navigate('/admin');
      } else {
        setError(content.error);
      }
      setIsLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center p-4 md:p-6 bg-[#004d40]/20 backdrop-blur-xl animate-fade-in overflow-y-auto items-start md:items-center">
      <div className="bg-white w-full max-w-md rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-b-8 border-emerald-600 animate-modal-up my-8 md:my-auto">
        {/* Header Section */}
        <div className="bg-[#004d40] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <i className="fas fa-user-shield text-9xl -rotate-12 text-white"></i>
          </div>
          <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/40 relative z-10 animate-float">
            <i className="fas fa-lock text-3xl text-white"></i>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight relative z-10 mb-3">
            {content.title}
          </h2>
          <p className="text-emerald-100/60 text-xs font-bold uppercase tracking-widest relative z-10 max-w-[240px] mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Form Section */}
        <div className="p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label 
                htmlFor="admin-username"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 mb-3 block"
              >
                {content.username}
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors">
                  <i className="fas fa-user text-sm"></i>
                </div>
                <input 
                  id="admin-username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="input-standard pl-14 group-hover:bg-white focus:border-emerald-500"
                  placeholder="e.g. admin_user"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="admin-password"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 mb-3 block"
              >
                {content.password}
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors">
                  <i className="fas fa-key text-sm"></i>
                </div>
                <input 
                  id="admin-password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="input-standard pl-14 group-hover:bg-white focus:border-emerald-500"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl flex items-center gap-4 animate-shake">
                <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-rose-200">
                  <i className="fas fa-exclamation-triangle text-white text-xs"></i>
                </div>
                <span className="text-rose-600 text-xs font-black uppercase tracking-wider">{error}</span>
              </div>
            )}

            <div className="space-y-4 pt-4">
              <button 
                type="submit"
                disabled={isLoading}
                className="btn-premium-accent w-full flex items-center justify-center gap-4"
              >
                {isLoading ? (
                  <i className="fas fa-circle-notch fa-spin"></i>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt text-xs group-hover:translate-x-1 transition-transform"></i>
                    {content.login}
                  </>
                )}
              </button>

              <button 
                type="button"
                onClick={onClose}
                className="btn-premium-outline w-full"
              >
                {content.back}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;