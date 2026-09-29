import {
  Facility,
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
  UserProfile
} from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_sarah_01',
  name: 'Eleanor Vance',
  email: 'e.vance@verdanthillsclub.com',
  role: 'manager',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  department: 'Club Executive Operations',
  title: 'Director of Hospitality & Club Operations'
};

export const MOCK_FACILITIES: Facility[] = [
  {
    id: 'fac_ballroom',
    name: 'Grand Crystal Ballroom',
    category: 'event_hall',
    capacity: 350,
    location: 'Clubhouse Level 2',
    hourlyRate: 650,
    color: '#059669', // Emerald
    image: '/src/assets/images/venue_ballroom_1790328711940.jpg',
    description: 'Premier ballroom featuring vaulted hand-cut crystal chandeliers, panoramic glass views of the emerald fairways, private bridal suite, and dedicated banquet kitchen.',
    amenities: ['Private Bridal Suite', 'Yamaha Baby Grand Piano', 'Integrated 4K Projection', 'Custom Uplighting Suite', 'Dedicated Service Bar']
  },
  {
    id: 'fac_palm_terrace',
    name: 'Palm Terrace & Veranda',
    category: 'event_hall',
    capacity: 180,
    location: 'Clubhouse West Lawn',
    hourlyRate: 420,
    color: '#10B981',
    image: '/src/assets/images/venue_ballroom_1790328711940.jpg',
    description: 'Covered outdoor portico with limestone fireplace, radiant overhead heating, and manicured cocktail lawns ideal for twilight receptions.',
    amenities: ['Stone Fireplace', 'Radiant Overhead Heaters', 'Perimeter Sound System', 'Private Cocktail Lawn', 'Retractable Awnings']
  },
  {
    id: 'fac_oak_boardroom',
    name: 'Founders Oak Boardroom',
    category: 'event_hall',
    capacity: 28,
    location: 'Executive Wing, Level 3',
    hourlyRate: 200,
    color: '#34D399',
    description: 'Executive conference boardroom lined in heritage quarter-sawn oak with interactive digital presentation board and private steward service.',
    amenities: ['85" Interactive Display', 'Video Telepresence', 'Private Dining Steward', 'Espresso Bar', 'Soundproof Partitions']
  },
  {
    id: 'fac_golf_champ',
    name: 'North Championship Course (18 Holes)',
    category: 'golf',
    location: 'Par 72 / 7,240 Yards',
    hourlyRate: 180,
    color: '#15803D', // Deep Forest Green
    image: '/src/assets/images/venue_golf_course_1790328727268.jpg',
    description: 'Championship-caliber Robert Trent Jones design featuring signature water hazards on holes 9 and 18, bentgrass greens, and full caddy services.',
    amenities: ['GPS Enabled Luxury Carts', 'Forecaddie Program', 'Halfway House Hospitality', 'Titleist Practice Range', 'TrackMan Launch Monitors']
  },
  {
    id: 'fac_golf_exec',
    name: 'South Links Executive (9 Holes)',
    category: 'golf',
    location: 'Par 31 / 2,150 Yards',
    hourlyRate: 95,
    color: '#16A34A',
    image: '/src/assets/images/venue_golf_course_1790328727268.jpg',
    description: 'Brisk 9-hole executive course engineered for short-game mastery, family play, and twilight business rounds with pristine greens.',
    amenities: ['Walking Pull Carts', 'Practice Putting Course', 'Short Game Bunker Complex']
  },
  {
    id: 'fac_tennis_center',
    name: 'Clay Tennis Pavilion (Courts 1–6)',
    category: 'sports',
    location: 'Athletic Center East',
    hourlyRate: 45,
    color: '#0D9488', // Teal
    image: '/src/assets/images/venue_racquet_club_1790328743210.jpg',
    description: 'Six championship Har-Tru hydro-court clay tennis surfaces equipped with tournament LED lighting and shaded player pavilions.',
    amenities: ['Hydro-Courts Har-Tru', 'Stadium Seating Court 1', 'Ball Machine Rental', 'Pro Shop Stringing Service', 'Locker Rooms']
  },
  {
    id: 'fac_padel_club',
    name: 'Glass Padel Courts (Courts 1–4)',
    category: 'sports',
    location: 'Athletic Center North',
    hourlyRate: 55,
    color: '#0284C7', // Sky blue
    image: '/src/assets/images/venue_racquet_club_1790328743210.jpg',
    description: 'Panoramic glass-walled padel courts with Mondo Supercourt turf, pro sound system, and viewing lounge.',
    amenities: ['Panoramic Glass Walls', 'Mondo Professional Turf', 'Court-side Sound', 'Equipment Rental']
  },
  {
    id: 'fac_aquatics',
    name: 'Olympic Aquatics Complex (Lanes 1–8)',
    category: 'sports',
    location: 'Poolside Pavilion',
    hourlyRate: 25,
    color: '#06B6D4',
    description: 'Temperature-controlled 50-meter outdoor competition lap pool with certified lifeguards and private cabana service.',
    amenities: ['Pace Clocks', 'Underwater Audio for Training', 'Locker & Sauna Facilities', 'Towel Service']
  }
];

