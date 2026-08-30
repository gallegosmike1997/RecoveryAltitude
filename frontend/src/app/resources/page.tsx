import type { Metadata } from "next";
import Link from "next/link";

import { RecoverySectionPage } from "@/components/recovery-altitude/RecoverySectionPage";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Practical field notes and preparation guides for people returning to the outdoors. Covering pacing, hydration, cold exposure, and altitude readiness.",
};

const resourceCategories = [
  {
    id: "returning-to-movement",
    title: "Returning to movement",
    summary: "Guides for rebuilding trust in your body after a long pause.",
    links: [
      { label: "The first six weeks: what to expect", href: "/programs#basecamp-reset" },
      { label: "How to read your own pacing signals", href: "/altitude-wellness#acclimation-pacing" },
      { label: "Building a rhythm you can keep", href: "/programs#ridge-recovery-series" },
    ],
  },
  {
    id: "altitude-readiness",
    title: "Altitude readiness",
    summary: "Field notes for moving well when elevation enters the plan.",
    links: [
      { label: "Acclimation pacing explained", href: "/altitude-wellness#acclimation-pacing" },
      { label: "Hydration and recovery at elevation", href: "/altitude-wellness#hydration-recovery" },
      { label: "Breathing capacity as a training tool", href: "/altitude-wellness#breathing-capacity" },
    ],
  },
  {
    id: "cold-and-exposure",
    title: "Cold and exposure",
    summary: "Practical systems for staying warm enough to keep recovering outdoors.",
    links: [
      { label: "Cold and exposure recovery", href: "/altitude-wellness#cold-exposure" },
      { label: "Layering systems that actually work", href: "/altitude-wellness#cold-exposure" },
      { label: "When to swap a route", href: "/approach" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <RecoverySectionPage
      activeKey="resources"
      description="Practical field notes and useful preparation for people getting outdoors again."
      eyebrow="Resources"
      title="Keep good information close."
    >
      <section className="section-page-content">
        <p>
          Use these notes to prepare for the conditions ahead, not to add more noise
          to the return. Every resource here connects to a program or field note
          within Recovery Altitude.
        </p>
        <div className="resources-grid">
          {resourceCategories.map((category) => (
            <article key={category.id} className="resource-category">
              <h3>{category.title}</h3>
              <p>{category.summary}</p>
              <ul>
                {category.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label} <span aria-hidden="true">↗</span></Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="resources-closing">
          Looking for something specific? <Link href="/#consultation">Book a consultation</Link> and
          we will point you to the right field note.
        </p>
      </section>
    </RecoverySectionPage>
  );
}
