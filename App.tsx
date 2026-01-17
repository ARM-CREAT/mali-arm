
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Statutes from './components/Statutes';
import JoinForm from './components/JoinForm';
import Donation from './components/Donation';
import ChatRoom from './components/ChatRoom';
import AdminDashboard from './components/AdminDashboard';
import PoliticalProgram from './components/PoliticalProgram';
import MediaCenter from './components/MediaCenter';
import Contact from './components/Contact';
import SocialConcerns from './components/SocialConcerns';
import AIAssistant from './components/AIAssistant';
import EventItem from './components/EventItem';
import { AppSection, Member, EventItem as EventItemType, NewsItem } from './types';
import { translations, Language } from './translations';
import { 
  PARTY_NAME, 
  PARTY_MOTTO, 
  LEADERSHIP as INITIAL_LEADERSHIP, 
  INITIAL_EVENTS, 
  INITIAL_NEWS,
  OFFICIAL_OBJECTIVES
} from './constants';
import { Bot, Bell, Share2, Download, ShieldCheck, Users, Menu } from 'lucide-react';
import WatermarkedImage from './components/WatermarkedImage';

const App: React.FC = () => {
  const [section, setSection] = useState<AppSection>(AppSection.HOME);
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('arm_lang') as Language) || 'fr');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  
  const [bulletin, setBulletin] = useState<string>(() => {
    return localStorage.getItem('arm_bulletin') || "Ensemble pour le renouveau citoyen. Le Mali Kura est notre priorité absolue.";
  });

  const t = translations[lang];

  const [members] = useState<Member[]>(() => {
    const saved = localStorage.getItem('arm_members');
    return saved ? JSON.parse(saved) : INITIAL_LEADERSHIP;
  });
  const [events, setEvents] = useState<EventItemType[]>(() => {
    const saved = localStorage.getItem('arm_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const objectives = useMemo(() => OFFICIAL_OBJECTIVES.map(obj => ({
    ...obj,
    title: (t as any)[obj.key] || obj.key,
  })), [t]);

  // Gestion de l'installation Android (APK ready)
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    localStorage.setItem('arm_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleInstall = useCallback(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((result: any) => {
        if (result.outcome === 'accepted') setIsInstallable(false);
        setDeferredPrompt(null);
      });
    }
  }, [deferredPrompt]);

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: PARTY_NAME,
        text: "Rejoignez l'Alliance pour le Rassemblement Malien (A.R.M) sur l'application officielle.",
        url: window.location.href,
      }).catch(() => {});
    }
  };

  const renderContent = () => {
    switch (section) {
      case AppSection.STATUTES: return <Statutes lang={lang} />;
      case AppSection.PROGRAM: return <PoliticalProgram pillars={objectives} lang={lang} />;
      case AppSection.MEDIA: return <MediaCenter lang={lang} />;
      case AppSection.CONTACT: return <Contact lang={lang} />;
      case AppSection.SOCIAL_CONCERNS: return <SocialConcerns lang={lang} />;
      case AppSection.JOIN: return <JoinForm lang={lang} />;
      case AppSection.DONATE: return <Donation lang={lang} />;
      case AppSection.CHAT: return <ChatRoom lang={lang} />;
      case AppSection.ADMIN: return <AdminDashboard lang={lang} members={members} setMembers={() => {}} events={events} setEvents={setEvents} news={[]} setNews={() => {}} bulletin={bulletin} setBulletin={setBulletin} />;
      case AppSection.EVENTS:
        return (
          <div className="max-w-6xl mx-auto px-4 py-12 section-enter pb-32">
            <h1 className="text-4xl md:text-5xl font-black mb-12 uppercase tracking-tighter text-center">{t.events}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {events.map(event => <EventItem key={event.id} event={event} lang={lang} onUpdate={(updated) => setEvents(prev => prev.map(e => e.id === updated.id ? updated : e))} />)}
            </div>
          </div>
        );
      case AppSection.HOME:
      default:
        return (
          <div className="space-y-12 section-enter pb-24">
            {/* Hero Section Mobile Optimized */}
            <div className="relative min-h-[90vh] flex items-center justify-center text-center px-6 bg-mali-green overflow-hidden">
               <div className="absolute inset-0 z-0">
                  <WatermarkedImage src="https://images.unsplash.com/photo-1544207557-ca89ac1f279e?q=80&w=2000" alt="Mali Landscape" className="w-full h-full opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-b from-mali-green/90 via-mali-green/70 to-mali-green/95"></div>
               </div>
               
               <div className="relative z-10 max-w-4xl pt-10">
                  {/* Logo Officiel ARM */}
                  <div className="w-44 h-44 bg-white p-2 rounded-[4rem] mx-auto mb-10 shadow-3xl animate-float border-4 border-mali-yellow flex flex-col overflow-hidden">
                    <div className="flex-1 bg-mali-green flex items-center justify-center font-black text-white text-3xl tracking-tighter">A.R.M</div>
                    <div className="flex-1 bg-mali-yellow flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-mali-green rounded-full flex items-center justify-center">
                           <Users className="text-mali-green" size={20} />
                        </div>
                    </div>
                  </div>
                  
                  <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-none drop-shadow-xl">{lang === 'fr' ? PARTY_NAME : t.heroTitle}</h1>
                  <p className="text-xl md:text-2xl text-mali-yellow font-black mb-12 italic uppercase tracking-widest">{t.motto}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button onClick={() => setSection(AppSection.JOIN)} className="w-full sm:w-auto bg-white text-mali-green px-10 py-5 rounded-3xl font-black text-lg shadow-2xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                      {t.join}
                    </button>
                    {isInstallable && (
                      <button onClick={handleInstall} className="w-full sm:w-auto bg-gray-900 text-white px-10 py-5 rounded-3xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 uppercase tracking-widest border border-white/10">
                        <Download size={24}/> {t.install}
                      </button>
                    )}
                  </div>
               </div>
            </div>

            {/* Bulletin Journalier - Information Publique Rapide */}
            <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-20">
              <div className="bg-white rounded-[3rem] p-1 shadow-3xl overflow-hidden border border-gray-100 group">
                <div className="bg-gradient-to-r from-mali-green to-green-600 px-10 py-5 flex items-center justify-between text-white">
                   <h3 className="font-black uppercase flex items-center gap-3 tracking-widest text-xs">
                     <Bell size={18} className="animate-pulse" /> {t.dailyBulletin}
                   </h3>
                   <button onClick={handleShareApp} className="bg-white/10 p-2.5 rounded-xl hover:bg-white/20 transition-all">
                     <Share2 size={18} />
                   </button>
                </div>
                <div className="p-10 text-xl md:text-2xl font-bold text-gray-800 italic leading-snug">
                  "{bulletin}"
                </div>
              </div>
            </div>

            {/* Section Citoyenne - Engagement Rapide */}
            <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-10 rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col items-center text-center group hover:border-mali-green transition-all cursor-pointer" onClick={() => setSection(AppSection.SOCIAL_CONCERNS)}>
                 <div className="w-20 h-20 bg-mali-green rounded-3xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-xl">
                   <ShieldCheck size={40} />
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-2">{t.socialConcerns}</h4>
                 <p className="text-gray-500 font-medium">Faites entendre votre voix directement auprès du bureau politique.</p>
              </div>
              
              <div className="bg-mali-yellow/10 p-10 rounded-[3rem] border-2 border-dashed border-mali-yellow/30 flex flex-col items-center text-center group hover:bg-mali-yellow/20 transition-all cursor-pointer" onClick={() => setSection(AppSection.DONATE)}>
                 <div className="w-20 h-20 bg-mali-yellow rounded-3xl flex items-center justify-center text-mali-green mb-6 group-hover:scale-110 transition-transform shadow-xl">
                   <Users size={40} />
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-2">{t.support}</h4>
                 <p className="text-gray-700 font-medium">Soutenez financièrement le renouveau du Mali.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white pb-24 lg:pb-0">
      <Navbar currentSection={section} setSection={setSection} onInstall={handleInstall} lang={lang} setLang={setLang} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Bouton IA Flottant avec Retour Haptique Visuel */}
      <div className={`fixed bottom-28 z-[70] transition-all duration-500 ${isAiOpen ? 'scale-0' : 'scale-100'} ${lang === 'ar' ? 'left-8' : 'right-8'}`}>
        <button 
          onClick={() => setIsAiOpen(true)} 
          className="bg-mali-green text-white w-20 h-20 md:w-24 md:h-24 rounded-[2.5rem] shadow-3xl flex items-center justify-center border-4 border-white hover:scale-110 active:scale-90 transition-all ring-12 ring-mali-green/10"
        >
          <Bot size={40} />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-mali-yellow rounded-full border-4 border-white animate-ping"></div>
        </button>
      </div>

      <AIAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} lang={lang} />
      <BottomNav currentSection={section} setSection={setSection} lang={lang} />
    </div>
  );
};

export default App;