export const MOCK_CALENDAR_EVENTS: MasterCalendarEvent[] = [
  {
    id: 'cal_ev_01',
    title: 'Sterling Annual Gala & Charity Auction',
    facilityId: 'fac_ballroom',
    facilityName: 'Grand Crystal Ballroom',
    facilityCategory: 'event_hall',
    startTime: '16:00',
    endTime: '23:30',
    date: '2026-09-25',
    status: 'confirmed',
    memberName: 'Sir Arthur Sterling',
    memberId: 'mem_102',
    guestCount: 220,
    type: 'Corporate Gala',
    depositStatus: 'paid',
    totalAmount: 38500,
    notes: 'Requires red carpet setup at 14:00. Soundcheck with 6-piece jazz ensemble at 15:30.'
  },
  {
    id: 'cal_ev_02',
    title: 'Vanderbilt Wedding Reception (Temporary Hold)',
    facilityId: 'fac_ballroom',
    facilityName: 'Grand Crystal Ballroom',
    facilityCategory: 'event_hall',
    startTime: '17:00',
    endTime: '23:00',
    date: '2026-09-25',
    status: 'hold',
    memberName: 'Victoria Vanderbilt',
    memberId: 'mem_108',
    guestCount: 190,
    type: 'Wedding',
    hasConflict: true,
    conflictDetails: 'Double-hold detected with Sterling Annual Gala! Both require Ballroom between 17:00 - 23:00.',
    holdExpiresAt: '2026-09-25 18:00',
    notes: 'Member requested option hold. Deposit pending contract countersignature.'
  },
  {
    id: 'cal_ev_03',
    title: 'Executive Board Dinner & Wine Pairing',
    facilityId: 'fac_oak_boardroom',
    facilityName: 'Founders Oak Boardroom',
    facilityCategory: 'event_hall',
    startTime: '18:30',
    endTime: '22:00',
    date: '2026-09-25',
    status: 'confirmed',
    memberName: 'Marcus Kensington',
    memberId: 'mem_101',
    guestCount: 24,
    type: 'Executive Summit',
    depositStatus: 'paid',
    totalAmount: 6400,
    notes: 'Sommelier cellar reserve tasting menu. Strict nondisclosure privacy.'
  },
  {
    id: 'cal_ev_04',
    title: 'President Cup Men\'s Invitational (Tee Times 1-14)',
    facilityId: 'fac_golf_champ',
    facilityName: 'North Championship Course (18 Holes)',
    facilityCategory: 'golf',
    startTime: '08:00',
    endTime: '14:30',
    date: '2026-09-25',
    status: 'confirmed',
    memberName: 'Club Tournament Committee',
    memberId: 'mem_club',
    guestCount: 56,
    type: 'Golf Tournament',
    depositStatus: 'waived',
    totalAmount: 11200,
    notes: 'Shotgun start at 08:30. Course closed to casual play until 15:00.'
  },
  {
    id: 'cal_ev_05',
    title: 'Aeration & Sand Topdressing (Fairways 4-9)',
    facilityId: 'fac_golf_exec',
    facilityName: 'South Links Executive (9 Holes)',
    facilityCategory: 'golf',
    startTime: '06:00',
    endTime: '12:00',
    date: '2026-09-25',
    status: 'closure',
    memberName: 'Greenskeeper Operations',
    memberId: 'mem_ops',
    type: 'Maintenance Closure',
    notes: 'Seasonal turf care. Back 9 reopened at 12:30.'
  },
  {
    id: 'cal_ev_06',
    title: 'Club Junior Tennis Championship Semifinals',
    facilityId: 'fac_tennis_center',
    facilityName: 'Clay Tennis Pavilion (Courts 1–6)',
    facilityCategory: 'sports',
    startTime: '09:00',
    endTime: '13:00',
    date: '2026-09-25',
    status: 'confirmed',
    memberName: 'Coach Mateo Rossi',
    memberId: 'mem_115',
    guestCount: 32,
    type: 'Tennis Tournament',
    notes: 'Courts 1, 2 and 3 reserved. Courts 4-6 remain open for general member bookings.'
  },
  {
    id: 'cal_ev_07',
    title: 'Masters Padel Clinic & Doubles Social',
    facilityId: 'fac_padel_club',
    facilityName: 'Glass Padel Courts (Courts 1–4)',
    facilityCategory: 'sports',
    startTime: '17:00',
    endTime: '20:00',
    date: '2026-09-25',
    status: 'confirmed',
    memberName: 'Elena Rostova',
    memberId: 'mem_105',
    guestCount: 16,
    type: 'Padel Social',
    depositStatus: 'paid',
    totalAmount: 1200
  },
  {
    id: 'cal_ev_08',
    title: 'Montague 50th Birthday Soirée',
    facilityId: 'fac_palm_terrace',
    facilityName: 'Palm Terrace & Veranda',
    facilityCategory: 'event_hall',
    startTime: '19:00',
    endTime: '23:30',
    date: '2026-09-26',
    status: 'confirmed',
    memberName: 'Lady Genevieve Montague',
    memberId: 'mem_104',
    guestCount: 120,
    type: 'Anniversary',
    depositStatus: 'paid',
    totalAmount: 22800
  },
  {
    id: 'cal_ev_09',
    title: 'BioTech Capital Summit (Inquiry Hold)',
    facilityId: 'fac_ballroom',
    facilityName: 'Grand Crystal Ballroom',
    facilityCategory: 'event_hall',
    startTime: '09:00',
    endTime: '17:00',
    date: '2026-09-27',
    status: 'hold',
    memberName: 'Dr. Raymond Chen',
    memberId: 'mem_110',
    guestCount: 160,
    type: 'Corporate Gala',
    holdExpiresAt: '2026-09-26 12:00',
    notes: 'Awaiting catering contract review.'
  }
];

