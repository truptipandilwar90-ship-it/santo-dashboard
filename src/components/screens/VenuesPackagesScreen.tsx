import React, { useState } from 'react';
import {
  Building,
  CheckCircle2,
  Users,
  DollarSign,
  Sparkles,
  ShieldCheck,
  Plus,
  Edit2,
  Share2,
  Layers,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VenuesPackagesScreen: React.FC = () => {
  const { facilities, t, language, tr } = useApp();
  const [activeTab, setActiveTab] = useState<'venues' | 'packages' | 'addons'>('venues');
  const [publishedToAi, setPublishedToAi] = useState(true);
  const [pendingChanges, setPendingChanges] = useState(false);

  const [packages, setPackages] = useState([
    {
      id: 'pkg_1',
      title: 'Grand Royal Gala Experience',
      venue: 'Grand Crystal Ballroom',
      pricePerGuest: 165,
      minimumSpend: 18000,
      includes: [
        'Exclusive 10-hour Ballroom & Foyer access',
        'Plated 4-course French service dinner by Chef Laurent',
        'Sommelier Reserve 5-hour open bar (Dom Pérignon toast)',
        'Full AV lighting production, staging & wireless microphones',
        'Complimentary private bridal dressing suite with champagne'
      ]
    },
    {
      id: 'pkg_2',
      title: 'Veranda Twilight Cocktail Soirée',
      venue: 'Palm Terrace & Veranda',
      pricePerGuest: 110,
      minimumSpend: 8500,
      includes: [
        'Covered limestone fireplace terrace with radiant heating',
        'Passed chef canapés (6 selections) & raw seafood bar',
        'Craft cocktail bar & artisanal estate wine list',
        'Perimeter sound system & acoustic musicians stage'
      ]
    },
    {
      id: 'pkg_3',
      title: 'Championship Pro-Am Golf Outing',
      venue: 'North Championship Course (18 Holes)',
      pricePerGuest: 195,
      minimumSpend: 7500,
      includes: [
        '18 holes with GPS luxury cart and personalized cart signs',
        'Halfway house beverage vouchers & Titleist practice balls',
        'Post-round BBQ awards buffet on the Club Lawn',
        'Live scoring via TrackMan digital leaderboard'
      ]
    }
  ]);

  const [addOns, setAddOns] = useState([
    { id: 'add_1', name: 'Late-Night Truffle Fries & Slider Bar', price: 18, unit: 'per guest', category: 'Catering' },
    { id: 'add_2', name: 'Signature Espresso Martini Rolling Trolley', price: 1200, unit: 'per event', category: 'Beverage' },
    { id: 'add_3', name: 'Laser Projection & 4K Live Camera Relay', price: 2400, unit: 'per event', category: 'AV Tech' },
    { id: 'add_4', name: 'Custom Monogram Ice Sculpture & Chiller', price: 950, unit: 'per sculpture', category: 'Decor' }
  ]);

  const handlePublishChanges = () => {
    setPublishedToAi(true);
    setPendingChanges(false);
    alert(language === 'es' ? 'Especificaciones del espacio sincronizadas con la IA.' : 'Venue specifications and pricing rules approved and successfully synchronized with the AI Member Assistant.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {language === 'es' ? 'Espacios, Capacidad y Paquetes' : 'Venues, Capacities & Packages'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {language === 'es' ? 'Configure montajes de banquetes, precios estacionales y publique datos para la IA.' : 'Configure banquet layouts, seasonal package pricing, and publish approved venue data to the AI assistant.'}
          </p>
        </div>

        {/* AI Publishing Control */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
            <span className={`w-2 h-2 rounded-full ${publishedToAi ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span className="font-semibold">
              {publishedToAi ? (language === 'es' ? 'Asistente IA Sincronizado' : 'AI Assistant Synchronized') : (language === 'es' ? 'Cambios Pendientes' : 'Changes Pending Approval')}
            </span>
          </div>

          <button
            onClick={handlePublishChanges}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#88D49E]" />
            <span>{language === 'es' ? 'Aprobar y Publicar en IA' : 'Approve & Publish to Member AI'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setActiveTab('venues')}
          className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
            activeTab === 'venues' ? 'bg-black text-white shadow-xs font-bold' : 'bg-[#F2F8F4] text-neutral-600 hover:text-black hover:bg-[#EAF4ED] border border-[#E3EFE7]'
          }`}
        >
          {language === 'es' ? 'Espacios y Capacidades' : 'Venues & Layout Capacities'}
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
            activeTab === 'packages' ? 'bg-black text-white shadow-xs font-bold' : 'bg-[#F2F8F4] text-neutral-600 hover:text-black hover:bg-[#EAF4ED] border border-[#E3EFE7]'
          }`}
        >
          {language === 'es' ? `Paquetes de Eventos (${packages.length})` : `Event Packages (${packages.length})`}
        </button>
        <button
          onClick={() => setActiveTab('addons')}
          className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
            activeTab === 'addons' ? 'bg-black text-white shadow-xs font-bold' : 'bg-[#F2F8F4] text-neutral-600 hover:text-black hover:bg-[#EAF4ED] border border-[#E3EFE7]'
          }`}
        >
          {language === 'es' ? 'Mejoras y Adicionales' : 'Add-On Enhancements'}
        </button>
      </div>

      {/* TAB 1: VENUES */}
      {activeTab === 'venues' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden flex flex-col hover:border-emerald-400 transition-colors"
            >
              {/* Photo */}
              <div className="h-44 w-full bg-neutral-100 relative overflow-hidden">
                {fac.image ? (
                  <img
                    src={fac.image}
                    alt={fac.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-950 text-white">
                    <Building className="w-10 h-10 opacity-30" />
                  </div>
                )}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-neutral-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                  {tr(fac.category)}
                </div>
                {fac.hourlyRate && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-mono font-bold">
                    ${fac.hourlyRate}/{language === 'es' ? 'hr' : 'hr'}
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-xs">
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">{tr(fac.name)}</h3>
                  <div className="text-[11px] text-neutral-500 mt-0.5">{tr(fac.location)}</div>
                  <p className="text-neutral-600 text-xs mt-2 leading-relaxed line-clamp-2">
                    {tr(fac.description)}
                  </p>
                </div>

                {/* Capacity by layout */}
                {fac.category === 'event_hall' && (
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5 font-mono text-[11px]">
                    <div className="text-[10px] uppercase font-bold text-neutral-400 font-sans">{language === 'es' ? 'Capacidades por Montaje' : 'Capacities by Setup'}</div>
                    <div className="flex justify-between text-neutral-700">
                      <span>{language === 'es' ? 'Mesas Redondas:' : 'Banquet Rounds:'}</span>
                      <span className="font-bold text-neutral-900">{fac.capacity || 200} pax</span>
                    </div>
                    <div className="flex justify-between text-neutral-700">
                      <span>{language === 'es' ? 'Cóctel de Pie:' : 'Cocktail Standing:'}</span>
                      <span className="font-bold text-neutral-900">{Math.round((fac.capacity || 200) * 1.3)} pax</span>
                    </div>
                    <div className="flex justify-between text-neutral-700">
                      <span>{language === 'es' ? 'Auditorio:' : 'Theater Staged:'}</span>
                      <span className="font-bold text-neutral-900">{Math.round((fac.capacity || 200) * 1.15)} pax</span>
                    </div>
                  </div>
                )}

                {/* Amenities */}
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-neutral-400">{language === 'es' ? 'Comodidades Estándar' : 'Standard Amenities'}</div>
                  <div className="flex flex-wrap gap-1">
                    {fac.amenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 text-[10px] font-medium"
                      >
                        {tr(amenity)}
                      </span>
                    ))}
                    {fac.amenities.length > 3 && (
                      <span className="text-[10px] text-neutral-400 px-1 py-0.5">
                        +{fac.amenities.length - 3} {language === 'es' ? 'más' : 'more'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* TAB 2: PACKAGES */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 flex flex-col justify-between space-y-5 text-xs"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {tr(pkg.venue)}
                </span>
                <h3 className="font-extrabold text-base text-neutral-900 mt-2">{tr(pkg.title)}</h3>
                
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold font-mono text-neutral-900">${pkg.pricePerGuest}</span>
                  <span className="text-neutral-500 font-medium">/ {language === 'es' ? 'invitado' : 'guest'}</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
                  {language === 'es' ? 'Consumo Mínimo:' : 'Minimum Food & Beverage:'} ${pkg.minimumSpend.toLocaleString()}
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
                  <span className="font-semibold text-neutral-700 block">{language === 'es' ? 'Inclusiones del Paquete' : 'Package Inclusions'}</span>
                  {pkg.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-neutral-600 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tr(inc)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert(language === 'es' ? `Paquete ${tr(pkg.title)} seleccionado.` : `Package ${pkg.title} selected for proposal attachment.`)}
                className="w-full py-2 rounded-xl border border-neutral-300 hover:bg-neutral-50 font-semibold text-neutral-800 transition-colors cursor-pointer"
              >
                {language === 'es' ? 'Aplicar a Propuesta' : 'Apply to Next Proposal'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ADD-ONS */}
      {activeTab === 'addons' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-700">
              <tr>
                <th className="p-3.5">{language === 'es' ? 'Ítem Adicional' : 'Enhancement Item'}</th>
                <th className="p-3.5">{language === 'es' ? 'Categoría' : 'Category'}</th>
                <th className="p-3.5 font-mono text-right">{language === 'es' ? 'Precio' : 'Price'}</th>
                <th className="p-3.5">{language === 'es' ? 'Unidad' : 'Unit Metric'}</th>
                <th className="p-3.5 text-right">{t.common.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {addOns.map((add) => (
                <tr key={add.id} className="hover:bg-neutral-50">
                  <td className="p-3.5 font-bold text-neutral-900">{tr(add.name)}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-neutral-100 font-medium text-neutral-700">
                      {tr(add.category)}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-right text-neutral-900">${add.price.toLocaleString()}</td>
                  <td className="p-3.5 text-neutral-600">{tr(add.unit)}</td>
                  <td className="p-3.5 text-right">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {language === 'es' ? 'Disponible' : 'Available'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

