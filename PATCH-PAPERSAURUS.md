# Instructions pour patcher docusaurus-plugin-papersaurus

## 1. Installer patch-package
```bash
npm install --save-dev patch-package
```

## 2. Modifier le fichier dans node_modules
Modifier: `node_modules/docusaurus-plugin-papersaurus/dist/config.js`

Remplacer:
```javascript
const siteConfig = loadConfig(`${CWD}/docusaurus.config.js`);
```

Par:
```javascript
const fs = require('fs');
let configPath = `${CWD}/docusaurus.config.js`;
if (!fs.existsSync(configPath)) {
  configPath = `${CWD}/docusaurus.config.ts`;
}
const siteConfig = loadConfig(configPath);
```

## 3. Créer le patch
```bash
npx patch-package docusaurus-plugin-papersaurus
```

## 4. Ajouter au package.json
```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

Le patch sera automatiquement appliqué après chaque `npm install`.
