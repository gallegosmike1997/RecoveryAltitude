import Link from "next/link";

import { RecoveryHeader } from "./RecoveryHeader";
import { ProgramsSection } from "./ProgramsSection";
import { descriptor } from "./data";
import styles from "./Landing.module.css";
import type { HeaderVariant } from "./types";

interface RecoveryLandingPageProps {
  variant: HeaderVariant;
  title: string;
  description: string;
}

const routeSections = [
  {
    id: "altitude-wellness",
    label: "Altitude wellness",
    summary: "Acclimation, capacity, and the conditions that help you keep going.",
  },
  {
    id: "recovery-support",
    label: "Recovery support",
    summary: "Guidance for the next stage, from the first step to the next objective.",
  },
  {
    id: "approach",
    label: "Our approach",
    summary: "A steadier return built around context, patience, and useful progress.",
  },
  {
    id: "resources",
    label: "Resources",
    summary: "Practical notes for people preparing for the outdoors again.",
  },
  {
    id: "about",
    label: "About",
    summary: "Meet the people and perspective behind Recovery Altitude.",
  },
];

const variantLinks: Array<{ href: string; label: string; note: string }> = [
  {
    href: "/trailhead",
    label: "Two-rail trailhead",
    note: "Quiet ivory rails for clear service discovery",
  },
  {
    href: "/summit-gate",
    label: "Summit gate",
    note: "A deep-navy masthead with an architectural brand plate",
  },
  {
    href: "/field-register",
    label: "Field register",
    note: "A numbered alpine route line with stitched field energy",
  },
];

export function RecoveryLandingPage({ variant, title, description }: RecoveryLandingPageProps) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <RecoveryHeader activeKey="programs" variant={variant} />
      <main id="main-content">
        <section className={styles.intro}>
          <div className={styles.introCopy}>
            <p className={styles.eyebrow}>Recovery Altitude / {variant.replace("-", " ")}</p>
            <h1>{title}</h1>
            <p className={styles.introDescription}>{description}</p>
            <div className={styles.introActions}>
              <a className={styles.textAction} href="#programs">
                Explore the routes <span aria-hidden="true">↘</span>
              </a>
              <span className={styles.actionDivider} aria-hidden="true" />
              <a className={styles.textAction} href="#approach">
                Read our approach <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>
          <aside className={styles.routeMarker} aria-label="Recovery Altitude descriptor">
            <span className={styles.routeMarkerLine} aria-hidden="true" />
            <p>{descriptor}</p>
            <span className={styles.routeMarkerCode}>RA / 01</span>
          </aside>
        </section>

        <ProgramsSection />

        <section className={styles.routeSection} aria-labelledby="routes-title">
          <div className={styles.routeSectionHeader}>
            <p className={styles.eyebrow}>Beyond the programs</p>
            <h2 id="routes-title">Useful next steps, without the noise.</h2>
          </div>
          <div className={styles.routeRows}>
            {routeSections.map((section, index) => (
              <article className={styles.routeRow} id={section.id} key={section.id}>
                <span className={styles.routeNumber}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{section.label}</h3>
                <p>{section.summary}</p>
                <a aria-label={`Read more about ${section.label}`} href="#consultation">
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.consultationBand} id="consultation">
          <div>
            <p className={styles.eyebrow}>A conversation is a good place to start.</p>
            <h2>Make the next return more considered.</h2>
          </div>
          <a className={styles.consultationLink} href="mailto:hello@recoveryaltitude.example">
            Book a consultation <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section className={styles.variantRail} aria-labelledby="variant-title">
          <div>
            <p className={styles.eyebrow}>Design archive</p>
            <h2 id="variant-title">Header studies, kept for reference.</h2>
            <p className={styles.archiveNote}>
              The production header is the two-rail trailhead. The other two
              directions remain viewable as design studies.
            </p>
          </div>
          <div className={styles.variantList}>
            {variantLinks.map((link, index) => (
              <Link className={styles.variantLink} href={link.href} key={link.href}>
                <span className={styles.routeNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <strong>{link.label}</strong>
                  <small>{link.note}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>Recovery Altitude</span>
        <span>Outdoor recovery &amp; altitude wellness</span>
        <span>Built for the next step.</span>
      </footer>
    </div>
  );
}
