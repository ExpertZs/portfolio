import { notFound } from 'next/navigation';
import { sections } from '@/lib/data';
import { Content } from '@/components/content';
export function generateStaticParams(){return sections.filter(section=>section!=='match').map(section=>({section}))}
export async function generateMetadata({params}:{params:Promise<{section:string}>}){const {section}=await params;return {title:section==='match'?'AI Job Match':section==='ask'?'Ask My AI':section[0].toUpperCase()+section.slice(1)}}
export default async function Page({params}:{params:Promise<{section:string}>}){const {section}=await params;if(!sections.includes(section as typeof sections[number]))notFound();return <Content section={section}/>}
