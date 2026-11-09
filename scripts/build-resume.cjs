const fs = require('node:fs');
const PDFDocument = require('pdfkit');
const {profile,experience,projects,education,awards,testingExperience}=JSON.parse(fs.readFileSync('resume/content.json','utf8'));
const output='resume/generated-draft.pdf';
const doc=new PDFDocument({size:'A4',margin:48,bufferPages:true,info:{Title:'Zahidul Islam — Resume',Author:profile.name}});
const stream=fs.createWriteStream(output);doc.pipe(stream);
const left=48,width=499.28,bottom=794,ink='#111111',heading='#24364C';let y=40;
function height(value,size=9,bold=false,w=width){doc.font(bold?'Helvetica-Bold':'Helvetica').fontSize(size);return doc.heightOfString(value,{width:w,lineGap:1.4})}
function ensure(h){if(y+h>bottom){doc.addPage();y=42}}
function text(value,{size=9,bold=false,color=ink,gap=4,x=left,w=width,link,align='left'}={}){
 const h=height(value,size,bold,w);ensure(h);doc.font(bold?'Helvetica-Bold':'Helvetica').fontSize(size).fillColor(color).text(value,x,y,{width:w,lineGap:1.4,align,link});y+=h+gap;
}
function section(title){ensure(40);y+=7;text(title.toUpperCase(),{size:10.5,bold:true,color:heading,gap:5})}
function bullet(value){ensure(height(value,9,false,width-9));const top=y;text(value,{x:left+9,w:width-9,gap:3});doc.font('Helvetica').fontSize(9).text('•',left,top,{lineBreak:false})}
text('MD. ZAHIDUL ISLAM',{size:16,bold:true,color:heading,align:'center',gap:4});
text(`${profile.email} | ${profile.phone} | github.com/ExpertZs`,{size:8.5,align:'center',gap:8});
// Invisible link annotation preserves the simple printed contact line.
doc.link(356,64,191,12,profile.github);
section('Summary');text(profile.summary);
section('Skills');
for(const [label,value] of [
 ['Languages','JavaScript, TypeScript, PHP, Ruby'],
 ['Frontend','React, Next.js, Tailwind CSS, Figma (implementation reference)'],
 ['Backend','Node.js, REST, GraphQL, WebSockets/SSE'],
 ['Databases','PostgreSQL, MySQL, Redis, Prisma, schema design, query optimization'],
 ['Auth / Security','JWT, OAuth 2.0, NextAuth/Auth.js'],
 ['Cloud / DevOps','AWS, Cloudflare, Docker, GitHub Actions, Nginx'],
 ['Testing','Vitest, Cypress, Playwright, API/UI automation, regression checks'],
 ['Performance / AI','Core Web Vitals, Lighthouse, RAG, LLM integration, Dify, agent workflows']
])text(`${label}: ${value}`,{size:8.5,gap:3});
section('Experience');
for(const job of experience){ensure(35+job.points.reduce((n,p)=>n+height(p,9,false,width-9)+3,0));text(`Software Engineer | ${job.company} | ${job.date}${job.location?' | '+job.location:''}`,{size:9,bold:true,gap:5});job.points.forEach(bullet);y+=4}
text(testingExperience,{size:9,gap:4});
section('Projects');
for(const p of projects){
 const label=p.displayName||p.name;
 const link=p.url?new URL(p.url).hostname+(new URL(p.url).pathname==='/'?'':new URL(p.url).pathname):'Private project';
 const title=`${label} | ${link}`;
 ensure(height(title,9,true)+height(p.description)+height('Stack: '+p.stack.join(', '),8.5)+16);
 text(title,{size:9,bold:true,link:p.url||undefined,gap:4});
 text(p.description,{size:9,gap:4});
 text('Stack: '+p.stack.join(', '),{size:8.5,gap:8});
}
ensure(115);section('Education');
for(const [degree,detail] of education)text(`${degree} | ${detail}`,{size:9,gap:5});
section('Certifications & awards');text(awards,{size:9});
const pages=doc.bufferedPageRange().count;if(pages!==2)throw new Error(`Expected 2 pages; got ${pages}`);
doc.end();stream.on('finish',()=>console.log(`Generated ${output} (${pages} pages, simple reference format)`));stream.on('error',error=>{throw error});
