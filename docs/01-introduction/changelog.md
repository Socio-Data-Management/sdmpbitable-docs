---
sidebar_position: 3
---

# Changelog

Historique des évolutions et corrections depuis la version **3.3.x** (première version soumise à la certification Microsoft AppSource).

---

## Version 3.5.28.9 *(en cours — non publiée)*

> Développements depuis la v3.5.15 (dernier push GitHub : 23 avril 2026).

### Nouvelles fonctionnalités

#### Logos dans les en-têtes
- **5 nouveaux champs de données** : `colLogoLv1`, `colLogoLv2`, `colLogoLv3` pour les colonnes, `rowLogoLv1`, `rowLogoLv2` pour les lignes.  
  Chaque champ accepte une mesure DAX retournant une image en **base64** (PNG, JPEG…).
- **Paramètres de la carte « Logos »** :
  - Interrupteur global « Show logos »
  - **Mode d'affichage par niveau** : *Logo only / Logo above text / Logo under text* — configurable indépendamment pour les 5 niveaux
  - **Taille par niveau** (en px) : colonnes Lv1 (32 px par défaut), Lv2 (24 px), Lv3 (20 px) ; lignes Lv1 (24 px), Lv2 (20 px)
- Toutes les images base64 passent par `sanitizeImageDataUri` (sécurité, pas d'URL externe).

#### Mode Tuile *(Tile Mode)*
- Nouvelle carte de paramètres **« Tile mode »** dans la section *Table Format*.
- Active le rendu de chaque cellule (ou sous-cellule) comme **tuile détachée** :
  - `Tile corner radius` (rayon des coins arrondis, px)
  - `Tile horizontal / vertical padding` (px)
  - `Drop shadow` + `Shadow intensity` (1–30)
  - `Tile background` (couleur de fond des tuiles non-significatives)
  - `Tile width` : `-1` = équilibrage automatique sur la largeur max du contenu, ou valeur explicite (`60px`, `5em`)
- **Contrôle des espacements** entre groupes de colonnes :
  - `Sub-cell gap` — espace entre sous-cellules en mode multi-valeurs
  - `Group gap` — espace supplémentaire au début de chaque groupe de colonnes de niveau 1
  - `Sub-group gap` — espace supplémentaire au début de chaque sous-groupe de niveau 2
  - `Row gap` — espace vertical entre lignes de tuiles

#### Cell Rules (règles de cellule)
- **Nouveau champ de données `cellRules`** : mesure DAX retournant une règle de décoration par cellule.  
  Format : couleur hex (`#FF9900`), libellé (`Expert`), ou les deux séparés par un point-virgule (`#FF9900;Expert`).
- **Carte de paramètres « Cell Rules »** :
  - `Activate Cell Rules` — interrupteur principal
  - `Measure content` — que retourne la mesure :
    - *Cell background color*
    - *Text color*
    - *Label only*
    - *Label + cell background*
    - *Label + text color*
    - *Label + badge*
  - `Badge shape` — forme du badge (cercle, carré, carré arrondi) — applicable aux modes badge uniquement.

#### Significativité — Améliorations
- **Icônes personnalisées** : champs `signifIconPlus` / `signifIconMinus` (base64) pour remplacer les triangles verts/rouges par défaut.
- **Niveau de regex** (`regexLevel`) : pour le test *Regular expression*, permet de cibler la colonne de référence à un niveau précis de la hiérarchie (*Same Level / Level 1 / Level 2*) et de cascader la comparaison sur cet axe.
- **Statut regex en temps réel** (`regexMatchStatus`) : champ en lecture seule affichant si la regex correspond à des colonnes existantes.
- **Couleurs et dégradés de fond de significativité** (carte `Significance colors`) :
  - *Positive — Background start / Gradient end*
  - *Negative — Background start / Gradient end*
  - `Gradient direction` : 6 directions disponibles (*Top to Bottom, Bottom to Top, Left to Right, Right to Left, Diagonal TL→BR, Diagonal BL→TR*)
- **Légende de significativité** (carte `Legend`) :
  - Interrupteur *Show legend* — affiche une légende sous le tableau
  - Contrôle de police de la légende
  - Labels personnalisables *Neutral / Positive / Negative* (mode fond/bordure)
  - Labels *Signif 1 / Signif 2* + suffixes dynamiques (mode icône/couleur de texte)

#### Format du tableau — Améliorations
- **Format des en-têtes de ligne** (`Row header format`) : nouvelle sous-carte avec interrupteur *Override row header style* — permet d'imposer une police, une couleur de fond et une couleur de texte indépendants du thème.
- **Format des cellules — override** (`Cell format`) :
  - Interrupteur *Override cell style* — force la police, fond et couleur de texte même en mode thème.
  - **Alignement du texte des cellules** : *Left / Center / Right*.
- **Niveaux d'en-têtes de colonnes visibles** (`Visible Header Levels`) : champ texte (ex. `1`, `1,3`) pour masquer certains niveaux d'en-têtes sans retirer les colonnes.
- **Alignement du titre de ligne** (`Row Title Text Alignment`) : *Left / Center / Right* pour la colonne de libellés de lignes.

### Chargement incrémental des données *(fetchMoreData)*
- La réduction des données côté lignes passe en mode **`window` (10 lignes)** — Power BI envoie les données par segments successifs et appelle `update()` à chaque segment.
- **Overlay de chargement animé** : spinner + libellé localisé *« Loading data… »* + compteur de cellules en temps réel pendant la phase de fetch.
- **Toast de confirmation** : notification discrète animée après la fin du rendu.
- Détection de troncature de matrice via le flag `isTruncated` (SDK) et `metadata.segment` (fallback).

---

## Version 3.5.15 — 21–23 avril 2026

### Corrections
- **Licence avec fallback** : correction du scénario où un utilisateur dispose d'une licence *free* AppSource mais fournit une clé de licence valide. La clé prend désormais correctement la priorité.
- **.gitignore** : mise à jour des exclusions.

---

## Version 3.5.14 — 21 avril 2026

### Corrections
- **Chargement illimité de cellules** (`fetchMoreData`) : correction du décompte et de l'affichage de l'overlay de chargement lors du chargement multi-segments.

---

## Version 3.5.12 — 9 avril 2026 *(«&nbsp;April version&nbsp;»)*

### Restructuration majeure
- Réorganisation complète du dépôt en monorepo :
  - `table/` — code source du visuel
  - `common/` — bibliothèque partagée (licence, boîte de dialogue *About*, utilitaires)
- Introduction d'une **suite de tests unitaires** (Jest) couvrant tous les modules principaux : `sdmCrossTable`, `signifHierarchical`, `rankingCalculator`, `maskerManager`, `reorderMatrixColumns`, `statHelper`, `filtersVerbalizer`…
- Fichiers de fixtures JSON pour les tests d'intégration (*frequency* et *mean*).
- Scripts de configuration multi-édition (`config.corp.ts`, `config.lic.ts`, `config.rno.ts`).

### Nouvelle bibliothèque commune (`sdmpbi-common`)
- `license.ts` — résolution de licence multi-source (AppSource, clé, thème PBI)
- `aboutDialog.ts` — boîte de dialogue *About* partagée
- `formatting.ts` — utilitaires de formatage partagés
- `analyticsFactories.ts` — usines pour analytics Power BI

---

## Version 3.3.x — Novembre 2025 – Janvier 2026 *(cycle de certification)*

### v3.3.15 — 20 janvier 2026
#### Corrections
- **MonoDimension** : correction du libellé d'en-tête de colonne quand une seule dimension est utilisée en colonne.
- **Panneau de paramètres** : correction d'une initialisation incorrecte causée par la vérification de la page d'accueil (*landing page*) au démarrage.

### v3.3.14 — 20 janvier 2026
- Ajout de la **langue roumaine** dans `pbiviz.json` (oubli de la v3.3.13).
- Nouveau GUID de visuel pour la mise à jour de certification.

### v3.3.13 — 23 décembre 2025
#### Corrections de la revue Microsoft (23/12/2025)
- **Événement `renderingFailed`** : correction et tests de l'émission de l'événement en cas d'erreur.
- **Vue de données vide** : restauration de la page d'accueil (*landing page*) quand aucune donnée n'est fournie, avec libellés internationalisés dans toutes les langues.
- **Tri — libellés avec virgules** : le parsing des champs *First rows* / *Last rows* ne cassait pas les libellés contenant des virgules.
- **Série « Unweighted base » en mode Moyenne** : l'option n'était pas persistée correctement dans le panneau.

#### Nouvelles fonctionnalités mineures
- **Tri des colonnes sur les libellés** : nouvelle option `Sort Columns on Labels` avec ordre ascendant/descendant et détection de nombres dans les libellés.
- **Langue roumaine** : ajout de `ro-RO/resources.resjson`.

### v3.3.12.9 — 16 novembre 2025 *(commit initial de certification)*
Premier envoi propre pour la certification Microsoft AppSource (version 2.0).  
Version de base intégrant :
- Tables de pourcentages (pctV, pctH, valeurs, indices) et tables de moyennes
- Tests de significativité (allColumns / complement / itemVsTotalBase / regex)
- Ranking (labels + dégradés de couleurs)
- Tri des lignes et des colonnes
- Seuils d'avertissement et de masquage
- Styles CSS (Custom, Modern, Classic, Scientific, Market Research) + 21 thèmes de couleurs
- Export Excel (Pro)
- Fusion de modalités, filtre DSL des colonnes
- Mode côte à côte (*Side by Side*)
- 10 langues : EN, FR, DE, ES, IT, PT-BR, AR, HE, ZH, RO
