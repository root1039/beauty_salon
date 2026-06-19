"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="px-4 mb-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left"
        style={{
          background: "white",
          border: "1px solid var(--border)",
          cursor: "pointer",
        }}
      >
        <span
          className="text-sm font-medium"
          style={{
            fontFamily: "var(--font-shippori), serif",
            color: "var(--charcoal)",
          }}
        >
          よくある質問
        </span>
        <ChevronDown
          size={18}
          style={{
            color: "var(--rose)",
            transition: "transform 0.25s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl p-5"
              style={{
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-sm font-medium mb-2"
                style={{
                  fontFamily: "var(--font-shippori), serif",
                  color: "var(--charcoal)",
                }}
              >
                Q. {faq.q}
              </p>
              <p
                className="text-xs leading-5"
                style={{ color: "var(--muted)" }}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
