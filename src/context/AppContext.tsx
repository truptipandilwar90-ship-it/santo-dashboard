import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserRole,
  ScreenId,
  UserProfile,
  MasterCalendarEvent,
  DetailedEvent,
  GolfBooking,
  SportsCourtBooking,
  MemberRecord,
  ConversationItem,
  PaymentTransaction,
  AIReviewItem,
  KnowledgeRule,
  StaffAccount,
  IntegrationStatus,
  ClubConfigSettings,
  BookingStatus,
  EventTask
} from '../types';
import {
  INITIAL_USER,
  MOCK_FACILITIES,
  MOCK_CALENDAR_EVENTS,
  MOCK_DETAILED_EVENT,
  MOCK_GOLF_BOOKINGS,
  MOCK_SPORTS_BOOKINGS,
  MOCK_MEMBERS,
  MOCK_CONVERSATIONS,
  MOCK_PAYMENTS,
  MOCK_AI_REVIEWS,
  MOCK_KNOWLEDGE_RULES,
  MOCK_STAFF,
  MOCK_INTEGRATIONS,
  MOCK_CONFIG
} from '../data/mockData';
import { Language, Translations, translations } from '../i18n/translations';

interface AppContextType {
  isAuthenticated: boolean;
  currentUser: UserProfile;
  currentRole: UserRole;
  activeScreen: ScreenId;
  selectedEventId: string | null;
  selectedConversationId: string | null;
  selectedGolfBookingId: string | null;
  selectedMemberId: string | null;
  
  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  tr: (text: string) => string;
  
  facilities: typeof MOCK_FACILITIES;
  calendarEvents: MasterCalendarEvent[];
  detailedEvent: DetailedEvent;
  golfBookings: GolfBooking[];
  sportsBookings: SportsCourtBooking[];
  members: MemberRecord[];
  conversations: ConversationItem[];
  payments: PaymentTransaction[];
  aiReviews: AIReviewItem[];
  knowledgeRules: KnowledgeRule[];
  staffList: StaffAccount[];
  integrations: IntegrationStatus[];
  config: ClubConfigSettings;
  
  // Actions
  login: (username: string, role?: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  navigateTo: (screen: ScreenId, params?: { eventId?: string; convId?: string; golfId?: string; memberId?: string }) => void;
  
  // Calendar actions
  updateCalendarEventStatus: (id: string, status: BookingStatus) => void;
  resolveConflict: (eventId: string, resolution: 'move_venue' | 'release_hold' | 'confirm_event') => void;
  addCalendarEvent: (event: Omit<MasterCalendarEvent, 'id'>) => void;
  
  // Event detail actions
  updateEventDetailed: (updated: DetailedEvent) => void;
  addEventTask: (task: Omit<EventTask, 'id'>) => void;
  toggleEventTask: (taskId: string) => void;
  aiGenerateChecklist: () => void;
  sendEventMessage: (text: string, isAi?: boolean) => void;
  approveEventQuote: () => void;
  
  // Golf & Sports actions
  checkInGolfPlayer: (bookingId: string, playerId: string) => void;
  checkInSportsBooking: (bookingId: string) => void;
  cancelGolfBooking: (bookingId: string) => void;
  
  // Inbox actions
  sendConversationReply: (convId: string, content: string) => void;
  updateConversationStatus: (convId: string, status: ConversationItem['status']) => void;
  
  // AI review actions
  approveAiReview: (id: string) => void;
  rejectAiReview: (id: string) => void;
  editAiReview: (id: string, content: string) => void;
  
  // Finance actions
  reconcilePayment: (id: string) => void;
  issueRefund: (id: string) => void;
  
  // Rules & Config
  updateKnowledgeRule: (rule: KnowledgeRule) => void;
  addKnowledgeRule: (rule: Omit<KnowledgeRule, 'id'>) => void;
  updateClubConfig: (newConfig: Partial<ClubConfigSettings>) => void;
  retryIntegrationSync: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language & i18n
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sdcc_language');
      if (saved === 'es' || saved === 'en') return saved;
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sdcc_language', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  const t = translations[language];
  const tr = (text: string) => text;

  // Start at login page as the entry point to the application
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [currentRole, setCurrentRole] = useState<UserRole>('manager');
  const [activeScreen, setActiveScreen] = useState<ScreenId>('dashboard');
  
  const [selectedEventId, setSelectedEventId] = useState<string | null>('ev_detailed_2026_01');
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>('conv_01');
  const [selectedGolfBookingId, setSelectedGolfBookingId] = useState<string | null>('golf_bk_01');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>('mem_102');

  const [facilities] = useState(MOCK_FACILITIES);
  const [calendarEvents, setCalendarEvents] = useState<MasterCalendarEvent[]>(MOCK_CALENDAR_EVENTS);
  const [detailedEvent, setDetailedEvent] = useState<DetailedEvent>(MOCK_DETAILED_EVENT);
  const [golfBookings, setGolfBookings] = useState<GolfBooking[]>(MOCK_GOLF_BOOKINGS);
  const [sportsBookings, setSportsBookings] = useState<SportsCourtBooking[]>(MOCK_SPORTS_BOOKINGS);
  const [members] = useState<MemberRecord[]>(MOCK_MEMBERS);
  const [conversations, setConversations] = useState<ConversationItem[]>(MOCK_CONVERSATIONS);
  const [payments, setPayments] = useState<PaymentTransaction[]>(MOCK_PAYMENTS);
  const [aiReviews, setAiReviews] = useState<AIReviewItem[]>(MOCK_AI_REVIEWS);
  const [knowledgeRules, setKnowledgeRules] = useState<KnowledgeRule[]>(MOCK_KNOWLEDGE_RULES);
  const [staffList, setStaffList] = useState<StaffAccount[]>(MOCK_STAFF);
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>(MOCK_INTEGRATIONS);
  const [config, setConfig] = useState<ClubConfigSettings>(MOCK_CONFIG);

  const login = (username: string, role: UserRole = 'member') => {
    setIsAuthenticated(true);
    setCurrentRole(role);
    setCurrentUser({
      ...INITIAL_USER,
      name: username || 'Sir Arthur Sterling',
      role: role
    });
    if (role === 'member') {
      setActiveScreen('member_dashboard');
    } else {
      setActiveScreen('dashboard');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(prev => ({
      ...prev,
      role
    }));
    if (role === 'member') {
      setActiveScreen('member_dashboard');
    }
  };

  const navigateTo = (screen: ScreenId, params?: { eventId?: string; convId?: string; golfId?: string; memberId?: string }) => {
    setActiveScreen(screen);
    if (params?.eventId) setSelectedEventId(params.eventId);
    if (params?.convId) setSelectedConversationId(params.convId);
    if (params?.golfId) setSelectedGolfBookingId(params.golfId);
    if (params?.memberId) setSelectedMemberId(params.memberId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCalendarEventStatus = (id: string, status: BookingStatus) => {
    setCalendarEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        return {
          ...ev,
          status,
          hasConflict: status === 'cancelled' ? false : ev.hasConflict
        };
      }
      return ev;
    }));
  };

