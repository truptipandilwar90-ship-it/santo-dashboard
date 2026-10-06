export type UserRole = 
  | 'front_desk'
  | 'events_team'
  | 'golf_sports'
  | 'finance'
  | 'manager'
  | 'sysadmin'
  | 'member';

export type ScreenId =
  | 'dashboard'
  | 'member_dashboard'
  | 'inbox'
  | 'conversation_detail'
  | 'master_calendar'
  | 'event_inquiries'
  | 'event_detail'
  | 'venues_packages'
  | 'tee_sheet'
  | 'golf_booking_detail'
  | 'facility_bookings'
  | 'member_directory'
  | 'payments_transactions'
  | 'ai_review_queue'
  | 'knowledge_rules'
  | 'reports'
  | 'staff_permissions'
  | 'integrations_health'
  | 'configuration';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  title: string;
}

export type FacilityCategory = 'event_hall' | 'golf' | 'sports';

export interface Facility {
  id: string;
  name: string;
  category: FacilityCategory;
  capacity?: number;
  location: string;
  hourlyRate?: number;
  color: string;
  image?: string;
  description: string;
  amenities: string[];
}

export type BookingStatus = 'confirmed' | 'hold' | 'closure' | 'inquiry' | 'completed' | 'cancelled';

export interface MasterCalendarEvent {
  id: string;
  title: string;
  facilityId: string;
  facilityName: string;
  facilityCategory: FacilityCategory;
  startTime: string; // ISO or HH:mm
  endTime: string;
  date: string; // YYYY-MM-DD
  status: BookingStatus;
  memberName: string;
  memberId: string;
  guestCount?: number;
  type: string;
  hasConflict?: boolean;
  conflictDetails?: string;
  notes?: string;
  depositStatus?: 'paid' | 'pending' | 'waived';
  totalAmount?: number;
  holdExpiresAt?: string;
}

export type EventInquiryStage = 
  | 'inquiry'
  | 'quotation'
  | 'deposit'
  | 'confirmed'
  | 'completed'
  | 'closed';

export interface EventTask {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'catering' | 'av' | 'decor' | 'billing' | 'staffing';
}

