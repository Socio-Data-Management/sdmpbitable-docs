---
sidebar_position: 3
---

# Changelog

Historique des évolutions et corrections depuis la version **3.3.x** (première version soumise à la certification Microsoft AppSource).

Depuis juillet 2026, la famille compte **deux visuels** : **CrossTable** (ce changelog historique) et le nouveau **CrossTable InCell Charts**, qui a son propre suivi de version ci-dessous.

---

## CrossTable InCell Charts — Couleurs de séries & légende étendues au Data Bar *(août 2026)*

Le color-picker natif par série et la carte **Legend**, jusqu'ici réservés au [Data Line groupé](../05-crosstable-charts/data-line.md#colors) (voir l'entrée « Couleurs de séries & légende » plus bas dans ce changelog), s'appliquent désormais de la même façon au **Data Bar** groupé — même mécanisme, repris du visuel sœur `linechart`. Voir [Data Bar → Colors](../05-crosstable-charts/data-bar.md#colors) et [Data Bar → Legend](../05-crosstable-charts/data-bar.md#legend).

- **Carte *Data Bar* → groupe *Bar colors*** : affiche désormais une pastille de couleur par catégorie distincte quand **Group into one chart** est actif (à la place des dégradés positif/négatif/neutre, masqués dans ce mode) — personnalisable individuellement, persisté comme n'importe quel réglage de mise en forme.
- **Nouvelle carte *Legend* sous *Data Bar*** : bascule **Show** / **Sort on label** propre à Data Bar. Auparavant ce réglage n'existait que sous *Data Line* et pilotait la légende du Data Bar groupé par ricochet — invisible et inaccessible dès que *Data Line* était éteint. Data Bar et Data Line ont maintenant chacun leur propre carte *Legend*, sans réglage partagé.
- La couleur personnalisée par catégorie est lue sur les deux objets de persistance (`dataBarSettingsCard.dataBarSeriesColor` / `dataLineSettingsCard.dataLineSeriesColor`) : le color-picker qui s'affiche dépend uniquement du mode actif (Data Bar et Data Line restent exclusifs), chacun avec son propre stockage.

---

## CrossTable InCell Charts — Tooltip sur les cellules fusionnées « Group into one chart » *(août 2026)*

