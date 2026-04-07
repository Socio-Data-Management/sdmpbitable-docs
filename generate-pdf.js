const puppeteer = require('puppeteer');
const fs = require('fs');

// Liste des pages de la section Reference
const pages = [
    'http://localhost:3000/sdmpbitable-docs/docs/reference/table-content',
    'http://localhost:3000/sdmpbitable-docs/docs/reference/sorting',
    'http://localhost:3000/sdmpbitable-docs/docs/reference/ranking',
    'http://localhost:3000/sdmpbitable-docs/docs/reference/significance',
    'http://localhost:3000/sdmpbitable-docs/docs/reference/totals',
    'http://localhost:3000/sdmpbitable-docs/docs/reference/percentage-series',
    'http://localhost:3000/sdmpbitable-docs/docs/reference/mean-series',
    'http://localhost:3000/sdmpbitable-docs/docs/reference/thresholds',
    'http://localhost:3000/sdmpbitable-docs/docs/reference/filtering'
];

(async () => {
    console.log('Génération du PDF Reference avec Puppeteer...');
    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Créer un HTML combiné
    let combinedHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Reference Documentation</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .page-break { page-break-after: always; }
            article { max-width: 800px; margin: 0 auto; padding: 20px; }
            h1, h2, h3 { color: #333; margin-top: 20px; }
            h1 { font-size: 28px; border-bottom: 2px solid #333; padding-bottom: 10px; }
            h2 { font-size: 22px; }
            h3 { font-size: 18px; }
            code { background-color: #f4f4f4; padding: 2px 5px; border-radius: 3px; font-family: 'Courier New', monospace; }
            pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
            img { max-width: 100%; height: auto; }
            
            /* Table des matières */
            .toc { 
                background: #f9f9f9; 
                border: 1px solid #ddd; 
                padding: 20px; 
                margin-bottom: 30px;
                page-break-after: always;
            }
            .toc h1 { border-bottom: 2px solid #333; margin-bottom: 15px; }
            .toc ul { list-style: none; padding-left: 0; }
            .toc li { margin: 8px 0; }
            .toc a { color: #0066cc; text-decoration: none; }
            
            /* Admonitions (info, tip, warning, etc.) */
            .theme-admonition {
                margin: 15px 0;
                padding: 12px 15px;
                border-left: 4px solid;
                background-color: #f8f9fa;
                border-radius: 4px;
            }
            .theme-admonition-tip { border-color: #00a400; background-color: #e6f4ea; }
            .theme-admonition-info { border-color: #1976d2; background-color: #e3f2fd; }
            .theme-admonition-warning { border-color: #ed6c02; background-color: #fff4e5; }
            .theme-admonition-danger { border-color: #d32f2f; background-color: #ffebee; }
            
            /* Cacher ou réduire les icônes des admonitions */
            .admonitionIcon_Rf37 svg,
            .theme-admonition svg {
                width: 20px !important;
                height: 20px !important;
                display: inline-block;
                vertical-align: middle;
                margin-right: 8px;
            }
            
            .admonitionHeading_Gvgb {
                font-weight: bold;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
            }
            
            /* Tables */
            table { border-collapse: collapse; width: 100%; margin: 15px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; font-weight: bold; }
        </style>
    </head>
    <body>
    <div class="toc">
        <h1>Table des matières</h1>
        <ul>
            <li><a href="#table-content">1. Table Contents</a></li>
            <li><a href="#sorting">2. Sorting & Ordering</a></li>
            <li><a href="#ranking">3. Ranking</a></li>
            <li><a href="#significance">4. Significance Testing</a></li>
            <li><a href="#totals">5. Totals & Subtotals</a></li>
            <li><a href="#percentage-series">6. Percentage Series Configuration</a></li>
            <li><a href="#mean-series">7. Mean Series Configuration</a></li>
            <li><a href="#thresholds">8. Thresholds & Masking</a></li>
            <li><a href="#filtering">9. Filtering & Selection</a></li>
        </ul>
    </div>`;
    
    const pageIds = ['table-content', 'sorting', 'ranking', 'significance', 'totals', 
                     'percentage-series', 'mean-series', 'thresholds', 'filtering'];
    
    for (let i = 0; i < pages.length; i++) {
        console.log(`Récupération de la page ${i + 1}/${pages.length}: ${pages[i]}`);
        await page.goto(pages[i], { waitUntil: 'networkidle2' });
        
        // Extraire le contenu de l'article
        const content = await page.evaluate((pageId) => {
            const article = document.querySelector('article');
            if (article) {
                // Nettoyer les éléments indésirables
                const breadcrumbs = article.querySelector('.breadcrumbs');
                if (breadcrumbs) breadcrumbs.remove();
                
                const editLink = article.querySelector('.theme-edit-this-page');
                if (editLink) editLink.remove();
                
                const tocMobile = article.querySelector('.tocMobile_ITEo');
                if (tocMobile) tocMobile.remove();
                
                // Réduire la taille des icônes SVG dans les admonitions
                const svgIcons = article.querySelectorAll('.admonitionIcon_Rf37 svg, .theme-admonition svg');
                svgIcons.forEach(svg => {
                    svg.setAttribute('width', '20');
                    svg.setAttribute('height', '20');
                    svg.style.width = '20px';
                    svg.style.height = '20px';
                });
                
                // Corriger les chemins des images
                const images = article.querySelectorAll('img');
                images.forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && src.startsWith('/sdmpbitable-docs/')) {
                        // Convertir en URL absolue
                        img.setAttribute('src', 'http://localhost:3000' + src);
                    } else if (src && src.startsWith('data:image')) {
                        // Les images en base64 sont OK
                    } else if (src && !src.startsWith('http')) {
                        // Chemin relatif
                        img.setAttribute('src', 'http://localhost:3000/sdmpbitable-docs/' + src);
                    }
                });
                
                // Ajouter un ID à l'article
                const wrapper = document.createElement('div');
                wrapper.id = pageId;
                wrapper.innerHTML = article.innerHTML;
                return wrapper.outerHTML;
            }
            return '';
        }, pageIds[i]);
        
        combinedHTML += `<article>${content}</article>`;
        
        // Ajouter un saut de page sauf pour la dernière page
        if (i < pages.length - 1) {
            combinedHTML += '<div class="page-break"></div>';
        }
    }
    
    combinedHTML += '</body></html>';
    
    // Écrire le HTML temporaire
    fs.writeFileSync('temp-reference.html', combinedHTML);
    
    // Générer le PDF
    console.log('Génération du PDF...');
    await page.goto(`file://${__dirname}/temp-reference.html`, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Attendre un peu pour que les images se chargent
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await page.pdf({
        path: 'reference.pdf',
        format: 'A4',
        margin: {
            top: '20mm',
            right: '15mm',
            bottom: '20mm',
            left: '15mm'
        },
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;"><span class="title"></span></div>',
        footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
    });
    
    // Nettoyer
    // fs.unlinkSync('temp-reference.html'); // Gardé pour debug
    
    await browser.close();
    console.log('✅ PDF généré avec succès: reference.pdf');
    console.log('   Fichier HTML temporaire conservé: temp-reference.html (pour debug)');
})();
