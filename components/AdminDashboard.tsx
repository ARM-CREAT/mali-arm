
import React, { useState } from 'react';
import { Users, Settings, Sparkles, Layout, Bell, Shield } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Member, EventItem, NewsItem } from '../types';
import { translations, Language } from '../translations';
import { PARTY_MOTTO } from '../constants';

interface AdminDashboardProps {
  lang: Language;
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  bulletin: string;
  setBulletin: React.Dispatch<React.SetStateAction<string>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  lang,
  members, setMembers,
  events, setEvents,
  news, setNews,
  bulletin, setBulletin
}) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState<'cms' | 'ai_studio'>('cms');

  const handleLogin = () => {
    if (pass === 'ARM2024') setIsAuthenticated(true);
    else alert(lang === 'fr' ? 'Code incorrect' : 'Incorrect code');
  };

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: aiPrompt,
        config: {
          systemInstruction: `Tu es le stratège de communication de l'ARM Mali. Devise: ${PARTY_MOTTO}. Langue : ${lang}.`,
        },
      });
      setAiResult(response.text || '');
    } catch (e) {
      setAiResult("Erreur de génération. Vérifiez votre connexion.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`max-w-md mx-auto mt-20 p-8 bg-white shadow-2xl rounded-[2.5rem] border border-gray-100 ${isAr ? 'text-right' : 'text-left'}`}>
        <div className="w-20 h-20 bg-mali-green rounded-3xl mx-auto mb-8 flex items-center justify-center text-white shadow-lg"><Settings size={40} /></div>
        <h2 className="text-2xl font-black mb-8 text-center uppercase tracking-tighter">Console Admin ARM</h2>
        <input 
          type="password" placeholder={t.authCode} 
          className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-6 text-center text-xl focus:border-mali-green outline-none"
          value={pass} onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin} className="w-full bg-mali-green text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 transition-all">{t.access}</button>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto p-6 space-y-10 mb-20 ${isAr ? 'text-right' : 'text-left'}`}>
      <header className={`flex flex-col md:flex-row justify-between gap-6 ${isAr ? 'md:flex-row-reverse' : ''}`}>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">{t.admin}</h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Mode Connecté Requis</p>
        </div>
        <div className={`flex bg-gray-100 p-1.5 rounded-2xl overflow-x-auto ${isAr ? 'flex-row-reverse' : ''}`}>
          <button onClick={() => setActiveTab('cms')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'cms' ? 'bg-white text-mali-green shadow-sm' : 'text-gray-500'}`}><Layout size={14}/> {t.cms}</button>
          <button onClick={() => setActiveTab('ai_studio')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'ai_studio' ? 'bg-white text-mali-green shadow-sm' : 'text-gray-500'}`}><Sparkles size={14}/> {t.aiStudio}</button>
        </div>
      </header>

      {activeTab === 'cms' && (
        <div className="space-y-10">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-mali-green relative overflow-hidden">
            <h3 className={`text-xl font-black mb-6 uppercase flex items-center gap-3 text-mali-green ${isAr ? 'flex-row-reverse' : ''}`}>
              <Bell /> {t.updateBulletin}
            </h3>
            <textarea 
              value={bulletin}
              onChange={(e) => setBulletin(e.target.value)}
              className={`w-full bg-gray-50 border-2 border-gray-100 rounded-[2rem] p-8 text-xl font-bold focus:border-mali-green outline-none min-h-[180px] shadow-inner ${isAr ? 'text-right' : 'text-left'}`}
            />
          </div>
        </div>
      )}

      {activeTab === 'ai_studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-mali-green/10">
            <h3 className="text-xl font-black mb-6 uppercase flex items-center gap-3 text-mali-green"><Sparkles/> {t.aiStudio}</h3>
            <textarea 
              value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Décrivez le contenu à générer..."
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-[2rem] p-6 text-sm focus:border-mali-green outline-none min-h-[200px] mb-8"
            />
            <button onClick={generateAI} disabled={isGenerating} className="w-full bg-mali-green text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest disabled:opacity-50">Générer avec Gemini</button>
          </div>
          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl flex-1 flex flex-col min-h-[400px]">
            <div className="flex-1 bg-gray-50 p-8 rounded-2xl text-sm font-medium text-gray-700 whitespace-pre-wrap">{aiResult || "Studio prêt."}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
