export const profile = {
 name: 'Md. Zahidul Islam', email: 'zs.engineer1@gmail.com', phone: '+8801754898514', github: 'https://github.com/ExpertZs',
 summary: 'Full-Stack Software Engineer focused on React, Next.js, and TypeScript, with 4+ years delivering web applications and collaborating with Japan-based teams. Experience spans reusable interfaces, API and database integration, Stripe payment flows, and AI-powered knowledge applications.'
};
export const testingExperience = 'Worked on API and UI test automation using Vitest, Cypress, and Playwright, alongside regression checks and CI workflows.';
export const skills: Record<string, string[]> = {
 Frontend: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Figma'],
 Backend: ['Node.js', 'PHP', 'Ruby', 'REST', 'GraphQL', 'WebSockets/SSE', 'Prisma'],
 Database: ['PostgreSQL', 'MySQL', 'Redis', 'Schema design', 'Query optimization'],
 'Cloud & quality': ['AWS', 'Cloudflare', 'Docker', 'GitHub Actions', 'Nginx', 'Playwright', 'Cypress', 'Core Web Vitals', 'Lighthouse'],
 'Security & AI': ['Dify', 'JWT', 'OAuth 2.0', 'NextAuth/Auth.js', 'RAG', 'LLM', 'Integration', 'Agent workflows', 'Streaming responses']
};
// Experience durations supplied by Zahidul; these are not proficiency ratings.
export const skillExperience: Record<string, { months: number; plus?: boolean; usageOnly?: boolean }> = {
 'JavaScript': {months:42}, 'TypeScript': {months:42}, 'React': {months:45}, 'Next.js': {months:36},
 'Tailwind CSS': {months:42}, 'Figma': {months:42,usageOnly:true},
 'Node.js': {months:36}, 'PHP': {months:12}, 'Ruby': {months:6}, 'REST': {months:48,plus:true},
 'GraphQL': {months:30}, 'WebSockets/SSE': {months:12}, 'Prisma': {months:36},
 'PostgreSQL': {months:30}, 'MySQL': {months:42}, 'Redis': {months:18}, 'Schema design': {months:18}, 'Query optimization': {months:6},
 'Dify': {months:9}, 'Cloudflare': {months:12}, 'AWS': {months:36}, 'Docker': {months:30}, 'GitHub Actions': {months:12}, 'Nginx': {months:6},
 'Playwright': {months:3}, 'Cypress': {months:18}, 'Core Web Vitals': {months:6}, 'Lighthouse': {months:6},
 'JWT': {months:30}, 'OAuth 2.0': {months:18}, 'NextAuth/Auth.js': {months:18}, 'RAG': {months:24},
 'LLM': {months:24}, 'Integration': {months:48,plus:true}, 'Agent workflows': {months:18}, 'Streaming responses': {months:18},
};
export function skillExperienceLabel(name: string) {
 const value = skillExperience[name];
 if (!value) return '';
 const years = Math.floor(value.months / 12), months = value.months % 12;
 const parts = [years ? `${years}${value.plus ? '+' : ''} ${years === 1 ? 'year' : 'years'}` : '', months ? `${months} ${months === 1 ? 'month' : 'months'}` : ''].filter(Boolean);
 return parts.join(' ') + (value.usageOnly ? ' · tool usage' : '');
}
export const experience = [
 {company:'Ninja Digital Innovations Ltd.',date:'July 2025 — Present',location:'Dhaka, Bangladesh',points:['Develop and maintain production web applications with React, Next.js, TypeScript, and reusable component architecture.','Build REST APIs and database-backed workflows with Node.js, Prisma, and relational databases.','Refine data-fetching and responsive UI behavior; contribute code reviews, debugging, testing, and release checks with Japan-based stakeholders.']},
 {company:'Brand Cloud Inc.',date:'March 2023 — June 2025',location:'Remote, Japan',points:['Delivered frontend and API-connected features for MoeGuide and Suirikyou using Next.js, TypeScript, and Stripe.','Translated supplied designs into reusable components and resolved desktop/mobile layout and interaction issues.','Added Cypress end-to-end coverage and contributed to sprint planning and code reviews with Japanese teammates.']},
 {company:'Suncreer Co., Ltd.',date:'December 2022 — February 2023',location:'Remote, Japan',points:['Developed Smart Inventory Management workflows using React, Laravel, MySQL, and APIs for inventory, purchasing, sales, and reporting.']},
 {company:'Bconns Technologies Ltd.',date:'October 2021 — March 2022',location:'',points:['Built REST APIs and React interfaces for enterprise inventory, stock, purchasing, and sales operations.']}
];
export type Project = { name: string; displayName?: string; category: string; image: string; url: string | null; description: string; stack: string[]; shared?: boolean; isPrivate?: boolean; demoUnavailable?: boolean };
export const projects: Project[] = [
 {name:'Brand Cloud Corporate Website',category:'Web',image:'/images/corporate.png',url:'https://brandcloud.co.jp',description:'Contributed to the WordPress-to-Next.js redevelopment: built responsive pages and reusable React components, integrated API-driven content, and refined image handling and data loading using Lighthouse investigations.',stack:['Next.js','React','TypeScript','Tailwind CSS','REST APIs','Lighthouse']},
 {name:'Brand Cloud Service Website',category:'Web',image:'/images/service.png',url:'https://solution.brandcloud.co.jp',description:'Built service pages and reusable frontend components during a WordPress-to-Next.js modernization. Integrated API-driven content and resolved layout and interaction issues across screen sizes.',stack:['Next.js','React','TypeScript','Tailwind CSS','API integration']},
 {name:'Raggie',displayName:'KnowledgeLinks AI (Raggie)',category:'AI',image:'/images/projects/raggie.webp',url:'https://knowledgelinks.ai/lp1/',shared:true,description:'KnowledgeLinks AI, also known as Raggie, is an enterprise knowledge platform using RAG and AI agents to help teams find and use company information. Implemented Next.js/TypeScript interfaces, integrated tRPC APIs, and worked with PostgreSQL/Prisma data flows and asynchronous UI states.',stack:['Next.js','TypeScript','tRPC','PostgreSQL','Prisma','AI integration']},
 {name:'Suirikyu',displayName:'Suirikyou',category:'Web',image:'/images/projects/suirikyou.webp',url:'https://suirikyou-brandcloud.vercel.app/',shared:true,description:'Built assessment interfaces and backend-connected workflows for an assessment and certification platform. Integrated Stripe payment interactions and handled payment-related UI states through reusable components.',stack:['Next.js','TypeScript','Stripe','API integration']},
 {name:'MOE Guide',displayName:'MoeGuide',category:'Web',image:'/images/projects/moeguide.webp',url:'https://moeguide-app.vercel.app/',shared:true,description:'Developed destination-content interfaces and itinerary features with Next.js and TypeScript. Integrated API-driven travel content and refined desktop and mobile usability.',stack:['Next.js','TypeScript','React','API integration']},
 {name:'Online Reputation Management',isPrivate:true,category:'Platforms',image:'/images/orm.svg',url:null,description:'Brand protection and monitoring application. Contributed monitoring interfaces, risk-keyword signals, and REST API-connected reputation review workflows.',stack:['React','TypeScript','REST APIs']}
];
export const services = [
 {title:'Web Development',description:'Fast, accessible websites and web applications built with React and Next.js.',points:['Responsive layouts and reusable components','TypeScript interfaces and API-driven content','Rendering, image handling, and Core Web Vitals'],stack:['Next.js','React','TypeScript','Tailwind CSS'],workflow:'Start with the requirements and existing designs, build reusable components, and validate the experience across screen sizes.'},
 {title:'AI Integration & Chatbots',description:'Resume-grounded assistants, RAG workflows, and AI features integrated into real applications.',points:['LLM integration and retrieval-augmented generation','Streaming responses and asynchronous UI states','Typed APIs and database-backed AI workflows'],stack:['LLM integration','RAG','tRPC','Prisma'],workflow:'Define the source material and desired behavior, integrate the model securely on the server, and check responses against the available evidence.'},
 {title:'Full-Stack Applications',description:'Connected product experiences, from the interface to APIs and relational data.',points:['Reusable frontend and backend-connected workflows','Authentication and role-based access','Payment interactions and application states'],stack:['Next.js','Node.js','Prisma','PostgreSQL'],workflow:'Map the user journey and data model, deliver features incrementally, and review integration behavior and failure states.'},
 {title:'API & Backend Development',description:'Reliable integrations and data flows that your frontend can depend on.',points:['REST and GraphQL API integration','Relational schemas and query optimization','Authentication with JWT and OAuth 2.0'],stack:['Node.js','REST','MySQL','PostgreSQL'],workflow:'Agree on the API contract, implement validation and data access, then verify authorization and error handling.'},
 {title:'Performance & Quality',description:'Faster applications, predictable behavior, and maintainable code.',points:['Lighthouse and Core Web Vitals investigation','Cypress and Playwright end-to-end testing','Code reviews, regression checks, and release readiness'],stack:['Lighthouse','Cypress','Playwright','GitHub Actions'],workflow:'Measure the current behavior, prioritize concrete issues, and verify improvements with regression checks.'}
];
export const skillDescriptions: Record<string, string> = {
 Frontend:'Responsive interfaces, reusable components, and application state.',
 Backend:'API-connected features and reliable server-side workflows.',
 Database:'Relational data flows, schema design, and query optimization.',
 'Cloud & quality':'Deployment, performance investigation, and release readiness.',
 'Security & AI':'Secure access and AI-powered product features.'
};
export const resumeContext = JSON.stringify({profile,skills,skillExperience,testingExperience,experience,projects,education:['MSc Computer Science, Jahangirnagar University, 2019–2021, CGPA 3.60/4.00','BSc Computer Science & Engineering, Uttara University, 2015–2018, CGPA 3.88/4.00'],awards:['ITEE FE, BD-ITEC, 2022','Vice-Chancellor Award, Uttara University']});
export const sections = ['about','skills','experience','projects','services','blogs','match','ask','contact'] as const;
