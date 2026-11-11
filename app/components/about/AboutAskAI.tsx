"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MdAutoAwesome } from "react-icons/md";
import { openChat } from "../display/ChatIcon";

const QUESTIONS = [
  "What are you working on right now?",
  "What was your biggest project?",
  "Which technologies do you enjoy most?",
  "Are you open to relocating or remote work?",
];

export default function AboutAskAI({ firstName }: { firstName: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      aria-labelledby="ask-about-heading"
      className="relative mx-auto my-20 w-full max-w-6xl overflow-hidden rounded-3xl border border-brand-border brand-panel p-8 text-center md:p-12"
    >
      <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-brand-accent ">
          <MdAutoAwesome /> Curious?
        </span>
        <h2 id="ask-about-heading" className="mt-2 font-poppins text-2xl font-bold text-brand-text md:text-4xl">
          Ask my AI about {firstName}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-brand-muted md:text-base">
          It knows my projects, skills and experience. Try a question, or reach out directly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => openChat(q)}
              className="rounded-full border border-brand-border bg-brand-surface px-4 py-1.5 text-sm text-brand-accent transition hover:bg-brand-soft dark:bg-brand-surface "
            >
              {q}
            </button>
          ))}
        </div>
        <Link
          href="/contact"
          className="mt-7 inline-block rounded-full brand-action px-7 py-2.5 font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-xl"
        >
          Contact me
        </Link>
      </div>
    </motion.section>
  );
}
