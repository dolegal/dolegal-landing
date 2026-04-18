"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { DoLegalWordmark } from "./dolegal-wordmark";
import { DocxFileIcon, PdfFileIcon } from "./hero-document-icons";

/** ~8.5s per slide — five scenarios cycle in under 45s */
const ROTATE_MS = 8_500;
const TYPE_MS = 16;

type DropPhase = "idle" | "dropped" | "analyzing";

type PreviewUseCase = {
  question: string;
  answerTitle: string;
  answerBody: string;
  tags?: string[];
  withAttachment?: boolean;
  withExport?: boolean;
  exportPdfName?: string;
  exportDocxName?: string;
};

export function HeroDoodleCanvas() {
  const t = useTranslations("landing");
  const useCases = useMemo(
    () => t.raw("hero.previewUseCases") as PreviewUseCase[],
    [t]
  );
  const slideCount = useCases.length;

  const [slide, setSlide] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [displayQuestion, setDisplayQuestion] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [dropPhase, setDropPhase] = useState<DropPhase>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const s = useCases[slide % slideCount] ?? useCases[0];
  const needsAttachment = Boolean(s.withAttachment);
  const showExport = Boolean(s.withExport);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReducedMotion(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => setSlide((x) => (x + 1) % slideCount), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, slideCount]);

  useEffect(() => {
    if (!needsAttachment) return;

    if (reducedMotion) {
      const raf = requestAnimationFrame(() => setDropPhase("analyzing"));
      return () => cancelAnimationFrame(raf);
    }

    const kick = window.setTimeout(() => {
      setDropPhase("idle");
    }, 0);
    const t1 = window.setTimeout(() => setDropPhase("dropped"), 700);
    const t2 = window.setTimeout(() => setDropPhase("analyzing"), 1650);
    return () => {
      clearTimeout(kick);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [slide, reducedMotion, needsAttachment]);

  const contextReady = !needsAttachment || reducedMotion || dropPhase === "analyzing";

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!contextReady) {
      if (!reducedMotion) {
        const clear = window.setTimeout(() => {
          setDisplayQuestion("");
          setTypingDone(false);
        }, 0);
        return () => clearTimeout(clear);
      }
      return;
    }

    if (reducedMotion) {
      const raf = requestAnimationFrame(() => {
        setDisplayQuestion(s.question);
        setTypingDone(true);
      });
      return () => cancelAnimationFrame(raf);
    }

    const full = s.question;
    let idx = 0;

    const step = () => {
      idx += 1;
      setDisplayQuestion(full.slice(0, idx));
      if (idx >= full.length) {
        setTypingDone(true);
        return;
      }
      const ch = full[idx - 1];
      const delay = ch === " " || ch === "\n" ? TYPE_MS * 0.45 : TYPE_MS;
      timerRef.current = setTimeout(step, delay);
    };

    const kickoff = window.setTimeout(() => {
      setDisplayQuestion("");
      setTypingDone(false);
      timerRef.current = setTimeout(step, TYPE_MS * 1.1);
    }, 0);

    return () => {
      clearTimeout(kickoff);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [slide, s.question, reducedMotion, contextReady]);

  const showCaret =
    contextReady && !reducedMotion && !typingDone && displayQuestion.length < s.question.length;

  const exportPdf = s.exportPdfName ?? t("hero.previewExportPdfName");
  const exportDocx = s.exportDocxName ?? t("hero.previewExportDocxName");
  const tags = s.tags && s.tags.length > 0 ? s.tags : null;

  const questionBody = (
    <div
      className={`min-h-[4.5rem] px-4 py-4 text-[15px] leading-[1.55] text-black/[0.82] md:min-h-[5rem] md:px-5 md:text-[16px] ${
        needsAttachment ? "bg-white" : "bg-neutral-50/90"
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      {!contextReady && needsAttachment ? (
        <span className="text-black/28">{t("hero.previewWaitingQuestion")}</span>
      ) : (
        <>
          <span className="whitespace-pre-wrap">{displayQuestion}</span>
          {showCaret ? (
            <span
              className="ml-px inline-block min-h-[1em] w-[2px] translate-y-px animate-pulse bg-[#1d1d1f]/55 align-baseline motion-reduce:animate-none"
              aria-hidden
            />
          ) : null}
        </>
      )}
    </div>
  );

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="hero-preview-card-idle overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_48px_rgba(0,0,0,0.07)] md:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <DoLegalWordmark className="[font-family:var(--font-playfair)] text-xl font-semibold tracking-tight text-[#1d1d1f] md:text-2xl" />
          <span className="shrink-0 rounded-full border border-black/10 bg-neutral-50 px-3 py-1.5 text-[11px] font-medium tracking-wide text-black/50">
            {t("hero.previewBadge")}
          </span>
        </div>

        <div className="space-y-8">
          <section>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-black/40">
              {t("hero.previewQuestionLabel")}
            </p>

            {needsAttachment ? (
              <div className="overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <div className="border-b border-black/[0.06] bg-gradient-to-b from-neutral-50/95 to-neutral-50/40 px-4 py-3.5 md:px-5">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-black/38">
                    {t("hero.previewAttachmentLabel")}
                  </p>
                  <div
                    key={dropPhase}
                    className="hero-context-strip min-h-[3.25rem] motion-safe:transition-opacity motion-safe:duration-300"
                  >
                    {dropPhase === "idle" ? (
                      <div className="flex gap-3">
                        <span className="inline-flex h-10 w-8 shrink-0 items-center justify-center rounded-md border border-black/8 bg-white shadow-sm">
                          <PdfFileIcon />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] leading-snug text-black/70 md:text-[14px]">
                            {t("hero.previewAttachmentIdle")}
                          </p>
                          <p className="mt-1 text-[11px] text-black/38">{t("hero.previewDropzoneFormats")}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 sm:items-center">
                        <span className="inline-flex h-10 w-8 shrink-0 items-center justify-center">
                          <PdfFileIcon />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-mono text-[12px] font-semibold text-[#1d1d1f] md:text-[13px]">
                            {t("hero.previewAnalyzedFile")}
                          </p>
                          {dropPhase === "dropped" ? (
                            <p className="mt-1 text-[12px] text-black/45">{t("hero.previewAnalyzing")}</p>
                          ) : (
                            <>
                              <p className="mt-1 text-[12px] font-medium text-black/65">{t("hero.previewAnalyzing")}</p>
                              <p className="mt-0.5 text-[12px] leading-relaxed text-black/42">
                                {t("hero.previewAnalyzeDetail")}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {questionBody}
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                {questionBody}
              </div>
            )}
          </section>

          {typingDone ? (
            <section key={slide} className="space-y-8">
              <div>
                <p className="hero-ans-label mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-black/40">
                  {t("hero.previewAnswerLabel")}
                </p>
                <div className="rounded-xl border border-black/[0.06] bg-white px-4 py-4 md:px-5 md:py-5">
                  <p className="hero-ans-1 text-[13px] font-semibold text-[#1d1d1f] md:text-sm">{s.answerTitle}</p>
                  <p className="hero-ans-2 mt-2 line-clamp-4 text-[14px] leading-relaxed text-black/65 md:line-clamp-none md:text-[15px]">
                    {s.answerBody}
                  </p>
                  {tags ? (
                    <p className="hero-ans-3 mt-4 border-t border-black/[0.06] pt-4 text-[12px] leading-relaxed text-black/45">
                      {tags.join(" · ")}
                    </p>
                  ) : null}

                  {showExport ? (
                    <div className="hero-ans-export mt-5 border-t border-black/[0.06] pt-5">
                      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-black/40">
                        {t("hero.previewExportLabel")}
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        <div className="flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border border-black/[0.07] bg-neutral-50/90 px-3 py-2.5">
                          <span className="inline-flex h-10 w-8 shrink-0 items-center justify-center">
                            <PdfFileIcon />
                          </span>
                          <span className="truncate font-mono text-[12px] font-medium text-black/75">{exportPdf}</span>
                        </div>
                        <div className="flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border border-black/[0.07] bg-neutral-50/90 px-3 py-2.5">
                          <span className="inline-flex h-10 w-8 shrink-0 items-center justify-center">
                            <DocxFileIcon />
                          </span>
                          <span className="truncate font-mono text-[12px] font-medium text-black/75">{exportDocx}</span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}
        </div>

        {!reducedMotion ? (
          <div className="mt-8 h-[3px] overflow-hidden rounded-full bg-black/[0.06]" aria-hidden>
            <div
              key={slide}
              className="hero-preview-progress h-full origin-left rounded-full bg-black/25"
              style={{ animationDuration: `${ROTATE_MS}ms` }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
