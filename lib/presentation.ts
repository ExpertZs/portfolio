import { training, experience, profile, projects, services, skills, skillDescriptions, skillExperience, skillExperienceLabel, testingExperience } from './data';
import icons from './skill-icons.json';
import type { AboutInfo, ContactInfo, ProjectInfo, ServiceInfo, SkillInfo } from '@/types/content';

export const contact: ContactInfo = {
 full_name:profile.name, title:'Software Engineer & Full-Stack Developer',
 location:'Dhaka, Bangladesh', time_zone:'GMT+6', email:profile.email,
 phone_primary:profile.phone, portfolio_url:process.env.NEXT_PUBLIC_SITE_URL || '',
 availability:'', response_time:'', office_hours:'', preferred_contact_methods:['email','phone'],
 socials:[{platform:'GitHub',handle:'ExpertZs',url:profile.github}]
};
export const about: AboutInfo = {
 name:profile.name, summary:profile.summary,
 skills_summary:testingExperience+' I build responsive React and Next.js applications, integrate typed APIs and relational databases, and develop AI-powered product features. My work includes testing, performance optimization, and collaboration with Japan-based teams.',
 skill_bars:[],
 personal:{occupation:'Full Stack Software Engineer',date_of_birth:'',nationality:'',address:'Dhaka, Bangladesh'},
 education:[{degree:'Master of Science in Computer Science',institution:'Jahangirnagar University',field:'CGPA 3.60 / 4.00',year:'2019–2021'},{degree:'Bachelor of Science in Computer Science & Engineering',institution:'Uttara University',field:'CGPA 3.88 / 4.00',year:'2015–2018'}],
 training,
 experience:experience.map(item=>({role:'Software Engineer',company:item.company,period:item.date,note:item.points.join(' ')}))
};
const coreSkillDetails: Record<string,string> = {
 JavaScript:'Interactive web interfaces and asynchronous application behavior.',
 TypeScript:'Typed React components, API integrations, and application data flows.',
 React:'Reusable interfaces for web platforms and inventory workflows.',
 'Next.js':'Production pages, API-connected features, and WordPress migration work.',
 'Tailwind CSS':'Responsive page layouts and reusable frontend styling.',
 'Node.js':'REST APIs and relational database-backed workflows.',
 PostgreSQL:'Relational data flows in KnowledgeLinks AI (Raggie).',
 Prisma:'Database access and typed data workflows in Next.js applications.',
};
export const presentationSkills: SkillInfo[] = Object.entries(skills).flatMap(([category,names])=>names.map(name=>({
 id:0,skill_name:name,proficiency:(!skillExperience[name]?'documented':(skillExperience[name]?.months ?? 0)>=36?'advanced':(skillExperience[name]?.months ?? 0)>=24?'proficient':(skillExperience[name]?.months ?? 0)>=12?'intermediate':'beginner') as SkillInfo['proficiency'],
 icon:(icons as Record<string,string>)[name] || '/images/skills/code.svg',
 category,details:name==='Figma'?'Using Figma designs as references when implementing web interfaces.':coreSkillDetails[name] || '',years_of_experience:(skillExperience[name]?.months ?? 0)/12,experience_label:skillExperienceLabel(name),percentage:0,
 group:(['JavaScript','TypeScript','PHP','Ruby'].includes(name)?'languages':category==='Frontend'?'frontend':category==='Cloud & quality'?'tools':'backend') as SkillInfo['group']
}))).map((skill,index)=>({...skill,id:index+1}));
export const presentationProjects: ProjectInfo[] = [...projects]
 .sort((a,b)=>Number(!!b.shared)-Number(!!a.shared))
 .map((project,index)=>({id:index+1,type:project.category==='AI'?'ai':'web',category:'professional',src:project.image,
 project_title:project.displayName||project.name,project_details:project.description,stack:project.stack,
 live_link:project.url||undefined,featured:['Raggie','Online Reputation Management'].includes(project.name),demoUnavailable:project.demoUnavailable,isPrivate:project.isPrivate,illustrated:!project.shared}));
const serviceIcons: ServiceInfo['iconKey'][] = ['web','ai','saas','api','performance'];
export const presentationServices: ServiceInfo[] = services.map((service,index)=>({id:index+1,iconKey:serviceIcons[index],featured:index<3,service_title:service.title,tagline:service.description,highlights:service.points,tech:service.stack,service_details:service.workflow}));
