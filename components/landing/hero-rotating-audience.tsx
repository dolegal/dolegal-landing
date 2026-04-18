"use client";

import { useEffect, useState } from "react";

const ROTATE_MS = 2800;

export function HeroRotatingAudience({ items }: { items: string[] }) {
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!mounted || reduceMotion || items.length < 2) return;
    const intervalId = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ROTATE_MS);
    return () => window.clearInterval(intervalId);
  }, [mounted, reduceMotion, items.length]);

  if (!mounted || reduceMotion) {
    const text = reduceMotion ? items.join(", ") : items[0] ?? "";
    return (
      <em className="font-normal italic">
        {text}
        {text ? "." : null}
      </em>
    );
  }

  return (
    <em className="font-normal italic">
      <span className="inline-block min-h-[1.2em] align-bottom">
        <span
          key={index}
          aria-live="polite"
          aria-atomic="true"
          className="hero-audience-slide-up inline-block [font-family:inherit]"
        >
          {items[index]}.
        </span>
      </span>
    </em>
  );
}