export interface EventQuoteLineItem {
  id: string;
  description: string;
  category: 'venue' | 'catering' | 'beverage' | 'av_tech' | 'staff' | 'gratuity' | 'tax';
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface EventMessage {
  id: string;
  sender: string;
  senderRole: 'client' | 'staff' | 'ai';
  timestamp: string;
  text: string;
  isAiGenerated?: boolean;
}

export interface EventAuditLog {
  id: string;
  timestamp: string;
  staffName: string;
  action: string;
  details: string;
}

export interface DetailedEvent {
  id: string;
  title: string;
  eventType: 'Wedding' | 'Corporate Gala' | 'Golf Tournament' | 'Anniversary' | 'Executive Summit' | 'Private Dining';
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  memberTier: 'Platinum' | 'Gold' | 'Social' | 'Founding Member';
  date: string;
  venueId: string;
  venueName: string;
  layout: 'Banquet Rounds' | 'Theater' | 'Cocktail Reception' | 'Boardroom' | 'Classroom';
  guestCount: number;
  stage: EventInquiryStage;
  ownerStaff: string;
  timeline: {
    vendorLoadIn: string;
    guestArrival: string;
    eventStart: string;
    dinnerService: string;
    eventEnd: string;
    teardownComplete: string;
  };
  cateringRequirements: {
    serviceType: string;
    menuSelection: string;
    beverageTier: string;
    dietaryRestrictions: string[];
    specialRequests: string;
  };
  avRequirements: string[];
  quoteItems: EventQuoteLineItem[];
  subtotal: number;
  serviceCharge: number; // 20%
  tax: number; // 8.25%
  totalAmount: number;
  depositRequired: number; // 30% or 50%
  depositPaid: number;
  depositPaidDate?: string;
  balanceDue: number;
  balanceDueDate: string;
  tasks: EventTask[];
  messages: EventMessage[];
  auditHistory: EventAuditLog[];
  aiBrief: {
    summary: string;
    missingDetails: string[];
    riskScore: 'Low' | 'Medium' | 'High';
    suggestedUpsell: string;
  };
}

export interface GolfBookingPlayer {
  id: string;
  name: string;
  isMember: boolean;
  memberId?: string;
  handicap: number;
  cartRequested: boolean;
  caddyRequested: boolean;
  rentalClubs: boolean;
  checkedIn: boolean;
}

export interface GolfBooking {
  id: string;
  course: 'Championship 18-Hole' | 'Executive 9-Hole';
  date: string;
  teeTime: string;
  players: GolfBookingPlayer[];
  status: 'confirmed' | 'checked_in' | 'cancelled' | 'in_progress';
  paymentStatus: 'paid' | 'pending' | 'comped' | 'club_account';
  totalCharge: number;
  bookedBy: string;
  bookedByEmail: string;
  notes: string;
  weatherConditions?: string;
  modifications: {
    timestamp: string;
    user: string;
    change: string;
  }[];
}

export interface SportsCourtBooking {
  id: string;
  sport: 'Tennis' | 'Padel' | 'Squash' | 'Lap Swimming';
  facilityName: string;
  date: string;
  startTime: string;
  endTime: string;
  bookedBy: string;
  memberId: string;
  playersCount: number;
  status: 'confirmed' | 'checked_in' | 'cancelled';
  isLesson: boolean;
  coachName?: string;
  fee: number;
  paymentStatus: 'paid' | 'member_charge';
}

export interface MemberRecord {
  id: string;
  name: string;
  membershipNumber: string;
  tier: 'Platinum Founding' | 'Full Golf & Athletic' | 'Executive Social' | 'Junior Athletic';
  status: 'Active' | 'Delinquent' | 'Leave of Absence';
  email: string;
  phone: string;
  joinedDate: string;
  handicap?: number;
  householdsCount: number;
  dependents: string[];
  accountBalance: number;
  creditLimit: number;
  recentBookingsCount: number;
  lifetimeSpend: number;
  notes: string;
}

export interface ConversationItem {
  id: string;
  memberId: string;
  memberName: string;
  memberTier: string;
  memberAvatar: string;
  subject: string;
  lastMessage: string;
  lastUpdated: string;
  department: 'Events' | 'Golf' | 'Sports' | 'Billing' | 'Concierge';
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'pending_staff' | 'ai_drafted' | 'resolved';
  assignee: string;
  unread: boolean;
  aiSummary: string;
  extractedRequirements: string[];
  suggestedResponse: string;
  thread: {
    id: string;
    sender: string;
    senderType: 'member' | 'staff' | 'ai_system';
    timestamp: string;
    content: string;
  }[];
}

export interface PaymentTransaction {
  id: string;
  transactionNumber: string;
  date: string;
  memberName: string;
  memberId: string;
  serviceCategory: 'Event Deposit' | 'Event Balance' | 'Golf Green Fee' | 'Court Booking' | 'Dining Gratuity' | 'Pro Shop';
  referenceId: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Refunded' | 'Failed';
  paymentMethod: 'Club Account' | 'Visa •• 4242' | 'Amex •• 1009' | 'ACH Wire';
  reconciled: boolean;
  receiptUrl?: string;
}

export interface AIReviewItem {
  id: string;
  title: string;
  type: 'inquiry_response' | 'venue_recommendation' | 'quote_discount' | 'cancellation_waiver';
  requestedByMember: string;
  memberTier: string;
  memberPrompt: string;
  proposedOutput: string;
  sourceInformationUsed: string[];
  confidenceScore: number; // 0-100
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'edited';
  editedContent?: string;
}

export interface KnowledgeRule {
  id: string;
  category: 'FAQ' | 'Venue Specs' | 'Cancellation Policy' | 'Golf Rules' | 'Dress Code';
  title: string;
  approvedContent: string;
  mustHandOffToStaff: boolean;
  triggerKeywords: string[];
  languages: string[];
  lastUpdated: string;
  updatedBy: string;
}

export interface StaffAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  approvalLimit: number; // e.g. up to $500 refund
  active: boolean;
  lastActive: string;
}

export interface IntegrationStatus {
  id: string;
  serviceName: string;
  category: 'calendar' | 'payments' | 'member_pms' | 'pos';
  status: 'healthy' | 'degraded' | 'syncing' | 'error';
  lastSync: string;
  failedRecordsCount: number;
  endpointUrl: string;
  description: string;
}

export interface ClubConfigSettings {
  clubName: string;
  operatingHours: {
    clubhouseOpen: string;
    clubhouseClose: string;
    golfCourseOpen: string;
    golfCourseClose: string;
    sportsPavilionOpen: string;
    sportsPavilionClose: string;
  };
  bookingWindows: {
    platinumDaysAdvance: number;
    goldDaysAdvance: number;
    socialDaysAdvance: number;
  };
  cancellationRules: {
    golfFreeCancelHours: number;
    sportsFreeCancelHours: number;
    eventDepositRefundDays: number;
  };
  responseSLAHours: {
    urgent: number;
    normal: number;
  };
  serviceChargePercent: number;
  taxPercent: number;
  depositRequiredPercent: number;
  automatedAiDrafting: boolean;
}
