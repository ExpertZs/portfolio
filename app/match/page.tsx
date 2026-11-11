"use client";

import { useState } from "react";
import Link from "next/link";
import { presentationProjects as projects } from "@/lib/presentation";

type MatchResult = {
  roleTitle: string;
  summary: string;
  matches: { requirement: string; evidence: string; projectIds: number[] }[];
  gaps: string[];
  pitch: string;
  source?: string;
};

const MAX = 6000;

export default function MatchPage() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [copied, setCopied] = useState(false);

  const analyse = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/ai/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jd }),
        signal: AbortSignal.timeout(25000),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const copyPitch = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.pitch);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Clipboard unavailable. You can select and copy the intro text.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <h1 className="text-3xl font-bold text-brand-accent dark:text-white md:text-4xl">
        ✨ AI Job Match
      </h1>
      <p className="mt-2 text-brand-muted ">
        Paste a job description. The AI compares it with my real experience and
        projects, highlighting supported requirements and areas to discuss.
      </p>

      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value.slice(0, MAX))}
        rows={10}
        placeholder="Paste the job description here…"
        aria-label="Job description"
        className="mt-4 w-full rounded-xl border border-primary bg-white p-3 text-black outline-none dark:bg-brand-surface dark:text-white"
      />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-brand-muted">
          {jd.length}/{MAX} · Not saved by this portfolio.
        </span>
        <button
          type="button"
          onClick={analyse}
          disabled={loading || jd.trim().length < 40}
          className="rounded-lg brand-action px-5 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Analysing…" : "Analyse match"}
        </button>
      </div>

      <p className="mt-2 text-[11px] text-brand-muted">When configured, your text is sent to the AI provider. Avoid confidential information.</p>
      {error && <p role="alert" className="mt-4 text-brand-danger">{error}</p>}

      {result && (
        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-brand-accent ">
              {result.roleTitle || "Match summary"}
            </h2>
            <p className="mt-1 text-brand-text ">{result.summary}</p>
          </section>

          <section>
            <h3 className="font-semibold text-brand-accent ">
              Where I fit
            </h3>
            <ul className="mt-2 space-y-3">
              {result.matches.map((m, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-brand-border bg-brand-surface p-3 dark:bg-brand-surface"
                >
                  <div className="font-medium text-brand-text">
                    {m.requirement}
                  </div>
                  <div className="mt-1 text-sm text-brand-muted ">
                    {m.evidence}
                  </div>
                  {m.projectIds.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.projectIds.map((id) => {
                        const p = projects.find((x) => x.id === id);
                        if (!p) return null;
                        const href = p.live_link || p.github_link || "/projects";
                        return (
                          <a
                            key={id}
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="rounded-full border border-brand-border px-2 py-0.5 text-xs text-brand-accent hover:bg-brand-soft "
                          >
                            {p.project_title}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {result.gaps.length > 0 && (
            <section>
              <h3 className="font-semibold text-brand-accent ">
                Honest gaps
              </h3>
              <ul className="mt-2 list-disc pl-5 text-brand-text ">
                {result.gaps.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="rounded-xl border border-brand-border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-brand-accent ">
                Suggested intro
              </h3>
              <button
                type="button"
                onClick={copyPitch}
                className="text-sm text-brand-accent underline "
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-brand-text ">{result.pitch}</p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded-lg brand-action px-4 py-2 text-white"
            >
              Get in touch
            </Link>
          </section>

          <p className="text-[11px] text-brand-muted">
            {result.source}. This review is based on resume evidence, not a hiring recommendation. Verify details with me directly.
          </p>
        </div>
      )}
    </div>
  );
}
