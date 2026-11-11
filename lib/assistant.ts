import { trainingSummary, experience, profile, projects, skills, services } from './data';
const groups: Record<string,string[]> = {...skills,Other:['Laravel','Stripe','tRPC','Testing','Code review','Remote collaboration']};
const terms = [...new Set(Object.values(groups).flat())];
const aliases:Record<string,string[]> = {'Next.js':['nextjs','next.js'], 'Node.js':['nodejs','node.js'], 'React':['react','react.js','reactjs'],'REST':['rest','restful'], 'API integration':['api','apis'],'LLM integration':['llm','llms'],'Agent workflows':['agents','agent workflows']};
function contains(text:string,term:string){return (aliases[term]||[term]).some(t=>new RegExp('(^|[^a-z0-9])'+t.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=$|[^a-z0-9])','i').test(text))}
export function fallback(mode:'ask'|'match',input:string){
 if(mode==='match'){
 const matched=terms.filter(t=>contains(input,t));const unsupported=['Python','Java','Go','Rust','Kubernetes','Angular','Vue','C#','.NET','Swift','Kotlin','MongoDB','Azure','GCP','Django','FastAPI'].filter(t=>contains(input,t));
 return `RESUME EVIDENCE REVIEW\n\n${matched.length ? `Skills mentioned in this role and supported by the resume:\n${matched.join(', ')}.`:'No direct matches found in the recognized skill vocabulary. Review the role alongside the full resume.'}\n\n${unsupported.length?`Mentioned but not established in the resume:\n${unsupported.join(', ')}. These require clarification, not an assumption of no experience.`:'No unsupported technologies were detected in the limited keyword vocabulary. This is not an exhaustive requirements check.'}\n\nRelevant background: 4+ years in full-stack software engineering, with React, Next.js, TypeScript, API integrations, and Japan-based team collaboration.\n\n${matched.some(t=>['React','Next.js','TypeScript'].includes(t))?'Project evidence: Brand Cloud corporate and service websites, MOE Guide, and Suirikyu demonstrate frontend and API-connected delivery.\n\n':''}This is a keyword-based resume comparison, not a hiring recommendation or a fit score. Seniority requirements, skill depth, availability, and all non-keyword requirements need a conversation.`;
 }
 const q=input.toLowerCase().replace(/suirikyou/g,'suirikyu').replace(/moeguide/g,'moe guide').replace(/knowledge\s*links?\s*ai/g,'raggie');
 if(/get started|project idea|project in mind|include in my message|should i tell/.test(q))return 'To start a conversation, share the product or problem, target users, key features, preferred stack, timeline, and budget range. Include any existing designs or APIs. Contact '+profile.email+' to discuss scope and availability.';
 if(/service|deliver/.test(q)){const service=services.find(s=>q.includes(s.title.toLowerCase()));return service?service.title+': '+service.description+'\n\n'+service.points.join('\n')+'\n\n'+service.workflow:services.map(s=>s.title+' — '+s.description).join('\n\n');}
 if(/salary|available|availability|visa|age|married|religion/.test(q))return 'That information is not established in the resume. Please contact Zahidul at '+profile.email+' to confirm.';
 if(/contact|email|phone/.test(q))return `You can reach Zahidul at ${profile.email} or ${profile.phone}. GitHub: ${profile.github}.`;
 if(/bjet|miyazaki|north south|japanese(?: language)?|language training/.test(q))return trainingSummary;
 if(/education|degree|university|award|certif/.test(q))return 'Zahidul holds an MSc in Computer Science from Jahangirnagar University (2019–2021, CGPA 3.60/4.00) and a BSc in Computer Science & Engineering from Uttara University (2015–2018, CGPA 3.88/4.00). His resume lists ITEE FE certification (BD-ITEC, 2022) and the Vice-Chancellor Award from Uttara University.'+'\n\n'+trainingSummary;
 const project=projects.find(p=>q.includes(p.name.toLowerCase())||q.includes(p.name.split(' ')[0].toLowerCase())&&p.name.split(' ')[0]!=='Brand');
 if(project)return `${project.displayName || project.name}: ${project.description}\n\nStack: ${project.stack.join(', ')}.${project.url?'\n\nWebsite: '+project.url:''}`;
 if(/project|built|work sample/.test(q))return projects.map(p=>`${p.displayName || p.name} — ${p.description}`).join('\n\n');
 if(/experience|employ|company|japan|career|current/.test(q))return 'Zahidul has 4+ years of professional experience.\n\n'+experience.map(e=>`Software Engineer, ${e.company} (${e.date}). ${e.points[0]}`).join('\n\n');
 if(/skill|stack|technolog|react|next|backend|frontend|ai|llm/.test(q))return Object.entries(skills).map(([g,s])=>`${g}: ${s.join(', ')}.`).join('\n\n');
 if(/who|about|introduce|summary|hello|hi\b/.test(q))return profile.summary;
 return 'I can answer from Zahidul’s resume about his experience, projects, skills, education, and contact details. I don’t have evidence to answer that specific question. Try “What is his experience?” or contact '+profile.email+'.';
}
