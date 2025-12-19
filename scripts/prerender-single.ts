import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5000';
const OUTPUT_DIR = path.join(process.cwd(), 'dist', 'prerendered');

const pages = process.argv.slice(2);

async function prerenderPage(browser: any, route: string) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });
  // Set bypass header so prerender middleware returns fresh React content
  await page.setExtraHTTPHeaders({ 'X-Prerender-Bypass': 'true' });
  try {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
    // Wait for React to hydrate and lazy components to load
    await page.waitForFunction(() => {
      const main = document.querySelector('main');
      const h1 = document.querySelector('h1');
      return main && main.innerHTML.length > 1000 && h1;
    }, { timeout: 15000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 2000));
    const html = await page.content();
    const filePath = path.join(OUTPUT_DIR, route.replace(/^\//, ''), 'index.html');
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html);
    const linkCount = (html.match(/<a [^>]*href=/gi) || []).length;
    const h1Match = html.match(/<h1[^>]*>([^<]+)</i);
    console.log(`✅ ${route}: ${Math.round(html.length/1024)}KB, ${linkCount} links, H1: ${h1Match?.[1]?.slice(0,40) || 'none'}`);
  } catch (e: any) {
    console.log(`❌ ${route}: ${e.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  if (pages.length === 0) {
    console.log('Usage: npx tsx scripts/prerender-single.ts /path1 /path2 ...');
    return;
  }
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  for (const p of pages) {
    await prerenderPage(browser, p);
  }
  await browser.close();
}

main().catch(console.error);