export const MOCK_DETAILED_EVENT: DetailedEvent = {
  id: 'ev_detailed_2026_01',
  title: 'Sterling Annual Gala & Charity Auction',
  eventType: 'Corporate Gala',
  memberId: 'mem_102',
  memberName: 'Sir Arthur Sterling',
  memberEmail: 'arthur.sterling@sterling-holdings.co.uk',
  memberPhone: '+1 (555) 392-8812',
  memberTier: 'Platinum',
  date: '2026-09-25',
  venueId: 'fac_ballroom',
  venueName: 'Grand Crystal Ballroom',
  layout: 'Banquet Rounds',
  guestCount: 220,
  stage: 'confirmed',
  ownerStaff: 'Eleanor Vance (Hospitality Dir.)',
  timeline: {
    vendorLoadIn: '13:00',
    guestArrival: '17:30',
    eventStart: '18:00',
    dinnerService: '19:30',
    eventEnd: '23:00',
    teardownComplete: '00:30'
  },
  cateringRequirements: {
    serviceType: '4-Course Plated Fine Dining',
    menuSelection: 'Heirloom Burrata, Pan-Seared Chilean Seabass or Wagyu Filet Mignon, Valrhona Chocolate Dome',
    beverageTier: 'Sommelier Reserve Open Bar (Dom Pérignon, Silver Oak Cabernet)',
    dietaryRestrictions: ['14 Vegetarian', '8 Gluten-Free', '4 Halal', '2 Shellfish Allergy'],
    specialRequests: 'Custom ice sculpture with Sterling Foundation crest. Midnight truffle fries served during dancing.'
  },
  avRequirements: [
    'Dual 180" Laser Projectors with Live Auction Relay',
    '8 Wireless Shure Microphones for Auctioneer & Keynote',
    'Custom Emerald & Gold Amber Intelligent Uplighting',
    'DJ Sound System with 18" Subwoofers for Afterparty'
  ],
  quoteItems: [
    {
      id: 'qi_1',
      description: 'Grand Crystal Ballroom Facility Rental (Exclusive 12 Hours)',
      category: 'venue',
      quantity: 1,
      unitPrice: 7500,
      total: 7500
    },
    {
      id: 'qi_2',
      description: 'Plated 4-Course Gala Dinner ($115/guest)',
      category: 'catering',
      quantity: 220,
      unitPrice: 115,
      total: 25300
    },
    {
      id: 'qi_3',
      description: 'Sommelier Reserve Premium Beverage Package ($55/guest)',
      category: 'beverage',
      quantity: 220,
      unitPrice: 55,
      total: 12100
    },
    {
      id: 'qi_4',
      description: 'Full AV Production, Lighting Rig & Live Tech Staff',
      category: 'av_tech',
      quantity: 1,
      unitPrice: 3800,
      total: 3800
    },
    {
      id: 'qi_5',
      description: 'White Glove Banquet Captain & Butler Service Staff (12 staff)',
      category: 'staff',
      quantity: 12,
      unitPrice: 250,
      total: 3000
    }
  ],
  subtotal: 51700,
  serviceCharge: 10340, // 20%
  tax: 4265.25, // 8.25%
  totalAmount: 66305.25,
  depositRequired: 20000,
  depositPaid: 20000,
  depositPaidDate: '2026-09-10',
  balanceDue: 46305.25,
  balanceDueDate: '2026-09-24',
  tasks: [
    {
      id: 'tsk_1',
      title: 'Confirm final banquet seating chart with Sir Arthur',
      assignee: 'Eleanor Vance',
      dueDate: '2026-09-24',
      completed: true,
      priority: 'high',
      category: 'catering'
    },
    {
      id: 'tsk_2',
      title: 'Run AV acoustic check & mic wireless frequency audit',
      assignee: 'Marcus Vance (Tech)',
      dueDate: '2026-09-25 14:00',
      completed: false,
      priority: 'high',
      category: 'av'
    },
    {
      id: 'tsk_3',
      title: 'Inspect floral installation with Botanica Studio',
      assignee: 'Clara Hayes',
      dueDate: '2026-09-25 15:00',
      completed: false,
      priority: 'medium',
      category: 'decor'
    },
    {
      id: 'tsk_4',
      title: 'Verify sommelier cellar reserve delivery (Dom Pérignon 2012)',
      assignee: 'Chef Laurent',
      dueDate: '2026-09-25 12:00',
      completed: true,
      priority: 'high',
      category: 'catering'
    },
    {
      id: 'tsk_5',
      title: 'Reconcile remaining balance invoice with Sterling office',
      assignee: 'Finance Dept',
      dueDate: '2026-09-26',
      completed: false,
      priority: 'medium',
      category: 'billing'
    }
  ],
  messages: [
    {
      id: 'msg_1',
      sender: 'Sir Arthur Sterling',
      senderRole: 'client',
      timestamp: '2026-09-23 10:14',
      text: 'Good morning Eleanor. We have three VIP guest additions for Table 1 (Ambassador Vance and guests). Could we accommodate their dietary preferences for sea bass instead of beef?'
    },
    {
      id: 'msg_2',
      sender: 'Eleanor Vance (Hospitality Dir.)',
      senderRole: 'staff',
      timestamp: '2026-09-23 11:05',
      text: 'Good morning Sir Arthur. Absolutely delighted to accommodate. Chef Laurent has already flagged Table 1 for three seabass preparations and our banquet team has updated the master placecards.'
    },
    {
      id: 'msg_3',
      sender: 'Club AI Assistant',
      senderRole: 'ai',
      timestamp: '2026-09-24 09:30',
      text: 'Automated briefing: Weather forecast is 72°F clear skies. Red carpet arrivals will proceed smoothly. Valet staffing confirmed for 6 attendants.',
      isAiGenerated: true
    }
  ],
  auditHistory: [
    {
      id: 'aud_1',
      timestamp: '2026-09-08 14:22',
      staffName: 'Eleanor Vance',
      action: 'Inquiry Created',
      details: 'Member submitted proposal request for 200-240 attendees.'
    },
    {
      id: 'aud_2',
      timestamp: '2026-09-10 11:45',
      staffName: 'System (Stripe)',
      action: 'Deposit Received',
      details: '$20,000.00 deposit charged to Platinum Member Account #102.'
    },
    {
      id: 'aud_3',
      timestamp: '2026-09-23 11:10',
      staffName: 'Eleanor Vance',
      action: 'Requirements Updated',
      details: 'Guest count increased from 217 to 220. Table 1 dietary preferences modified.'
    }
  ],
  aiBrief: {
    summary: 'High-profile charity gala with prominent club benefactors. All primary vendors contracted and deposit settled. Final balance pending post-event wine consumption tally.',
    missingDetails: [
      'Final names for Table 8 auction spotters',
      'Confirmation of floral teardown window with florist'
    ],
    riskScore: 'Low',
    suggestedUpsell: 'Member has previously requested late-night espresso martini trolley after 22:30 ($1,200 package).'
  }
};

