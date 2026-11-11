"use client";

import { FaTimes, FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MdArrowOutward, MdAutoAwesome } from "react-icons/md";
import SmartImage from "@/app/components/display/SmartImage";
import Link from "next/link";
import { IoMdSend } from "react-icons/io";
import {
  BsMicFill,
  BsMicMuteFill,
  BsVolumeMuteFill,
  BsVolumeUpFill,
} from "react-icons/bs";
import Markdown from "../chat/Markdown";
import ChatCards, { parseReply } from "../chat/ChatCards";

type SpeechRecognitionWindow = Window &
  typeof globalThis & {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  };

type ChatMessage = { sender: "user" | "bot"; text: string };

const STORAGE_KEY = "zahidul-chatMessages";
const MAX_INPUT_CHARS = 500;

const faq = [
 {question:'What services do you offer?',answer:'I work on React and Next.js applications, backend integrations, AI-powered features, and performance and testing.'},
 {question:'What are your shared projects?',answer:'My resume includes Raggie, MOE Guide, and Suirikyu, along with Brand Cloud corporate and service websites and reputation monitoring workflows. [[project:1]] [[project:2]] [[project:3]]'},
 {question:'What is your experience?',answer:'I have 4+ years of full-stack software engineering experience, including work with Ninja Digital Innovations, Brand Cloud, Suncreer, and Bconns Technologies.'},
 {question:'Do you have experience with AI integrations?',answer:'My resume lists LLM integration, RAG, agent workflows, and streaming responses. On Raggie, I implemented Next.js and TypeScript features, typed APIs, and database-backed data flows.'},
 {question:'How can I discuss a role or project?',answer:'Email zs.engineer1@gmail.com or use the contact page to discuss scope and availability. [[contact]]'}
];