Correction (remontée en test) — le tooltip natif ne fonctionnait pas du tout sur les cellules fusionnées en mode [Group into one chart](../05-crosstable-charts/data-bar.md#grouping) (Data Bar et Data Line groupés, quelle que soit l'orientation) : `renderGroupedColumnsCell` construit son `<td>` en dehors du chemin normal (`renderCell`), seul endroit où une cellule était jusque-là enregistrée pour la délégation d'événements du tooltip — la cellule fusionnée restait donc invisible pour lui. Le survol d'une cellule fusionnée affiche désormais un jeu de lignes par série regroupée (même contenu qu'une cellule ordinaire, répété par série). Voir [Cell Tooltip](../04-reference/tooltip.md#scope).

---

## CrossTable InCell Charts — Nouveau test « Partition Gap » pour le Gap Mode *(août 2026)*

Refonte de l'attribution des tests de significativité aux colonnes du [Gap Mode](../05-crosstable-charts/gap-mode.md) : ce n'était auparavant qu'un mapping fixe par numéro de slot (Signif 1 → Gap vs average, Signif 2 → Gap vs 2nd, Signif 3 → Gap vs 3rd), qui ne permettait ni d'empiler deux tests sur *Gap vs average*, ni de tester réellement « main vs 2e/3e partition ». Voir [Significance drives color](../05-crosstable-charts/gap-mode.md#significance-drives-color-the-scale-is-computed-per-column).

- **Gap vs average** est désormais décorée par **N'IMPORTE LEQUEL** des 3 tests configuré avec un type autre que le nouveau *Partition Gap*, et **plusieurs peuvent s'empiler simultanément** — icônes/marqueurs cumulés, fond/police au premier test actif — exactement comme sur une cellule ordinaire.
- **Nouveau type de test : Partition Gap.** Contrairement aux autres types, il ne compare rien sur l'arbre courant : il calcule fraîchement *main vs Second partition* et *main vs Third partition* (mêmes réglages Significance level / Signif. Var. Method que les autres tests) et alimente **uniquement** *Gap vs 2nd*/*Gap vs 3rd*. Sans Gap Mode actif, ce type ne fait rien.
- Le bandeau d'avertissement (test manquant) distingue maintenant les deux cas, et signale aussi le cas où *Partition Gap* est réglé sur plus d'un test à la fois (seul le premier compte).
- **Correction (remontée en test) — verdict jamais négatif** : `computeSignifPercent`/`computeSignifMean` renvoient l'enum `isSignif` (0/1/2), pas la convention -1/0/1 lue par `signif[]`/le rendu ; la conversion manquait pour *Partition Gap*, si bien qu'un écart où la partition principale est **inférieure** à la référence ne s'affichait jamais comme significatif (verdict "2" ne correspondant à rien côté rendu). *Gap vs average* n'était pas concernée (verdicts recopiés, déjà convertis en amont par le moteur générique).
- **Correction (remontée en test) — la « vue » ne pilotait rien en rendu Number** : sur *Gap vs 2nd*/*Gap vs 3rd* en rendu **Number**, seule la couleur de police changeait, quelle que soit la **Significance view option** choisie pour le test *Partition Gap* (fond, bordure, icône, marker sans effet). En rendu **Number**, c'est désormais cette vue qui décide de tout — comme sur une cellule ordinaire ; en rendu **Bar**/**Bar only**, la barre continue de suivre le verdict indépendamment de la vue (« Follow Signif Rule », comme un Data Bar classique), les autres vues s'ajoutant par-dessus.
- **Correction — icône superposée au chiffre, écarts négatifs rognés** : sur un Data Bar en placement de valeur « near » (collé au bout de la barre, le défaut), le libellé et une décoration signif (icône/marker) partageaient le même point d'ancrage. Un premier correctif décalait l'icône sans agrandir la marge disponible : elle atterrissait alors hors de la cellule (rognée par le `overflow:hidden` du conteneur), visible seulement côté écarts négatifs car la marge de droite avait par ailleurs assez de mou. La piste réserve maintenant la place des DEUX (libellé + décorations empilées), mesurée comme pour l'alignement des libellés de colonne.
- **Ajout — Border color fonctionne enfin sur le Gap Mode** : ignorée sur un Data Bar/Data Line ordinaire (pas de boîte de cellule sur un simple trait ou une barre), la vue **Border color** colore désormais la bordure de la cellule sur les colonnes du [Gap Mode](../05-crosstable-charts/gap-mode.md), en rendu **Bar** comme **Number**.
- **Correction (remontée en test) — Border color sans effet visible malgré un style correct** : quand **Show Borders** est décoché, une règle de feuille de style force `border: none !important` sur toute cellule ne portant pas les classes internes `sigBordPlus`/`sigBordMinus` — or une cellule de Gap Mode porte sa bordure en style EN LIGNE (pour utiliser la couleur propre à la colonne, pas la couleur globale de la carte Significance), donc sans ces classes. Le style en ligne était bien posé (visible dans le HTML) mais perdait face à cette règle `!important`. Corrigé en posant la bordure en ligne avec `!important` elle aussi.
- **Ajout — Gap Mode impose désormais Data Bar** : le rendu **Bar**/**Bar only** de Gap Mode délègue entièrement à Data Bar (couleurs, épaisseur, axe…) ; l'éteindre pendant que Gap Mode est actif produisait un rendu incohérent, faute de réglages. Les deux toggles sont maintenant synchronisés (même mécanisme que l'exclusivité Data Bar / Data Line) : activer **Gap mode** active **Data Bar** s'il ne l'était pas (et éteint Data Line, exclusif avec Data Bar) ; désactiver **Data Bar** pendant que Gap Mode est actif désactive Gap Mode avec lui. Voir [Gap Mode requires Data Bar](../05-crosstable-charts/gap-mode.md#overview).

---

## CrossTable & CrossTable InCell Charts — Corrections du Tooltip de cellule *(août 2026)*

Trois corrections sur le [Tooltip de cellule](../04-reference/tooltip.md) introduit ce mois-ci, remontées en test :

- **Précision alignée sur l'affichage** : `Value`/`Base`/`Unweighted Base`/`Compared base` suivaient un arrondi fixe du tooltip, sans rapport avec la précision réellement configurée. Ils suivent maintenant la même convention que le rendu des cellules (0 décimale en table de %, précision de la carte *Table options* en table de moyenne).
- **Compared base tronqué à un seul test** : avec plusieurs tests de significativité actifs sur une cellule, seul le premier résultat non nul s'affichait. Corrigé pour lister un `Compared base N` par test actif, avec le **vrai numéro de test** (Significance 1/2/3) — ce même bug d'indexation affectait discrètement `Confidence level N` (un test 1 vide décalait le numéro affiché sur le résultat du test suivant), corrigé au passage.
- **CrossTable InCell Charts — cellules du [Gap Mode](../05-crosstable-charts/gap-mode.md)** : une colonne d'écart ne porte plus de valeur ordinaire, seulement l'écart lui-même (principale − référence) ; sur une table de %, la grandeur qui pilote réellement la barre est l'écart de `%v`, pas un écart de valeurs brutes — le tooltip affichait ce dernier, sans rapport avec la barre. La ligne motrice (`%v` ou `Value` selon le type de table) est désormais remplacée par un trio **Gap / Raw / Reference**, à la précision propre de la colonne d'écart (réglage `Precision` de l'éditeur ⚙), pour pouvoir vérifier `Gap = Raw − Reference`.

---

## CrossTable & CrossTable InCell Charts — Tests « Previous visible column » et « Previous row » *(août 2026)*

Deux nouveaux types de test de significativité, disponibles sur les deux visuels. Voir [Significance Testing](../04-reference/significance.md#previous-visible-column) (et [Significance on Charts](../05-crosstable-charts/significance-on-charts.md) pour la variante graphique).

- **Previous visible column** : compare chaque colonne à la colonne **visible** précédente, au même niveau de profondeur — en sautant les colonnes cachées par un [Mask Pattern](../04-reference/table-content.md#masking), branche entière comprise. Permet une comparaison "période précédente" propre même quand la plupart des colonnes sont masquées (ex. une seule marque visible par année : 2022 se compare à 2021, pas à un autre item masqué de la même année).
- **Previous row** : compare chaque ligne à la ligne précédente, même colonne, à tous les niveaux — avec la base **propre à chaque ligne** (cohérent avec le réglage [Rows are repeated items](../04-reference/understanding-bases.md#the-rows-are-repeated-items-toggle)), symétrique de *All Columns* qui utilise le total propre de chaque colonne. Les lignes de sous-total natif sont automatiquement sautées, comme cible et comme référence.
- Le masquage des colonnes est désormais calculé **avant** l'exécution des tests de significativité (et non plus seulement au rendu de la grille), pour que *Previous visible column* connaisse l'état masqué/visible à temps.

---

## CrossTable InCell Charts — Tooltip de cellule *(août 2026)*

Portage du **Tooltip de cellule** (voir entrée CrossTable ci-dessous) sur CrossTable InCell Charts — mêmes settings, même contenu, même comportement. Voir [Cell Tooltip](../04-reference/tooltip.md).

- Le moteur de signif de ce visuel diverge déjà de celui de CrossTable (champ additif `signifDelta[]` pour les barres « Follow Signif Rule », pas de mode *All Columns*) ; `signifConfidence[]` et la base comparée s'y ajoutent en parallèle, sans toucher à `signifDelta[]` ni au seuillage existant.
- **Limite connue** : quand [Data Bar / Data Line « Group into one chart »](../05-crosstable-charts/data-bar.md) fusionne plusieurs séries dans une seule cellule (`colspan`), le tooltip ne couvre pas encore cette cellule fusionnée — seules les cellules "une cellule = une barre/un point" (y compris Data Bar/Data Line non groupés) ont le tooltip complet.

---

## CrossTable — Tooltip de cellule *(août 2026)*

Nouvelle carte de paramètres **Tooltip** : au survol d'une cellule, une infobulle native Power BI peut afficher les niveaux de ligne/colonne, la valeur, %V/%H, l'indice, la base pondérée et non pondérée — des grandeurs déjà systématiquement calculées par cellule mais pas nécessairement affichées dans le tableau. Voir [Cell Tooltip](../04-reference/tooltip.md).

- **Base comparée** : la base de l'autre côté de la comparaison statistique de la cellule (complément, total, colonne de référence regex…), absente en mode *All Columns* (comparaison multi-colonnes sans base unique).
- **Niveau de confiance de signif. continu** : nouveau champ additif `signifConfidence[]`, en parallèle du marqueur passant/échouant existant (`signif[]`, inchangé) — dérivé du même z/t déjà calculé par le test statistique, converti en % de confiance signé (ex. `+92.5%`). Indépendant du seuil choisi dans **Significance level** (90/95/99%), qui ne pilote toujours que le marqueur.
- Rendu via `host.tooltipService` (infobulle native, thème et positionnement gérés par Power BI), câblée par délégation d'événements sur le `<table>` — aucun listener par cellule.
- Porté depuis sur CrossTable InCell Charts (voir entrée ci-dessus).

---

## CrossTable InCell Charts — Couleurs de séries & légende *(août 2026)*

Refonte du coloriage des séries en mode **Group into one chart** (Data Bar et Data Line) : chaque catégorie (ex. Qtr1, Qtr2…) garde désormais la **même couleur partout**, même si elle n'apparaît pas dans tous les groupes de colonnes — auparavant la couleur dépendait de la position de la catégorie *dans le groupe en cours*, ce qui la faisait varier d'un groupe à l'autre dès que le nombre de catégories différait (ex. une année incomplète face à une année complète). Voir [Data Line → Colors](../05-crosstable-charts/data-line.md#colors).

- **Couleur par défaut par nom** : chaque catégorie reçoit sa couleur depuis la palette du rapport (thème Power BI), assignée par identité et non par position.
- **Color-picker natif par série** : dans le panneau de format, la carte *Data Line* → groupe **Series colors** affiche désormais une pastille de couleur par catégorie distincte quand le groupement est actif — personnalisable individuellement, comme n'importe quel réglage de mise en forme.
- **Nouvelle carte Legend** (*Data Line*) : bascule **Show** (afficher/masquer la légende, activée par défaut) et **Sort on label** (tri alphabétique, désactivé par défaut — l'ordre reste celui de Power BI/des données). Contrôle aussi la légende du Data Bar groupé, qui n'a pas de carte dédiée.
- **Réorganisation** : les couleurs de marqueur par signe (positif/négatif/neutre), qui ne concernent que le mode ligne unique non groupée, ont leur propre carte **Marker colors**, séparée de **Series colors**.

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
