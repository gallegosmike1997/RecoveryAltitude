import { RecoverySectionPage } from "@/components/recovery-altitude/RecoverySectionPage";

export default function ResourcesPage() {
  return (
    <RecoverySectionPage
      activeKey="resources"
      description="Practical field notes and useful preparation for people getting outdoors again."
      eyebrow="Resources"
      title="Keep good information close."
    >
      <section className="section-page-content">
        <p>Use these notes to prepare for the conditions ahead, not to add more noise to the return.</p>
      </section>
    </RecoverySectionPage>
  );
}
