import { programs } from "./programs";
import styles from "./Programs.module.css";

export function ProgramsSection() {
  return (
    <section aria-labelledby="programs-title" className={styles.section} id="programs">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.eyebrow}>Programs / four routes</p>
          <h2 id="programs-title">Structured ways back, at every starting point.</h2>
        </div>
        <p className={styles.sectionIntro}>
          Every Recovery Altitude program pairs movement with support, and every
          route starts below your current limit on purpose. Choose the one that
          matches where you are today, not where you plan to be.
        </p>
      </div>

      <div className={styles.programList}>
        {programs.map((program, index) => (
          <details className={styles.program} key={program.id} name="program">
            <summary className={styles.programSummary}>
              <span aria-hidden="true" className={styles.programNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.programHeading}>
                <strong>{program.name}</strong>
                <span>{program.tagline}</span>
              </span>
              <span className={styles.programMeta}>
                <span>{program.meta.duration}</span>
                <span>{program.meta.intensity}</span>
                <span>{program.meta.format}</span>
              </span>
              <span aria-hidden="true" className={styles.programMarker} />
            </summary>
            <div className={styles.programBody}>
              <p className={styles.programDescription}>{program.description}</p>
              <div className={styles.programDetails}>
                <div>
                  <h3>What&apos;s included</h3>
                  <ul>
                    {program.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <p className={styles.programFit}>
                  <span className={styles.fitLabel}>A good fit if</span>
                  {program.fit}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>

      <p className={styles.sectionFooter}>
        Not sure which route fits? <a href="#consultation">Book a consultation</a> and
        we will map it with you.
      </p>
    </section>
  );
}
