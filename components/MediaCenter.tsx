
import React, { useState } from 'react';
import { Play, Video, Users, Mic, Monitor, Clock, ChevronRight, Share2, PhoneOff, MicOff, Camera, MoreVertical } from 'lucide-react';
import { translations, Language } from '../translations';
import WatermarkedImage from './WatermarkedImage';

const MediaCenter: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const [inCall, setInCall] = useState(false);

  const galleryVideos = [
    { 
      id: 1, 
      title: "Rassemblement Citoyen à Sebenikoro", 
      image: "https://images.unsplash.com/photo-1523805081446-993951717d11?q=80&w=800", 
      duration: "05:45",
      category: "Événement"
    },
    { 
      id: 2, 
      title: "Vision Économique : Le Mali de demain", 
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800", 
      duration: "12:15",
      category: "Programme"
    }
  ];

  if (inCall) {
    return (
      <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col p-6 section-enter">
        <div className="flex-1 rounded-[3rem] bg-gray-800 overflow-hidden relative border-4 border-gray-700 shadow-3xl">
          <WatermarkedImage src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=1200" alt="Call" className="w-full h-full opacity-60" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-white text-3xl font-black uppercase tracking-tighter">Salle de Conférence ARM</h2>
            <div className="bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase mt-2 inline-block animate-pulse">En Direct</div>
          </div>
          
          {/* Grille des participants simulée */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-10 w-full opacity-40">
                {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-gray-700 rounded-3xl border-2 border-white/10 flex items-center justify-center"><Users size={40} className="text-gray-500"/></div>)}
             </div>
          </div>
        </div>

        {/* Contrôles de l'appel façon iOS/Android */}
        <div className="h-40 flex items-center justify-center gap-8">
          <button className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><MicOff size={24}/></button>
          <button className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><Camera size={24}/></button>
          <button onClick={() => setInCall(false)} className="w-20 h-20 bg-red-600 text-white rounded-[2.5rem] flex items-center justify-center shadow-3xl hover:bg-red-700 transition-all"><PhoneOff size={32}/></button>
          <button className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><Monitor size={24}/></button>
          <button className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><MoreVertical size={24}/></button>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto py-8 px-6 mb-20 section-enter ${isAr ? 'text-end' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <div className="flex items-center gap-2 text-mali-green font-black text-xs uppercase tracking-[0.3em] mb-3">
            <div className="w-10 h-1.5 bg-mali-yellow rounded-full"></div>
            {t.media}
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-none">Espace <span className="text-mali-green">Média</span></h1>
        </div>
        
        <button onClick={() => setInCall(true)} className="bg-red-600 text-white px-10 py-5 rounded-3xl font-black text-xs flex items-center gap-3 animate-bounce shadow-3xl uppercase tracking-widest ring-8 ring-red-600/10">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div> Rejoindre le Live
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Vidéo Hero */}
          <div className="relative group cursor-pointer aspect-video bg-gray-900 rounded-[3.5rem] overflow-hidden shadow-3xl border-8 border-white">
            <WatermarkedImage src="https://images.unsplash.com/photo-1544207557-ca89ac1f279e?q=80&w=1600" alt="Main" className="w-full h-full opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 bg-mali-yellow text-mali-green rounded-full flex items-center justify-center shadow-3xl group-hover:scale-110 transition-transform"><Play size={40} fill="currentColor" /></div>
            </div>
            <div className="absolute bottom-8 left-8 text-white">
              <span className="bg-mali-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Vision ARM</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter">Le Mali que nous construisons ensemble</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {galleryVideos.map(v => (
               <div key={v.id} className="group bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-500 flex flex-col">
                 <div className="h-60 relative">
                    <WatermarkedImage src={v.image} alt={v.title} className="w-full h-full" />
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-lg">{v.duration}</div>
                 </div>
                 <div className="p-8">
                   <h4 className="font-black text-gray-900 text-xl uppercase tracking-tight mb-4 leading-tight group-hover:text-mali-green transition-colors">{v.title}</h4>
                   <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{v.category}</span>
                     <button className="text-mali-green hover:scale-110 transition-transform"><Play size={24} fill="currentColor"/></button>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-mali-green p-10 rounded-[4rem] text-white shadow-3xl relative overflow-hidden">
            <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter flex items-center gap-3"><Video/> {t.videoConf}</h3>
            <p className="text-green-50 text-sm font-medium mb-10 opacity-80 leading-relaxed">Participez activement aux réunions de quartier et aux débats nationaux depuis votre mobile.</p>
            <button onClick={() => setInCall(true)} className="w-full bg-white text-mali-green py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:bg-mali-yellow hover:scale-105 active:scale-95 transition-all">
              Rejoindre l'Espace
            </button>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-gray-900 flex items-center gap-3">
               <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div> Programme Direct
             </h3>
             <div className="space-y-6">
                {[1,2].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-mali-green shadow-sm"><Clock size={20}/></div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">Demain • 18:00</p>
                      <p className="text-sm font-black text-gray-800">Assises de Sebenikoro</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCenter;
