import { chromium } from 'playwright';
import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';
import { PDFDocument } from 'pdf-lib';

const SITE = 'http://localhost:3000';
const OUTPUT_DIR = 'pdf';
const LANGS = ['en']; // ['fr', 'en']; // adapte si besoin

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const parser = new XMLParser();

async function getDocUrls(lang) {
  //const xml = fs.readFileSync(`build/${lang}/sitemap.xml`, 'utf8');
  const xml = fs.readFileSync(`build/sitemap.xml`, 'utf8');
  const parsed = parser.parse(xml);
  return parsed.urlset.url
    .map(u => u.loc)
    //.filter(u => u.includes(`/${lang}/docs`));
    .filter(u => u.includes(`/docs`));
}

async function generatePdf(lang) {
  const browser = await chromium.launch();

  const collector = await browser.newPage();
  const worker = await browser.newPage();

  // Page "livre"
  await collector.setContent(`
    <html>
      <head>
        <link rel="stylesheet" href="/pdf.css">
      </head>
      <body></body>
    </html>
  `);

  // Cover
  await collector.evaluate(({ lang }) => {
    const cover = document.createElement('div');
    cover.className = 'cover';
    cover.innerHTML = `
      <h1>Documentation</h1>
      <p>Langue : ${lang.toUpperCase()}</p>
    `;
    document.body.appendChild(cover);
  }, { lang });

  const urls = await getDocUrls(lang);
  var i = 0;

  for (const url of urls) {
    console.log(`→ ${url}`);
    i++;

    /*await worker.goto(url, { waitUntil: 'networkidle' });
    await worker.waitForSelector('article');

    const articleHTML = await worker.$eval(
      'article',
      el => el.outerHTML
    );

    await collector.evaluate(html => {
      const wrapper = document.createElement('section');
      wrapper.innerHTML = html;
      document.body.appendChild(wrapper);
    }, articleHTML);*/
      const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({ path: 'static/pdf.css' });

  await page.pdf({
    path: `pdf/page-${i}.pdf`,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="font-size:8px;text-align:center;">Page <span class="pageNumber"></span></div>',
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
  });

  await page.close();
  }

  const pdfPath = `${OUTPUT_DIR}/documentation-${lang}.pdf`;

  await collector.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size:8px;width:100%;text-align:center;">
        Documentation ${lang.toUpperCase()}
      </div>
    `,
    footerTemplate: `
      <div style="font-size:8px;width:100%;text-align:center;">
        Page <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `,
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '15mm',
      right: '15mm',
    },
  });

  await browser.close();
  console.log(`✅ PDF généré : ${pdfPath}`);
}

(async () => {
  for (const lang of LANGS) {
    await generatePdf(lang);
  }
})();
