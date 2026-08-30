import Link from "next/link";
import type { ReactNode } from "react";

import { ConsultationForm } from "./ConsultationForm";
import { FadeInSection } from "./FadeInSection";
import { RecoveryHeader } from "./RecoveryHeader";
import styles from "./Landing.module.css";
import type { NavKey } from "./types";

interface RecoverySectionPageProps {
  activeKey: NavKey;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function RecoverySectionPage({
  activeKey,
  eyebrow,
  title,
  description,
  children,
}: RecoverySectionPageProps) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <RecoveryHeader activeKey={activeKey} variant="trailhead" />
      <main id="main-content">
        <section className={styles.intro}>
          <div className={styles.introCopy}>
            <p className={styles.eyebrow}>Recovery Altitude / {eyebrow}</p>
            <h1>{title}</h1>
            <p className={styles.introDescription}>{description}</p>
            <div className={styles.introActions}>
              <Link className={styles.textAction} href="/">
                Return to the overview <span aria-hidden="true">↖</span>
              </Link>
            </div>
          </div>
        </section>
        {children}
        <FadeInSection>
          <section className={styles.consultationBand} id="consultation">
            <div>
              <p className={styles.eyebrow}>A conversation is a good place to start.</p>
              <h2>Make the next return more considered.</h2>
            </div>
            <ConsultationForm />
          </section>
        </FadeInSection>
      </main>
      <footer className={styles.footer}>
        <span>Recovery Altitude</span>
        <span>Outdoor recovery &amp; altitude wellness</span>
        <span>Built for the next step.</span>
      </footer>
    </div>
  );
}
