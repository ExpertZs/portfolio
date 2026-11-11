"use client";

import Link from "next/link";
import SmartImage from "@/app/components/display/SmartImage";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MdArrowOutward, MdArrowUpward, MdAutoAwesome, MdDownload, MdOutlineEmail, MdPlace } from "react-icons/md";
import SocialIcons from "../display/SocialIcons";
import { openChat } from "../display/ChatIcon";
import { shortRole } from "@/app/lib/name";
import type { ContactInfo } from "@/types/content";

const EXPLORE = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/match", label: "AI Job Match" },
  { href: "/contact", label: "Contact" },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-1 text-sm text-brand-muted transition-colors hover:text-brand-accent "
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />
      </span>
      <MdArrowOutward className="text-xs opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </Link>
  );
}

function Footer({ contact }: { contact: ContactInfo }) {
  const path = usePathname();
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  const onContact = path === "/contact";

  return (
    <>
    <footer className="relative mt-20 overflow-hidden border-t border-brand-border bg-brand-surface backdrop-blur-xl dark:border-brand-border dark:bg-brand-surface">
      {/* Animated accent line */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-brand-soft blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-14 md:px-10">
        {/* CTA strip (not needed on the contact page itself) */}
        {!onContact && (
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mb-14 flex flex-col items-start justify-between gap-5 rounded-3xl border border-brand-border brand-panel p-7 md:flex-row md:items-center md:p-9"
          >
            <div>
              <h2 className="font-poppins text-2xl font-bold text-brand-text md:text-3xl">
                Have a project in mind?
              </h2>
              <p className="mt-1 text-sm text-brand-muted md:text-base">
                {contact.availability || "Let's talk about what I can build for you."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group flex items-center gap-1.5 rounded-full brand-action px-6 py-2.5 font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-xl"
              >
                Let&apos;s talk
                <MdArrowOutward className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <button
                type="button"
                onClick={() => openChat("I have a project in mind. What should I tell you to get started?")}
                className="flex items-center gap-1.5 rounded-full border border-brand-border px-5 py-2.5 text-sm font-medium text-brand-accent transition hover:bg-brand-soft "
              >
                <MdAutoAwesome /> Ask my AI first
              </button>
            </div>
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-10 md:grid-cols-2 min-[1024px]:grid-cols-[1.4fr_1fr_1.2fr]"
        >
          {/* Brand */}
          <motion.div variants={fade}>
            <Link href="/" className="group inline-flex items-center gap-3" aria-label="Home">
              <span className="relative h-11 w-11">
                <span aria-hidden className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-indigo-400 to-violet-400 opacity-80" />
                <span className="relative block h-full w-full overflow-hidden rounded-full border-2 border-white bg-slate-900 dark:border-slate-900">
                  <SmartImage src="/images/zahidul_c.png" alt="" width={88} height={88} className="h-full w-full object-cover" />
                </span>
              </span>
              <span>
                <span className="block font-poppins text-lg font-semibold text-brand-text">
                  Zahidul
                  <span className="brand-highlight">.</span>
                </span>
                <span className="block text-xs text-brand-muted ">{shortRole(contact.title)}</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-muted ">
              Building fast, accessible web and AI products. {contact.location && `Based in ${contact.location.split("(")[0].trim()}.`}
            </p>
            <SocialIcons socials={contact.socials} size={22} className="mt-5 !justify-start gap-x-3" />
          </motion.div>

          {/* Explore */}
          <motion.nav variants={fade} aria-label="Footer">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-muted ">Explore</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1 min-[1024px]:grid-cols-2">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact */}
          <motion.div variants={fade}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-muted ">Get in touch</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-2.5 text-brand-muted transition-colors hover:text-brand-accent "
                >
                  <MdOutlineEmail className="text-lg text-brand-accent" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              {contact.location && (
                <li className="flex items-start gap-2.5 text-brand-muted ">
                  <MdPlace className="mt-0.5 shrink-0 text-lg text-brand-accent" />
                  <span>{contact.location.split("(")[0].trim()}</span>
                </li>
              )}
              <li>
                <a
                  href="/Zahidul_Islam_Resume.pdf"
                  download="Md. Zahidul Islam Resume.pdf"
                  className="group flex items-center gap-2.5 text-brand-muted transition-colors hover:text-brand-accent "
                >
                  <MdDownload className="text-lg text-brand-accent transition-transform group-hover:translate-y-0.5" />
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-brand-border pt-6 text-center dark:border-brand-border md:flex-row md:text-left">
          <p className="text-xs text-brand-muted " suppressHydrationWarning>
            <Link href="/privacy" className="mr-4 underline underline-offset-4 hover:text-brand-accent">Privacy policy</Link>
            © {year ?? ""} {contact.full_name}. All rights reserved.
          </p>
          <p className="text-xs text-brand-muted ">
            Built with <span className="text-brand-accent ">Next.js</span> &amp; a little{" "}
            <span className="text-brand-accent ">AI</span>
          </p>
        </div>
      </div>

    </footer>
    {/* Outside the footer: its backdrop-blur would otherwise become the containing block for fixed children. */}
    <FloatingTop />
    </>
  );
}

/** A small round button that appears after scrolling, so the footer's "back to top" isn't the only way up. */
function FloatingTop() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 360, damping: 26 }}
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          className="fixed bottom-24 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-xl text-brand-accent shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-accent dark:border-brand-border dark:bg-brand-surface "
        >
          <MdArrowUpward />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default Footer;