const ChatbotModal = ({
  isOpen,
  onClose,
  initialPrompt,
  onPromptConsumed,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string | null;
  onPromptConsumed?: () => void;
}) => {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(false);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] =
    useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const recognitionRef = useRef<any>(null);
  const handleSendMessageRef = useRef<((overrideText?: string) => void) | undefined>(undefined);
  const shouldSpeakNextReplyRef = useRef(false);

  messagesRef.current = messages;

  const stopSpeaking = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
  };

  const pickMaleVoice = (voices: SpeechSynthesisVoice[]) => {
    const hints = [
      "male",
      "daniel",
      "david",
      "mark",
      "mike",
      "fred",
      "alex",
      "james",
      "george",
    ];
    const isEnglish = (voice: SpeechSynthesisVoice) =>
      voice.lang?.toLowerCase().startsWith("en");
    const hasMaleHint = (voice: SpeechSynthesisVoice) =>
      hints.some((hint) => voice.name?.toLowerCase().includes(hint));

    return (
      voices.find((voice) => isEnglish(voice) && hasMaleHint(voice)) ??
      voices.find(hasMaleHint) ??
      voices.find(isEnglish)
    );
  };

  const speakReply = (rawText: string) => {
    const text = parseReply(rawText)
      .text.replace(/[*`#]/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    if (
      !text.trim() ||
      !speechSynthesisSupported ||
      typeof window === "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const preferredVoice = pickMaleVoice(window.speechSynthesis.getVoices());
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    utterance.rate = 1;
    utterance.pitch = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Restore saved chat once. (Previously the save effect ran first and wiped it.)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setMessages(parsed.filter((m) => m && ["user","bot"].includes(m.sender) && typeof m.text === "string").slice(-40).map(m=>({...m,text:m.text.slice(0,12000)})));
      }
    } catch {
      // ignore corrupted storage
    }
    setStorageLoaded(true);
  }, []);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
    if (storageLoaded && !isStreaming) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
      } catch {
        // storage full or blocked
      }
    }
  }, [messages, storageLoaded, isStreaming]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const speechWindow = window as SpeechRecognitionWindow;
    const SpeechRecognitionClass =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.onresult = (event: any) => {
        const transcript =
          event?.results?.[0]?.[0]?.transcript?.toString().trim() || "";
        if (transcript) {
          shouldSpeakNextReplyRef.current = true;
          setInputValue(transcript);
          handleSendMessageRef.current?.(transcript);
        }
      };
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event);
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.onstart = () => {
        setIsVoiceEnabled((prev) => (prev ? prev : true));
        setIsListening(true);
      };
      recognitionRef.current = recognition;
    }

    setSpeechRecognitionSupported(!!SpeechRecognitionClass);
    setSpeechSynthesisSupported(
      typeof speechWindow.speechSynthesis !== "undefined"
    );

    return () => {
      recognitionRef.current?.stop?.();
      speechWindow.speechSynthesis?.cancel();
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    } else {
      recognitionRef.current?.stop?.();
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsListening(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isVoiceEnabled && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [isVoiceEnabled]);

  const setBotText = (index: number, text: string) =>
    setMessages((prev) => {
      if (!prev[index]) return prev;
      const updated = [...prev];
      updated[index] = { sender: "bot", text };
      return updated;
    });

  const handleSendMessage = async (overrideText?: string) => {
    const textToSend = (overrideText ?? inputValue).trim().slice(0, MAX_INPUT_CHARS);
    if (!textToSend || isStreaming) return;

    stopSpeaking();

    const shouldSpeakResponse =
      isVoiceEnabled || shouldSpeakNextReplyRef.current;
    shouldSpeakNextReplyRef.current = false;

    const base = messagesRef.current;
    const botIndex = base.length + 1;
    // Send the last few turns so follow-ups like "tell me more" work.
    const history = [...base, { sender: "user", text: textToSend } as ChatMessage]
      .filter((m) => m.text.trim())
      .slice(-5)
      .map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: (parseReply(m.text).text || m.text).slice(0,1200),
      }));

    setMessages([
      ...base,
      { sender: "user", text: textToSend },
      { sender: "bot", text: "" },
    ]);
    setInputValue("");
    setIsStreaming(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    abortRef.current = controller;

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (response.status === 429) {
        const data = await response.json().catch(() => ({}));
        setBotText(botIndex, data.error || "You're sending messages too fast. Please wait a moment.");
        return;
      }

      let finalText = "";

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const evt = JSON.parse(line);
              if (typeof evt.d === "string") {
                finalText += evt.d;
                setBotText(botIndex, finalText);
              }
            } catch {
              // ignore a malformed line
            }
          }
        }
      } else {
        // AI unavailable: fall back to the keyword matcher so the chat still answers.
        const fallback = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: textToSend }),
          signal: controller.signal,
        });
        const data = fallback.ok ? await fallback.json() : null;
        finalText = data?.reply || "Sorry, I couldn't get a response. Please try again.";
        setBotText(botIndex, finalText);
      }

      if (!finalText.trim()) {
        setBotText(botIndex, "Sorry, I couldn't get a response. Please try again.");
      } else if (shouldSpeakResponse) {
        speakReply(finalText);
      }
    } catch (error) {
      if ((error as Error)?.name === "AbortError") {setBotText(botIndex,"The request was interrupted. Please try again.");return;}
      console.error("Error fetching AI response:", error);
      setBotText(botIndex, "Failed to get a response. Please try again.");
    } finally {
      clearTimeout(timeout);
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  });

  // Prompts sent from elsewhere on the site ("Ask AI about this project", hero chips).
  useEffect(() => {
    if (!isOpen || !initialPrompt) return;
    const t = setTimeout(() => {
      handleSendMessageRef.current?.(initialPrompt);
      onPromptConsumed?.();
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialPrompt]);

  const handleClear = () => {
    abortRef.current?.abort();
    stopSpeaking();
    setMessages([]);
    setIsStreaming(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleMicrophoneToggle = () => {
    if (!speechRecognitionSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      setIsVoiceEnabled(true);
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error("Unable to start voice recognition:", error);
      setIsListening(false);
    }
  };

  const handleVoiceToggle = () => {
    if (!speechSynthesisSupported) return;

    setIsVoiceEnabled((prev) => {
      const next = !prev;
      if (!next && typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  };

  const handleFaqClick = (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      { sender: "bot", text: answer },
    ]);
  };

  const hasStartedChatting = messages.length > 0;
  const canSend = !isStreaming && inputValue.trim().length > 0;

  const iconBtn =
    "flex h-9 w-9 items-center justify-center rounded-full text-brand-muted transition hover:bg-brand-soft hover:text-brand-accent dark:hover:bg-brand-soft ";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop: dims the page on phones, click-away on desktop */}
          <motion.div
            key="chat-backdrop"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[49] bg-black/40 backdrop-blur-[2px] min-[768px]:bg-transparent min-[768px]:backdrop-blur-0"
          />
          <motion.div
            key="chat-panel"
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio chat assistant"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-brand-surface outline-none backdrop-blur-xl dark:bg-brand-surface min-[768px]:inset-auto min-[768px]:bottom-6 min-[768px]:right-6 min-[768px]:h-[min(680px,calc(100vh-3rem))] min-[768px]:w-[420px] min-[768px]:rounded-3xl min-[768px]:border min-[768px]:border-brand-border min-[768px]:shadow-2xl min-[768px]:shadow-indigo-900/30 dark:min-[768px]:border-white/10"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-black/5 px-4 py-3 dark:border-brand-border">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 brand-panel"
              />
              <Link href="/" onClick={onClose} aria-label="Home" className="relative shrink-0">
                <span className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-indigo-400 to-violet-400" />
                <span className="relative block h-11 w-11 overflow-hidden rounded-full border-2 border-white bg-slate-900 dark:border-[#151b30]">
                  <SmartImage src="/images/zahidul_c.png" alt="" width={88} height={88} className="h-full w-full object-cover" />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-[#151b30]" />
              </Link>
              <div className="relative min-w-0 flex-1">
                <h3 className="flex items-center gap-1.5 font-poppins text-base font-semibold leading-tight text-brand-text">
                  Zahidul&apos;s AI <MdAutoAwesome className="text-brand-accent" />
                </h3>
                <p className="truncate text-xs text-brand-muted ">
                  {isStreaming ? "Thinking…" : "Online · answers from my portfolio"}
                </p>
              </div>
              <div className="relative flex items-center gap-1">
                {hasStartedChatting && (
                  <button onClick={handleClear} aria-label="Clear chat" title="Clear chat" className={iconBtn}>
                    <FaRegTrashAlt size={15} />
                  </button>
                )}
                <button onClick={onClose} aria-label="Close chat" title="Close (Esc)" className={iconBtn}>
                  <FaTimes size={18} />
                </button>
              </div>
            </div>

            {/* Chat area */}
            <div ref={chatContainerRef} role="log" aria-live="polite" aria-busy={isStreaming} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-hidden">
              {!hasStartedChatting && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
                  className="space-y-4"
                >
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                    className="rounded-2xl rounded-tl-md border border-brand-border brand-panel p-4"
                  >
                    <p className="font-poppins text-lg font-semibold text-brand-text">Hi, I&apos;m Zahidul&apos;s AI 👋</p>
                    <p className="mt-1 text-sm text-brand-muted ">
                      Ask me about his projects, skills, experience or how to work together.
                    </p>
                  </motion.div>
                  <p className="px-1 text-[11px] font-semibold uppercase tracking-widest text-brand-muted ">
                    Try asking
                  </p>
                  <div className="flex flex-col gap-2">
                    {faq.map((item) => (
                      <motion.button
                        type="button"
                        key={item.question}
                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                        whileHover={{ x: 3 }}
                        onClick={() => handleFaqClick(item.question, item.answer)}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-brand-border bg-brand-surface px-4 py-2.5 text-left text-sm text-brand-text transition hover:border-brand-border hover:bg-indigo-500/5 dark:border-brand-border dark:bg-brand-surface "
                      >
                        {item.question}
                        <MdArrowOutward className="shrink-0 text-brand-accent opacity-0 transition group-hover:opacity-100" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((message, index) => {
                const isBot = message.sender === "bot";
                const parsed = isBot ? parseReply(message.text) : null;
                const isLastBot = isBot && index === messages.length - 1;
                return (
                  <motion.div
                    key={index}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-end gap-2 ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    {isBot && (
                      <span className="mb-1 h-7 w-7 shrink-0 overflow-hidden rounded-full bg-slate-900 ring-2 ring-indigo-500/40">
                        <SmartImage src="/images/zahidul_c.png" alt="" width={56} height={56} className="h-full w-full object-cover" />
                      </span>
                    )}
                    <div
                      className={`max-w-[85%] break-words px-3.5 py-2.5 text-sm leading-relaxed ${
                        isBot
                          ? "rounded-2xl rounded-bl-md border border-black/5 bg-gray-100 text-brand-text dark:border-brand-border dark:bg-white/[0.07] "
                          : "whitespace-pre-wrap rounded-2xl rounded-br-md brand-action text-white shadow-md shadow-indigo-500/20"
                      }`}
                    >
                      {isBot && parsed ? (
                        <>
                          {parsed.text ? (
                            <Markdown text={parsed.text} />
                          ) : isLastBot && isStreaming ? (
                            <span className="flex items-center gap-1 py-1" role="status" aria-label="Typing">
                              {[0, 1, 2].map((i) => (
                                <motion.span
                                  key={i}
                                  className="h-2 w-2 rounded-full bg-indigo-500"
                                  animate={reduce ? undefined : { y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                                />
                              ))}
                            </span>
                          ) : null}
                          <ChatCards cards={parsed.cards} />
                        </>
                      ) : (
                        message.text
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Composer */}
            <div className="border-t border-black/5 px-4 pb-3 pt-3 dark:border-brand-border">
              <div className="flex items-center gap-1 rounded-full border border-brand-border bg-white py-1 pl-4 pr-1.5 shadow-sm transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/15 dark:border-brand-border dark:bg-brand-surface">
                <input
                  type="text"
                  className="min-w-0 flex-1 bg-transparent text-sm text-brand-text outline-none placeholder:text-brand-muted dark:text-white"
                  placeholder="Ask me anything…"
                  aria-label="Message"
                  maxLength={MAX_INPUT_CHARS}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  disabled={!speechSynthesisSupported}
                  aria-label={isVoiceEnabled ? "Mute spoken replies" : "Enable spoken replies"}
                  title={
                    speechSynthesisSupported
                      ? isVoiceEnabled
                        ? "Mute spoken replies"
                        : "Enable spoken replies"
                      : "Voice playback not supported in this browser"
                  }
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                    isVoiceEnabled ? "text-brand-accent " : "text-brand-muted"
                  } ${speechSynthesisSupported ? "hover:bg-brand-soft dark:hover:bg-brand-soft" : "cursor-not-allowed opacity-40"}`}
                >
                  {isVoiceEnabled ? <BsVolumeUpFill size={17} /> : <BsVolumeMuteFill size={17} />}
                </button>
                <button
                  type="button"
                  onClick={handleMicrophoneToggle}
                  disabled={!speechRecognitionSupported}
                  aria-label={isListening ? "Stop voice input" : "Start voice input"}
                  title={
                    speechRecognitionSupported
                      ? isListening
                        ? "Stop voice input"
                        : "Speak to Zahidul"
                      : "Voice input not supported in this browser"
                  }
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                    isListening ? "animate-pulse bg-red-600 text-white" : "text-brand-accent "
                  } ${speechRecognitionSupported ? "hover:bg-brand-soft dark:hover:bg-brand-soft" : "cursor-not-allowed opacity-40"}`}
                >
                  {isListening ? <BsMicMuteFill size={17} /> : <BsMicFill size={17} />}
                </button>
                <button
                  type="button"
                  aria-label="Send message"
                  disabled={!canSend}
                  onClick={() => handleSendMessage()}
                  className="flex h-10 w-10 items-center justify-center rounded-full brand-action text-white shadow-md shadow-indigo-500/30 transition enabled:hover:scale-105 disabled:opacity-40"
                >
                  <IoMdSend size={19} />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-brand-muted ">
                Answers use my resume. Chat stays in this browser; configured AI receives your questions. Verify important details.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatbotModal;