export const MOCK_GOLF_BOOKINGS: GolfBooking[] = [
  {
    id: 'golf_bk_01',
    course: 'Championship 18-Hole',
    date: '2026-09-25',
    teeTime: '07:30',
    status: 'checked_in',
    paymentStatus: 'paid',
    totalCharge: 360,
    bookedBy: 'Julian Sterling',
    bookedByEmail: 'julian@sterling.com',
    notes: 'Member requests luxury cart with GPS & club cooler.',
    players: [
      { id: 'p1', name: 'Julian Sterling', isMember: true, memberId: 'mem_102', handicap: 4.2, cartRequested: true, caddyRequested: false, rentalClubs: false, checkedIn: true },
      { id: 'p2', name: 'Charles Montgomery', isMember: true, memberId: 'mem_103', handicap: 8.6, cartRequested: true, caddyRequested: false, rentalClubs: false, checkedIn: true },
      { id: 'p3', name: 'Dr. Gregory Vance', isMember: false, handicap: 12.0, cartRequested: true, caddyRequested: false, rentalClubs: true, checkedIn: true },
      { id: 'p4', name: 'David Thornton', isMember: false, handicap: 15.4, cartRequested: true, caddyRequested: false, rentalClubs: false, checkedIn: true }
    ],
    modifications: [
      { timestamp: '2026-09-24 16:30', user: 'Julian Sterling', change: 'Added rental clubs for guest Dr. Vance.' }
    ]
  },
  {
    id: 'golf_bk_02',
    course: 'Championship 18-Hole',
    date: '2026-09-25',
    teeTime: '07:40',
    status: 'confirmed',
    paymentStatus: 'club_account',
    totalCharge: 270,
    bookedBy: 'Marcus Kensington',
    bookedByEmail: 'kensington@capital.com',
    notes: 'Pro Shop member account charge.',
    players: [
      { id: 'p5', name: 'Marcus Kensington', isMember: true, memberId: 'mem_101', handicap: 2.1, cartRequested: true, caddyRequested: true, rentalClubs: false, checkedIn: false },
      { id: 'p6', name: 'Senator Robert Hayes', isMember: false, handicap: 14.8, cartRequested: true, caddyRequested: true, rentalClubs: false, checkedIn: false },
      { id: 'p7', name: 'Edward Thorne', isMember: true, memberId: 'mem_111', handicap: 9.3, cartRequested: true, caddyRequested: false, rentalClubs: false, checkedIn: false }
    ],
    modifications: []
  },
  {
    id: 'golf_bk_03',
    course: 'Championship 18-Hole',
    date: '2026-09-25',
    teeTime: '07:50',
    status: 'confirmed',
    paymentStatus: 'paid',
    totalCharge: 180,
    bookedBy: 'Lady Genevieve Montague',
    bookedByEmail: 'g.montague@estate.org',
    notes: 'Member pair walking with push carts.',
    players: [
      { id: 'p8', name: 'Lady Genevieve Montague', isMember: true, memberId: 'mem_104', handicap: 11.2, cartRequested: false, caddyRequested: false, rentalClubs: false, checkedIn: false },
      { id: 'p9', name: 'Beatrice Hamilton', isMember: true, memberId: 'mem_114', handicap: 16.0, cartRequested: false, caddyRequested: false, rentalClubs: false, checkedIn: false }
    ],
    modifications: []
  },
  {
    id: 'golf_bk_04',
    course: 'Executive 9-Hole',
    date: '2026-09-25',
    teeTime: '13:00',
    status: 'confirmed',
    paymentStatus: 'pending',
    totalCharge: 140,
    bookedBy: 'Harrison Boyd',
    bookedByEmail: 'harrison.boyd@boyd.net',
    notes: 'First time player on executive course.',
    players: [
      { id: 'p10', name: 'Harrison Boyd', isMember: true, memberId: 'mem_118', handicap: 24.0, cartRequested: true, caddyRequested: false, rentalClubs: true, checkedIn: false },
      { id: 'p11', name: 'Liam Boyd (Junior)', isMember: true, memberId: 'mem_118_j', handicap: 28.0, cartRequested: true, caddyRequested: false, rentalClubs: true, checkedIn: false }
    ],
    modifications: []
  }
];

