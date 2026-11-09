const fs=require('node:fs');
const file='coverage/coverage-summary.json';
if(!fs.existsSync(file))process.exit(0);
const {total}=JSON.parse(fs.readFileSync(file,'utf8'));
const lines=['## Portfolio API and utility coverage','', '| Metric | Covered | Total | Coverage |','|---|---:|---:|---:|'];
for(const metric of ['statements','branches','functions','lines']){const data=total[metric];lines.push(`| ${metric} | ${data.covered} | ${data.total} | ${data.pct}% |`)}
lines.push('','Scope: configured server routes, assistant logic, and request utilities. Browser reports and the generated CV are available in workflow artifacts.');
if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,lines.join('\n')+'\n');else console.log(lines.join('\n'));
