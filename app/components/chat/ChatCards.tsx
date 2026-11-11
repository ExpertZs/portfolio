"use client";

import Link from "next/link";
import { presentationProjects as projects } from "@/lib/presentation";

export type CardRef =
  | { type: "project"; id: string }
  | { type: "contact" };

const MARKER = /\[\[(project|contact)(?::([^\]\s]+))?\]\]/g;

/** Splits a streamed reply into visible text and the cards the model asked for. */
export function parseReply(raw: string): { text: string; cards: CardRef[] } {
  const cards: CardRef[] = [];
  const seen: Record<string, boolean> = {};
  const withoutComplete = raw.replace(MARKER, (_m, type: string, id?: string) => {
    const key = `${type}:${id ?? ""}`;
    if (!seen[key]) {
      seen[key] = true;
      if (type === "contact") cards.push({ type: "contact" });
      else if (id) cards.push({ type: type as "project", id });
    }
    return "";
  });
  // Hide a marker that is still being streamed, e.g. "[[proj".
  const text = withoutComplete.replace(/\[\[[^\]]*$/, "").trim();
  return { text, cards };
}

const cardBase =
  "block rounded-lg border border-brand-border bg-brand-surface p-3 text-sm shadow-sm transition hover:border-brand-accent dark:bg-brand-surface";

export default function ChatCards({ cards }: { cards: CardRef[] }) {
  if (!cards.length) return null;
  return (
    <div className="mt-2 flex flex-col gap-2">
      {cards.slice(0, 4).map((card, index) => {
        if (card.type === "contact") {
          return (
            <Link
              key={index}
              href="/contact"
              className="rounded-lg brand-action px-3 py-2 text-center text-sm font-medium text-white"
            >
              Contact me / book a call
            </Link>
          );
        }
        if (card.type === "project") {
          const project = projects.find((p) => String(p.id) === card.id);
          if (!project) return null;
          const href = project.live_link || project.github_link;
          return (
            <div key={index} className={cardBase}>
              <div className="font-semibold text-brand-accent ">
                {project.project_title}
              </div>
              <div className="mt-1 text-brand-muted ">
                {project.project_details}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {(project.stack ?? []).slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-gray-200 px-1.5 py-0.5 text-[11px] dark:bg-gray-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-brand-accent underline "
                >
                  {project.live_link ? "Live demo" : "View on GitHub"}
                </a>
              )}
            </div>
          );
        }
        
        return null;
      })}
    </div>
  );
}
