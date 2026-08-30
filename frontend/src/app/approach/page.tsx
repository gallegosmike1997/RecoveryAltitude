import { RecoverySectionPage } from "@/components/recovery-altitude/RecoverySectionPage";

export default function ApproachPage() {
  return (
    <RecoverySectionPage
      activeKey="approach"
      description="A steadier return is built around context, patience, and progress you can actually use."
      eyebrow="Our approach"
      title="Progress with a longer view."
    >
      <section className="section-page-content">
        <p>Our work favors clear signals over heroic effort, so every next step has a reason and room to adapt.</p>
      </section>
    </RecoverySectionPage>
  );
}
