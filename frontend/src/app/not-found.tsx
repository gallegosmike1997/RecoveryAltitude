import Link from "next/link";

import { FadeInSection } from "@/components/recovery-altitude/FadeInSection";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "48px 24px",
        textAlign: "center",
        background: "var(--ra-ivory)",
        color: "var(--ra-navy)",
      }}
    >
      <FadeInSection>
        <p
          style={{
            color: "var(--ra-teal)",
            fontFamily: "var(--ra-font-mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Recovery Altitude / lost route
        </p>
        <h1
          style={{
            margin: "12px 0 0",
            fontFamily: "var(--ra-font-display)",
            fontSize: "clamp(48px, 8vw, 80px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
          }}
        >
          This trail doesn&apos;t go anywhere.
        </h1>
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <p
          style={{
            maxWidth: "440px",
            color: "var(--ra-ink-muted)",
            fontSize: "17px",
            lineHeight: 1.4,
          }}
        >
          The page you were looking for has moved or no longer exists. Let&apos;s get
          you back to a route that does.
        </p>
      </FadeInSection>
      <FadeInSection delay={0.2}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 28px",
            background: "var(--ra-navy)",
            color: "var(--ra-ivory)",
            fontFamily: "var(--ra-font-display)",
            fontSize: "17px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Return to the overview <span aria-hidden="true">↖</span>
        </Link>
      </FadeInSection>
    </div>
  );
}
