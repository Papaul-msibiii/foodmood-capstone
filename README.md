# 🍳 FoodMood – Recommandateur de recettes intelligent

FoodMood est une application web qui aide l’utilisateur à **cuisiner avec ce qu’il a sous la main**.  
L’utilisateur saisit les ingrédients disponibles et l’IA lui propose instantanément des recettes correspondantes, avec instructions et conseils.

## 🏁 Project Title & Description

- **Ce que je construis** : une application web qui suggère des recettes en fonction des ingrédients saisis par l’utilisateur.
- **Pour qui** : étudiants, familles, toute personne cherchant une idée de repas rapide.
- **Pourquoi c’est important** : lutte contre le gaspillage alimentaire et fait gagner du temps.

## 🛠️ Tech Stack

| Domaine | Outils |
|---------|-------|
| **Frontend** | Next.js (App Router) + TypeScript + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Base de données** | MongoDB (Mongoose) |
| **Gestion d’état** | Redux Toolkit |
| **Authentification** | NextAuth.js (ou JWT simple) |
| **Tests** | Jest + React Testing Library |
| **Déploiement** | Vercel (frontend) + Render/Railway (backend) |
| **Outils IA** | ChatGPT, Cursor, CodeRabbit |

## 🧠 AI Integration Strategy

FoodMood s’appuie sur l’IA pour **accélérer le développement** et **améliorer la qualité du code**.

### Code generation
- Génération de composants Next.js (formulaire d’ingrédients, affichage des recettes).
- Création des routes Express (CRUD) et des modèles Mongoose.
- Exemple d’invite :  
  > « Crée un composant Next.js avec React Hook Form et Yup pour saisir une liste d’ingrédients et l’envoyer à l’API. »

### Testing
- Génération automatique de **tests unitaires** et **tests d’intégration** (Jest, React Testing Library).
- Exemple d’invite :  
  > « Génère une suite de tests Jest pour le contrôleur `getRecipesByIngredients` couvrant succès, erreur de validation et absence de résultats. »

### Documentation
- Génération automatique de **docstrings** JSDoc, de commentaires en ligne, et de mises à jour du README.
- Exemple d’invite :  
  > « Ajoute des docstrings JSDoc à ces fonctions pour expliquer les paramètres et la logique. »

### Context-aware techniques
- Fournir à l’IA l’arborescence du projet ou les diffs Git pour générer du code ou des tests cohérents.
- Exemple d’invite :  
  > « Voici la structure du projet et le diff Git. Génère les tests pour les nouvelles routes Express. »

## 🔎 Outils pour la révision & les commits

| Outil | Rôle |
|-------|------|
| **Cursor** | Génération et refactoring de code rapide |
| **CodeRabbit** | Revue automatique des pull requests |
| **GitHub Copilot Chat** *(optionnel)* | Génération de tests supplémentaires et messages de commit |

## 🚀 Plan de développement (4 jours)

| Jour | Tâches |
|------|-------|
| **Jour 1** | Créer le dépôt GitHub, initialiser Next.js + Express, configurer MongoDB et l’authentification |
| **Jour 2** | Implémenter les routes et modèles (CRUD recettes/ingrédients), intégrer Redux Toolkit |
| **Jour 3** | Développer l’interface utilisateur (formulaire de recherche, affichage des recettes), écrire les tests |
| **Jour 4** | Finaliser la documentation, tester l’appli, déployer sur Vercel (frontend) et Render/Railway (backend) |

## ✅ Étapes pour le livrable

1. Créer un **dépôt GitHub public** nommé `foodmood-capstone`.
2. Ajouter ce **README.md** à la racine du projet.
3. Commencer l’implémentation selon le plan.
4. Soumettre le lien du dépôt.
