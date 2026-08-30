import type { Metadata } from "next";
import Link from "next/link";

import { RecoverySectionPage } from "@/components/recovery-altitude/RecoverySectionPage";

export const metadata: Metadata = {
  title: "About Recovery Altitude",
  description:
    "Recovery Altitude helps people find a steadier return to movement through outdoor recovery and altitude wellness. Patient guidance, built for the long view.",
};

export default function AboutPage() {
  return (
    <RecoverySectionPage
      activeKey="about"
      description="Recovery Altitude is built for people seeking a more capable, considered way back outdoors."
      eyebrow="About"
      title="Built for the next return."
    >
      <section className="section-page-content">
        <p>
          We bring outdoor context and patient guidance together, because meaningful
          recovery should make room for a life beyond the plan. Recovery Altitude
          exists for people who want more confidence in the outdoors and a clearer
          route back to movement.
        </p>
        <div className="about-grid">
          <article className="about-block">
            <h3>What we do</h3>
            <p>
              Four structured programs, a library of field notes, and one-on-one
              coaching — all designed to meet you at your current starting point and
              build from there. No heroic effort required, just a steadier plan.
            </p>
          </article>
          <article className="about-block">
            <h3>How we work</h3>
            <p>
              Every route starts below your current limit on purpose. We look at your
              real week — your capacity, terrain, and reasons for returning — before
              suggesting a next step. Progress is measured in usable confidence, not
              arbitrary metrics.
            </p>
          </article>
          <article className="about-block">
            <h3>Who it is for</h3>
            <p>
              Anyone returning to movement after injury, illness, or a long pause.
              Anyone preparing for a specific outdoor objective. Anyone who wants the
              outdoors to feel like a place they can return to, not a place they used
              to go.
            </p>
          </article>
          <article className="about-block">
            <h3>What we don&apos;t do</h3>
            <p>
              We don&apos;t promise quick fixes, push through pain, or treat recovery
              as a finish line. We don&apos;t replace medical care — if symptoms are
              severe or concerning, we will help you find qualified support.
            </p>
          </article>
        </div>
        <p className="about-closing">
          Ready to take the next step? <Link href="/programs">Explore our programs</Link> or{" "}
          <Link href="/#consultation">book a consultation</Link> to map it together.
        </p>
      </section>
    </RecoverySectionPage>
  );
}
