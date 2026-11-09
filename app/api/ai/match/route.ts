import { POST as answer } from '../route';
import { readBody } from '@/lib/server';
import { profile, skills } from '@/lib/data';
import { presentationProjects } from '@/lib/presentation';
function contains(text:string,term:string){return new RegExp('(^|[^a-z0-9])'+term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=$|[^a-z0-9])','i').test(text)}
export async function POST(req:Request){
 let body;try{body=await readBody(req)}catch{return Response.json({error:'Invalid request.'},{status:400})}
 const jd=body.jobDescription;if(typeof jd!=='string'||jd.trim().length<40||jd.length>6000)return Response.json({error:'Enter a job description between 40 and 6,000 characters.'},{status:400});
 const response=await answer(new Request(req.url,{method:'POST',headers:req.headers,body:JSON.stringify({mode:'match',input:jd})}));if(!response.ok)return response;
 const result=await response.json();
 const matches=[...new Set([...Object.values(skills).flat(),'tRPC','Stripe','Laravel'])].filter(skill=>contains(jd,skill)).map(skill=>({requirement:skill,evidence:`${skill} is documented in Zahidul’s resume.`,projectIds:presentationProjects.filter(p=>p.stack.some(s=>s.toLowerCase()===skill.toLowerCase())).map(p=>p.id)}));
 const gaps=['Python','Java','Kubernetes','Rust','Go','Angular','Vue','C#','.NET','Swift','Kotlin','MongoDB','Azure','GCP','Django','FastAPI'].filter(skill=>contains(jd,skill)).map(skill=>`${skill}: not established in the resume; discuss directly.`);
 gaps.push('Seniority expectations, availability, and requirements outside the recognized vocabulary need a conversation.');
 return Response.json({roleTitle:'Resume evidence review',summary:result.source.startsWith('AI-assisted')?result.answer:'A keyword-based comparison of the role with documented skills and project contributions. This does not measure proficiency or confirm every requirement.',matches,gaps,pitch:`I’m ${profile.name}, a Full Stack Software Engineer with 4+ years of experience building React, Next.js, TypeScript, and API-driven applications. ${matches.length?`My documented skills relevant to this role include ${matches.slice(0,5).map(m=>m.requirement).join(', ')}. `:''}I’d welcome a conversation about the role and project requirements.`,source:result.source});
}
