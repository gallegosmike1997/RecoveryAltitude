import type { Metadata } from "next";

import { RecoverySupportSection } from "@/components/recovery-altitude/RecoverySupportSection";
import { RecoverySectionPage } from "@/components/recovery-altitude/RecoverySectionPage";

export const metadata: Metadata = {
  title: "Recovery Support",
  description: "Practical, outdoor-focused support for returning to movement with more confidence and a sustainable rhythm.",
};

export default function RecoverySupportPage() {
  return (
    <RecoverySectionPage
      activeKey="recovery"
      description="Clear guidance and considerate support for returning to movement one durable step at a time."
      eyebrow="Recovery support"
      title="Support for the next stage."
    >
      <RecoverySupportSection />
    </RecoverySectionPage>
  );
}