export const MOCK_SPORTS_BOOKINGS: SportsCourtBooking[] = [
  {
    id: 'sp_01',
    sport: 'Tennis',
    facilityName: 'Tennis Court 1 (Championship Clay)',
    date: '2026-09-25',
    startTime: '08:00',
    endTime: '09:30',
    bookedBy: 'Victoria Vanderbilt',
    memberId: 'mem_108',
    playersCount: 2,
    status: 'checked_in',
    isLesson: true,
    coachName: 'Coach Mateo Rossi',
    fee: 90,
    paymentStatus: 'member_charge'
  },
  {
    id: 'sp_02',
    sport: 'Padel',
    facilityName: 'Padel Court 1 (Glass Pro)',
    date: '2026-09-25',
    startTime: '09:00',
    endTime: '10:30',
    bookedBy: 'Elena Rostova',
    memberId: 'mem_105',
    playersCount: 4,
    status: 'confirmed',
    isLesson: false,
    fee: 60,
    paymentStatus: 'paid'
  },
  {
    id: 'sp_03',
    sport: 'Tennis',
    facilityName: 'Tennis Court 4 (Har-Tru Clay)',
    date: '2026-09-25',
    startTime: '10:30',
    endTime: '12:00',
    bookedBy: 'Sir Arthur Sterling',
    memberId: 'mem_102',
    playersCount: 2,
    status: 'confirmed',
    isLesson: false,
    fee: 45,
    paymentStatus: 'paid'
  },
  {
    id: 'sp_04',
    sport: 'Lap Swimming',
    facilityName: 'Aquatics Complex Lane 3',
    date: '2026-09-25',
    startTime: '07:00',
    endTime: '08:00',
    bookedBy: 'Dr. Raymond Chen',
    memberId: 'mem_110',
    playersCount: 1,
    status: 'checked_in',
    isLesson: false,
    fee: 15,
    paymentStatus: 'paid'
  }
];

export const MOCK_MEMBERS: MemberRecord[] = [
  {
    id: 'mem_101',
    name: 'Marcus Kensington',
    membershipNumber: 'VH-00109',
    tier: 'Platinum Founding',
    status: 'Active',
    email: 'kensington@capital.com',
    phone: '+1 (555) 234-9910',
    joinedDate: '2014-04-12',
    handicap: 2.1,
    householdsCount: 3,
    dependents: ['Caroline Kensington (Spouse)', 'James Kensington (Son, 16)'],
    accountBalance: 1240.50,
    creditLimit: 15000,
    recentBookingsCount: 18,
    lifetimeSpend: 184500,
    notes: 'Prefers Table 4 in the Grill Room. High-value wine patron.'
  },
  {
    id: 'mem_102',
    name: 'Sir Arthur Sterling',
    membershipNumber: 'VH-00142',
    tier: 'Platinum Founding',
    status: 'Active',
    email: 'arthur.sterling@sterling-holdings.co.uk',
    phone: '+1 (555) 392-8812',
    joinedDate: '2016-09-18',
    handicap: 4.2,
    householdsCount: 4,
    dependents: ['Lady Margaret Sterling', 'Julian Sterling (Son)'],
    accountBalance: 46305.25,
    creditLimit: 50000,
    recentBookingsCount: 24,
    lifetimeSpend: 342000,
    notes: 'Charity foundation chairman. Hosts annual gala.'
  },
  {
    id: 'mem_104',
    name: 'Lady Genevieve Montague',
    membershipNumber: 'VH-00280',
    tier: 'Full Golf & Athletic',
    status: 'Active',
    email: 'g.montague@estate.org',
    phone: '+1 (555) 883-1994',
    joinedDate: '2019-02-10',
    handicap: 11.2,
    householdsCount: 2,
    dependents: ['Lord Richard Montague'],
    accountBalance: 450.00,
    creditLimit: 10000,
    recentBookingsCount: 12,
    lifetimeSpend: 92400,
    notes: 'Equestrian and golf enthusiast.'
  },
  {
    id: 'mem_105',
    name: 'Elena Rostova',
    membershipNumber: 'VH-00341',
    tier: 'Full Golf & Athletic',
    status: 'Active',
    email: 'elena.rostova@venture.ch',
    phone: '+1 (555) 902-3341',
    joinedDate: '2021-06-01',
    handicap: 14.5,
    householdsCount: 1,
    dependents: [],
    accountBalance: 0,
    creditLimit: 8000,
    recentBookingsCount: 22,
    lifetimeSpend: 46800,
    notes: 'Active padel club organizer and tournament captain.'
  },
  {
    id: 'mem_108',
    name: 'Victoria Vanderbilt',
    membershipNumber: 'VH-00418',
    tier: 'Executive Social',
    status: 'Active',
    email: 'v.vanderbilt@designstudio.ny',
    phone: '+1 (555) 441-2098',
    joinedDate: '2022-11-15',
    householdsCount: 2,
    dependents: ['William Vanderbilt Jr.'],
    accountBalance: 2800.00,
    creditLimit: 12000,
    recentBookingsCount: 9,
    lifetimeSpend: 68000,
    notes: 'Currently reviewing Grand Ballroom hold for Autumn wedding.'
  },
  {
    id: 'mem_110',
    name: 'Dr. Raymond Chen',
    membershipNumber: 'VH-00502',
    tier: 'Full Golf & Athletic',
    status: 'Active',
    email: 'raymond.chen@genomix.com',
    phone: '+1 (555) 772-9104',
    joinedDate: '2023-01-20',
    handicap: 18.2,
    householdsCount: 3,
    dependents: ['Grace Chen', 'Chloe Chen'],
    accountBalance: -120.00,
    creditLimit: 8000,
    recentBookingsCount: 15,
    lifetimeSpend: 38500,
    notes: 'Early morning lap swimmer. Regular member of Friday twilight golf.'
  }
];

