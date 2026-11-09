import { presentationProjects, presentationSkills, presentationServices } from '@/lib/presentation';
export function GET(req:Request){
 const url=new URL(req.url);const query=(url.searchParams.get('q')||'').slice(0,150).toLowerCase();const kind=url.searchParams.get('kind');
 const terms=query.split(/\s+/).filter(t=>t.length>1&&!['and','the','about','projects','skills'].includes(t));
 const items=[
  ...presentationProjects.map(p=>({uid:`project:${p.id}`,kind:'project',title:p.project_title,snippet:p.project_details,meta:p.stack.join(' · '),href:'/projects'})),
  ...presentationSkills.map(s=>({uid:`skill:${s.id}`,kind:'skill',title:s.skill_name,snippet:s.details,meta:s.category,href:'/skills'})),
  ...presentationServices.map(s=>({uid:`service:${s.id}`,kind:'service',title:s.service_title,snippet:s.tagline,meta:s.tech.join(' · '),href:'/services'}))
 ];
 const results=items.filter(item=>!kind||item.kind===kind).map(item=>({item,score:terms.filter(term=>`${item.title} ${item.snippet} ${item.meta}`.toLowerCase().includes(term)).length})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,20).map(x=>x.item);
 return Response.json({results},{headers:{'Cache-Control':'public, max-age=60'}});
}
