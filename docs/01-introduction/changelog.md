---
sidebar_position: 3
---

# Changelog

Historique des évolutions et corrections depuis la version **3.3.x** (première version soumise à la certification Microsoft AppSource).

Depuis juillet 2026, la famille compte **deux visuels** : **CrossTable** (ce changelog historique) et le nouveau **CrossTable InCell Charts**, qui a son propre suivi de version ci-dessous.

---

## CrossTable InCell Charts — Gap Mode *(août 2026)*

Nouvelle carte de paramètres **Gap Mode** : remplace les colonnes d'un groupe (partitions) par 1 à 3 colonnes d'écart synthétiques (**Gap vs average**, **Gap vs 2nd**, **Gap vs 3rd**) portant l'écart `partition principale − référence`, sans toucher au moteur de calcul — une pure transformation de l'arbre de colonnes appliquée juste après la significativité. Voir [Gap Mode](../05-crosstable-charts/gap-mode.md).

- **Référence de l'écart vs moyenne** = le total du groupe de colonnes (le nœud parent), pas le complément.
- **Signif réutilisée** : chaque colonne d'écart emprunte son verdict à l'un des 3 tests de significativité existants (Signif 1 → *Gap vs average*, Signif 2/3 → *Gap vs 2nd/3rd*) ; un bandeau d'avertissement signale un test resté à *None*.
- **Présentation par colonne** (barre/nombre, couleurs, police, largeur…) éditée via une icône **⚙** dédiée, visible en mode Édition du rapport uniquement.
- Échelle de barre **propre à chaque colonne d'écart**, indépendante de l'échelle table-wide du Data Bar classique.

---

## CrossTable InCell Charts — nouveau visuel *(v1.1.x)*

**[CrossTable InCell Charts](../05-crosstable-charts/overview.md)** est un nouveau visuel compagnon, dérivé (*fork*) de CrossTable et publié séparément (GUID, licence et fiche Marketplace propres — voir [Editions](editions.md)).

### Ce qu'il reprend de CrossTable
Le même moteur de tableau croisé : rôles de données, séries pourcentage/moyenne, tests de significativité, totaux/sous-totaux, seuils (y compris *Cell Base*), tri, logos, styles et thèmes de couleur, licence.

### Ce qu'il retire
**Tile Mode**, **Cell Rules**, **Ranking**, l'alignement de texte par cellule et le zébrage — ces réglages restent exclusifs à CrossTable.

### Ce qu'il ajoute
- **Data Bar** — barre divergente par cellule (modes *Cell Value* / *Compare to Regex* / *Follow Signif 1-3*, orientation verticale ou horizontale, dégradé **Positive/Negative from → to**, bordure, style d'axe zéro, regroupement par série). Voir [Data Bar](../05-crosstable-charts/data-bar.md).
- **Data Line** — points reliés par cellule (même logique de valeur/échelle que Data Bar), marqueurs, regroupement, séparateurs de groupe. Voir [Data Line](../05-crosstable-charts/data-line.md).
- Overlay de significativité dédié aux graphiques (police/fond/marqueur/icône par test) ; le test **All Columns** (lettres A/B/C…) n'est pas proposé, une lettre n'ayant pas de sens sur une barre. Voir [Significance on Charts](../05-crosstable-charts/significance-on-charts.md).
- **Row height** (hauteur de ligne minimale) et **Value number format** (abréviation k/M/B) pour donner de la place aux graphiques et garder les libellés lisibles.

### Corrections récentes
- **Dégradé des barres** : les couleurs *Positive/Negative* de la carte *Data Bar* sont maintenant nommées *from* (couleur pleine, côté axe) avec deux nouveaux réglages *to* (couleur de fin, côté extrémité) pour un dégradé optionnel, plus une option **Border** pour délimiter la barre dans sa couleur *from*.
- **Alignement de l'axe zéro** : en orientation verticale, la largeur naturelle variable du libellé chiffré (signe, nombre de chiffres) décalait l'axe zéro d'une ligne à l'autre au sein d'une même colonne. L'axe est désormais aligné automatiquement, pixel pour pixel, sur toute la colonne.

---

## CrossTable — depuis le 15 juillet 2026 *(v3.6.18.9)*

> Section ajoutée pour la nouvelle documentation du visuel CrossTable InCell Charts ; ne couvre que les changements identifiés depuis la dernière mise à jour du changelog, pas un historique complet entre 3.5.28 et 3.6.18.

### Nouveautés
- **Seuils sur la base de cellule** (*Cell Base Value* / *Cell Unweighted Base Value*) pour les tables de moyennes — voir [Thresholds & Masking](../04-reference/thresholds.md#threshold-on--choosing-what-is-tested).

### Corrections
- **Thèmes Scientific / Market Research** : l'en-tête de colonnes (titres) ignorait le thème de couleur choisi et gardait toujours un fond sombre fixe, quel que soit le thème sélectionné dans [Table Styles](../04-reference/formating/formatting-styles.md). Corrigé pour suivre le thème comme les styles Modern et Classic.

### Autres
- Le développement du **Data Bar** a été retiré de CrossTable et poursuivi dans le nouveau visuel **CrossTable InCell Charts** (voir ci-dessus) — CrossTable reste focalisé sur le tableau croisé classique (Ranking, Cell Rules, Tile Mode).

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
