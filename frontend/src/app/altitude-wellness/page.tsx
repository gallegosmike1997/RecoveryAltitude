import type { Metadata } from "next";

import { AltitudeWellnessSection } from "@/components/recovery-altitude/AltitudeWellnessSection";
import { RecoverySectionPage } from "@/components/recovery-altitude/RecoverySectionPage";

export const metadata: Metadata = {
  title: "Altitude Wellness",
  description: "Practical field notes for pacing, hydration, warmth, and breathing when elevation is part of the plan.",
};

export default function AltitudeWellnessPage() {
  return (
    <RecoverySectionPage
      activeKey="altitude"
      description="Practical field notes for pacing, hydration, warmth, and breathing when elevation is part of the plan."
      eyebrow="Altitude wellness"
      title="Build confidence at elevation."
    >
      <AltitudeWellnessSection />
    </RecoverySectionPage>
  );
}
