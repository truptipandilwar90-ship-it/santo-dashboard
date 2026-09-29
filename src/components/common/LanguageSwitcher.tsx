import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../i18n/translations';

interface LanguageSwitcherProps {
  variant?: 'pill' | 'toggle' | 'dropdown';
  size?: 'sm' | 'md';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'pill',
  size = 'md',
  className = ''
}) => {
  const { language, setLanguage, toggleLanguage, t } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-full bg-neutral-100 border border-neutral-200/90 shadow-2xs shrink-0 select-none ${className}`}
        role="group"
        aria-label="Language selection"
      >
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`w-[54px] flex items-center justify-center gap-1.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
          }`}
          title="English"
        >
          <span className="text-xs">🇺🇸</span>
          <span>EN</span>
        </button>
        <button
          type="button"
          onClick={() => setLanguage('es')}
          className={`w-[54px] flex items-center justify-center gap-1.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            language === 'es'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
          }`}
          title="Español (República Dominicana)"
        >
          <span className="text-xs">🇩🇴</span>
          <span>ES</span>
        </button>
      </div>
    );
  }

  if (variant === 'toggle') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-all shadow-2xs cursor-pointer ${className}`}
        title={t.common.switchLanguage}
      >
        <Globe className="w-3.5 h-3.5 text-neutral-500" />
        <span className="font-bold uppercase tracking-wider">{language === 'en' ? 'EN' : 'ES'}</span>
        <span className="text-neutral-400">|</span>
        <span className="text-neutral-500 text-[11px] font-normal">
          {language === 'en' ? 'Español' : 'English'}
        </span>
      </button>
    );
  }

  // Dropdown variant
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white text-neutral-800 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
        aria-expanded={dropdownOpen}
      >
        <Globe className="w-3.5 h-3.5 text-neutral-500" />
        <span className="flex items-center gap-1.5">
          <span>{language === 'en' ? '🇺🇸' : '🇩🇴'}</span>
          <span className="font-bold">{language === 'en' ? 'English' : 'Español'}</span>
        </span>
        <ChevronDown className="w-3 h-3 text-neutral-400" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-2xl bg-white border border-neutral-200 shadow-xl py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            {t.common.language}
          </div>
          <button
            type="button"
            onClick={() => {
              setLanguage('en');
              setDropdownOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#F2F8F4] transition-colors cursor-pointer ${
              language === 'en' ? 'font-bold text-black bg-[#F2F8F4]' : 'text-neutral-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">🇺🇸</span>
              <div>
                <div className="leading-tight">English</div>
                <div className="text-[10px] text-neutral-400">United States</div>
              </div>
            </div>
            {language === 'en' && <Check className="w-3.5 h-3.5 text-[#00A651]" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setLanguage('es');
              setDropdownOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#F2F8F4] transition-colors cursor-pointer ${
              language === 'es' ? 'font-bold text-black bg-[#F2F8F4]' : 'text-neutral-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">🇩🇴</span>
              <div>
                <div className="leading-tight">Español</div>
                <div className="text-[10px] text-neutral-400">República Dominicana</div>
              </div>
            </div>
            {language === 'es' && <Check className="w-3.5 h-3.5 text-[#00A651]" />}
          </button>
        </div>
      )}
    </div>
  );
};
