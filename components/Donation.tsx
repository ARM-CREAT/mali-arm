
import React, { useState } from 'react';
// Added Heart to lucide-react imports
import { CreditCard, ShieldCheck, Landmark, Copy, Check, Info, Heart } from 'lucide-react';
import { translations, Language } from '../translations';
import { PARTY_BANK_DETAILS } from '../constants';

const Donation: React.FC<{ lang: Language }> = ({ lang }) => {
  const [amount, setAmount] = useState<number | null>(10);
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<'card' | 'transfer'>('card');
  const [copied, setCopied] = useState(false);
  const t = translations[lang];
  const isAr = lang === 'ar';

  const amounts = [5, 10, 20, 50];

  const handleCopy = () => {
    navigator.clipboard.writeText(PARTY_BANK_DETAILS.rib);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`max-w-md mx-auto bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 ${isAr ? 'text-end' : ''} section-enter`}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-mali-yellow/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-mali-green">
           <Heart fill="currentColor" size={32} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{t.support}</h2>
        <p className="text-gray-400 text-[10px] font-black mt-2 uppercase tracking-[0.3em]">Financement Citoyen ARM</p>
      </div>

      {/* Selecteur de méthode */}
      <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
        <button 
          onClick={() => { setMethod('card'); setStep(1); }}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${method === 'card' ? 'bg-white text-mali-green shadow-sm' : 'text-gray-500'}`}
        >
          <CreditCard size={14} /> {t.cardPayment}
        </button>
        <button 
          onClick={() => setMethod('transfer')}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${method === 'transfer' ? 'bg-white text-mali-green shadow-sm' : 'text-gray-500'}`}
        >
          <Landmark size={14} /> {t.bankTransfer}
        </button>
      </div>

      {method === 'card' ? (
        step === 1 ? (
          <div className="space-y-8 animate-slideUpFade">
            <div className="grid grid-cols-2 gap-4">
              {amounts.map(a => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  className={`py-5 border-2 rounded-2xl font-black text-xl transition-all ${
                    amount === a ? 'border-mali-green bg-green-50 text-mali-green shadow-inner' : 'border-gray-50 hover:border-mali-yellow text-gray-400'
                  }`}
                >
                  {a} €
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder={t.amount + " (€)"}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={`w-full bg-gray-50 border-b-4 border-gray-100 p-4 text-center text-2xl font-black focus:border-mali-green outline-none rounded-t-2xl ${isAr ? 'text-end' : ''}`}
            />
            <button 
              onClick={() => setStep(2)}
              disabled={!amount || amount <= 0}
              className="w-full bg-mali-green text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 transition-all disabled:opacity-50 shadow-xl"
            >
              {t.access}
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-slideUpFade">
            <div className={`bg-gray-50 p-6 rounded-2xl flex justify-between items-center mb-6 border border-gray-100 ${isAr ? 'flex-row-reverse' : ''}`}>
              <span className="text-gray-400 font-black text-xs uppercase">{t.amount} :</span>
              <span className="font-black text-2xl text-mali-green">{amount} €</span>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <CreditCard className={`absolute top-4 text-gray-300 ${isAr ? 'right-4' : 'left-4'}`} size={20} />
                <input type="text" placeholder="Card Number" className={`w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-mali-green font-medium ${isAr ? 'pr-12 text-end' : 'pl-12'}`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-mali-green text-center font-bold" />
                <input type="text" placeholder="CVC" className="bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-mali-green text-center font-bold" />
              </div>
              <button 
                className="w-full bg-mali-yellow text-mali-green py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl mt-6"
                onClick={() => alert("Simulation sécurisée - Merci !")}
              >
                {t.paymentSecure}
              </button>
              <button onClick={() => setStep(1)} className="w-full text-gray-400 text-[10px] font-black uppercase hover:underline text-center">{lang === 'fr' ? 'Modifier le montant' : 'Back'}</button>
            </div>
          </div>
        )
      ) : (
        <div className="space-y-8 animate-slideUpFade">
          <div className="bg-green-50 p-8 rounded-[2rem] border-2 border-dashed border-mali-green/30 text-center">
            <h3 className="text-mali-green font-black uppercase text-xs tracking-widest mb-4 flex items-center justify-center gap-2">
              <Landmark size={16} /> {t.bankTransfer}
            </h3>
            <div className="space-y-4">
              <div className="text-left">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">{t.accountHolder}</label>
                <p className="font-black text-gray-800 text-sm">{PARTY_BANK_DETAILS.accountName}</p>
              </div>
              <div className="text-left">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">{t.bankName}</label>
                <p className="font-black text-gray-800 text-sm">{PARTY_BANK_DETAILS.bankName}</p>
              </div>
              <div className="text-left bg-white p-4 rounded-2xl border border-gray-100">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">RIB / Numéro de Compte (Mali)</label>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black text-mali-green text-lg tracking-tight select-all">{PARTY_BANK_DETAILS.rib}</p>
                  <button 
                    onClick={handleCopy}
                    className={`p-2.5 rounded-xl transition-all ${copied ? 'bg-mali-green text-white' : 'bg-gray-50 text-gray-400 hover:text-mali-green'}`}
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                {copied && <span className="text-[8px] font-black text-mali-green uppercase tracking-widest block mt-2 animate-bounce">{t.copied}</span>}
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm shrink-0"><Info size={20}/></div>
            <p className="text-[10px] font-medium text-blue-700 leading-relaxed italic">
              {lang === 'fr' 
                ? "Veuillez préciser votre nom et 'DON ARM' en libellé de virement pour permettre la traçabilité de votre contribution."
                : "Please include your name and 'DON ARM' in the transfer description for traceability."
              }
            </p>
          </div>
        </div>
      )}

      <div className={`flex items-center justify-center gap-2 text-[10px] font-black text-gray-300 mt-8 uppercase ${isAr ? 'flex-row-reverse' : ''}`}>
        <ShieldCheck size={14} />
        SSL Encrypted • BMS-SA Mali Partner
      </div>
    </div>
  );
};

export default Donation;
