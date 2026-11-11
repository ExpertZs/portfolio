"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { MdAutoAwesome } from "react-icons/md";
import ChatbotModal from "./ChatbotModal";

/** Open the chat from anywhere: window.dispatchEvent(new CustomEvent("open-chat", { detail: { prompt } })) */
export const openChat = (prompt?: string) =>
  window.dispatchEvent(new CustomEvent("open-chat", { detail: { prompt } }));

export default function ChatIcon() {
  const reduce = useReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [hint, setHint] = useState(false);

  const toggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

  useEffect(() => {
    const handler = (event: Event) => {
      const prompt = (event as CustomEvent<{ prompt?: string }>).detail?.prompt;
      setPendingPrompt(prompt?.trim() ? prompt : null);
      setIsModalOpen(true);
    };
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  // A one-time friendly nudge a few seconds in, then it tucks away.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("chat-hint") === "1";
    } catch {
      // storage blocked: just show it
    }
    if (seen) return;
    const show = setTimeout(() => setHint(true), 4000);
    const hide = setTimeout(() => {
      setHint(false);
      try {
        sessionStorage.setItem("chat-hint", "1");
      } catch {
        // ignore
      }
    }, 11000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) setHint(false);
  }, [isModalOpen]);

  const clearPrompt = useCallback(() => setPendingPrompt(null), []);

  return (
    <>
      <AnimatePresence>
        {!isModalOpen && (
          <motion.div
            key="chat-fab"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
          >
            <AnimatePresence>
              {hint && (
                <motion.button
                  type="button"
                  onClick={toggleModal}
                  initial={{ opacity: 0, x: 16, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 16, scale: 0.9 }}
                  className="relative rounded-2xl border border-brand-border bg-brand-surface px-4 py-2 text-sm font-medium text-brand-text shadow-xl backdrop-blur dark:border-brand-border dark:bg-brand-surface "
                >
                  Ask me anything about Zahidul 👋
                  <span
                    aria-hidden
                    className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r border-t border-brand-border bg-white dark:border-brand-border dark:bg-brand-surface"
                  />
                </motion.button>
              )}
            </AnimatePresence>

            <button
              type="button"
              aria-label="Open AI chat"
              onClick={toggleModal}
              className="group relative flex h-14 items-center overflow-hidden rounded-full brand-action text-white shadow-xl shadow-indigo-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300/60"
            >
              {/* soft pulsing ring */}
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full ring-2 ring-indigo-300/70"
                  animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                <motion.span
                  animate={reduce ? undefined : { rotate: [0, 15, -10, 0], scale: [1, 1.12, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2 }}
                  className="flex"
                >
                  <MdAutoAwesome className="text-2xl" />
                </motion.span>
              </span>
              <span className="max-w-0 whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[120px] group-hover:pr-5 group-hover:opacity-100 group-focus-visible:max-w-[120px] group-focus-visible:pr-5 group-focus-visible:opacity-100">
                Ask my AI
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <ChatbotModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        initialPrompt={pendingPrompt}
        onPromptConsumed={clearPrompt}
      />
    </>
  );
}
