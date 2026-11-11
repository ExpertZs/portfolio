const assert = require('node:assert/strict');
(async () => {
 const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
 for (const route of ['/','/about','/skills','/experience','/projects','/services','/match','/ask','/contact','/Zahidul_Islam_Resume.pdf','/images/zahidul_c.png','/images/zahidul_f.png','/api/ai/search?q=Raggie','/robots.txt','/sitemap.xml']) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
 }
 assert.equal((await fetch(base + '/missing-page')).status, 404);
 for (const [route, body] of [
  ['/api/ai', {mode:'ask', input:'What is his experience?'}],
  ['/api/contact', {name:'Test Visitor', email:'test@example.com', message:'Local smoke test message.'}]
 ]) {
  const response = await fetch(base + route, {method:'POST', headers:{'Content-Type':'application/json', Origin:base}, body:JSON.stringify(body)});
  assert.equal(response.status, 200, route);
  const result = await response.json();
  if (route === '/api/ai') assert.match(result.answer, /Brand Cloud/);
  else assert.match(result.draft, /^mailto:/);
 }
 console.log('HTTP checks passed: all pages, static assets, metadata routes, 404, AI fallback and contact draft.');
})().catch(error => { console.error(error); process.exitCode = 1; });
