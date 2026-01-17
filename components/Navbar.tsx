
import React, { useState } from 'react';
import { Menu, X, Smartphone, Home, Calendar, Newspaper, Heart, LayoutDashboard, FileText, Shield, Video, MessageCircle, Globe, ChevronDown } from 'lucide-react';
import { AppSection } from '../types';
import { PARTY_ACRONYM } from '../constants';
import { translations, Language } from '../translations';

interface NavbarProps {
  currentSection: AppSection;
  setSection: (s: AppSection) => void;
  onInstall: () => void;
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, setSection, onInstall, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const t = translations[lang];

  const navItems = [
    { id: AppSection.HOME, label: t.home, icon: Home },
    { id: AppSection.PROGRAM, label: t.program, icon: FileText },
    { id: AppSection.STATUTES, label: t.statutes, icon: Shield },
    { id: AppSection.MEDIA, label: t.media, icon: Video },
    { id: AppSection.EVENTS, label: t.events, icon: Calendar },
    { id: AppSection.NEWS, label: t.news, icon: Newspaper },
    { id: AppSection.DONATE, label: t.donate, icon: Heart },
    { id: AppSection.CONTACT, label: t.contact, icon: MessageCircle },
    { id: AppSection.ADMIN, label: t.admin, icon: LayoutDashboard },
  ];

  const languages = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'ar', label: 'عربي' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-mali-green/95 backdrop-blur-xl text-white shadow-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center gap-4 cursor-pointer group"
              onClick={() => setSection(AppSection.HOME)}
            >
              <div className="w-12 h-12 bg-mali-yellow rounded-2xl flex items-center justify-center font-black text-mali-green text-2xl border-2 border-white/50 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {PARTY_ACRONYM[0]}
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl leading-none tracking-tighter hidden sm:block">A.R.M</span>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-50 hidden sm:block">Mali Kura</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className={`ml-12 flex items-center space-x-1 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setSection(item.id); setIsOpen(false); }}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                      currentSection === item.id 
                      ? 'bg-mali-yellow text-mali-green shadow-xl scale-105' 
                      : 'hover:bg-white/10 text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowLang(!showLang)}
                className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-2xl text-[10px] font-black hover:bg-white/20 transition-all uppercase tracking-widest border border-white/10 shadow-lg"
              >
                <Globe size={16} /> {lang} <ChevronDown size={14} className={`transition-transform duration-300 ${showLang ? 'rotate-180' : ''}`} />
              </button>
              {showLang && (
                <div className={`absolute top-full mt-4 w-32 bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden z-[100] border border-gray-100 animate-slideUpFade ${lang === 'ar' ? 'left-0' : 'right-0'}`}>
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code as Language); setShowLang(false); }}
                      className={`w-full text-left px-5 py-4 text-[10px] font-black hover:bg-gray-50 flex items-center justify-between uppercase tracking-widest transition-colors ${lang === l.code ? 'text-mali-green bg-green-50' : 'text-gray-800'}`}
                    >
                      {l.label}
                      {lang === l.code && <div className="w-2 h-2 bg-mali-green rounded-full shadow-[0_0_8px_rgba(20,181,58,0.5)]"></div>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={onInstall}
              className="hidden sm:flex items-center gap-3 bg-white text-mali-green px-6 py-3 rounded-2xl text-[10px] font-black hover:bg-mali-yellow hover:scale-105 transition-all uppercase tracking-widest shadow-xl border-2 border-white group"
            >
              <Smartphone size={18} className="group-hover:animate-bounce" /> {t.install}
            </button>
            
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-mali-green border-t border-white/10 shadow-2xl overflow-y-auto max-h-[85vh] animate-slideUpFade">
          <div className="px-6 py-10 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setSection(item.id); setIsOpen(false); }}
                className={`block w-full text-start px-6 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-6 transition-all ${
                  currentSection === item.id ? 'bg-mali-yellow text-mali-green shadow-2xl scale-[1.02]' : 'hover:bg-white/10'
                } ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <item.icon size={22} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
