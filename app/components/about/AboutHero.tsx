"use client";

import SmartImage from "@/app/components/display/SmartImage";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MdArrowOutward, MdAutoAwesome, MdDownload } from "react-icons/md";
import SocialIcons from "../display/SocialIcons";
import { openChat } from "../display/ChatIcon";
import type { AboutInfo, ContactInfo } from "@/types/content";

type Stat = { label: string; value: string };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function AboutHero({
  about,
  contact,
  stats,
}: {
  about: AboutInfo;
  contact: ContactInfo;
  stats: Stat[];
}) {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="about-heading"
      className="mx-auto mt-4 grid w-full max-w-6xl items-center gap-10 md:mt-10 md:grid-cols-5"
    >
      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="md:col-span-3"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-soft px-3 py-1 text-xs font-medium text-brand-accent "
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
          </span>
          {"Full Stack Software Engineer"}
        </motion.span>

        <motion.h1
          id="about-heading"
          variants={item}
          className="mt-5 font-poppins text-4xl font-bold leading-tight text-brand-text md:text-5xl lg:text-6xl"
        >
          <span className="text-brand-muted ">Hi, I&apos;m </span>
          <span className="brand-highlight">{about.name}</span>
        </motion.h1>

        <motion.p variants={item} className="mt-2 text-lg font-medium text-brand-accent ">
          {about.personal.occupation}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg"
        >
          {about.summary}
        </motion.p>

        <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="group flex items-center gap-1.5 rounded-full brand-action px-6 py-2.5 font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-xl"
          >
            Get in touch
            <MdArrowOutward className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <a
            href="/Zahidul_Islam_Resume.pdf"
            download="Md. Zahidul Islam Resume.pdf"
            className="flex items-center gap-1.5 rounded-full border border-brand-border px-5 py-2.5 font-medium text-brand-accent transition hover:bg-brand-soft "
          >
            <MdDownload /> Download CV
          </a>
          <button
            type="button"
            onClick={() => openChat("Give me a quick introduction to you and your strongest skills.")}
            className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-brand-muted transition hover:text-brand-accent "
          >
            <MdAutoAwesome className="text-brand-accent" /> Ask my AI
          </button>
        </motion.div>

        <motion.div variants={item} className="mt-6">
          <SocialIcons socials={contact.socials} size={22} className="!justify-start gap-x-5" />
        </motion.div>
      </motion.div>

      {/* Portrait */}
      <div className="relative mx-auto flex w-full max-w-[320px] justify-center md:col-span-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          {/* Rotating gradient ring */}
          <motion.div
            aria-hidden
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-full bg-[conic-gradient(from_0deg,#6366f1,#a78bfa,#6366f1,#6366f1)] opacity-80 blur-[2px]"
          />
          <div className="absolute -inset-6 rounded-full bg-indigo-500/20 blur-3xl" aria-hidden />
          <div className="relative h-[240px] w-[240px] overflow-hidden rounded-full border-4 border-white/80 bg-slate-900 dark:border-slate-900 md:h-[280px] md:w-[280px]">
            <SmartImage
              src="/images/zahidul_c.png"
              alt={`Portrait of ${about.name}`}
              fill
              sizes="280px"
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Floating stat chips */}
          {stats.slice(0, 2).map((s, i) => (
            <motion.div
              key={s.label}
              animate={reduce ? undefined : { y: [0, i ? 7 : -7, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute rounded-2xl border border-brand-border bg-brand-surface px-4 py-2 shadow-xl backdrop-blur dark:border-brand-border dark:bg-slate-900/90 ${
                i === 0 ? "-left-6 top-6 md:-left-12" : "-right-4 bottom-8 md:-right-10"
              }`}
            >
              <div className="font-poppins text-xl font-bold text-brand-accent ">{s.value}</div>
              <div className="text-[11px] text-brand-muted ">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