export const MOCK_CONVERSATIONS: ConversationItem[] = [
  {
    id: 'conv_01',
    memberId: 'mem_108',
    memberName: 'Victoria Vanderbilt',
    memberTier: 'Executive Social',
    memberAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    subject: 'Autumn Wedding Ballroom Date Conflict & Tasting Request',
    lastMessage: 'We would love to know if the 25th evening can be cleared, or if Palm Terrace is an option.',
    lastUpdated: '12 mins ago',
    department: 'Events',
    urgency: 'urgent',
    status: 'pending_staff',
    assignee: 'Eleanor Vance',
    unread: true,
    aiSummary: 'Member is inquiring about Grand Ballroom availability for Sept 25/26, currently encountering a schedule conflict with the Sterling Gala hold. Suggest offering Palm Terrace or Sunday the 27th.',
    extractedRequirements: [
      'Guest Count: 180-200 guests',
      'Preferred Date: Sept 25 or 26',
      'Catering: Plated dinner + Champagne tower',
      'Alternative Venue: Palm Terrace & Veranda'
    ],
    suggestedResponse: 'Dear Victoria, thank you for your note. While the Grand Ballroom is currently held for the Sterling Foundation on the 25th, our heated Palm Terrace & Veranda is available, or we could secure Sunday Sept 27th exclusively for your wedding reception. May I prepare a tailored comparative proposal?',
    thread: [
      {
        id: 'th_1',
        sender: 'Victoria Vanderbilt',
        senderType: 'member',
        timestamp: 'Today, 08:15 AM',
        content: 'Hello Eleanor, our wedding planner inspected the Grand Ballroom photos and we are captivated. We noticed a tentative hold on the 25th. Could you advise if there is any flexibility, or perhaps recommend the Palm Terrace as an alternative?'
      },
      {
        id: 'th_2',
        sender: 'Eleanor Vance',
        senderType: 'staff',
        timestamp: 'Today, 08:32 AM',
        content: 'Good morning Victoria! It is lovely to hear from you. The 25th is held for the annual Sterling Gala, but I am already preparing a side-by-side walkthrough for the Palm Terrace, which accommodates up to 180 guests with our panoramic heaters and fireplace.'
      },
      {
        id: 'th_3',
        sender: 'Victoria Vanderbilt',
        senderType: 'member',
        timestamp: 'Today, 09:10 AM',
        content: 'That sounds delightful! Could we also schedule a private chef tasting for my fiancé and parents next Wednesday afternoon?'
      }
    ]
  },
  {
    id: 'conv_02',
    memberId: 'mem_101',
    memberName: 'Marcus Kensington',
    memberTier: 'Platinum Founding',
    memberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    subject: 'Boardroom AV & Vintage Wine Cellar Reserve',
    lastMessage: 'Please ensure the 2015 Château Margaux is decanted at 17:30 sharp.',
    lastUpdated: '45 mins ago',
    department: 'Events',
    urgency: 'high',
    status: 'open',
    assignee: 'Eleanor Vance',
    unread: false,
    aiSummary: 'Member requests specific vintage decanting schedule and dual-screen teleconference setup for the Founders Oak Boardroom tonight.',
    extractedRequirements: [
      'Founders Oak Boardroom',
      'Decant 2015 Château Margaux at 17:30',
      'Dual screen Zoom setup with international dial-in'
    ],
    suggestedResponse: 'Confirmed, Mr. Kensington. Head Sommelier Henri has retrieved the 2015 Margaux from our temperature-controlled cellar and will decant precisely at 17:30. Tech lead Marcus has verified the boardroom telepresence bridge.',
    thread: [
      {
        id: 'th_4',
        sender: 'Marcus Kensington',
        senderType: 'member',
        timestamp: 'Today, 07:45 AM',
        content: 'Eleanor, for tonight\'s dinner in the Founders Room, our Singapore board members are joining via video. Please ensure the telepresence rig is pre-tested. Also, please have Henri decant the 2015 Margaux at 17:30.'
      }
    ]
  },
  {
    id: 'conv_03',
    memberId: 'mem_105',
    memberName: 'Elena Rostova',
    memberTier: 'Full Golf & Athletic',
    memberAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    subject: 'Request for Saturday Padel League Court Block',
    lastMessage: 'Can we reserve all 4 glass courts between 10am and 1pm on Oct 10th?',
    lastUpdated: '2 hours ago',
    department: 'Sports',
    urgency: 'medium',
    status: 'ai_drafted',
    assignee: 'Coach Mateo Rossi',
    unread: false,
    aiSummary: 'Request for full-facility padel block for 24 players. Requires manager override as standard member rules cap reservations at 2 courts.',
    extractedRequirements: [
      'Padel Courts 1-4',
      'Oct 10, 10:00 - 13:00 (3 hours)',
      '24 players social tournament',
      'Requesting beverage station'
    ],
    suggestedResponse: 'Hi Elena, what a fantastic initiative! Under club tournament rules, reserving all 4 courts for 3 hours requires athletic director sign-off ($480 facility fee). I have forwarded this for approval and will confirm within 2 hours.',
    thread: [
      {
        id: 'th_5',
        sender: 'Elena Rostova',
        senderType: 'member',
        timestamp: 'Yesterday, 18:20',
        content: 'Hi Team, we have 24 club members interested in an Autumn Padel Doubles shootout on Saturday Oct 10th. Can we block all 4 courts from 10 to 1?'
      }
    ]
  }
];

