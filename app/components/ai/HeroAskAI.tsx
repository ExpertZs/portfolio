"use client";

import { useState } from "react";
import { openChat } from "../display/ChatIcon";

const SUGGESTIONS = [
  "What AI projects have you built?",
  "What's your tech stack?",
  "Are you available for hire?",
];

export default function HeroAskAI() {
  const [value, setValue] = useState("");

  const submit = (text: string) => {
    const prompt = text.trim();
    if (!prompt) return;
    openChat(prompt);
    setValue("");
  };

  return (
    <div className="mt-6 w-full max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-surface px-3 py-2 shadow-md shadow-indigo-500/10 backdrop-blur dark:bg-brand-surface"
      >
        <span aria-hidden>✨</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={500}
          aria-label="Ask my AI assistant"
          placeholder="Ask my AI anything about my work…"
          className="w-full bg-transparent text-sm text-black outline-none placeholder:text-brand-muted dark:text-white md:text-base"
        />
        <button
          type="submit"
          className="rounded-lg brand-action px-3 py-1 text-sm text-white hover:brightness-105"
        >
          Ask
        </button>
      </form>
      <div className="mt-2 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => submit(s)}
            className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-accent hover:bg-brand-soft "
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
