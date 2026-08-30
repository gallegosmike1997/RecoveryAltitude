"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "./RecoverySupport.module.css";

const supportSteps = [
  {
    number: "01",
    title: "Start with the real week",
    description: "We look at your current capacity, schedule, terrain, and reasons for returning before suggesting a route.",
  },
  {
    number: "02",
    title: "Make the next step small enough",
    description: "The first plan is designed to create useful evidence: what restores you, what costs you, and what can grow.",
  },
  {
    number: "03",
    title: "Build a rhythm you can keep",
    description: "Guidance, outdoor practice, and recovery habits work together so progress has a place to land.",
  },
] as const;

const needs = [
  {
    id: "re-entry",
    label: "A gentler return to movement",
    answer: "Start with Basecamp Reset: a low-intensity, guided route that makes room for a careful re-entry.",
    href: "/programs#basecamp-reset",
    action: "Explore Basecamp Reset",
  },
  {
    id: "plan",
    label: "A plan around a specific goal",
    answer: "Summit Readiness gives one objective a clear structure, with coaching shaped around your actual calendar.",
    href: "/programs#summit-readiness",
    action: "Explore Summit Readiness",
  },
  {
    id: "community",
    label: "A reason to keep showing up",
    answer: "Ridge Recovery Series creates a regular outdoor rhythm with a route and a group to return to.",
    href: "/programs#ridge-recovery-series",
    action: "Explore Ridge Recovery",
  },
] as const;

export function RecoverySupportSection() {
  const [selectedNeed, setSelectedNeed] = useState<(typeof needs)[number]["id"] | null>(null);
  const recommendation = needs.find((need) => need.id === selectedNeed);

  return (
    <section className={styles.section} aria-labelledby="support-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Recovery support / a practical system</p>
          <h2 id="support-title">Support should make the next move feel possible.</h2>
        </div>
        <p>
          Recovery Altitude is not a finish line or a generic training plan. It is a way to pay attention, make a useful choice, and return with more confidence.
        </p>
      </div>

      <ol className={styles.steps}>
        {supportSteps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.compass}>
        <div>
          <p className={styles.eyebrow}>Support compass</p>
          <h3>What feels most useful right now?</h3>
          <p className={styles.compassIntro}>Choose the nearest answer. This is simply a starting point, not an assessment.</p>
        </div>
        <div className={styles.choices}>
          {needs.map((need) => (
            <button
              aria-pressed={selectedNeed === need.id}
              key={need.id}
              onClick={() => setSelectedNeed(need.id)}
              type="button"
            >
              {need.label}
              <span aria-hidden="true">↘</span>
            </button>
          ))}
        </div>
        <div aria-live="polite" className={styles.recommendation}>
          {recommendation ? (
            <>
              <p>{recommendation.answer}</p>
              <Link href={recommendation.href}>{recommendation.action} <span aria-hidden="true">↗</span></Link>
            </>
          ) : (
            <p>Choose an answer to see a clear place to begin.</p>
          )}
        </div>
      </div>

      <p className={styles.closing}>
        Prefer to talk it through? <a href="#consultation">Book a consultation</a> and we will make the first plan together.
      </p>
    </section>
  );
}