export const MOCK_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'txn_01',
    transactionNumber: 'TXN-2026-9810',
    date: '2026-09-25 08:30',
    memberName: 'Julian Sterling',
    memberId: 'mem_102',
    serviceCategory: 'Golf Green Fee',
    referenceId: 'golf_bk_01',
    amount: 360.00,
    status: 'Completed',
    paymentMethod: 'Club Account',
    reconciled: true,
    receiptUrl: '#'
  },
  {
    id: 'txn_02',
    transactionNumber: 'TXN-2026-9811',
    date: '2026-09-24 16:15',
    memberName: 'Sir Arthur Sterling',
    memberId: 'mem_102',
    serviceCategory: 'Event Deposit',
    referenceId: 'ev_detailed_2026_01',
    amount: 20000.00,
    status: 'Completed',
    paymentMethod: 'ACH Wire',
    reconciled: true,
    receiptUrl: '#'
  },
  {
    id: 'txn_03',
    transactionNumber: 'TXN-2026-9812',
    date: '2026-09-24 14:02',
    memberName: 'Victoria Vanderbilt',
    memberId: 'mem_108',
    serviceCategory: 'Court Booking',
    referenceId: 'sp_01',
    amount: 90.00,
    status: 'Completed',
    paymentMethod: 'Visa •• 4242',
    reconciled: true,
    receiptUrl: '#'
  },
  {
    id: 'txn_04',
    transactionNumber: 'TXN-2026-9813',
    date: '2026-09-23 11:40',
    memberName: 'Harrison Boyd',
    memberId: 'mem_118',
    serviceCategory: 'Golf Green Fee',
    referenceId: 'golf_bk_04',
    amount: 140.00,
    status: 'Pending',
    paymentMethod: 'Club Account',
    reconciled: false,
    receiptUrl: '#'
  },
  {
    id: 'txn_05',
    transactionNumber: 'TXN-2026-9814',
    date: '2026-09-22 09:12',
    memberName: 'Lady Genevieve Montague',
    memberId: 'mem_104',
    serviceCategory: 'Event Deposit',
    referenceId: 'ev_montague_50',
    amount: 6840.00,
    status: 'Completed',
    paymentMethod: 'Amex •• 1009',
    reconciled: true,
    receiptUrl: '#'
  },
  {
    id: 'txn_06',
    transactionNumber: 'TXN-2026-9815',
    date: '2026-09-21 17:35',
    memberName: 'Dr. Raymond Chen',
    memberId: 'mem_110',
    serviceCategory: 'Court Booking',
    referenceId: 'sp_04_ref',
    amount: 45.00,
    status: 'Refunded',
    paymentMethod: 'Visa •• 4242',
    reconciled: true,
    receiptUrl: '#'
  }
];

export const MOCK_AI_REVIEWS: AIReviewItem[] = [
  {
    id: 'air_01',
    title: 'Proposed Wedding Venue Recommendation & Budget Outline',
    type: 'venue_recommendation',
    requestedByMember: 'Victoria Vanderbilt',
    memberTier: 'Executive Social',
    memberPrompt: 'Can you recommend a romantic venue for 180 guests with outdoor sunset views, champagne toast, and private dressing room?',
    proposedOutput: 'We recommend our Palm Terrace & Veranda combined with the West Cocktail Lawn. With a capacity of up to 180 guests, it offers breathtaking views of the 18th green at sunset, radiant stone fireplace warmth, and access to our private Bridal Suite. Estimated package: $24,500 including 4-course dinner & sommelier open bar.',
    sourceInformationUsed: ['Venue Specs: Palm Terrace capacity 180', 'Catering Menu Tier 2 pricing ($115/pp)', 'Club Bridal Suite availability policy'],
    confidenceScore: 94,
    createdAt: 'Today, 08:35 AM',
    status: 'pending'
  },
  {
    id: 'air_02',
    title: 'Cancellation Fee Waiver Request (Rain Alert)',
    type: 'cancellation_waiver',
    requestedByMember: 'Charles Montgomery',
    memberTier: 'Platinum Founding',
    memberPrompt: 'Due to sudden thunderstorm advisory on the North Course this afternoon, can my 13:00 tee time cart fee be refunded without 24-hr penalty?',
    proposedOutput: 'Under Santo Domingo Country Club Inclement Weather Rule #4, when a severe lightning/thunderstorm alert is declared by the Greenskeeper, all green and cart cancellation fees are 100% waived. A credit of $180 has been applied to your member ledger.',
    sourceInformationUsed: ['Club Rule #4: Weather Exemption', 'Greenskeeper Weather Log: Thunderstorm Alert 12:00-16:00'],
    confidenceScore: 98,
    createdAt: 'Today, 09:05 AM',
    status: 'pending'
  },
  {
    id: 'air_03',
    title: 'Corporate Golf Outing Quotation (10% Tier Discount Applied)',
    type: 'quote_discount',
    requestedByMember: 'Dr. Raymond Chen',
    memberTier: 'Full Golf & Athletic',
    memberPrompt: 'Draft quotation for 40-player shotgun tournament on Executive South Links with BBQ lunch buffet.',
    proposedOutput: 'Official Quote #Q-8891: South Links Course reservation (40 players @ $75 = $3,000) + Championship BBQ Buffet with Craft Beer Bar ($65/pp = $2,600) + Cart Fleet ($800). Total before tax: $6,400. Member privilege discount: $640 (10%). Final Total: $5,760 + tax.',
    sourceInformationUsed: ['South Links Tournament rate card', 'Catering BBQ Package', 'Tier Discount policy max 10% for >30 guests'],
    confidenceScore: 91,
    createdAt: 'Today, 09:40 AM',
    status: 'pending'
  }
];

