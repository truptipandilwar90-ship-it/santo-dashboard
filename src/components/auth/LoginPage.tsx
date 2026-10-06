import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Building2,
  Calendar,
  Trophy,
  DollarSign,
  Users,
  Sliders,
  UserCheck,
  Lock,
  Sparkles,
  CheckSquare,
  Square,
  ShieldCheck,
  Flag,
  Utensils,
  Dumbbell,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

export const LoginPage: React.FC = () => {
  const { login, t, language } = useApp();
  const [loginMode, setLoginMode] = useState<'member' | 'staff'>('member');

  // Form states
  const [memberId, setMemberId] = useState('member@santodomingocc.com');
  const [staffUsername, setStaffUsername] = useState('admin@santodomingocc.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('manager');

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(memberId || 'Sir Arthur Sterling', 'member');
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(staffUsername || 'Club Administrator', selectedRole);
  };

  const handleQuickMemberLogin = (memberName: string) => {
    setMemberId(memberName);
    login(memberName, 'member');
  };

  const handleRoleQuickLogin = (role: UserRole, roleUsername: string) => {
    setSelectedRole(role);
    setStaffUsername(roleUsername);
    login(roleUsername, role);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans">
      
      {/* Outer Card - Responsive 2 Column Split */}
      <div className="w-full max-w-5xl bg-white rounded-[32px] shadow-sm border border-neutral-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT COLUMN: Clean Login Form */}
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
          <div>
            
            {/* Logo & Language Switcher Header */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.jpg"
                  alt="Santo Domingo Country Club"
                  className="h-14 sm:h-16 w-auto object-contain shrink-0"
                  loading="eager"
                />
              </div>

              {/* Language Switcher */}
              <div className="shrink-0 flex items-center">
                <LanguageSwitcher variant="pill" />
              </div>
            </div>

            {/* Mode Switcher: Member Portal vs Staff Operations */}
            <div className="mb-6 bg-[#F2F8F4] border border-[#E3EFE7] p-1 rounded-full flex items-center text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLoginMode('member')}
                className={`flex-1 py-2 px-3 rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  loginMode === 'member'
                    ? 'bg-black text-white shadow-xs font-bold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t.login.memberLoginTab}</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMode('staff')}
                className={`flex-1 py-2 px-3 rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  loginMode === 'staff'
                    ? 'bg-black text-white shadow-xs font-bold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.login.staffLoginTab}</span>
              </button>
            </div>

            {/* Header Titles */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 mb-1.5">
              {loginMode === 'member' ? (language === 'es' ? 'Portal de Socios' : 'Member Portal Access') : (language === 'es' ? 'Consola Operativa de Personal' : 'Staff Operations Console')}
            </h1>
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mb-6">
              {loginMode === 'member'
                ? (language === 'es' ? 'Inicie sesión con su Nº de Socio o Correo para gestionar reservas de golf, tenis, restaurante y eventos.' : 'Sign in with your Member ID or Email to manage golf, courts, dining & event bookings.')
                : (language === 'es' ? 'Consola de gestión para administradores y personal del club.' : 'Management console for club staff, department leads & administrators.')}
            </p>

            {/* MEMBER LOGIN FORM */}
            {loginMode === 'member' ? (
              <form onSubmit={handleMemberSubmit} className="space-y-4">
                {/* Email / Member ID Input */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {language === 'es' ? 'Correo Electrónico o Nº de Socio' : 'Email or Member ID'}
                  </label>
                  <input
                    type="text"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder={t.login.memberIdPlaceholder}
                    required
                    className="w-full h-[48px] px-5 rounded-full border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm text-neutral-800 transition-all placeholder:text-neutral-400 font-medium"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t.login.password}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.login.password}
                      required
                      className="w-full h-[48px] px-5 pr-12 rounded-full border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm text-neutral-800 transition-all placeholder:text-neutral-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password Controls */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-700 font-medium select-none">
                    <button
                      type="button"
                      onClick={() => setRememberMe(!rememberMe)}
                      className="text-[#3B7A57] focus:outline-none cursor-pointer"
                    >
                      {rememberMe ? (
                        <CheckSquare className="w-4 h-4 fill-[#F2F8F4]" />
                      ) : (
                        <Square className="w-4 h-4 text-neutral-300" />
                      )}
                    </button>
                    <span>{t.login.rememberMe}</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => alert(t.login.resetSent)}
                    className="font-semibold text-neutral-800 hover:text-black transition-colors cursor-pointer"
                  >
                    {t.login.forgotPassword}
                  </button>
                </div>

                {/* Primary Member Sign-In Button */}
                <button
                  type="submit"
                  className="w-full mt-3 h-[48px] px-6 rounded-full bg-black hover:bg-neutral-800 active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center cursor-pointer"
                >
                  {t.login.memberSignInBtn}
                </button>
              </form>
            ) : (
              /* STAFF LOGIN FORM */
              <form onSubmit={handleStaffSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {language === 'es' ? 'Usuario de Personal' : 'Staff Username'}
                  </label>
                  <input
                    type="text"
                    value={staffUsername}
                    onChange={(e) => setStaffUsername(e.target.value)}
                    placeholder={t.login.username}
                    required
                    className="w-full h-[48px] px-5 rounded-full border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm text-neutral-800 transition-all placeholder:text-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {t.login.password}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.login.password}
                      required
                      className="w-full h-[48px] px-5 pr-12 rounded-full border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm text-neutral-800 transition-all placeholder:text-neutral-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-0.5">
                  <button
                    type="button"
                    onClick={() => alert(t.login.resetSent)}
                    className="text-xs font-medium text-neutral-800 hover:text-black transition-colors cursor-pointer"
                  >
                    {t.login.forgotPassword}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 h-[48px] px-6 rounded-full bg-black hover:bg-neutral-800 active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-xs flex items-center justify-center cursor-pointer"
                >
                  {t.login.signInBtn}
                </button>
              </form>
            )}

            {/* Quick 1-Click Member / Staff Shortcuts */}
            <div className="mt-6 pt-5 border-t border-neutral-100">
              {loginMode === 'member' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    <span>{t.login.quickMemberLogin}</span>
                    <span className="text-[#3B7A57] font-semibold">{language === 'es' ? '1-Clic Acceso' : '1-Click Login'}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => handleQuickMemberLogin('Sir Arthur Sterling')}
                      className="p-3 rounded-2xl border border-neutral-200 hover:border-[#3B7A57] hover:bg-[#F2F8F4] transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#F2F8F4] text-[#3B7A57] font-bold flex items-center justify-center text-xs shrink-0">
                          AS
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-neutral-900 group-hover:text-[#3B7A57] transition-colors">
                            Sir Arthur Sterling
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono">
                            #1029 · {language === 'es' ? 'Socio Fundador Platino' : 'Platinum Founding Member'}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase text-[#3B7A57] bg-white px-2 py-0.5 rounded-full border border-[#E3EFE7]">
                        {language === 'es' ? 'Entrar' : 'Sign In'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickMemberLogin('Victoria Vanderbilt')}
                      className="p-3 rounded-2xl border border-neutral-200 hover:border-[#3B7A57] hover:bg-[#F2F8F4] transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0">
                          VV
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-neutral-900 group-hover:text-[#3B7A57] transition-colors">
                            Victoria Vanderbilt
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono">
                            #1084 · {language === 'es' ? 'Socio Social Ejecutivo' : 'Executive Social Member'}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase text-[#3B7A57] bg-white px-2 py-0.5 rounded-full border border-[#E3EFE7]">
                        {language === 'es' ? 'Entrar' : 'Sign In'}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                /* STAFF ROLE SELECTOR GRID */
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    <span>{t.login.roleSelector}</span>
                    <span className="text-[#3B7A57] font-semibold">{t.login.oneClickLogin}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => handleRoleQuickLogin('manager', 'Eleanor Vance (General Manager)')}
                      className={`h-[38px] p-2 rounded-xl text-left border transition-all flex items-center gap-1.5 cursor-pointer ${
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
                      className={`h-[38px] p-2 rounded-xl text-left border transition-all flex items-center gap-1.5 cursor-pointer ${
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
                      className={`h-[38px] p-2 rounded-xl text-left border transition-all flex items-center gap-1.5 cursor-pointer ${
                        selectedRole === 'golf_sports'
                          ? 'border-black bg-neutral-900 text-white font-medium'
                          : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <Trophy className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate text-[11px]">{language === 'es' ? 'Golf/Dep.' : 'Golf & Sports'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Footer Registration Notice */}
          <div className="pt-5 text-center text-xs text-neutral-600">
            {t.login.notMember}{' '}
            <span
              onClick={() => alert(t.login.registrationNotice)}
              className="text-[#3B7A57] font-bold hover:underline cursor-pointer"
            >
              {t.login.registerNow}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Country Club Illustration & Slogan */}
        <div className="m-3 sm:m-4 rounded-[28px] bg-[#F2F8F4] p-6 sm:p-10 flex flex-col justify-between items-center relative overflow-hidden select-none border border-[#E3EFE7]">
          
          {/* Main Illustration Centerpiece */}
          <div className="relative w-full max-w-sm my-auto flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden shadow-xs">
              <img
                src="/login-illustration.jpg"
                alt="Santo Domingo Country Club"
                className="w-full h-auto object-contain rounded-2xl mix-blend-multiply"
                loading="eager"
              />
            </div>
          </div>

          {/* Bottom Slogan */}
          <div className="w-full text-center space-y-2.5 z-10 pt-4">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              <span className="w-5 h-2 rounded-full bg-[#3B7A57]" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-neutral-900 max-w-xs mx-auto leading-snug">
              {language === 'es'
                ? 'Santo Domingo Country Club · Portal Oficial de Socios'
                : 'Santo Domingo Country Club · Member Portal & Concierge'}
            </h2>
          </div>

        </div>

      </div>
    </div>
  );
};