  const resolveConflict = (eventId: string, resolution: 'move_venue' | 'release_hold' | 'confirm_event') => {
    setCalendarEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        if (resolution === 'move_venue') {
          return {
            ...ev,
            facilityId: 'fac_palm_terrace',
            facilityName: 'Palm Terrace & Veranda',
            hasConflict: false,
            notes: (ev.notes || '') + ' [Relocated to Palm Terrace to resolve conflict with Sterling Gala]'
          };
        } else if (resolution === 'release_hold') {
          return {
            ...ev,
            status: 'cancelled',
            hasConflict: false,
            notes: (ev.notes || '') + ' [Hold released by staff due to confirmed conflict]'
          };
        } else {
          return {
            ...ev,
            hasConflict: false,
            status: 'confirmed'
          };
        }
      }
      return ev;
    }));
  };

  const addCalendarEvent = (eventData: Omit<MasterCalendarEvent, 'id'>) => {
    const newEvent: MasterCalendarEvent = {
      ...eventData,
      id: `cal_ev_${Date.now()}`
    };
    setCalendarEvents(prev => [newEvent, ...prev]);
  };

  const updateEventDetailed = (updated: DetailedEvent) => {
    setDetailedEvent(updated);
  };

  const addEventTask = (taskData: Omit<EventTask, 'id'>) => {
    const newTask: EventTask = {
      ...taskData,
      id: `tsk_${Date.now()}`
    };
    setDetailedEvent(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
  };

  const toggleEventTask = (taskId: string) => {
    setDetailedEvent(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    }));
  };

  const aiGenerateChecklist = () => {
    const aiGeneratedTasks: EventTask[] = [
      {
        id: `tsk_ai_${Date.now()}_1`,
        title: 'Review allergen placecards with Sous Chef for Table 4 & 7',
        assignee: 'Chef Laurent',
        dueDate: '2026-09-25 15:30',
        completed: false,
        priority: 'high',
        category: 'catering'
      },
      {
        id: `tsk_ai_${Date.now()}_2`,
        title: 'Calibrate wireless clip-on lavalier mic for keynote speaker',
        assignee: 'Marcus Vance (Tech)',
        dueDate: '2026-09-25 16:00',
        completed: false,
        priority: 'high',
        category: 'av'
      },
      {
        id: `tsk_ai_${Date.now()}_3`,
        title: 'Inspect valet turnaround queue & VIP parking stanchions',
        assignee: 'Front Desk Lead',
        dueDate: '2026-09-25 16:45',
        completed: false,
        priority: 'medium',
        category: 'staffing'
      },
      {
        id: `tsk_ai_${Date.now()}_4`,
        title: 'Prepare midnight espresso martini trolley station',
        assignee: 'Banquet Lead Steward',
        dueDate: '2026-09-25 21:00',
        completed: false,
        priority: 'low',
        category: 'catering'
      }
    ];

    setDetailedEvent(prev => ({
      ...prev,
      tasks: [...prev.tasks, ...aiGeneratedTasks],
      auditHistory: [
        {
          id: `aud_${Date.now()}`,
          timestamp: 'Just now',
          staffName: 'AI Event Copilot',
          action: 'AI Checklist Generated',
          details: 'Generated 4 operational prep tasks based on guest count and run-of-show timeline.'
        },
        ...prev.auditHistory
      ]
    }));
  };

  const sendEventMessage = (text: string, isAi = false) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: isAi ? 'Club AI Assistant' : currentUser.name,
      senderRole: isAi ? ('ai' as const) : ('staff' as const),
      timestamp: 'Just now',
      text,
      isAiGenerated: isAi
    };
    setDetailedEvent(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));
  };

  const approveEventQuote = () => {
    setDetailedEvent(prev => ({
      ...prev,
      stage: 'confirmed',
      auditHistory: [
        {
          id: `aud_${Date.now()}`,
          timestamp: 'Just now',
          staffName: currentUser.name,
          action: 'Quote Approved & Finalized',
          details: `Total agreement of $${prev.totalAmount.toLocaleString()} confirmed. Event status shifted to Confirmed.`
        },
        ...prev.auditHistory
      ]
    }));
  };

  const checkInGolfPlayer = (bookingId: string, playerId: string) => {
    setGolfBookings(prev => prev.map(bk => {
      if (bk.id === bookingId) {
        const updatedPlayers = bk.players.map(p => p.id === playerId ? { ...p, checkedIn: true } : p);
        const allCheckedIn = updatedPlayers.every(p => p.checkedIn);
        return {
          ...bk,
          players: updatedPlayers,
          status: allCheckedIn ? 'checked_in' : bk.status
        };
      }
      return bk;
    }));
  };

  const checkInSportsBooking = (bookingId: string) => {
    setSportsBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'checked_in' } : b));
  };

  const cancelGolfBooking = (bookingId: string) => {
    setGolfBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
  };

  const sendConversationReply = (convId: string, content: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          status: 'resolved',
          unread: false,
          lastMessage: content,
          lastUpdated: 'Just now',
          thread: [
            ...c.thread,
            {
              id: `th_${Date.now()}`,
              sender: currentUser.name,
              senderType: 'staff',
              timestamp: 'Just now',
              content
            }
          ]
        };
      }
      return c;
    }));
  };

  const updateConversationStatus = (convId: string, status: ConversationItem['status']) => {
    setConversations(prev => prev.map(c => c.id === convId ? { ...c, status } : c));
  };

  const approveAiReview = (id: string) => {
    setAiReviews(prev => prev.map(item => item.id === id ? { ...item, status: 'approved' } : item));
  };

  const rejectAiReview = (id: string) => {
    setAiReviews(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected' } : item));
  };

  const editAiReview = (id: string, content: string) => {
    setAiReviews(prev => prev.map(item => item.id === id ? { ...item, status: 'edited', editedContent: content } : item));
  };

  const reconcilePayment = (id: string) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, reconciled: true } : p));
  };

  const issueRefund = (id: string) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'Refunded' } : p));
  };

  const updateKnowledgeRule = (rule: KnowledgeRule) => {
    setKnowledgeRules(prev => prev.map(r => r.id === rule.id ? rule : r));
  };

  const addKnowledgeRule = (ruleData: Omit<KnowledgeRule, 'id'>) => {
    const newRule: KnowledgeRule = {
      ...ruleData,
      id: `kr_${Date.now()}`
    };
    setKnowledgeRules(prev => [newRule, ...prev]);
  };

  const updateClubConfig = (newConfig: Partial<ClubConfigSettings>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const retryIntegrationSync = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'healthy',
          failedRecordsCount: 0,
          lastSync: 'Just now'
        };
      }
      return item;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        currentRole,
        activeScreen,
        selectedEventId,
        selectedConversationId,
        selectedGolfBookingId,
        selectedMemberId,
        language,
        setLanguage,
        toggleLanguage,
        t,
        tr,
        facilities,
        calendarEvents,
        detailedEvent,
        golfBookings,
        sportsBookings,
        members,
        conversations,
        payments,
        aiReviews,
        knowledgeRules,
        staffList,
        integrations,
        config,
        login,
        logout,
        switchRole,
        navigateTo,
        updateCalendarEventStatus,
        resolveConflict,
        addCalendarEvent,
        updateEventDetailed,
        addEventTask,
        toggleEventTask,
        aiGenerateChecklist,
        sendEventMessage,
        approveEventQuote,
        checkInGolfPlayer,
        checkInSportsBooking,
        cancelGolfBooking,
        sendConversationReply,
        updateConversationStatus,
        approveAiReview,
        rejectAiReview,
        editAiReview,
        reconcilePayment,
        issueRefund,
        updateKnowledgeRule,
        addKnowledgeRule,
        updateClubConfig,
        retryIntegrationSync
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
