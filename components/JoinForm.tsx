
import React, { useState } from 'react';
import { MALI_REGIONS } from '../constants';
import { translations, Language } from '../translations';
import { CheckCircle, ShieldCheck, UserPlus, ArrowRight } from 'lucide-react';

const JoinForm: React.FC<{ lang: Language }> = ({ lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = translations[lang];
  const isAr = lang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-3xl text-center border border-gray-100 my-12 section-enter">
        <div className="w-28 h-28 bg-green-50 text-mali-green rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
          <CheckCircle size={56} />
        </div>
        <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter text-gray-900">{isAr ? 'تم استلام الطلب' : 'Bienvenue à l\'ARM !'}</h2>
        <p className="text-gray-500 font-medium mb-12 leading-relaxed text-lg max-w-md mx-auto">{t.successJoin}</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="w-full bg-mali-green text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-green-700 transition-all shadow-2xl flex items-center justify-center gap-4"
        >
          {isAr ? 'إغلاق' : 'Retourner à l\'accueil'} <ArrowRight size={20}/>
        </button>
      </div>
    );
  }

  return (
    <div className={`max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[4rem] shadow-3xl border border-gray-100 my-12 section-enter ${isAr ? 'text-end' : ''}`}>
      <div className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 bg-mali-yellow/20 rounded-3xl flex items-center justify-center text-mali-green mb-6">
           <UserPlus size={40} />
        </div>
        <h2 className="text-4xl font-black text-center text-gray-900 uppercase tracking-tighter">{t.join}</h2>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-3">Mali Kura - Formulaire Officiel</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.fullName}</label>
          <input required type="text" className={`w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:border-mali-green focus:bg-white outline-none font-bold text-gray-800 transition-all ${isAr ? 'text-end' : ''}`} placeholder="Ex: Lassine Diakité" />
        </div>
        
        <div className="space-y-2">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.phone}</label>
          <input required type="tel" className={`w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:border-mali-green focus:bg-white outline-none font-bold text-gray-800 transition-all ${isAr ? 'text-end' : ''}`} placeholder="+223" />
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.region}</label>
          <select required className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:border-mali-green focus:bg-white outline-none font-black text-[11px] uppercase tracking-widest">
            {MALI_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            <option value="diaspora">Diaspora</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.locality}</label>
          <input required type="text" className={`w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:border-mali-green focus:bg-white outline-none font-bold text-gray-800 transition-all ${isAr ? 'text-end' : ''}`} />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.profession}</label>
          <input type="text" className={`w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:border-mali-green focus:bg-white outline-none font-bold text-gray-800 transition-all ${isAr ? 'text-end' : ''}`} />
        </div>

        <div className="md:col-span-2 py-4">
          <label className={`flex items-start gap-5 p-6 rounded-3xl bg-gray-50 cursor-pointer border-2 border-transparent hover:border-mali-yellow/30 transition-all ${isAr ? 'flex-row-reverse' : ''}`}>
            <input required type="checkbox" className="w-6 h-6 rounded-lg border-2 text-mali-green focus:ring-mali-green mt-1" />
            <span className="text-xs font-bold text-gray-500 leading-relaxed">{isAr ? 'أوافق على اللوائح والنظام الأساسي للحزب' : 'Je déclare accepter solennellement les statuts et le règlement intérieur du parti A.R.M. et m\'engage à servir la nation avec intégrité.'}</span>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="md:col-span-2 bg-mali-yellow text-mali-green font-black py-6 rounded-2xl hover:bg-yellow-400 hover:scale-[1.02] active:scale-95 transition-all shadow-3xl uppercase tracking-[0.3em] flex items-center justify-center gap-4 disabled:opacity-50"
        >
          {loading ? <div className="w-6 h-6 border-4 border-mali-green border-t-transparent rounded-full animate-spin"></div> : t.confirmJoin}
        </button>
      </form>
      
      <div className="mt-12 flex items-center justify-center gap-2 text-[9px] font-black text-gray-300 uppercase tracking-widest">
        <ShieldCheck size={14} /> Sécurisé par ARM Cybersecurity
      </div>
    </div>
  );
};

export default JoinForm;
