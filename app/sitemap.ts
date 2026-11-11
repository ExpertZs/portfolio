import type { MetadataRoute } from 'next';
import { sections } from '@/lib/data';
export default function sitemap(): MetadataRoute.Sitemap {const base=process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-zahidul.vercel.app';return ['','privacy',...sections].map(path=>({url:`${base}/${path}`,changeFrequency:'monthly',priority:path?0.7:1}))}
