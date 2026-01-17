
import React from 'react';
import { Users } from 'lucide-react';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  overlayClassName?: string;
}

const WatermarkedImage: React.FC<WatermarkedImageProps> = ({ src, alt, className, overlayClassName }) => {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        loading="lazy"
      />
      
      {/* Overlay dégradé pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      {/* Logo Officiel ARM en Watermark */}
      <div className={`absolute bottom-4 right-4 z-20 ${overlayClassName}`}>
        <div className="bg-white p-1 rounded-xl shadow-2xl border-2 border-mali-yellow flex flex-col items-center overflow-hidden w-14 h-14 animate-pulse">
            <div className="w-full h-1/2 bg-mali-green flex items-center justify-center">
               <span className="text-[7px] font-black text-white leading-none tracking-tighter">A.R.M</span>
            </div>
            <div className="w-full h-1/2 bg-mali-yellow flex items-center justify-center">
               <div className="w-5 h-5 border-2 border-mali-green rounded-full flex items-center justify-center">
                  <Users size={12} className="text-mali-green" />
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WatermarkedImage;
