"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MdArrowOutward, MdSchool, MdWorkOutline } from "react-icons/md";
import type { AboutInfo } from "@/types/content";

function Timeline({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // The accent line "draws" itself as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div>
      <h3 className="mb-6 flex items-center gap-3 font-poppins text-2xl font-bold text-brand-text">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl brand-action text-xl text-white shadow">
          {icon}
        </span>
        {title}
      </h3>
      <div ref={ref} className="relative pl-8">
        <div className="absolute bottom-0 left-[11px] top-1 w-0.5 rounded bg-black/10 dark:bg-brand-soft" aria-hidden />
        <motion.div
          aria-hidden
          style={{ height: reduce ? "100%" : height }}
          className="absolute left-[11px] top-1 w-0.5 rounded bg-gradient-to-b from-indigo-600 to-violet-400"
        />
        <ol className="space-y-5">{children}</ol>
      </div>
    </div>
  );
}

function Entry({
  index,
  current,
  children,
}: {
  index: number;
  current?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.05 }}
      className="relative"
    >
      <span
        aria-hidden
        className={`absolute -left-8 top-5 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
          current
            ? "border-emerald-400 bg-emerald-500"
            : "border-indigo-500 bg-white dark:bg-slate-900"
        }`}
      >
        {current && <span className="absolute h-6 w-6 animate-ping rounded-full bg-emerald-400/50" />}
        <span className={`h-2 w-2 rounded-full ${current ? "bg-white" : "bg-indigo-500"}`} />
      </span>
      <div className="rounded-2xl border border-brand-border bg-brand-surface p-4 backdrop-blur transition hover:border-brand-border hover:shadow-lg hover:shadow-indigo-500/10 dark:border-brand-border dark:bg-brand-surface md:p-5">
        {children}
      </div>
    </motion.li>
  );
}

export default function AboutTimeline({ about }: { about: AboutInfo }) {
  return (
    <section aria-labelledby="journey-heading" className="mx-auto mt-24 w-full max-w-6xl">
      <div className="mb-10 text-center">
        <span className="text-xs font-medium uppercase tracking-widest text-brand-accent ">
          Journey
        </span>
        <h2
          id="journey-heading"
          className="mt-2 font-poppins text-3xl font-bold text-brand-text md:text-4xl"
        >
          Experience &{" "}
          <span className="brand-highlight">
            education
          </span>
        </h2>
      </div>

      <div className="grid gap-12 min-[1024px]:grid-cols-[3fr_2fr]">
        <Timeline title="Experience" icon={<MdWorkOutline />}>
          {about.experience.map((x, i) => {
            const current = /present|current|now/i.test(x.period);
            return (
              <Entry key={`${x.company}-${i}`} index={i} current={current}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-poppins text-lg font-semibold text-brand-text">{x.role}</h4>
                    <p className="text-sm font-medium text-brand-accent ">
                      {x.url ? (
                        <a
                          href={x.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 hover:underline"
                        >
                          {x.company} <MdArrowOutward className="text-sm" />
                        </a>
                      ) : (
                        x.company
                      )}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      current
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                        : "bg-brand-soft text-brand-muted dark:bg-brand-soft "
                    }`}
                  >
                    {current ? "Current · " : ""}
                    {x.period.replace(/^from\s+/i, "")}
                  </span>
                </div>
                {x.note && <p className="mt-2 text-sm text-brand-muted ">{x.note}</p>}
              </Entry>
            );
          })}
        </Timeline>

        <Timeline title="Education & training" icon={<MdSchool />}>
          {[...about.education, ...about.training].map((e, i) => (
            <Entry key={`${e.degree}-${i}`} index={i}>
              <h4 className="break-words font-poppins text-base font-semibold leading-relaxed text-brand-text">{e.degree}</h4>
              <p className="mt-1 text-sm font-medium leading-relaxed text-brand-accent ">{e.institution}</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted ">
                {[e.field, e.year].filter(Boolean).join(" · ")}
              </p>
            </Entry>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
