"use client";

import { useState } from "react";

import { programs } from "./programs";
import styles from "./Programs.module.css";

const routePrompts = [
  {
    id: "basecamp-reset",
    label: "I am returning after a pause",
    note: "Start small and rebuild trust in movement.",
  },
  {
    id: "altitude-acclimation",
    label: "I want to move well at elevation",
    note: "Build capacity for altitude with a clear progression.",
  },
  {
    id: "ridge-recovery-series",
    label: "I want momentum and community",
    note: "Keep a sustainable outdoor rhythm going.",
  },
  {
    id: "summit-readiness",
    label: "I have a specific objective",
    note: "Prepare around a meaningful target date.",
  },
] as const;

export function ProgramsSection() {
  const [recommendedId, setRecommendedId] = useState<string | null>(null);
  const recommended = programs.find((program) => program.id === recommendedId);

  return (
    <section aria-labelledby="programs-title" className={styles.section} id="programs">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.eyebrow}>Programs / four routes</p>
          <h2 id="programs-title">Structured ways back, at every starting point.</h2>
        </div>
        <p className={styles.sectionIntro}>
          Every Recovery Altitude program pairs movement with support, and every
          route starts below your current limit on purpose. Choose the one that
          matches where you are today, not where you plan to be.
        </p>
      </div>

      <div className={styles.routeFinder}>
        <div>
          <p className={styles.finderLabel}>Route finder / 30-second orientation</p>
          <h3>What brings you here?</h3>
        </div>
        <div className={styles.finderChoices}>
          {routePrompts.map((prompt) => (
            <button
              aria-pressed={recommendedId === prompt.id}
              className={styles.finderChoice}
              key={prompt.id}
              onClick={() => setRecommendedId(prompt.id)}
              type="button"
            >
              <span>{prompt.label}</span>
              <small>{prompt.note}</small>
            </button>
          ))}
        </div>
        <p aria-live="polite" className={styles.finderResult}>
          {recommended ? (
            <>
              A considered place to begin: <a href={`#${recommended.id}`}>{recommended.name}</a>.
            </>
          ) : (
            "Choose the statement that feels closest; you can always change course."
          )}
        </p>
      </div>

      <div className={styles.programList}>
        {programs.map((program, index) => (
          <details
            className={`${styles.program} ${recommendedId === program.id ? styles.programRecommended : ""}`}
            id={program.id}
            key={program.id}
            name="program"
          >
            <summary className={styles.programSummary}>
              <span aria-hidden="true" className={styles.programNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.programHeading}>
                <strong>
                  {program.name}
                  {recommendedId === program.id ? (
                    <span className={styles.recommendedTag}>Suggested route</span>
                  ) : null}
                </strong>
                <span>{program.tagline}</span>
              </span>
              <span className={styles.programMeta}>
                <span>{program.meta.duration}</span>
                <span>{program.meta.intensity}</span>
                <span>{program.meta.format}</span>
              </span>
              <span aria-hidden="true" className={styles.programMarker} />
            </summary>
            <div className={styles.programBody}>
              <p className={styles.programDescription}>{program.description}</p>
              <div className={styles.programDetails}>
                <div>
                  <h3>What&apos;s included</h3>
                  <ul>
                    {program.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <p className={styles.programFit}>
                  <span className={styles.fitLabel}>A good fit if</span>
                  {program.fit}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>

      <p className={styles.sectionFooter}>
        Not sure which route fits? <a href="#consultation">Book a consultation</a> and
        we will map it with you.
      </p>
    </section>
  );
}
