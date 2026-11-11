const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, file) => module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);
const {profile,experience,projects,skills,testingExperience,training}=require('../lib/data.ts');
const core=['JavaScript','TypeScript','React','Next.js','Tailwind CSS','Node.js','REST','Prisma','PostgreSQL','MySQL'];
const content={testingExperience,profile,experience,projects,core,skills,education:[['MSc, Computer Science — Jahangirnagar University','2019–2021 · CGPA 3.60/4.00'],['BSc, Computer Science & Engineering — Uttara University','2015–2018 · CGPA 3.88/4.00'],...training.map(t=>[t.degree+' — '+t.institution,t.year])],awards:'ITEE FE — BD-ITEC, 2022 · Vice-Chancellor Award — Uttara University'};
fs.writeFileSync('resume/content.json',JSON.stringify(content,null,2)+'\n');
