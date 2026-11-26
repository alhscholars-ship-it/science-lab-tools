"use client";

import { useEffect, useRef, useState } from "react";

import {
  clearLearningMemory,
  createDefaultLearningMemory,
  loadLearningMemory,
  saveLearningMemory,
  type LearningLanguage,
  type LearningLevel,
  type LearningMemory,
} from "@/lib/ai/learning-memory";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  data?: {
    formula: string | null;
    example: string | null;
    calculation?: {
      name: string;
      result: string;
    } | null;
    calculators: string[];
    guides: string[];
  };
};

type TutorApiResponse = {
  success?: boolean;
  error?: string;
  data?: {
    introduction?: string;
    explanation?: string;
    formula?: string | null;
    example?: string | null;
    calculation?: {
      name: string;
      result: string;
    } | null;
    calculators?: string[];
    guides?: string[];
  };
};

export function ScienceAIFloatingWidget() {
  const [showMemorySettings, setShowMemorySettings] =
    useState(false);

  const [learningMemory, setLearningMemory] =
    useState<LearningMemory>(createDefaultLearningMemory);

  const [memoryError, setMemoryError] = useState("");

  useEffect(() => {
    try {
      setLearningMemory(loadLearningMemory(window.localStorage));
    } catch {
      setMemoryError("Browser storage is unavailable.");
    }
  }, []);

  function updateMemory(next: LearningMemory) {
    setMemoryError("");

    try {
      if (next.enabled) {
        if (saveLearningMemory(window.localStorage, next)) {
          setLearningMemory(next);
        } else {
          setMemoryError("Unable to save learning preferences.");
        }
      } else {
        if (clearLearningMemory(window.localStorage)) {
          setLearningMemory(createDefaultLearningMemory());
        } else {
          setMemoryError("Unable to clear saved memory.");
        }
      }
    } catch {
      setMemoryError("Browser storage is unavailable.");
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const nextId = useRef(1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function askQuestion() {
    const prompt = question.trim();
    if (!prompt || loading) return;

    const userMessage: ChatMessage = {
      id: nextId.current++,
      role: "user",
      content: prompt,
    };

    const conversation = messages
      .filter((message) => message.role === "user" || message.role === "assistant")
      .slice(-8)
      .map((message) => ({
        role: message.role,
        content: message.content.slice(0, 1200),
      }));

    setMessages((current) => [...current, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt, conversation }),
      });

      const result = (await response.json()) as TutorApiResponse;

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.error || "The science tutor could not answer.");
      }

      const data = result.data;
      const content = [
        data.introduction,
        data.explanation,
      ].filter(Boolean).join("\n\n");

      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "assistant",
          content: content || "I could not generate an explanation. Please try again.",
          data: {
            formula: data.formula ?? null,
            example: data.example ?? null,
            calculation: data.calculation ?? null,
            calculators: data.calculators ?? [],
            guides: data.guides ?? [],
          },
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function startNewChat() {
    setMessages([]);
    setQuestion("");
    inputRef.current?.focus();
  }

  return (
    <div className="science-ai-widget">
      {isOpen && (
        <section
          className="science-ai-panel"
          role="dialog"
          aria-label="AI Science Assistant"
          aria-modal="false"
        >
          {showMemorySettings && (
            <div
              className="science-ai-memory-settings"
              aria-label="AI learning memory settings"
            >
              <h3>Learning Memory</h3>

              {memoryError && (
                <p role="alert" className="science-ai-memory-error">
                  {memoryError}
                </p>
              )}

              <label>
                <input
                  type="checkbox"
                  checked={learningMemory.enabled}
                  onChange={(event) =>
                    updateMemory({
                      ...learningMemory,
                      enabled: event.target.checked,
                    })
                  }
                />
                Enable learning memory
              </label>

              <label>
                Preferred language
                <select
                  value={learningMemory.language}
                  disabled={!learningMemory.enabled}
                  onChange={(event) =>
                    updateMemory({
                      ...learningMemory,
                      language:
                        event.target.value as LearningLanguage,
                    })
                  }
                >
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Roman Urdu">Roman Urdu</option>
                </select>
              </label>

              <label>
                Learning level
                <select
                  value={learningMemory.level}
                  disabled={!learningMemory.enabled}
                  onChange={(event) =>
                    updateMemory({
                      ...learningMemory,
                      level:
                        event.target.value as LearningLevel,
                    })
                  }
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </label>

              <button
                type="button"
                onClick={() => updateMemory(createDefaultLearningMemory())}
              >
                Clear saved memory
              </button>

              <p>
                Preferences are saved only in this browser.
                Conversations are not stored in learning memory.
              </p>
            </div>
          )}

          <header className="science-ai-header">
            <div className="science-ai-heading">
              <span className="science-ai-avatar" aria-hidden="true">✦</span>
              <div>
                <strong>ScienceCalcHub AI Assistant</strong>
                <span>Biology · Genetics · Microbiology · Physics</span>
              </div>
            </div>

            <div className="science-ai-header-actions">
              <button
                type="button"
                onClick={() => setShowMemorySettings((value) => !value)}
                aria-label="Learning memory settings"
                aria-expanded={showMemorySettings}
              >
                Memory
              </button>
              <button
                type="button"
                onClick={startNewChat}
                aria-label="Start a new chat"
                title="New chat"
              >
                New
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI assistant"
                title="Close"
              >
                ×
              </button>
            </div>
          </header>

          <div className="science-ai-messages" ref={messagesRef} aria-live="polite">
            {messages.length === 0 && (
              <div className="science-ai-welcome">
                <h2>What would you like to learn?</h2>
                <p>Ask a science question. I can help explain concepts and find related calculators and guides.</p>
                <div className="science-ai-suggestions">
                  {[
                    "How does DNA replication work?",
                    "Explain quantum entanglement",
                    "What is bacterial resistance?",
                  ].map((suggestion) => (
                    <button
                      type="button"
                      key={suggestion}
                      onClick={() => setQuestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <article
                className={`science-ai-message science-ai-message--${message.role}`}
                key={message.id}
              >
                <span className="science-ai-message-label">
                  {message.role === "user" ? "You" : "AI Assistant"}
                </span>
                <p>{message.content}</p>

                {message.data?.formula && (
                  <div className="science-ai-extra">
                    <strong>Formula</strong>
                    <p>{message.data.formula}</p>
                  </div>
                )}

                {message.data?.calculation && (
                  <div className="science-ai-extra">
                    <strong>{message.data.calculation.name}</strong>
                    <p>{message.data.calculation.result}</p>
                  </div>
                )}

                {message.data?.example && (
                  <div className="science-ai-extra">
                    <strong>Example</strong>
                    <p>{message.data.example}</p>
                  </div>
                )}

                {Boolean(message.data?.calculators.length) && (
                  <div className="science-ai-extra">
                    <strong>Related calculators</strong>
                    <ul>
                      {message.data?.calculators.map((link) => (
                        <li key={link}><a href={link}>{link}</a></li>
                      ))}
                    </ul>
                  </div>
                )}

                {Boolean(message.data?.guides.length) && (
                  <div className="science-ai-extra">
                    <strong>Related guides</strong>
                    <ul>
                      {message.data?.guides.map((link) => (
                        <li key={link}><a href={link}>{link}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}

            {loading && (
              <p className="science-ai-thinking" role="status">
                Thinking with the local science AI…
              </p>
            )}
          </div>

          <form
            className="science-ai-composer"
            onSubmit={(event) => {
              event.preventDefault();
              void askQuestion();
            }}
          >
            <label className="science-ai-sr-only" htmlFor="science-ai-question">
              Ask a science question
            </label>
            <textarea
              id="science-ai-question"
              ref={inputRef}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void askQuestion();
                }
              }}
              placeholder="Ask about biology, genetics, physics…"
              rows={2}
              maxLength={4000}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              aria-label="Send question"
            >
              {loading ? "…" : "Send"}
            </button>
          </form>

          <p className="science-ai-privacy">
            Temporary chat only. Messages are not saved in this widget.
          </p>
        </section>
      )}

      <button
        type="button"
        className="science-ai-launcher"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close science AI assistant" : "Open science AI assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? "×" : "✦"}
        {!isOpen && <span>Ask AI Assistant</span>}
      </button>
    </div>
  );
}
