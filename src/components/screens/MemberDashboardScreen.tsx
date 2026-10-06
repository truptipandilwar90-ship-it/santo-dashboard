import React, { useState } from 'react';
import {
  Flag,
  Dumbbell,
  Building,
  Utensils,
  Calendar,
  Clock,
  Users,
  MapPin,
  ChevronRight,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Radio,
  Sparkles,
  X,
  Edit2,
  Trash2,
  QrCode,
  ShieldCheck,
  TrendingUp,
  Activity,
  Wind,
  Sun,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SantoDomingoLogo } from '../common/SantoDomingoLogo';

interface MemberReservation {
  id: string;
  category: 'golf' | 'tennis' | 'dining' | 'ballroom';
  title: string;
  facility: string;
  date: string;
  time: string;
  partySize: number;
  status: 'confirmed' | 'hold' | 'completed';
  details: string;
  caddyOrNotes?: string;
}

interface OnCourseGroup {
  id: string;
  groupName: string;
  holeNumber: number;
  par: number;
  yardage: number;
  teeTime: string;
  playersCount: number;
  caddyNames: string[];
  statusPace: 'on_pace' | 'slow' | 'fast';
  paceDeltaMinutes: number;
  currentZone: string;
}

export const MemberDashboardScreen: React.FC = () => {
  const { activeScreen, navigateTo, t, language, tr, addCalendarEvent } = useApp();

  const [activeReservationTab, setActiveReservationTab] = useState<'all' | 'golf' | 'tennis' | 'dining' | 'ballroom'>('all');
  const [selectedHole, setSelectedHole] = useState<number | null>(4);
  const [bookingModalCategory, setBookingModalCategory] = useState<'golf' | 'tennis' | 'dining' | 'ballroom' | null>(null);

  React.useEffect(() => {
    if (activeScreen === 'member_golf') {
      setActiveReservationTab('golf');
      setBookingModalCategory('golf');
      setBookFacility('North Championship Course');
    } else if (activeScreen === 'member_golf_traffic') {
      setActiveReservationTab('golf');
      // scroll smoothly to golf traffic section
      const el = document.getElementById('golf-traffic-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (activeScreen === 'member_tennis' || activeScreen === 'member_padel') {
      setActiveReservationTab('tennis');
      setBookingModalCategory('tennis');
      setBookFacility('Clay Tennis Court #2');
    } else if (activeScreen === 'member_dining' || activeScreen === 'member_dining_cellar') {
      setActiveReservationTab('dining');
      setBookingModalCategory('dining');
      setBookFacility('Palm Terrace & Veranda Grill');
    } else if (activeScreen === 'member_events' || activeScreen === 'member_events_gala') {
      setActiveReservationTab('ballroom');
      setBookingModalCategory('ballroom');
      setBookFacility('Grand Crystal Ballroom');
    } else if (activeScreen === 'member_reservations') {
      setActiveReservationTab('all');
      const el = document.getElementById('active-reservations-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (activeScreen === 'member_profile') {
      const el = document.getElementById('member-digital-card-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeScreen]);

  // Form states for quick booking
  const [bookDate, setBookDate] = useState('2026-10-02');
  const [bookTime, setBookTime] = useState('09:00');
  const [bookPartySize, setBookPartySize] = useState(4);
  const [bookNotes, setBookNotes] = useState('');
  const [bookFacility, setBookFacility] = useState('North Championship Course');

  // Member's active reservations state
  const [reservations, setReservations] = useState<MemberReservation[]>([
    {
      id: 'res_golf_01',
      category: 'golf',
      title: 'Championship 18-Hole Foursome',
      facility: 'North Championship Course (Hole 1)',
      date: '2026-09-26',
      time: '08:30 AM',
      partySize: 4,
      status: 'confirmed',
      details: 'Sir Arthur Sterling, Dr. Raymond Chen, Marcus Kensington, Coach Mateo Rossi',
      caddyOrNotes: 'Forecaddie & 2 Caddies Reserved (Eduardo & Mateo)'
    },
    {
      id: 'res_tennis_02',
      category: 'tennis',
      title: 'Hydro-Clay Court Singles Match',
      facility: 'Clay Tennis Court #2',
      date: '2026-09-25',
      time: '04:30 PM',
      partySize: 2,
      status: 'confirmed',
      details: 'Sir Arthur Sterling vs. Victoria Vanderbilt',
      caddyOrNotes: 'Night floodlights enabled & fresh ProPenn balls requested'
    },
    {
      id: 'res_dining_03',
      category: 'dining',
      title: 'Veranda Sunset Wine & Tasting Dinner',
      facility: 'Palm Terrace & Veranda Grill',
      date: '2026-09-27',
      time: '07:30 PM',
      partySize: 6,
      status: 'confirmed',
      details: 'Table 14 (Fairway Overlook)',
      caddyOrNotes: 'Sommelier reserve wine pairing & seafood tower requested'
    },
    {
      id: 'res_ballroom_04',
      category: 'ballroom',
      title: 'Sterling Annual Gala & Charity Auction',
      facility: 'Grand Crystal Ballroom',
      date: '2026-10-15',
      time: '06:00 PM',
      partySize: 220,
      status: 'hold',
      details: 'Executive Banquet & AV Stage Layout',
      caddyOrNotes: 'Quotation prepared, deposit pending confirmation'
    }
  ]);

  // Simulated Live Golf Course Traffic / On-Course Groups
  const onCourseGroups: OnCourseGroup[] = [
    {
      id: 'grp_01',
      groupName: 'Sterling & Kensington Foursome',
      holeNumber: 4,
      par: 4,
      yardage: 415,
      teeTime: '07:30 AM',
      playersCount: 4,
      caddyNames: ['Eduardo S.', 'Mateo R.'],
      statusPace: 'on_pace',
      paceDeltaMinutes: 0,
      currentZone: 'Approach Fairway'
    },
    {
      id: 'grp_02',
      groupName: 'Vanderbilt Autumn Flight',
      holeNumber: 8,
      par: 5,
      yardage: 540,
      teeTime: '07:45 AM',
      playersCount: 4,
      caddyNames: ['Juan P.', 'Carlos M.'],
      statusPace: 'on_pace',
      paceDeltaMinutes: 1,
      currentZone: 'Putting Green'
    },
    {
      id: 'grp_03',
      groupName: 'BioTech Executive Summit Group',
      holeNumber: 12,
      par: 3,
      yardage: 185,
      teeTime: '08:00 AM',
      playersCount: 4,
      caddyNames: ['Luis G.'],
      statusPace: 'slow',
      paceDeltaMinutes: 5,
      currentZone: 'Tee Box Waiting (Marshall Assisted)'
    },
    {
      id: 'grp_04',
      groupName: 'Founders Championship Flight',
      holeNumber: 16,
      par: 4,
      yardage: 430,
      teeTime: '08:15 AM',
      playersCount: 3,
      caddyNames: ['Ramon H.'],
      statusPace: 'fast',
      paceDeltaMinutes: -3,
      currentZone: 'Fairway Bunker'
    }
  ];

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalCategory) return;

    const categoryTitles = {
      golf: 'Golf Tee Time Reservation',
      tennis: 'Racquet Court Session',
      dining: 'Restaurant Table Reservation',
      ballroom: 'Private Event Space Hold'
    };

    const newRes: MemberReservation = {
      id: `res_custom_${Date.now()}`,
      category: bookingModalCategory,
      title: categoryTitles[bookingModalCategory],
      facility: bookFacility,
      date: bookDate,
      time: bookTime,
      partySize: bookPartySize,
      status: 'confirmed',
      details: bookNotes || 'Standard Member Reservation',
      caddyOrNotes: 'Member Portal Direct Request'
    };

    setReservations([newRes, ...reservations]);
    
    // Add to master calendar context
    addCalendarEvent({
      title: newRes.title,
      facilityId: 'fac_custom',
      facilityName: bookFacility,
      facilityCategory: bookingModalCategory === 'golf' ? 'golf' : bookingModalCategory === 'tennis' ? 'sports' : 'event_hall',
      startTime: bookTime,
      endTime: '11:00',
      date: bookDate,
      status: 'confirmed',
      memberName: 'Sir Arthur Sterling',
      memberId: 'mem_1029',
      type: 'Member Reservation'
    });

    setBookingModalCategory(null);
    setBookNotes('');
  };

  const handleDeleteReservation = (id: string) => {
    setReservations(reservations.filter(r => r.id !== id));
  };

  const filteredReservations = reservations.filter(r => {
    if (activeReservationTab === 'all') return true;
    return r.category === activeReservationTab;
  });

  return (
    <div className="space-y-6">
      
      {/* Member Hero Banner */}
      <div className="bg-[#F2F8F4] border border-[#E3EFE7] rounded-[32px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-start gap-5">
          <div className="bg-white p-3 rounded-2xl border border-[#E3EFE7] shadow-xs shrink-0 hidden sm:block">
            <SantoDomingoLogo size="sm" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-white text-[#3B7A57] border border-[#E3EFE7] text-[11px] font-bold tracking-tight">
                {language === 'es' ? 'Portal Exclusivo de Socios' : 'Member Portal & Concierge'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase font-mono">
                {language === 'es' ? 'Socio Fundador Platino' : 'Platinum Founding Member'} #1029
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              {language === 'es' ? 'Bienvenido, Sir Arthur Sterling' : 'Welcome back, Sir Arthur Sterling'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl leading-relaxed">
              {language === 'es'
                ? 'Reserve y gestione fácilmente sus salidas de golf, canchas de tenis, mesas de restaurante y eventos privados.'
                : 'Easily book and manage golf tee times, racquet courts, dining tables, and private ballroom events.'}
            </p>
          </div>
        </div>

        {/* Member Quick Stats */}
        <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#E3EFE7] shadow-2xs shrink-0 text-xs">
          <div className="px-3 border-r border-neutral-100 space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-neutral-400">Handicap Index</div>
            <div className="font-mono font-extrabold text-base text-neutral-900">6.2 HI</div>
          </div>
          <div className="px-3 border-r border-neutral-100 space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Reservas' : 'Active Bookings'}</div>
            <div className="font-mono font-extrabold text-base text-[#3B7A57]">{reservations.length}</div>
          </div>
          <div className="px-3 space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Estado' : 'Status'}</div>
            <div className="font-extrabold text-xs text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Al Día' : 'In Good Standing'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Booking Shortcuts Grid (4 Primary Categories) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Golf Tee Times */}
        <div
          onClick={() => {
            setBookingModalCategory('golf');
            setBookFacility('North Championship Course');
          }}
          className="bg-white p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs hover:shadow-md hover:border-[#3B7A57] hover:-translate-y-0.5 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#F2F8F4] border border-[#E3EFE7] flex items-center justify-center text-[#3B7A57] group-hover:bg-black group-hover:text-white transition-colors">
              <Flag className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {language === 'es' ? 'Campo Norte / Sur' : '18 Holes'}
            </span>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-neutral-900 group-hover:text-[#3B7A57] transition-colors">
              {language === 'es' ? 'Salidas de Golf' : 'Golf Tee Times'}
            </h3>
            <p className="text-xs text-neutral-500 mt-1 leading-snug">
              {language === 'es' ? 'Reserve hora de salida en el Campo Norte de Campeonato o Links Sur.' : 'Book a tee time on the North Championship Course or South Links.'}
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-bold text-[#3B7A57] group-hover:translate-x-1 transition-transform">
            <span>{language === 'es' ? 'Reservar Hora' : 'Book Tee Time'}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Tennis & Padel Courts */}
        <div
          onClick={() => {
            setBookingModalCategory('tennis');
            setBookFacility('Clay Tennis Court #2');
          }}
          className="bg-white p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs hover:shadow-md hover:border-[#3B7A57] hover:-translate-y-0.5 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 group-hover:bg-black group-hover:text-white transition-colors">
              <Dumbbell className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              {language === 'es' ? 'Arcilla / Pádel' : 'Hydro-Clay'}
            </span>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-neutral-900 group-hover:text-[#3B7A57] transition-colors">
              {language === 'es' ? 'Tenis y Pádel' : 'Tennis & Padel Courts'}
            </h3>
            <p className="text-xs text-neutral-500 mt-1 leading-snug">
              {language === 'es' ? 'Reserve canchas de arcilla Har-Tru o canchas panorámicas de cristal.' : 'Reserve hydro-clay tennis courts or glass-walled padel courts.'}
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform">
            <span>{language === 'es' ? 'Reservar Cancha' : 'Reserve Court'}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Restaurant & Dining */}
        <div
          onClick={() => {
            setBookingModalCategory('dining');
            setBookFacility('Palm Terrace & Veranda Grill');
          }}
          className="bg-white p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs hover:shadow-md hover:border-[#3B7A57] hover:-translate-y-0.5 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 group-hover:bg-black group-hover:text-white transition-colors">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {language === 'es' ? 'Gastronomía' : 'Fine Dining'}
            </span>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-neutral-900 group-hover:text-[#3B7A57] transition-colors">
              {language === 'es' ? 'Restaurantes y Cava' : 'Dining & Restaurants'}
            </h3>
            <p className="text-xs text-neutral-500 mt-1 leading-snug">
              {language === 'es' ? 'Mesa en Veranda Grill, Cava de Vinos o Salón Founders Oak.' : 'Reserve tables at Veranda Grill, Heritage Cellar, or Founders Dining.'}
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-bold text-amber-800 group-hover:translate-x-1 transition-transform">
            <span>{language === 'es' ? 'Reservar Mesa' : 'Book Table'}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Ballrooms & Private Events */}
        <div
          onClick={() => {
            setBookingModalCategory('ballroom');
            setBookFacility('Grand Crystal Ballroom');
          }}
          className="bg-white p-5 rounded-[24px] border border-[#E3EFE7] shadow-xs hover:shadow-md hover:border-[#3B7A57] hover:-translate-y-0.5 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-800 group-hover:bg-black group-hover:text-white transition-colors">
              <Building className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              {language === 'es' ? 'Eventos Privados' : 'Grand Ballrooms'}
            </span>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-neutral-900 group-hover:text-[#3B7A57] transition-colors">
              {language === 'es' ? 'Salones de Eventos' : 'Ballrooms & Space Hire'}
            </h3>
            <p className="text-xs text-neutral-500 mt-1 leading-snug">
              {language === 'es' ? 'Solicite espacio para galas, bodas o reuniones corporativas.' : 'Hold Gran Salón de Cristal or Palm Veranda for private banquets.'}
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-bold text-indigo-800 group-hover:translate-x-1 transition-transform">
            <span>{language === 'es' ? 'Solicitar Espacio' : 'Request Venue'}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

      </div>

      {/* SECTION: Golf Course Traffic / Tee-Time Monitoring */}
      <div id="golf-traffic-section" className="bg-white rounded-[32px] border border-[#E3EFE7] p-6 sm:p-7 shadow-xs space-y-6">
        
        {/* Starter Telemetry Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7] text-[10px] font-extrabold uppercase tracking-tight flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-[#3B7A57] animate-pulse" />
                <span>{language === 'es' ? 'Monitoreo de Salidas y Tráfico' : 'Live Course Radar & Starter Telemetry'}</span>
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                {language === 'es' ? 'Campo de Campeonato Norte' : 'North Championship Course'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              {language === 'es' ? 'Tráfico en Campo y Estado de Juego' : 'Golf Course Traffic & Pace Monitoring'}
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              {language === 'es'
                ? 'Consulte en tiempo real la fluidez del campo, grupos activos por hoyo, velocidad de juego y alertas del starter.'
                : 'Real-time course pace telemetry, active playing groups per hole, delay warnings, and starter marshall status.'}
            </p>
          </div>

          {/* Conditions & Pace Badge */}
          <div className="flex flex-wrap items-center gap-3 bg-[#F2F8F4] p-3 rounded-2xl border border-[#E3EFE7] text-xs">
            <div className="flex items-center gap-2 pr-3 border-r border-neutral-200">
              <Sun className="w-4 h-4 text-amber-500" />
              <div>
                <div className="font-bold text-neutral-900">27°C · Clear</div>
                <div className="text-[10px] text-neutral-500 font-mono">Stimp 11.2 · Wind 12km/h</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#3B7A57]" />
              <div>
                <div className="font-bold text-[#3B7A57]">{language === 'es' ? 'Ritmo Fluido' : 'Optimal Pace'} (14m/hole)</div>
                <div className="text-[10px] text-neutral-500 font-mono">
                  {language === 'es' ? '4 grupos en juego · Sin demoras graves' : '4 groups active · No major delays'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual 18-Hole Course Radar Map */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
            <span className="flex items-center gap-1.5">
              <Flag className="w-4 h-4 text-[#3B7A57]" />
              <span>{language === 'es' ? 'Mapa Interactivo de 18 Hoyos' : '18-Hole Interactive Course Radar'}</span>
            </span>
            <span className="text-[11px] font-mono text-neutral-500">
              {language === 'es' ? 'Haga clic en un hoyo para ver el grupo' : 'Click a hole to inspect active group'}
            </span>
          </div>

          {/* Hole Strip */}
          <div className="grid grid-cols-6 sm:grid-cols-9 lg:grid-cols-18 gap-1.5 overflow-x-auto pb-1">
            {Array.from({ length: 18 }, (_, index) => {
              const holeNum = index + 1;
              const activeGroup = onCourseGroups.find(g => g.holeNumber === holeNum);
              const isSelected = selectedHole === holeNum;

              return (
                <button
                  key={holeNum}
                  onClick={() => setSelectedHole(holeNum)}
                  className={`p-2 rounded-xl text-center transition-all cursor-pointer border relative flex flex-col items-center justify-between min-h-[72px] ${
                    isSelected
                      ? 'bg-black text-white border-black ring-2 ring-emerald-400 shadow-md scale-[1.03]'
                      : activeGroup
                      ? activeGroup.statusPace === 'slow'
                        ? 'bg-rose-50 border-rose-300 text-rose-950 hover:bg-rose-100'
                        : 'bg-[#F2F8F4] border-[#E3EFE7] text-[#3B7A57] hover:bg-[#EAF4ED]'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase font-bold opacity-70">H{holeNum}</span>
                  
                  {activeGroup ? (
                    <div className="my-0.5 flex flex-col items-center">
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-mono font-black mt-0.5">
                        {activeGroup.statusPace === 'slow' ? `+${activeGroup.paceDeltaMinutes}m` : 'PLAY'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-mono text-neutral-400 font-medium my-1">CLEAR</span>
                  )}

                  <span className={`text-[8px] font-mono font-bold px-1 rounded ${isSelected ? 'bg-white/20' : 'bg-black/5'}`}>
                    P{holeNum % 3 === 0 ? 5 : holeNum % 2 === 0 ? 3 : 4}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Starter & Marshall On-Course Telemetry Detail Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
          
          {/* Active Groups List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
              <span>{language === 'es' ? 'Grupos Activos en el Campo (Vista del Starter)' : 'Active Groups Playing on Course'}</span>
              <span className="text-neutral-500 font-mono font-normal">
                {onCourseGroups.length} {language === 'es' ? 'Foursomes en Juego' : 'Foursomes Active'}
              </span>
            </div>

            <div className="space-y-3">
              {onCourseGroups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => setSelectedHole(group.holeNumber)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    selectedHole === group.holeNumber
                      ? 'bg-neutral-900 text-white border-black shadow-md'
                      : 'bg-white border-neutral-200 hover:border-[#3B7A57] hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md ${
                        selectedHole === group.holeNumber
                          ? 'bg-white/20 text-white'
                          : 'bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7]'
                      }`}>
                        HOLE {group.holeNumber} (Par {group.par} · {group.yardage}y)
                      </span>
                      <span className="font-extrabold text-xs">{group.groupName}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] opacity-80">
                      <span>{language === 'es' ? 'Salida' : 'Tee Time'}: {group.teeTime}</span>
                      <span>·</span>
                      <span>{group.playersCount} {language === 'es' ? 'Jugadores' : 'Players'}</span>
                      <span>·</span>
                      <span>{language === 'es' ? 'Zona' : 'Zone'}: {group.currentZone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-[10px] opacity-70 font-mono">Caddies</div>
                      <div className="font-bold text-[11px]">{group.caddyNames.join(', ')}</div>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase font-mono ${
                      group.statusPace === 'slow'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : group.statusPace === 'fast'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-neutral-100 text-neutral-800 border border-neutral-300'
                    }`}>
                      {group.statusPace === 'slow'
                        ? `+${group.paceDeltaMinutes}m Slow`
                        : group.statusPace === 'fast'
                        ? `${group.paceDeltaMinutes}m Fast`
                        : 'On Pace'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Starter Marshall Notes & Course Advice */}
          <div className="bg-[#F2F8F4] border border-[#E3EFE7] rounded-2xl p-5 space-y-4 text-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-extrabold text-[#3B7A57] text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'es' ? 'Avisos del Starter Principal' : 'Head Starter Advisories'}</span>
              </div>

              <div className="space-y-2.5 text-neutral-700 leading-relaxed">
                <div className="p-3 bg-white rounded-xl border border-[#E3EFE7] space-y-1">
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'es' ? 'Mantenimiento de Greens' : 'Greens Rolling Completed'}</span>
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    {language === 'es'
                      ? 'Los 18 greens han sido cortados y rodados a las 06:15 AM. Rodamiento de bola extremadamente uniforme.'
                      : 'All 18 greens rolled at 06:15 AM. Smooth Stimp 11.2 speed maintained throughout today.'}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E3EFE7] space-y-1">
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{language === 'es' ? 'Asistencia de Marshall en Hoyo 12' : 'Marshall Assigned to Hole 12'}</span>
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    {language === 'es'
                      ? 'El marshall Mateo está asistiendo la búsqueda de bolas en el bunker del hoyo 12 para agilizar el juego.'
                      : 'Marshall Mateo assisting BioTech Flight at Par 3 #12 to clear green and keep 14-min pace.'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setBookingModalCategory('golf');
                setBookFacility('North Championship Course');
              }}
              className="mt-4 w-full py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'es' ? 'Reservar Próxima Salida Disponible' : 'Book Next Open Tee Time'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* SECTION: Active & Managed Reservations List */}
      <div id="active-reservations-section" className="bg-white rounded-[32px] border border-[#E3EFE7] p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div>
            <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
              {language === 'es' ? 'Sus Reservas Activas' : 'Your Active Member Reservations'}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {language === 'es'
                ? 'Gestione, modifique o agregue invitados a sus actividades programadas en el club.'
                : 'Manage, edit details, or invite guests to your scheduled club activities.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#F2F8F4] border border-[#E3EFE7] p-1 rounded-full text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveReservationTab('all')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeReservationTab === 'all' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {language === 'es' ? 'Todas' : 'All'} ({reservations.length})
            </button>
            <button
              onClick={() => setActiveReservationTab('golf')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeReservationTab === 'golf' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {language === 'es' ? 'Golf' : 'Golf'}
            </button>
            <button
              onClick={() => setActiveReservationTab('tennis')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeReservationTab === 'tennis' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {language === 'es' ? 'Tenis/Pádel' : 'Racquet'}
            </button>
            <button
              onClick={() => setActiveReservationTab('dining')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeReservationTab === 'dining' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {language === 'es' ? 'Comidas' : 'Dining'}
            </button>
            <button
              onClick={() => setActiveReservationTab('ballroom')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeReservationTab === 'ballroom' ? 'bg-black text-white shadow-xs font-bold' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {language === 'es' ? 'Salones' : 'Events'}
            </button>
          </div>
        </div>

        {/* Reservation Cards List */}
        <div className="space-y-4">
          {filteredReservations.length === 0 ? (
            <div className="p-12 text-center text-xs text-neutral-400 italic bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
              {language === 'es' ? 'No hay reservas activas en esta categoría.' : 'No active reservations in this category.'}
            </div>
          ) : (
            filteredReservations.map((res) => (
              <div
                key={res.id}
                className="bg-white p-5 rounded-2xl border border-neutral-200 hover:border-[#3B7A57] hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs group"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F2F8F4] text-[#3B7A57] border border-[#E3EFE7] font-bold text-[10px] uppercase">
                      {res.category.toUpperCase()}
                    </span>
                    <span className="font-extrabold text-sm text-neutral-900 group-hover:text-[#3B7A57] transition-colors">
                      {res.title}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase font-mono ${
                      res.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {res.status === 'confirmed' ? 'Confirmed' : 'Hold / In Review'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-neutral-600 font-medium text-xs">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {tr(res.facility)}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      {res.date}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {res.time}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      {res.partySize} {language === 'es' ? 'personas' : 'guests'}
                    </span>
                  </div>

                  <div className="text-[11px] text-neutral-500 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                    <span className="font-bold text-neutral-700">{res.details}</span>
                    {res.caddyOrNotes && <span className="text-neutral-500"> — {res.caddyOrNotes}</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
                  <button
                    onClick={() => handleDeleteReservation(res.id)}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title={language === 'es' ? 'Cancelar Reserva' : 'Cancel Booking'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setBookingModalCategory(res.category);
                      setBookFacility(res.facility);
                    }}
                    className="px-4 py-2 rounded-full border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {language === 'es' ? 'Modificar' : 'Modify'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Interactive Reservation Modal */}
      {bookingModalCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] border border-neutral-200 shadow-2xl w-full max-w-lg p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#F2F8F4] text-[#3B7A57]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-neutral-900 uppercase tracking-tight">
                    {language === 'es' ? `Nueva Reserva: ${bookingModalCategory}` : `New Reservation: ${bookingModalCategory}`}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {language === 'es' ? 'Complete los detalles para confirmar su reserva en el club.' : 'Complete reservation details for immediate confirmation.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setBookingModalCategory(null)}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateReservation} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Instalación / Espacio' : 'Facility / Venue'}
                </label>
                <input
                  type="text"
                  required
                  value={bookFacility}
                  onChange={(e) => setBookFacility(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    {language === 'es' ? 'Fecha' : 'Date'}
                  </label>
                  <input
                    type="date"
                    required
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    {language === 'es' ? 'Hora Propuesta' : 'Time'}
                  </label>
                  <input
                    type="time"
                    required
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Número de Personas / Jugadores' : 'Guest / Player Count'}
                </label>
                <input
                  type="number"
                  min={1}
                  max={300}
                  value={bookPartySize}
                  onChange={(e) => setBookPartySize(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {language === 'es' ? 'Instrucciones Especiales / Notas' : 'Special Notes & Caddy Requests'}
                </label>
                <textarea
                  rows={2}
                  value={bookNotes}
                  onChange={(e) => setBookNotes(e.target.value)}
                  placeholder={language === 'es' ? 'ej. Caddies asignados, alergias o solicitudes especiales...' : 'e.g. Caddy preferences, dietary requirements, or setup requests...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-black resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setBookingModalCategory(null)}
                  className="px-4 py-2 rounded-full border border-neutral-300 hover:bg-neutral-50 font-semibold text-neutral-700 cursor-pointer"
                >
                  {language === 'es' ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold cursor-pointer shadow-xs"
                >
                  {language === 'es' ? 'Confirmar Reserva' : 'Confirm Reservation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
