
// Service Worker désactivé pour permettre une sauvegarde et un téléchargement fluide.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
// Aucune gestion de fetch pour laisser passer les requêtes de l'IDE vers le serveur
