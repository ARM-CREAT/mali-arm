
import React, { useState } from 'react';
import { EventItem as EventItemType } from '../types';
import { Language, translations } from '../translations';
import { Calendar, MapPin, Edit3, Check, X, Info, AlignLeft, Eye } from 'lucide-react';
import WatermarkedImage from './WatermarkedImage';

interface EventItemProps {
  event: EventItemType;
  lang: Language;
  onUpdate?: (updatedEvent: EventItemType) => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, lang, onUpdate }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<EventItemType>(event);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdate) {
      onUpdate(editedEvent);
    }
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedEvent(event);
    setIsEditing(false);
  };

  const toggleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-mali-green p-10 space-y-8 section-enter h-full flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-mali-green uppercase text-[11px] tracking-[0.3em] flex items-center gap-3">
            <Edit3 size={18} /> {lang === 'fr' ? 'Configuration ARM' : 'ARM Settings'}
          </h3>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-mali-green text-white p-4 rounded-2xl hover:bg-green-700 transition-all shadow-xl"><Check size={24} /></button>
            <button onClick={handleCancel} className="bg-gray-100 text-gray-400 p-4 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"><X size={24} /></button>
          </div>
        </div>
        <div className="space-y-6 flex-1">
          <input type="text" value={editedEvent.title} onChange={(e) => setEditedEvent({...editedEvent, title: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 p-5 rounded-2xl outline-none font-black text-gray-800 text-lg" />
          <textarea rows={6} value={editedEvent.description} onChange={(e) => setEditedEvent({...editedEvent, description: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 p-6 rounded-3xl outline-none font-medium text-gray-700 resize-none" />
        </div>
      </div>
    );
  }

  const fallbackImg = `https://images.unsplash.com/photo-1544207557-ca89ac1f279e?q=80&w=800`;

  return (
    <div className="group bg-white rounded-[4rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 transform hover:-translate-y-4 h-full flex flex-col relative">
      <div className="h-72 bg-gray-100 relative">
        <WatermarkedImage 
          src={event.image || fallbackImg} 
          alt={event.title} 
          className="w-full h-full"
        />
        <div className={`absolute top-8 ${isAr ? 'left-8' : 'right-8'} flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500`}>
          <button onClick={toggleEdit} className="bg-white text-mali-green p-4 rounded-2xl shadow-2xl hover:bg-mali-yellow transition-all"><Edit3 size={20} /></button>
        </div>
        <div className={`absolute bottom-8 ${isAr ? 'left-8' : 'right-8'} bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border border-white/20`}>
          <p className="text-mali-green font-black text-[11px] uppercase tracking-widest flex items-center gap-3"><Calendar size={16} /> {event.date}</p>
        </div>
      </div>
      <div className={`p-12 flex-1 flex flex-col ${isAr ? 'text-right' : 'text-left'}`}>
        <h3 className="text-3xl font-black uppercase text-gray-900 tracking-tighter mb-6 leading-tight group-hover:text-mali-green transition-colors">{event.title}</h3>
        <p className="text-gray-500 leading-relaxed font-medium line-clamp-4 mb-10 text-lg">{event.description}</p>
        <div className="mt-auto pt-10 border-t border-gray-50 flex items-center justify-between">
          <button className="flex items-center gap-3 text-mali-green font-black text-[11px] uppercase tracking-[0.3em]">{isAr ? 'التفاصيل' : 'Découvrir'} <Eye size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
