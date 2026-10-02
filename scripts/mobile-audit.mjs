import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
// CI-only isolated mobile lab audit. No telemetry or visitor tracking is added.
const chrome = await launch({chromePath:chromium.executablePath(),chromeFlags:['--headless','--no-sandbox']});
try {
  const result = await lighthouse('http://127.0.0.1:4173/', {port:chrome.port,output:['html','json'],onlyCategories:['performance','accessibility','best-practices','seo']});
  await mkdir('audit-results',{recursive:true});
  await writeFile('audit-results/mobile.html',result.report[0]);
  await writeFile('audit-results/mobile.json',result.report[1]);
  console.log('::notice title=Mobile Lighthouse scores::'+JSON.stringify(Object.fromEntries(Object.entries(result.lhr.categories).map(([key,value])=>[key,value.score]))));
  console.log(JSON.stringify(Object.fromEntries(Object.entries(result.lhr.categories).map(([key,value])=>[key,value.score])),null,2));
} finally { await chrome.kill(); }
