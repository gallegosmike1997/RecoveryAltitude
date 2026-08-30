"use client";

import { useState } from "react";

import { FadeInSection } from "./FadeInSection";
import { altitudeTopics } from "./altitude-wellness";
import styles from "./Programs.module.css";

const fieldFocuses = [
  { id: "acclimation-pacing", label: "I am preparing for more elevation" },
  { id: "hydration-recovery", label: "I want steadier recovery between outings" },
  { id: "cold-exposure", label: "I am heading into colder or windier terrain" },
  { id: "breathing-capacity", label: "I want a calmer, more sustainable effort" },
] as const;

export function AltitudeWellnessSection() {
  const [focusId, setFocusId] = useState<string | null>(null);
  const focus = altitudeTopics.find((topic) => topic.id === focusId);

  return (
    <section aria-labelledby="altitude-title" className={styles.section} id="altitude-wellness">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.eyebrow}>Altitude wellness / field notes</p>
          <h2 id="altitude-title">Elevation is a skill, not a barrier.</h2>
        </div>
        <p className={styles.sectionIntro}>
          Altitude wellness is the everyday craft that makes elevation work for
          you: how you pace, hydrate, stay warm, and breathe. These are the four
          field notes we build into every program.
        </p>
      </div>

      <aside className={styles.fieldFocus} aria-label="Choose a field focus">
        <div>
          <p className={styles.finderLabel}>Field focus / choose your next condition</p>
          <h3>What would make the next outing feel more considered?</h3>
        </div>
        <div className={styles.fieldFocusChoices}>
          {fieldFocuses.map((item) => (
            <button
              aria-pressed={focusId === item.id}
              className={styles.fieldFocusChoice}
              key={item.id}
              onClick={() => setFocusId(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className={styles.fieldFocusResult}>
          {focus ? (
            <>
              Start with <a href={`#${focus.id}`}>{focus.name}</a>, then keep the pace gentle enough to notice what changes.
            </>
          ) : (
            "Choose a condition to surface a practical field note."
          )}
        </p>
      </aside>

      <div className={styles.programList}>
        {altitudeTopics.map((topic, index) => (
          <FadeInSection key={topic.id} delay={index * 0.06}>
            <details
              className={`${styles.program} ${focusId === topic.id ? styles.programRecommended : ""}`}
              id={topic.id}
              name="altitude-topic"
            >
            <summary className={styles.programSummary}>
              <span aria-hidden="true" className={styles.programNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.programHeading}>
                <strong>
                  {topic.name}
                  {focusId === topic.id ? <span className={styles.recommendedTag}>Field focus</span> : null}
                </strong>
                <span>{topic.tagline}</span>
              </span>
              <span className={styles.programMeta}>
                <span>{topic.meta.focus}</span>
                <span>{topic.meta.effort}</span>
                <span>{topic.meta.where}</span>
              </span>
              <span aria-hidden="true" className={styles.programMarker} />
            </summary>
            <div className={styles.programBody}>
              <p className={styles.programDescription}>{topic.description}</p>
              <div className={styles.programDetails}>
                <div>
                  <h3>Field practices</h3>
                  <ul>
                    {topic.practices.map((practice) => (
                      <li key={practice}>{practice}</li>
                    ))}
                  </ul>
                </div>
                <p className={styles.programFit}>
                  <span className={styles.fitLabel}>Watch for</span>
                  {topic.watchFor}
                </p>
              </div>
            </div>
            </details>
          </FadeInSection>
        ))}
      </div>

      <p className={styles.sectionFooter}>
        Want this built into a plan of your own?{" "}
        <a href="#consultation">Book a consultation</a> and we will match the
        field notes to your next objective.
      </p>
      <p className={styles.wellnessNotice}>
        These notes support general outdoor preparation, not medical diagnosis or emergency guidance. If symptoms are severe, worsening, or concerning, seek qualified medical care.
      </p>
    </section>
  );
}
