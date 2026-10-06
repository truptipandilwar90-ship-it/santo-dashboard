import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  MessageSquareText,
  CalendarDays,
  Kanban,
  FileSpreadsheet,
  Building,
  Flag,
  CircleDot,
  Dumbbell,
  Users,
  CreditCard,
  Bot,
  BookOpenCheck,
  BarChart3,
  ShieldAlert,
  Radio,
  Settings,
  ChevronRight,
  LogOut,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScreenId, UserRole } from '../../types';
import { SantoDomingoLogo } from '../common/SantoDomingoLogo';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

interface NavSection {
  title: string;
  items: {
    id: ScreenId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    badgeColor?: string;
    highlight?: boolean;
    allowedRoles?: UserRole[];
  }[];
}

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { activeScreen, navigateTo, currentRole, switchRole, logout, currentUser, aiReviews, calendarEvents, t, language } = useApp();

  const pendingAiCount = aiReviews.filter(i => i.status === 'pending').length;
  const conflictCount = calendarEvents.filter(e => e.hasConflict).length;

  const isMember = currentRole === 'member';

  const memberNavSections: NavSection[] = [
    {
      title: language === 'es' ? 'Portal Exclusivo de Socios' : 'Member Portal Overview',
      items: [
        { id: 'member_dashboard', label: language === 'es' ? 'Mi Panel de Socio' : 'Member Dashboard', icon: UserCheck, highlight: true }
      ]
    }
  ];

  const adminNavSections: NavSection[] = [
    {
      title: t.sidebar.overview,
      items: [
        { id: 'dashboard', label: t.sidebar.dashboard, icon: LayoutDashboard }
      ]
    },
    {
      title: t.sidebar.workQueue,
      items: [
        { id: 'inbox', label: t.sidebar.inbox, icon: Inbox, badge: 3, badgeColor: 'bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7]' },
        { id: 'conversation_detail', label: t.sidebar.conversationDetail, icon: MessageSquareText }
      ]
    },
    {
      title: t.sidebar.calendar,
      items: [
        { 
          id: 'master_calendar', 
          label: t.sidebar.masterCalendar, 
          icon: CalendarDays, 
          highlight: true,
          badge: conflictCount > 0 ? `${conflictCount} ${t.sidebar.conflictBadge}` : undefined,
          badgeColor: 'bg-rose-50 text-rose-700 border border-rose-200'
        }
      ]
    },
    {
      title: t.sidebar.events,
      items: [
        { id: 'event_inquiries', label: t.sidebar.eventInquiries, icon: Kanban },
        { id: 'event_detail', label: t.sidebar.eventDetail, icon: FileSpreadsheet, highlight: true },
        { id: 'venues_packages', label: t.sidebar.venuesPackages, icon: Building }
      ]
    },
    {
      title: t.sidebar.golf,
      items: [
        { id: 'tee_sheet', label: t.sidebar.teeSheet, icon: Flag },
        { id: 'golf_booking_detail', label: t.sidebar.golfBookingDetail, icon: CircleDot }
      ]
    },
    {
      title: t.sidebar.otherSports,
      items: [
        { id: 'facility_bookings', label: t.sidebar.facilityBookings, icon: Dumbbell }
      ]
    },
    {
      title: t.sidebar.members,
      items: [
        { id: 'member_directory', label: t.sidebar.memberDirectory, icon: Users }
      ]
    },
    {
      title: t.sidebar.finance,
      items: [
        { id: 'payments_transactions', label: t.sidebar.paymentsTransactions, icon: CreditCard }
      ]
    },
    {
      title: t.sidebar.aiCenter,
      items: [
        { 
          id: 'ai_review_queue', 
          label: t.sidebar.aiReviewQueue, 
          icon: Bot, 
          badge: pendingAiCount > 0 ? pendingAiCount : undefined,
          badgeColor: 'bg-amber-50 text-amber-800 border border-amber-200'
        },
        { id: 'knowledge_rules', label: t.sidebar.knowledgeRules, icon: BookOpenCheck }
      ]
    },
    {
      title: t.sidebar.insights,
      items: [
        { id: 'reports', label: t.sidebar.reports, icon: BarChart3 }
      ]
    },
    {
      title: t.sidebar.administration,
      items: [
        { id: 'staff_permissions', label: t.sidebar.staffPermissions, icon: ShieldAlert },
        { id: 'integrations_health', label: t.sidebar.integrationsHealth, icon: Radio },
        { id: 'configuration', label: t.sidebar.configuration, icon: Settings }
      ]
    }
  ];

  const activeNavSections = isMember ? memberNavSections : adminNavSections;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar in Fresh Clean Light/Mint Theme matching Login Page */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-white text-neutral-800 z-50 flex flex-col border-r border-neutral-200/90 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 flex items-center justify-between border-b border-neutral-100 bg-white">
          <SantoDomingoLogo variant="horizontal" size="md" showEst={true} />
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 text-xs">
          {activeNavSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigateTo(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left transition-all font-semibold ${
                        isActive
                          ? 'bg-black text-white shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-[#F2F8F4]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#88D49E]' : 'text-neutral-500'}`} />
                        <span className="truncate">{item.label}</span>
                        {item.highlight && !isActive && (
                          <span className="text-[9px] uppercase tracking-wider font-bold text-[#3B7A57] bg-[#F2F8F4] px-1.5 py-0.2 rounded border border-[#E3EFE7]">
                            Key
                          </span>
                        )}
                      </div>
                      {item.badge !== undefined && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tabular-nums shrink-0 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeColor || 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Role Switcher & User Profile Footer in Mint Theme */}
        <div className="p-3.5 border-t border-neutral-100 bg-[#F2F8F4] rounded-t-3xl space-y-2.5 m-2 mb-3 border border-[#E3EFE7]">
          {/* Quick Role Toggle Bar */}
          <div className="px-1 pt-1 text-[10px] font-bold text-neutral-600 uppercase tracking-wider flex items-center justify-between border-t border-neutral-200/60">
            <span>{isMember ? (language === 'es' ? 'Portal de Socio' : 'Member Session') : t.sidebar.adminRole}</span>
            <span className="text-[10px] text-[#3B7A57] font-bold">{t.roles[currentRole]}</span>
          </div>
          
          {!isMember ? (
            <select
              value={currentRole}
              onChange={(e) => switchRole(e.target.value as UserRole)}
              className="w-full bg-white text-neutral-900 font-semibold text-xs rounded-full px-3 py-2 border border-neutral-300 outline-none focus:border-black cursor-pointer shadow-xs"
            >
              <option value="manager">{t.roles.manager}</option>
              <option value="events_team">{t.roles.events_team}</option>
              <option value="golf_sports">{t.roles.golf_sports}</option>
              <option value="finance">{t.roles.finance}</option>
              <option value="front_desk">{t.roles.front_desk}</option>
              <option value="sysadmin">{t.roles.sysadmin}</option>
            </select>
          ) : (
            <div className="bg-white px-3 py-2 rounded-full border border-neutral-200 text-xs font-bold text-[#3B7A57] flex items-center justify-between shadow-2xs">
              <span className="truncate">Socio Platino #1029</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          )}

          {/* User profile row */}
          <div className="pt-1 flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full border border-white shadow-xs overflow-hidden shrink-0 bg-white">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <div className="text-neutral-900 text-xs font-bold truncate leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-neutral-500 truncate">
                  {language === 'es' ? 'Gerente General y Operaciones' : currentUser.title}
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              title={t.header.logout}
              className="p-1.5 text-neutral-500 hover:text-black hover:bg-white rounded-full transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
