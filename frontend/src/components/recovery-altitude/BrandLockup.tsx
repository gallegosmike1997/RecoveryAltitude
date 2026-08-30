import Image from "next/image";
import Link from "next/link";

import { brandName } from "./data";
import styles from "./Header.module.css";
import type { HeaderVariant } from "./types";

interface BrandLockupProps {
  variant: HeaderVariant;
  compact?: boolean;
}

export function BrandLockup({ variant, compact = false }: BrandLockupProps) {
  return (
    <Link
      aria-label={`${brandName} home`}
      className={`${styles.brandLockup} ${styles[`brandLockup--${variant}`]} ${compact ? styles["brandLockup--compact"] : ""}`}
      href="/"
    >
      <Image
        alt=""
        aria-hidden="true"
        className={styles.brandArtwork}
        decoding="async"
        fill
        priority
        sizes="(max-width: 767px) 170px, 250px"
        src="/recovery-altitude-logo.jpg"
      />
    </Link>
  );
}
