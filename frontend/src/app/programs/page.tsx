import { ProgramsSection } from "@/components/recovery-altitude/ProgramsSection";
import { RecoverySectionPage } from "@/components/recovery-altitude/RecoverySectionPage";

export default function ProgramsPage() {
  return (
    <RecoverySectionPage
      activeKey="programs"
      description="Four structured routes that meet you at your current starting point and build from there."
      eyebrow="Programs"
      title="Choose the route that fits today."
    >
      <ProgramsSection />
    </RecoverySectionPage>
  );
}
