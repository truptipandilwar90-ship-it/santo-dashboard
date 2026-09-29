import React, { useState } from 'react';
import { Eye, EyeOff, Building2, Calendar, Trophy, DollarSign, Users, Sliders } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

export const LoginPage: React.FC = () => {
  const { login, t, language } = useApp();
  const [username, setUsername] = useState('admin@santodomingocc.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('manager');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username || 'Club Administrator', selectedRole);
  };

  const handleRoleQuickLogin = (role: UserRole, roleUsername: string) => {
    setSelectedRole(role);
    setUsername(roleUsername);
    login(roleUsername, role);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans">
      {/* Outer Card - Responsive 2 Column Split matching reference image */}
      <div className="w-full max-w-5xl bg-white rounded-[32px] shadow-sm border border-neutral-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT COLUMN: Clean Login Form */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
          <div>
            <div className="mb-6 flex items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src="/logo.jpg"
                  alt="Santo Domingo Country Club"
                  className="h-14 sm:h-16 w-auto object-contain shrink-0"
                  loading="eager"
                />
              </div>

              {/* Language Switcher - Locked fixed position on the far right */}
              <div className="shrink-0 flex items-center">
                <LanguageSwitcher variant="pill" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mb-2">
              {t.login.title}
            </h1>
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mb-8 max-w-md min-h-[40px]">
              {t.login.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t.login.username}
                  required
                  className="w-full h-[48px] px-5 rounded-full border border-neutral-300 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none text-sm text-neutral-800 transition-all placeholder:text-neutral-400"
                />
              </div>

              {/* Password Input with eye toggle */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.login.password}
                  required
                  className="w-full h-[48px] px-5 pr-12 rounded-full border border-neutral-300 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none text-sm text-neutral-800 transition-all placeholder:text-neutral-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end pt-0.5">
                <button
                  type="button"
                  onClick={() => alert(t.login.resetSent)}
                  className="text-xs font-medium text-neutral-800 hover:text-black transition-colors cursor-pointer"
                >
                  {t.login.forgotPassword}
                </button>
              </div>

              {/* Primary Login Button - Fixed height so position never shifts */}
              <button
                type="submit"
                className="w-full mt-2 h-[48px] px-6 rounded-full bg-black hover:bg-neutral-800 active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center cursor-pointer"
              >
                {t.login.signInBtn}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-7 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <span className="relative bg-white px-3 text-xs text-neutral-500 font-medium">
                {t.login.orContinueWith}
              </span>
            </div>

            {/* 3 Social Buttons: Google, Apple, Facebook */}
            <div className="flex items-center justify-center gap-4">
              {/* Google */}
              <button
                type="button"
                onClick={() => login('Google Admin User', selectedRole)}
                className="w-12 h-12 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xs cursor-pointer"
                title={t.login.continueGoogle}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V13.4h6.887C18.2 16.48 15.64 18.8 12.24 18.8c-3.76 0-6.8-3.04-6.8-6.8s3.04-6.8 6.8-6.8c1.76 0 3.36.64 4.6 1.72l2.4-2.4C17.2 2.68 14.88 1.8 12.24 1.8 6.48 1.8 1.8 6.48 1.8 12.24s4.68 10.44 10.44 10.44c6.04 0 10.04-4.24 10.04-10.24 0-.72-.08-1.4-.2-2.155H12.24z" />
                </svg>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => login('Apple Admin User', selectedRole)}
                className="w-12 h-12 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xs cursor-pointer"
                title={t.login.continueApple}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1.01.08 2.03-.49 2.64-1.24z" />
                </svg>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => login('Facebook Admin User', selectedRole)}
                className="w-12 h-12 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-xs cursor-pointer"
                title={t.login.continueFacebook}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>

            {/* Quick Admin Role Quick-Login (Empowering the Admin) */}
            <div className="mt-8 pt-5 border-t border-neutral-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  {t.login.roleSelector}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">{t.login.oneClickLogin}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => handleRoleQuickLogin('manager', 'Eleanor Vance (General Manager)')}
                  className={`h-[38px] p-2 rounded-xl text-left border transition-all flex items-center gap-1.5 ${
                    selectedRole === 'manager'
                      ? 'border-black bg-neutral-900 text-white font-medium'
                      : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate text-[11px]">{language === 'es' ? 'Gerente' : 'Manager'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleQuickLogin('events_team', 'Julian Montgomery (Events Dir.)')}
                  className={`h-[38px] p-2 rounded-xl text-left border transition-all flex items-center gap-1.5 ${
                    selectedRole === 'events_team'
                      ? 'border-black bg-neutral-900 text-white font-medium'
                      : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate text-[11px]">{language === 'es' ? 'Eventos' : 'Events'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleQuickLogin('golf_sports', 'Coach Mateo Rossi (Athletics)')}
                  className={`h-[38px] p-2 rounded-xl text-left border transition-all flex items-center gap-1.5 ${
                    selectedRole === 'golf_sports'
                      ? 'border-black bg-neutral-900 text-white font-medium'
                      : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate text-[11px]">{language === 'es' ? 'Golf y Dep.' : 'Golf & Sports'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleQuickLogin('finance', 'Beatrice Chen (Finance)')}
                  className={`h-[38px] p-2 rounded-xl text-left border transition-all flex items-center gap-1.5 ${
                    selectedRole === 'finance'
                      ? 'border-black bg-neutral-900 text-white font-medium'
                      : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate text-[11px]">{language === 'es' ? 'Finanzas' : 'Finance'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleQuickLogin('front_desk', 'Arthur Pendelton (Concierge)')}
                  className={`h-[38px] p-2 rounded-xl text-left border transition-all flex items-center gap-1.5 ${
                    selectedRole === 'front_desk'
                      ? 'border-black bg-neutral-900 text-white font-medium'
                      : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate text-[11px]">{language === 'es' ? 'Recepción' : 'Front Desk'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleQuickLogin('sysadmin', 'Klaus Lindner (SysAdmin)')}
                  className={`h-[38px] p-2 rounded-xl text-left border transition-all flex items-center gap-1.5 ${
                    selectedRole === 'sysadmin'
                      ? 'border-black bg-neutral-900 text-white font-medium'
                      : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate text-[11px]">SysAdmin</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer matching reference */}
          <div className="pt-6 text-center text-xs text-neutral-600">
            {t.login.notMember}{' '}
            <span
              onClick={() => alert(t.login.registrationNotice)}
              className="text-[#3B7A57] font-semibold hover:underline cursor-pointer"
            >
              {t.login.registerNow}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Country Club Illustration & Slogan */}
        <div className="m-3 sm:m-4 rounded-[28px] bg-[#F2F8F4] p-6 sm:p-10 flex flex-col justify-between items-center relative overflow-hidden select-none border border-[#E3EFE7]">
          
          {/* Main Country Club Illustration Centerpiece */}
          <div className="relative w-full max-w-sm my-auto flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden shadow-xs">
              <img
                src="/login-illustration.jpg"
                alt="Santo Domingo Country Club Operations"
                className="w-full h-auto object-contain rounded-2xl mix-blend-multiply"
                loading="eager"
              />
            </div>
          </div>

          {/* Bottom Slogan and Carousel Dots */}
          <div className="w-full text-center space-y-3 z-10 pt-4">
            {/* Carousel Dots: dot, pill, dot */}
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              <span className="w-5 h-2 rounded-full bg-black" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 max-w-xs mx-auto leading-snug">
              {t.login.slogan}
            </h2>
          </div>

        </div>

      </div>
    </div>
  );
};

