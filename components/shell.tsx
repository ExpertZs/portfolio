'use client';
import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import Header from '@/app/components/navigations/Header';
import Footer from '@/app/components/navigations/Footer';
import ChatIcon from '@/app/components/display/ChatIcon';
import SearchPalette from '@/app/components/ai/SearchPalette';
import { contact } from '@/lib/presentation';

export function Shell({children}:{children:React.ReactNode}) {
 return <ThemeProvider attribute="class" defaultTheme="dark" enableSystem><MotionConfig reducedMotion="user">
  <div className="relative isolate min-h-screen">
   <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className="absolute -top-32 right-[-5%] h-72 w-72 rounded-full bg-indigo-400/10 blur-[140px] dark:bg-brand-soft"/>
    <div className="absolute top-1/3 -left-24 h-64 w-64 rounded-full bg-violet-200/15 blur-[120px] dark:bg-violet-700/10"/>
    <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-indigo-100/15 blur-[150px] dark:bg-violet-600/10"/>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.04),_transparent_45%)] dark:bg-[radial-gradient(circle_at_bottom,_rgba(99,102,241,0.06),_transparent_50%)]"/>
   </div>
   <a href="#main-content" className="sr-only z-[70] rounded-lg brand-action px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
   <Header contact={contact}/><main id="main-content" className="min-h-screen px-6 pb-6 pt-24 md:px-10 md:pt-28">{children}</main>
   <ChatIcon/><SearchPalette/><Footer contact={contact}/>
  </div>
 </MotionConfig></ThemeProvider>;
}
