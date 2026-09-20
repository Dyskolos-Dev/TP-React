# Travaux pratiques React & TypeScript

Ce dépôt regroupe cinq travaux pratiques réalisés avec **React** et **TypeScript**.

## Auteurs

- **Baptiste BEUILLE**
- **Noé LEONE**
- **Ilian TOUAZI**

## Les travaux pratiques

- **TP1** — Découverte de TypeScript strict et migration d'un projet JavaScript.
- **TP2** — Création de composants React réutilisables avec Tailwind CSS.
- **TP3** — Mise en place d'un formulaire d'inscription avec validation.
- **TP4** — Recherche de films à l'aide de l'API OMDB.
- **TP5** — Application multi-pages avec React Router, authentification et favoris.

## Lancer un TP

Chaque TP est un projet indépendant. Placez-vous dans le dossier souhaité, puis lancez :

```bash
npm install
npm run dev
```

Pour créer le build de production :

```bash
npm run build
```

Les TP4 et TP5 nécessitent une clé API OMDB. Copiez `env.local.exemple` vers `.env.local`, puis renseignez votre clé :

```env
VITE_OMDB_KEY=votre_cle_api
```
