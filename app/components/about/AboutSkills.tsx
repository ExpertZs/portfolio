"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { AboutInfo, SkillInfo } from "@/types/content";
import SmartImage from "../display/SmartImage";

export default function AboutSkills({ about, skills }: { about: AboutInfo; skills: SkillInfo[] }) {
  const core = skills
    .filter((s) => ["React","Next.js","TypeScript","JavaScript","Node.js","Prisma","PostgreSQL","Tailwind CSS","Redux","Docker"].includes(s.skill_name))
    .sort((a, b) => b.years_of_experience - a.years_of_experience)
    .slice(0, 10);

  return (
    <section aria-labelledby="skills-about-heading" className="mx-auto mt-20 w-full max-w-6xl">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-xs font-medium uppercase tracking-widest text-brand-accent ">
            What I do
          </span>
          <h2
            id="skills-about-heading"
            className="mt-2 font-poppins text-3xl font-bold text-brand-text md:text-4xl"
          >
            My professional{" "}
            <span className="brand-highlight">
              skills
            </span>
          </h2>
          <p className="mt-4 leading-relaxed text-brand-muted ">{about.skills_summary}</p>

          {core.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-muted">Core stack</p>
              <ul className="flex flex-wrap gap-2">
                {core.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface py-1 pl-1 pr-3 text-xs font-medium text-brand-text backdrop-blur dark:border-brand-border dark:bg-white/[0.05] "
                  >
                    <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white p-0.5">
                      <SmartImage src={s.icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
                    </span>
                    {s.skill_name}
                  </li>
                ))}
              </ul>
              <Link
                href="/#skills-heading"
                className="mt-3 inline-block text-sm text-brand-accent hover:underline "
              >
                See all skills →
              </Link>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="space-y-6 rounded-3xl border border-brand-border bg-brand-surface p-6 backdrop-blur dark:border-brand-border dark:bg-brand-surface md:p-8"
        >
          {[
            ['Frontend engineering','React, Next.js, TypeScript, reusable components, and responsive implementation.'],
            ['Backend integration','REST APIs, Node.js, Prisma, and relational data workflows.'],
            ['AI-powered features','LLM integration, RAG, agent workflows, and streaming responses.'],
            ['Testing & performance','Cypress, Playwright, Lighthouse, and Core Web Vitals.']
          ].map(([label,description]) => <div key={label}><h3 className="text-sm font-semibold text-brand-accent ">{label}</h3><p className="mt-2 text-sm text-brand-muted ">{description}</p></div>)}
        </motion.div>
      </div>
    </section>
  );
}
