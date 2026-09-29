import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FacilityCategory, BookingStatus } from '../../types';

export const NewBookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { facilities, addCalendarEvent, navigateTo, t, language } = useApp();

  const [category, setCategory] = useState<FacilityCategory>('event_hall');
  const [facilityId, setFacilityId] = useState(facilities[0]?.id || '');
  const [title, setTitle] = useState('');
  const [memberName, setMemberName] = useState('Sir Arthur Sterling');
  const [date, setDate] = useState('2026-09-25');
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('17:00');
  const [status, setStatus] = useState<BookingStatus>('confirmed');
  const [guestCount, setGuestCount] = useState(40);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const filteredFacilities = facilities.filter(f => f.category === category);
  const selectedFacility = facilities.find(f => f.id === facilityId) || filteredFacilities[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addCalendarEvent({
      title,
      facilityId: selectedFacility.id,
      facilityName: selectedFacility.name,
      facilityCategory: category,
      startTime,
      endTime,
      date,
      status,
      memberName,
      memberId: 'mem_custom',
      guestCount,
      type: category === 'event_hall' ? 'Private Event' : category === 'golf' ? 'Golf Round' : 'Court Match',
      notes,
      totalAmount: (selectedFacility.hourlyRate || 50) * 3
    });

    onClose();
    navigateTo('master_calendar');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div>
            <h2 className="text-base font-bold text-neutral-900">{t.modal.title}</h2>
            <p className="text-xs text-neutral-500">{t.modal.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Category Selector */}
          <div>
            <label className="block font-semibold text-neutral-700 mb-1.5">{t.modal.facilityType}</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setCategory('event_hall');
                  const halls = facilities.filter(f => f.category === 'event_hall');
                  if (halls.length > 0) setFacilityId(halls[0].id);
                }}
                className={`py-2 px-3 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                  category === 'event_hall'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                    : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {t.modal.eventHalls}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory('golf');
                  const golf = facilities.filter(f => f.category === 'golf');
                  if (golf.length > 0) setFacilityId(golf[0].id);
                }}
                className={`py-2 px-3 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                  category === 'golf'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                    : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {t.modal.golf}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategory('sports');
                  const sports = facilities.filter(f => f.category === 'sports');
                  if (sports.length > 0) setFacilityId(sports[0].id);
                }}
                className={`py-2 px-3 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                  category === 'sports'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                    : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {t.modal.sportsPavilion}
              </button>
            </div>
          </div>

          {/* Facility dropdown */}
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">{t.modal.facility}</label>
            <select
              value={facilityId}
              onChange={(e) => setFacilityId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-800 outline-none focus:border-emerald-600"
            >
              {filteredFacilities.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.location})</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">{t.modal.bookingTitle}</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.modal.bookingTitlePlaceholder}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 outline-none focus:border-emerald-600"
            />
          </div>

          {/* Member Name & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">{t.modal.member}</label>
              <input
                type="text"
                required
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">{t.modal.bookingStatus}</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BookingStatus)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-800 outline-none focus:border-emerald-600"
              >
                <option value="confirmed">{t.modal.confirmed}</option>
                <option value="hold">{t.modal.hold}</option>
                <option value="inquiry">{language === 'es' ? 'Nueva Consulta' : 'New Inquiry'}</option>
                <option value="closure">{t.modal.closure}</option>
              </select>
            </div>
          </div>

          {/* Date & Times */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">{t.modal.date}</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">{t.modal.startTime}</label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 outline-none focus:border-emerald-600 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">{t.modal.endTime}</label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 outline-none focus:border-emerald-600 font-mono"
              />
            </div>
          </div>

          {/* Guest count & Notes */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">{t.modal.guests}</label>
              <input
                type="number"
                min="1"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 outline-none focus:border-emerald-600 font-mono"
              />
            </div>
            <div className="col-span-2">
              <label className="block font-semibold text-neutral-700 mb-1">{t.modal.notes}</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.modal.notesPlaceholder}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 flex items-center justify-end gap-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-bold transition-colors cursor-pointer"
            >
              {t.modal.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white font-bold shadow-xs transition-colors cursor-pointer"
            >
              {t.modal.confirmBooking}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
