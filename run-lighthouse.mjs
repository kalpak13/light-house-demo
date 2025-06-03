import fs from 'fs';
import {launch} from 'chrome-launcher';
import lighthouse from 'lighthouse';

const chrome = await launch({chromeFlags: ['--headless']});
const options = {
  logLevel: 'info',
  output: 'html',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  port: chrome.port
};

const runnerResult = await lighthouse('http://localhost:3000', options);
fs.writeFileSync('lighthouse-report.html', runnerResult.report);
console.log('Lighthouse report generated: lighthouse-report.html');

await chrome.kill();
