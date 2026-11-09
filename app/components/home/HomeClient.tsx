"use client";
import { useEffect, useState } from "react";
import TyAnimation from "../animations/TyAnimation";
import FlashScreen from "../FlashScreen";
import { testingExperience } from "@/lib/data";
import Link from "next/link";
import SmartImage from "@/app/components/display/SmartImage";
import { AnimatePresence, motion } from "framer-motion";
import MotionDiv from "../animations/MotionDiv";
import HeroAskAI from "../ai/HeroAskAI";
import SkillsSection from "../skills/SkillsSection";
import ServicesSection from "../services/ServicesSection";
import ProjectsSection from "../projects/ProjectsSection";
import type { AboutInfo, ProjectInfo, ServiceInfo, SkillInfo } from "@/types/content";

type HomeProps = {
  about: AboutInfo;
  skills: SkillInfo[];
  services: ServiceInfo[];
  projects: ProjectInfo[];
};

const HomePage = ({ about, skills, services, projects }: HomeProps) => {
  const [welcome, setWelcome] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try { if (sessionStorage.getItem('zahidul-welcomed')) return; } catch {}
    setWelcome(true);
    const timer = window.setTimeout(() => { setWelcome(false); try { sessionStorage.setItem('zahidul-welcomed','true'); } catch {} }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section>
      <AnimatePresence>{welcome && <FlashScreen key="welcome" />}</AnimatePresence>


      {(
        <div>
          <div className="grid grid-cols-12 md:items-center">
            <MotionDiv
              src="/images/zahidul_c.png"
              isTransparentBG
              className="col-span-12 place-self-center md:hidden"
              isRoundedImage
              height_width={150}
            />
            <div className="mt-4 md:mt-6 lg:mt-10 xl:mt-14 sm:col-span-12 md:col-span-7 place-self-start justify-self-start md:place-self-center md:justify-self-start">
              <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-300 md:text-left">React · Next.js · TypeScript</p>
              <h1 aria-label="Zahidul Islam — Full-Stack Software Engineer" className="text-center md:text-left text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-950 dark:text-white"><span className="block text-cyan-600 dark:text-cyan-300">Hello, I’m</span><span aria-hidden="true" className="mt-3 block min-h-[2.4em]"><TyAnimation /></span><span className="sr-only">Zahidul Islam — Full-Stack Software Engineer</span></h1>
              <p className="mt-5 mb-6 text-center md:text-left text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">4+ years building web applications with Japan-based teams. React and Next.js interfaces, API integration, and AI-powered product features.</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link href="#selected-work" className="inline-flex items-center justify-center rounded-xl md:rounded-full bg-gradient-to-br from-cyan-500 to-teal-700 px-6 py-2 md:py-3 text-[12px] md:text-[16px] text-white">View selected projects</Link>
                <a href="/Zahidul_Islam_Resume.pdf" download="Md. Zahidul Islam Resume.pdf" className="inline-flex items-center justify-center rounded-xl md:rounded-full border-2 border-cyan-600 px-5 py-2 text-[12px] md:text-[16px] dark:bg-black bg-white">Download CV</a>
              </div>
              <HeroAskAI />
            </div>
            {/* Portrait: stretches to the text column's height and sits centred in its own column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative hidden items-center justify-center self-stretch md:col-span-5 md:flex"
            >
              <div aria-hidden className="absolute left-1/2 top-1/2 h-[75%] max-h-[420px] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/30 via-teal-400/20 to-emerald-400/30 blur-2xl" />
              <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square h-[70%] max-h-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/30" />
              <SmartImage
                src="/images/zahidul_f.png"
                alt="Portrait of Zahidul"
                width={1024}
                height={1536}
                priority
                className="relative h-auto max-h-[min(640px,80vh)] w-auto max-w-[70%] object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>

          <div id="selected-work" className="scroll-mt-28"><ProjectsSection projects={projects.filter(p => [1,2,4].includes(p.id))} compact /></div>
          <div className="text-center"><Link href="/projects" className="text-cyan-700 dark:text-cyan-300 underline underline-offset-4">View all projects →</Link></div>
          <section className="mx-auto my-12 max-w-6xl rounded-2xl border border-cyan-500/20 p-6 md:p-8"><h2 className="text-2xl font-bold">Production experience, across teams</h2><p className="mt-3 text-gray-600 dark:text-gray-300">Software Engineer at Ninja Digital Innovations. Previously Brand Cloud, Suncreer, and Bconns — delivering web interfaces, APIs, payment flows, and inventory workflows.</p><p className="mt-3 text-gray-600 dark:text-gray-300">{testingExperience}</p><Link href="/experience" className="mt-4 inline-block text-cyan-700 dark:text-cyan-300 underline underline-offset-4">Explore my experience →</Link></section>
          <SkillsSection skills={skills.filter(s => ['JavaScript','TypeScript','React','Next.js','Tailwind CSS','Node.js','PostgreSQL','Prisma'].includes(s.skill_name))} />
          <div className="text-center"><Link href="/skills" className="text-cyan-700 dark:text-cyan-300 underline underline-offset-4">View the full toolkit →</Link></div>
          <ServicesSection services={services} featuredOnly />
        </div>
      )}
    </section>
  );
};

export default HomePage;
