import type { Metadata } from "next";

import { RecoverySectionPage } from "@/components/recovery-altitude/RecoverySectionPage";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "Recovery Altitude favors clear signals over heroic effort. Learn how our approach builds a steadier return to movement through context, patience, and useful progress.",
};

const principles = [
  {
    number: "01",
    title: "Start below your limit on purpose",
    body: "Every plan begins with capacity you can actually sustain today, not where you hope to be in a month. Starting below your limit creates useful evidence: what restores you, what costs you, and what can grow next.",
  },
  {
    number: "02",
    title: "Context before intensity",
    body: "We look at your terrain, schedule, sleep, and reasons for returning before suggesting a route. Intensity without context is just noise — and noise is what drove most people away from movement in the first place.",
  },
  {
    number: "03",
    title: "Progress you can actually use",
    body: "A good week leaves you more capable on Wednesday than it found you on Monday. We measure progress in usable confidence — the kind that shows up when the trail steepens, the weather turns, or life gets demanding.",
  },
  {
    number: "04",
    title: "Return is a skill, not a milestone",
    body: "Coming back after a pause is its own discipline. It requires patience with a body that remembers more than it can currently do, and honesty about what a sustainable rhythm actually looks like.",
  },
];

export default function ApproachPage() {
  return (
    <RecoverySectionPage
      activeKey="approach"
      description="A steadier return is built around context, patience, and progress you can actually use."
      eyebrow="Our approach"
      title="Progress with a longer view."
    >
      <section className="section-page-content">
        <p>
          Our work favors clear signals over heroic effort, so every next step has a
          reason and room to adapt. These four principles shape every program,
          consultation, and field note we produce.
        </p>
        <div className="principles-grid">
          {principles.map((principle) => (
            <article key={principle.number} className="principle-card">
              <span className="principle-number">{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
        <p className="principle-closing">
          The result is not a finish line. It is a way of moving that keeps working
          long after the program ends.
        </p>
      </section>
    </RecoverySectionPage>
  );
}
