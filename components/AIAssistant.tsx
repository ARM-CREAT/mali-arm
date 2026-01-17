
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, X, RotateCcw } from 'lucide-react';
import { PARTY_NAME, PARTY_MOTTO } from '../constants';
import { translations, Language } from '../translations';

interface AIAssistantProps {
  isOpen: boolean; 
  onClose: () => void; 
  lang: Language;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang];
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const welcomeMessage = () => ({
    role: 'bot' as const,
    text: {
      fr: `Bonjour ! Je suis l'assistant intelligent de l'${PARTY_NAME}. Posez-moi vos questions sur notre programme Mali Kura.`,
      en: `Hello! I am the ${PARTY_NAME} assistant. Ask me about our Mali Kura program.`,
      es: `¡Hola! Soy el asistente de la ${PARTY_NAME}. ¿En qué puedo ayudarle hoy?`,
      ar: `مرحباً! أنا المساعد الذكي لـ ${PARTY_NAME}. كيف يمكنني مساعدتك في برنامج "مالي كورا"؟`
    }[lang] || "Bonjour !"
  });

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([welcomeMessage()]);
    }
  }, [lang, messages.length]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const resetChat = () => setMessages([welcomeMessage()]);

  const handleChat = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: {
          systemInstruction: `Tu es l'assistant officiel de l'ARM (Alliance pour le Rassemblement Malien). Devise: "${PARTY_MOTTO}". Réponds en ${lang}. Sois patriote et informatif.`,
          temperature: 0.7,
        },
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Mali Kura est en marche." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Erreur de connexion. Veuillez vérifier votre accès internet." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-24 w-full sm:w-[420px] max-w-[95vw] h-[600px] bg-white rounded-[3rem] shadow-2xl z-[80] border border-gray-100 flex flex-col overflow-hidden section-enter ${lang === 'ar' ? 'left-6' : 'right-6'}`}>
      <div className={`bg-mali-green p-6 text-white flex justify-between items-center ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className="w-12 h-12 bg-mali-yellow rounded-2xl flex items-center justify-center text-mali-green shadow-xl"><Bot size={28} /></div>
          <div className={lang === 'ar' ? 'text-end' : 'text-start'}>
            <p className="font-black text-sm uppercase tracking-tighter leading-none">{t.aiAssistant}</p>
            <p className="text-[10px] text-green-100 font-bold opacity-75 mt-1">Souveraineté Numérique ARM</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={resetChat} className="p-2.5 hover:bg-white/10 rounded-2xl transition-colors"><RotateCcw size={20}/></button>
          <button onClick={onClose} className="p-2.5 hover:bg-white/10 rounded-2xl transition-colors"><X size={20}/></button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm font-medium shadow-sm leading-relaxed ${
              m.role === 'user' ? 'bg-mali-green text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            } ${lang === 'ar' ? 'text-end' : 'text-start'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-5 rounded-[2rem] rounded-tl-none shadow-sm flex gap-1.5 items-center">
              <div className="w-2 h-2 bg-mali-green rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-mali-green rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-mali-green rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-gray-50">
        <div className={`relative flex gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          <input 
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleChat()}
            placeholder={t.placeholder}
            disabled={isLoading}
            className={`w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 text-sm font-medium focus:border-mali-green outline-none disabled:opacity-50 transition-all ${lang === 'ar' ? 'text-end' : 'text-start'}`}
          />
          <button 
            onClick={handleChat} 
            disabled={isLoading || !input.trim()}
            className="bg-mali-yellow text-mali-green p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
