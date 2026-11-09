import type { MetadataRoute } from 'next';
import { sections } from '@/lib/data';
export default function sitemap(): MetadataRoute.Sitemap {const base=process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';return ['',...sections].map(path=>({url:`${base}/${path}`,changeFrequency:'monthly',priority:path?0.7:1}))}
