import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import { XMLParser } from 'fast-xml-parser';

const SITE = 'http://localhost:3000';
const LANGS = ['en'];
const TMP = 'pdf/tmp';
const OUT = 'pdf';

fs.mkdirSync(TMP, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const parser = new XMLParser();

async function getUrls(lang) {
  const xml = fs.readFileSync(`build/sitemap.xml`, 'utf8');
  const data = parser.parse(xml);
  return data.urlset.url
    .map(u => u.loc)
    .filter(u => u.includes(`/docs`))
    .map(url => {
      // Convertir les URLs de production en URLs locales
      const parsedUrl = new URL(url);
      return `${SITE}${parsedUrl.pathname}`;
    });
}

// Crée un slug safe pour les ancres HTML
function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

async function generateCombinedPDF(lang) {
  console.log('🚀 Launching browser chromium...');
  const browser = await chromium.launch();
  const urls = await getUrls(lang);
  
  // Carte URL -> ancre pour les liens internes
  const urlToAnchor = new Map();
  const contents = [];
  
  console.log(`📥 Loading ${urls.length} pages...`);
  
  // Étape 1 : Charger toutes les pages et extraire leur contenu
  for (const url of urls) {
    console.log(`  📄 Loading ${url}...`);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Extraire le titre H1
    const title = await page.$eval('h1', h => h.textContent.trim()).catch(() => 'Sans titre');
    const anchor = slugify(title);
    
    urlToAnchor.set(url, anchor);
    
    // Extraire le contenu de l'article/main
    const bodyContent = await page.evaluate(() => {
      const article = document.querySelector('article') || document.querySelector('main');
      return article ? article.innerHTML : document.body.innerHTML;
    });
    
    contents.push({ title, anchor, bodyContent, url });
    await page.close();
  }
  
  console.log(`🔗 Replacing internal links...`);
  
  // Étape 2 : Remplacer les liens internes par des ancres
  for (const content of contents) {
    let html = content.bodyContent;
    
    for (const [targetUrl, targetAnchor] of urlToAnchor) {
      // Remplacer les liens absolus et relatifs
      const urlPattern = new RegExp(targetUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      html = html.replace(urlPattern, `#${targetAnchor}`);
      
      // Aussi gérer les liens relatifs du type /docs/...
      const relativeUrl = new URL(targetUrl).pathname;
      const relativePattern = new RegExp(`href="${relativeUrl}"`, 'g');
      html = html.replace(relativePattern, `href="#${targetAnchor}"`);
    }
    
    content.processedHtml = html;
  }
  
  console.log(`📝 Loading first page with full styles...`);
  
  // Étape 3 : Charger la PREMIÈRE page complètement (avec tous les styles)
  const page = await browser.newPage();
  await page.goto(urls[0], { waitUntil: 'networkidle' });
  
  // Appliquer le CSS PDF
  await page.addStyleTag({ path: 'static/pdf.css' });
  
  console.log(`📝 Injecting other pages into the first one...`);
  
  // Étape 4 : Injecter le contenu des autres pages dans la première
  await page.evaluate(({ contentsToInject, urlToAnchorMap, siteUrl }) => {
    // Ajouter la balise base pour les images
    const baseTag = document.createElement('base');
    baseTag.href = siteUrl;
    document.head.insertBefore(baseTag, document.head.firstChild);
    
    // Trouver le conteneur principal (article ou main)
    const mainContainer = document.querySelector('article') || document.querySelector('main');
    if (!mainContainer) return;
    
    // Remplacer les liens dans la première page aussi
    const links = mainContainer.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      for (const [url, anchor] of Object.entries(urlToAnchorMap)) {
        if (href === url || href === new URL(url).pathname) {
          link.setAttribute('href', `#${anchor}`);
        }
      }
    });
    
    // Ajouter un style pour les sauts de page
    const style = document.createElement('style');
    style.textContent = `
      .chapter-separator { 
        page-break-before: always; 
        margin-top: 40px;
      }
    `;
    document.head.appendChild(style);
    
    // Wrapper la première page avec son ancre
    const firstAnchor = contentsToInject[0].anchor;
    const wrapper = document.createElement('div');
    wrapper.id = firstAnchor;
    wrapper.className = 'chapter';
    while (mainContainer.firstChild) {
      wrapper.appendChild(mainContainer.firstChild);
    }
    mainContainer.appendChild(wrapper);
    
    // Injecter les autres pages
    for (let i = 1; i < contentsToInject.length; i++) {
      const content = contentsToInject[i];
      const chapterDiv = document.createElement('div');
      chapterDiv.id = content.anchor;
      chapterDiv.className = 'chapter chapter-separator';
      chapterDiv.innerHTML = `<h1>${content.title}</h1>${content.processedHtml}`;
      mainContainer.appendChild(chapterDiv);
    }
  }, { 
    contentsToInject: contents, 
    urlToAnchorMap: Object.fromEntries(urlToAnchor),
    siteUrl: SITE
  });
  
  // Attendre que les images se chargent (timeout de 10 secondes)
  console.log(`🖼️  Waiting for images to load (10s delay)...`);
  await page.waitForTimeout(10000);
  
  // Sauver le HTML final pour debug
  const finalHtml = await page.content();
  fs.writeFileSync(`${TMP}/combined-${lang}.html`, finalHtml);
  
  console.log(`📄 Generating unified PDF...`);
  
  // Générer le PDF unique avec outline automatique
  await page.pdf({
    path: `${OUT}/documentation-${lang}.pdf`,
    format: 'A4',
    outline: true, // Génère automatiquement l'outline depuis les H1, H2, etc.
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div></div>`,
    footerTemplate: `
      <div style="font-size:10px;width:100%;text-align:center;padding-top:5px;">
        <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `,
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
  });
  
  await page.close();
  await browser.close();
}

async function generatePdfFromHtml(lang) {
  console.log('🚀 Launching browser for PDF generation...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.resolve(`${TMP}/combined-${lang}.html`);
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`HTML file not found: ${htmlPath}. Run without --toPdfOnly first.`);
  }
  
  console.log(`📂 Loading existing HTML from ${htmlPath}...`);
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
  
  // Appliquer le CSS PDF
  await page.addStyleTag({ path: 'static/pdf.css' });
  
  // Attendre que les images se chargent
  console.log(`🖼️  Waiting for images to load (5s delay)...`);
  await page.waitForTimeout(5000);
  
  console.log(`📄 Generating PDF...`);
  
  await page.pdf({
    path: `${OUT}/documentation-${lang}.pdf`,
    format: 'A4',
    outline: true,
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div></div>`,
    footerTemplate: `
      <div style="font-size:10px;width:100%;text-align:center;padding-top:5px;">
        <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `,
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
  });
  
  await page.close();
  await browser.close();
}

(async () => {
  const toPdfOnly = process.argv.includes('--toPdfOnly');
  
  for (const lang of LANGS) {
    console.log(`📘 ${lang}`);
    
    if (toPdfOnly) {
      console.log('⚡ Mode --toPdfOnly: using existing HTML...');
      await generatePdfFromHtml(lang);
    } else {
      await generateCombinedPDF(lang);
    }
    
    console.log(`✅ pdf/documentation-${lang}.pdf`);
  }
})();
