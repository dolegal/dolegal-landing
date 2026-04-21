"use client";

import { useEffect, useRef, useState } from "react";

type DemoKey = "vat" | "draft" | "deadline";

interface DemoBody {
  h: string;
  p: React.ReactNode;
}

interface DemoCite {
  tag: string;
  label: string;
}

interface Demo {
  q: string;
  lang: string;
  conclusion: string;
  body: DemoBody[];
  cites: DemoCite[];
}

const DEMOS: Record<DemoKey, Demo> = {
  vat: {
    q: "When must I register for VAT as an individual entrepreneur in Armenia?",
    lang: "EN",
    conclusion:
      "VAT registration becomes mandatory once turnover crosses the statutory threshold in any rolling 12-month period. After registration, invoicing and filing follow the RA Tax Code and e-invoicing rules.",
    body: [
      {
        h: "Reasoning",
        p: "Armenia's Tax Code sets a turnover-based VAT threshold measured across any 12 consecutive months, not a calendar year. On crossing it, the taxpayer becomes a VAT payer from the next transaction onward and takes on the full package of invoicing, reporting, and e-filing duties.",
      },
      {
        h: "What to do next",
        p: "Register with the State Revenue Committee, switch your invoicing to e-invoices with the required VAT attributes, and begin monthly VAT returns.",
      },
    ],
    cites: [
      { tag: "RA TC · Art. 267", label: "VAT registration threshold" },
      { tag: "RA TC · Arts. 268–271", label: "VAT payer obligations" },
      { tag: "SRC Ord. N-148", label: "E-invoicing requirements" },
    ],
  },
  draft: {
    q: "Draft a service agreement for my company.",
    lang: "EN",
    conclusion:
      "Service agreement prepared. Draft aligns with the RA Civil Code — pricing, payment terms, liability caps, and termination — with headings mapped to mandatory notice and defect-remedy rules.",
    body: [
      {
        h: "Document outline",
        p: "1. Parties & Scope · 2. Price & Payment · 3. Performance & Delivery · 4. Warranties & Liability · 5. Termination & Notice · 6. Governing Law · 7. Signatures.",
      },
      {
        h: "Download",
        p: (
          <>
            <code
              style={{
                fontFamily: "var(--mono)",
                fontSize: 13,
                color: "var(--accent)",
              }}
            >
              ⬇ service_agreement.docx
            </code>
            &nbsp;
            <span style={{ color: "var(--ink-3)", fontSize: 14 }}>
              — ready to edit
            </span>
          </>
        ),
      },
    ],
    cites: [
      { tag: "RA CC · Arts. 435–447", label: "Service & work contracts" },
      { tag: "RA CC · Arts. 314–318", label: "Price, payment, interest" },
      { tag: "RA CC · Art. 467", label: "Defect remedies" },
    ],
  },
  deadline: {
    q: "What is the deadline to register an employee after starting operations?",
    lang: "EN",
    conclusion:
      "You must register the employee within 3 working days after the employment relationship begins. The same window applies for social-security and personal-income-tax enrolment with the SRC.",
    body: [
      {
        h: "Reasoning",
        p: "The Labour Code requires the employer to register the employment relationship at its formal commencement. Implementing regulations specify a 3-working-day registration window for both labour and tax-administration purposes.",
      },
    ],
    cites: [
      { tag: "RA LC · Art. 88", label: "Employer registration duties" },
      {
        tag: "Gov.Dec. 23-N · §§ 2–3",
        label: "Employee registration procedure",
      },
    ],
  },
};

export function LiveDemo() {
  const [active, setActive] = useState<DemoKey>("vat");
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const demo = DEMOS[active];
    setTyped("");
    setIsTyping(true);

    let i = 0;
    const step = () => {
      i++;
      setTyped(demo.conclusion.slice(0, i));
      if (i < demo.conclusion.length) {
        timerRef.current = setTimeout(step, 14);
      } else {
        setIsTyping(false);
      }
    };
    timerRef.current = setTimeout(step, 14);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active]);

  const demo = DEMOS[active];

  return (
    <div>
      <div className="demo-frame" id="demo">
        <div className="demo-chrome">
          <div className="dots">
            <i />
            <i />
            <i />
          </div>
          <div>dolegal.am / research</div>
          <div>⌘K</div>
        </div>
        <div className="demo-body">
          <div className="demo-tabs">
            <button
              type="button"
              className={`demo-tab${active === "vat" ? " active" : ""}`}
              onClick={() => setActive("vat")}
            >
              VAT threshold
            </button>
            <button
              type="button"
              className={`demo-tab${active === "draft" ? " active" : ""}`}
              onClick={() => setActive("draft")}
            >
              Draft a contract
            </button>
            <button
              type="button"
              className={`demo-tab${active === "deadline" ? " active" : ""}`}
              onClick={() => setActive("deadline")}
            >
              Reg. deadline
            </button>
          </div>

          <div style={{ paddingBottom: 72 }} key={active}>
            <div className="msg-user fade-in">
              <div className="avatar">ԵՄ</div>
              <div className="msg-content">
                <div className="msg-label">Query · {demo.lang}</div>
                <div
                  className="msg-text"
                  style={{ fontStyle: "italic", color: "var(--ink)" }}
                >
                  {demo.q}
                </div>
              </div>
            </div>

            <div className="msg-user msg-ai fade-in">
              <div className="avatar ai">d</div>
              <div className="msg-content">
                <div className="msg-label">DoLegal</div>
                <div className="msg-text">
                  <div className={`conclusion${isTyping ? " caret" : ""}`}>
                    {typed}
                  </div>

                  {!isTyping && (
                    <>
                      {demo.body.map((b) => (
                        <div key={b.h}>
                          <h4>{b.h}</h4>
                          <p>{b.p}</p>
                        </div>
                      ))}

                      <div className="citations">
                        <div className="citations-title">
                          <span>Legal sources</span>
                          <span style={{ color: "var(--accent)" }}>
                            verified ↗
                          </span>
                        </div>
                        {demo.cites.map((c, i) => (
                          <div className="cite" key={c.tag}>
                            <div className="cite-num">
                              [{String(i + 1).padStart(2, "0")}]
                            </div>
                            <div className="cite-body">
                              <b>{c.tag}</b> — {c.label}
                            </div>
                            <a className="cite-link" href="#">
                              View ↗
                            </a>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="composer">
            <span className="lang-tag">EN</span>
            <input
              placeholder="Ask a question in Armenian, Russian, or English…"
              readOnly
            />
            <button className="send" aria-label="Send" type="button">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h9m-3-3 3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <p className="demo-note">↑ Live preview · switch questions above</p>
    </div>
  );
}
