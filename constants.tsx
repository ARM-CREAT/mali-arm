
import React from 'react';
import { Member, EventItem, NewsItem } from './types';
import { 
  Shield, 
  BookOpen, 
  Tractor, 
  Briefcase, 
  Heart, 
  Users, 
  Scale, 
  MessageSquare,
  Globe,
  UserPlus
} from 'lucide-react';

export const PARTY_NAME = "Alliance Pour le Rassemblement Malien";
export const PARTY_ACRONYM = "A.R.M";
export const PARTY_MOTTO = "Fraternité – Liberté – Égalité";
export const PARTY_HQ = "Sebenikoro, Bamako – Rue 530, Porte 245, Mali";
export const PARTY_PHONE = "+223 76 30 48 69";
export const PARTY_EMAILS = ["info.armmali@gmail.com", "bouadiakite@gmail.com"];

// Coordonnées bancaires fictives mais formatées selon les normes du Mali (UEMOA)
export const PARTY_BANK_DETAILS = {
  bankName: "BMS-SA (Banque Malienne de Solidarité)",
  accountName: "Alliance Pour le Rassemblement Malien (A.R.M)",
  rib: "ML096 01001 00123456789 45",
  swift: "BMSSMLBM",
  agency: "Agence de Sebenikoro"
};

// Added LEADERSHIP member list used in App.tsx
export const LEADERSHIP: Member[] = [
  { name: "Lassine Diakité", role: "Président", location: "Bamako" },
  { name: "Karifa Keita", role: "Secrétaire Général", location: "Bamako" },
  { name: "Modibo Keita", role: "Secrétaire Administratif", location: "Bamako" }
];

export const OFFICIAL_OBJECTIVES = [
  { id: 1, icon: <Users />, key: "obj1" },
  { id: 2, icon: <Shield />, key: "obj2" },
  { id: 3, icon: <BookOpen />, key: "obj3" },
  { id: 4, icon: <Heart />, key: "obj4" },
  { id: 5, icon: <Tractor />, key: "obj5" },
  { id: 6, icon: <Briefcase />, key: "obj6" },
  { id: 7, icon: <Scale />, key: "obj7" },
  { id: 8, icon: <MessageSquare />, key: "obj8" }
];

export const INITIAL_EVENTS: EventItem[] = [
  { 
    id: '1', 
    title: 'Adoption des Statuts Nationaux', 
    date: '2025-04-05', 
    description: 'Grande assemblée pour la fondation officielle du parti ARM à Bamako. Discussion sur la vision Mali Kura.', 
    location: 'Sebenikoro, Bamako',
    image: 'https://images.unsplash.com/photo-1523805081446-993951717d11?q=80&w=1200'
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  { 
    id: '1', 
    title: 'Mali Kura : Vers un nouveau départ', 
    date: '2025-04-06', 
    summary: 'L\'ARM s\'engage pour la refondation des institutions maliennes.', 
    content: 'L\'Alliance pour le Rassemblement Malien propose un pacte de stabilité basé sur la justice et la transparence.',
    image: 'https://images.unsplash.com/photo-1544207557-ca89ac1f279e?q=80&w=1200'
  }
];

export const MALI_REGIONS = [
  "Bamako", "Kayes", "Koulikoro", "Sikasso", "Ségou", "Mopti", "Tombouctou", "Gao", "Kidal", "Ménaka", "Taoudénit"
];