export const MOCK_KNOWLEDGE_RULES: KnowledgeRule[] = [
  {
    id: 'kr_01',
    category: 'Cancellation Policy',
    title: 'Tee Time 24-Hour Notice Policy',
    approvedContent: 'Golf cancellations made with at least 24 hours notice incur zero charge. Cancellations within 24 hours without weather advisory are billed 50% green fee to the primary booking member.',
    mustHandOffToStaff: false,
    triggerKeywords: ['cancel tee time', 'golf refund', 'rainout', 'cancellation penalty', 'weather policy'],
    languages: ['English', 'Spanish', 'French'],
    lastUpdated: '2026-09-12',
    updatedBy: 'Eleanor Vance'
  },
  {
    id: 'kr_02',
    category: 'Dress Code',
    title: 'Clubhouse & Championship Course Attire',
    approvedContent: 'Collared shirts or recognized golf mock necks required at all times. Soft spikes only on courses. Denim, cargo shorts, and athletic flip-flops strictly prohibited in the Main Dining Room and Crystal Ballroom after 17:00.',
    mustHandOffToStaff: false,
    triggerKeywords: ['dress code', 'what to wear', 'jeans', 'spikes', 'collared shirt', 'ballroom dress'],
    languages: ['English', 'Spanish'],
    lastUpdated: '2026-09-01',
    updatedBy: 'Eleanor Vance'
  },
  {
    id: 'kr_03',
    category: 'Venue Specs',
    title: 'Grand Crystal Ballroom Setup Minimums & Curfew',
    approvedContent: 'Standard event curfew is 00:00 midnight (amplified music must cease at 23:30). Food & beverage minimum for Saturday evenings is $18,000. Maximum seating with dance floor is 280 guests.',
    mustHandOffToStaff: true,
    triggerKeywords: ['ballroom minimum', 'curfew', 'music cutoff', 'deposit refund', 'wedding contract'],
    languages: ['English'],
    lastUpdated: '2026-08-28',
    updatedBy: 'Eleanor Vance'
  },
  {
    id: 'kr_04',
    category: 'Golf Rules',
    title: 'Guest Privileges & Maximum Handicap Index',
    approvedContent: 'Platinum members may host up to 7 guests on weekdays and 3 on peak weekends. A maximum USGA handicap index of 28.0 for men and 36.0 for women is required on the North Championship Course.',
    mustHandOffToStaff: false,
    triggerKeywords: ['guest rules', 'handicap limit', 'guest rate', 'how many guests'],
    languages: ['English'],
    lastUpdated: '2026-09-15',
    updatedBy: 'PGA Head Pro David'
  }
];

export const MOCK_STAFF: StaffAccount[] = [
  {
    id: 'st_01',
    name: 'Eleanor Vance',
    email: 'e.vance@verdanthillsclub.com',
    role: 'manager',
    department: 'Hospitality & Operations',
    approvalLimit: 15000,
    active: true,
    lastActive: 'Now'
  },
  {
    id: 'st_02',
    name: 'Julian Montgomery',
    email: 'j.montgomery@verdanthillsclub.com',
    role: 'events_team',
    department: 'Private Events',
    approvalLimit: 5000,
    active: true,
    lastActive: '14 mins ago'
  },
  {
    id: 'st_03',
    name: 'Coach Mateo Rossi',
    email: 'm.rossi@verdanthillsclub.com',
    role: 'golf_sports',
    department: 'Athletic Center',
    approvalLimit: 1000,
    active: true,
    lastActive: '32 mins ago'
  },
  {
    id: 'st_04',
    name: 'Beatrice Chen',
    email: 'b.chen@verdanthillsclub.com',
    role: 'finance',
    department: 'Club Accounts & Billing',
    approvalLimit: 25000,
    active: true,
    lastActive: '5 mins ago'
  },
  {
    id: 'st_05',
    name: 'Arthur Pendelton',
    email: 'a.pendelton@verdanthillsclub.com',
    role: 'front_desk',
    department: 'Member Concierge',
    approvalLimit: 250,
    active: true,
    lastActive: '2 mins ago'
  },
  {
    id: 'st_06',
    name: 'Klaus Lindner',
    email: 'k.lindner@verdanthillsclub.com',
    role: 'sysadmin',
    department: 'Information Technology',
    approvalLimit: 50000,
    active: true,
    lastActive: '1 hour ago'
  }
];

export const MOCK_INTEGRATIONS: IntegrationStatus[] = [
  {
    id: 'int_01',
    serviceName: 'Stripe Corporate Gateway',
    category: 'payments',
    status: 'healthy',
    lastSync: '2 mins ago',
    failedRecordsCount: 0,
    endpointUrl: 'https://api.stripe.com/v1/verdanthills_live',
    description: 'Processes credit cards, Apple Pay, and member ACH autopay.'
  },
  {
    id: 'int_02',
    serviceName: 'Google Calendar & Exchange Sync',
    category: 'calendar',
    status: 'healthy',
    lastSync: '5 mins ago',
    failedRecordsCount: 0,
    endpointUrl: 'https://www.googleapis.com/calendar/v3/calendars/club_master',
    description: 'Bi-directional sync of banquet halls and private dining rooms.'
  },
  {
    id: 'int_03',
    serviceName: 'Jonas Club Member POS & PMS',
    category: 'member_pms',
    status: 'healthy',
    lastSync: '10 mins ago',
    failedRecordsCount: 0,
    endpointUrl: 'https://pms.jonasclub.com/api/v4/vh_club',
    description: 'Master ledger for member profiles, dues, and house charges.'
  },
  {
    id: 'int_04',
    serviceName: 'EZLinks Golf Tee Sheet Feed',
    category: 'pos',
    status: 'degraded',
    lastSync: '18 mins ago',
    failedRecordsCount: 2,
    endpointUrl: 'https://feed.ezlinks.com/verdanthills/teesheet',
    description: 'Cart GPS tracking and automated score handicap posting.'
  }
];

export const MOCK_CONFIG: ClubConfigSettings = {
  clubName: 'Santo Domingo Country Club (Est. 1920)',
  operatingHours: {
    clubhouseOpen: '06:00',
    clubhouseClose: '23:00',
    golfCourseOpen: '06:30',
    golfCourseClose: '19:30',
    sportsPavilionOpen: '06:00',
    sportsPavilionClose: '22:00'
  },
  bookingWindows: {
    platinumDaysAdvance: 30,
    goldDaysAdvance: 14,
    socialDaysAdvance: 7
  },
  cancellationRules: {
    golfFreeCancelHours: 24,
    sportsFreeCancelHours: 12,
    eventDepositRefundDays: 30
  },
  responseSLAHours: {
    urgent: 2,
    normal: 8
  },
  serviceChargePercent: 20,
  taxPercent: 8.25,
  depositRequiredPercent: 30,
  automatedAiDrafting: true
};
