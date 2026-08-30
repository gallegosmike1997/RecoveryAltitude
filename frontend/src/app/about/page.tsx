import { RecoverySectionPage } from "@/components/recovery-altitude/RecoverySectionPage";

export default function AboutPage() {
  return (
    <RecoverySectionPage
      activeKey="about"
      description="Recovery Altitude is built for people seeking a more capable, considered way back outdoors."
      eyebrow="About"
      title="Built for the next return."
    >
      <section className="section-page-content">
        <p>We bring outdoor context and patient guidance together, because meaningful recovery should make room for a life beyond the plan.</p>
      </section>
    </RecoverySectionPage>
  );
}
