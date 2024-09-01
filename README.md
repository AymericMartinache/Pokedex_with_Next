# Pokedex with Next !

## Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Pour commencer, lancez le serveur de développement. Ensuite, ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

Vous pouvez commencer à modifier la page en éditant `app/page.tsx`. La page se met à jour automatiquement lorsque vous modifiez le fichier.

Ce projet utilise [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) pour optimiser et charger automatiquement Inter, une police Google personnalisée.

## Vue d'ensemble technique

### Structure du projet

-   **Framework Next.js** : Le projet est construit avec Next.js, un framework React qui permet le rendu côté serveur et la génération de sites statiques. Cela permet de créer des applications web très optimisées et SEO-friendly.

-   **TypeScript** : Le projet est entièrement typé avec TypeScript, offrant une sécurité de typage et une meilleure expérience de développement avec IntelliSense et la vérification des types.

-   **Tailwind CSS** : Tailwind CSS est utilisé pour le style, permettant un développement avec une approche utility-first avec un minimum de CSS personnalisé. Tailwind est configuré dans `tailwind.config.js`.

-   **ESLint & Prettier** : Le projet utilise ESLint et Prettier pour assurer la qualité et la cohérence du code.

-   **Intégration d'API** : Le projet récupère des données à partir d'une API distante, spécifiquement depuis `https://tyradex.vercel.app/api/v1/pokemon`, pour obtenir les données des Pokémon. Ces données sont gérées et affichées dynamiquement sur le frontend.

-   **Optimisation des images** : Le projet utilise le composant `next/image` de Next.js pour un chargement et une distribution optimisés des images. Cela nécessite une configuration dans `next.config.js` pour autoriser les domaines externes à partir desquels les images peuvent être chargées.

### Fichiers et répertoires clés

-   **`app/layout.tsx`** : Ce fichier définit la mise en page principale de l'application, incluant la structure globale et les métadonnées.

-   **`app/page.tsx`** : Il s'agit du composant principal de la page où les données des Pokémon sont récupérées et affichées.

-   **`@types/pokemon.ts`** : Ce fichier contient les interfaces TypeScript utilisées pour typer les données des Pokémon dans tout le projet.

-   **`next.config.js`** : Configuration personnalisée pour l'application Next.js, y compris les domaines d'images et d'autres paramètres de build.

-   **`tailwind.config.js`** : Configuration pour Tailwind CSS, incluant les couleurs personnalisées, les espacements et d'autres tokens de design.

## En savoir plus

Pour en savoir plus sur Next.js, consultez les ressources suivantes :

-   [Documentation Next.js](https://nextjs.org/docs) - pour en savoir plus sur les fonctionnalités et l'API de Next.js.
-   [Apprendre Next.js](https://nextjs.org/learn) - un tutoriel interactif pour découvrir Next.js.
