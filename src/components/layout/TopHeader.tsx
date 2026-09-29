import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  Plus,
  AlertTriangle,
  Bot,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  CalendarCheck,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SantoDomingoLogo } from '../common/SantoDomingoLogo';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

export const TopHeader: React.FC<{ onOpenMobileMenu: () => void; onOpenNewBooking: () => void }> = ({
  onOpenMobileMenu,
  onOpenNewBooking
}) => {
  const { activeScreen, currentRole, switchRole, calendarEvents, aiReviews, navigateTo, logout, t, language } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const conflicts = calendarEvents.filter(e => e.hasConflict);
  const pendingAi = aiReviews.filter(r => r.status === 'pending');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('event') || q.includes('gala') || q.includes('ballroom')) {
      navigateTo('event_detail');
    } else if (q.includes('golf') || q.includes('tee')) {
      navigateTo('tee_sheet');
    } else if (q.includes('court') || q.includes('tennis') || q.includes('padel')) {
      navigateTo('facility_bookings');
    } else if (q.includes('member') || q.includes('kensington') || q.includes('sterling')) {
      navigateTo('member_directory');
    } else if (q.includes('pay') || q.includes('deposit')) {
      navigateTo('payments_transactions');
    } else if (q.includes('ai') || q.includes('review')) {
      navigateTo('ai_review_queue');
    } else {
      navigateTo('master_calendar');
    }
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 px-4 sm:px-6 flex items-center justify-between">
      {/* Zone 1: Mobile toggle & Breadcrumb Trail */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs text-neutral-500 truncate">
          <div className="lg:hidden shrink-0">
            <SantoDomingoLogo variant="emblem" size="xs" />
          </div>
          <span className="font-semibold text-neutral-900 truncate hidden sm:inline">Santo Domingo CC</span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-400 hidden sm:inline" />
          <span className="text-neutral-700 font-medium truncate">
            {t.screenTitles[activeScreen] || t.header.console}
          </span>
        </div>
      </div>

      {/* Zone 2: Search input */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.header.searchPlaceholder}
            className="w-full pl-9 pr-4 py-1.5 rounded-full bg-neutral-100/80 border border-neutral-200/80 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-xs text-neutral-800 outline-none transition-all placeholder:text-neutral-400"
          />
        </form>
      </div>

      {/* Zone 3: Actions, Conflict Alerts & Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        
        {/* Language Switcher in Header */}
        <LanguageSwitcher variant="pill" />

        {/* Quick New Booking / Event Action Button (matching login button) */}
        <button
          onClick={onOpenNewBooking}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.header.newBooking}</span>
        </button>

        {/* Notifications & Conflict Alert Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full text-neutral-600 hover:text-black hover:bg-[#F2F8F4] transition-colors"
          >
            <Bell className="w-4 h-4" />
            {(conflicts.length > 0 || pendingAi.length > 0) && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 p-3.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
                <span className="font-bold text-neutral-900">{t.header.alerts}</span>
                <span className="text-[10px] text-neutral-400 font-mono">{t.header.liveFeed}</span>
              </div>

              <div className="space-y-2">
                {conflicts.length > 0 && (
                  <div
                    onClick={() => {
                      navigateTo('master_calendar');
                      setShowNotifications(false);
                    }}
                    className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 cursor-pointer hover:bg-rose-100/80 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-rose-800 mb-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>{t.header.conflictAlert}</span>
                    </div>
                    <p className="text-[11px] text-rose-700 leading-snug">
                      {t.header.conflictDesc}
                    </p>
                  </div>
                )}

                {pendingAi.length > 0 && (
                  <div
                    onClick={() => {
                      navigateTo('ai_review_queue');
                      setShowNotifications(false);
                    }}
                    className="p-2.5 rounded-xl bg-[#F2F8F4] border border-[#E3EFE7] text-neutral-900 cursor-pointer hover:bg-[#EAF4ED] transition-colors"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[#3B7A57] mb-0.5">
                      <Bot className="w-3.5 h-3.5 text-[#3B7A57]" />
                      <span>{pendingAi.length} {t.header.aiPending}</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      {t.header.aiPendingDesc}
                    </p>
                  </div>
                )}

                <div
                  onClick={() => {
                    navigateTo('tee_sheet');
                    setShowNotifications(false);
                  }}
                  className="p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <div className="font-bold text-neutral-800">{t.header.teeSheetCheckIn}</div>
                  <div className="text-[11px] text-neutral-500">{t.header.teeSheetDesc}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Role Pill Display */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2F8F4] border border-[#E3EFE7] text-[11px] text-[#3B7A57] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3B7A57]" />
          <span>{t.roles[currentRole]}</span>
        </div>

        {/* Admin Login / Logout Switcher button */}
        <button
          onClick={logout}
          title={t.header.logout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 hover:border-black hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-neutral-500" />
          <span className="hidden md:inline">{t.header.logout}</span>
        </button>

      </div>
    </header>
  );
};
