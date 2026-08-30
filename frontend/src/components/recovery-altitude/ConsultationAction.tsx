import { ArrowUpRight, CalendarDays } from "lucide-react";

import { consultationLabel } from "./data";
import styles from "./Header.module.css";
import type { HeaderVariant } from "./types";

interface ConsultationActionProps {
  variant: HeaderVariant;
  className?: string;
}

export function ConsultationAction({ variant, className = "" }: ConsultationActionProps) {
  const Icon = variant === "field-register" ? CalendarDays : ArrowUpRight;

  return (
    <a
      className={`${styles.consultationAction} ${styles[`consultationAction--${variant}`]} ${className}`}
      href="#consultation"
    >
      <span>{consultationLabel}</span>
      <span className={styles.consultationIconFrame}>
        <Icon aria-hidden="true" className={styles.consultationIcon} size={17} strokeWidth={1.8} />
      </span>
    </a>
  );
}
