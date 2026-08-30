import Image from "next/image";

import { BrandLockup } from "./BrandLockup";
import { ConsultationAction } from "./ConsultationAction";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileNavPanel } from "./MobileNavPanel";
import { PrimaryNav } from "./PrimaryNav";
import styles from "./Header.module.css";
import type { VariantHeaderProps } from "./types";

export function SummitGateHeader({ activeKey, menu }: VariantHeaderProps) {
  return (
    <header className={`${styles.header} ${styles.summitHeader}`} data-variant="summit-gate">
      <div className={styles.summitMasthead}>
        <div aria-hidden="true" className={styles.summitWatermark}>
          <Image
            alt=""
            className={styles.summitWatermarkArtwork}
            decoding="async"
            fill
            sizes="380px"
            src="/recovery-altitude-logo.jpg"
          />
        </div>
        <div className={styles.summitInner}>
          <div className={styles.summitBrandPlate}>
            <BrandLockup variant="summit-gate" />
          </div>
          <div className={styles.summitOrientation}>
            <p className={styles.summitDescriptor}>Outdoor recovery &amp; altitude wellness</p>
            <div className={styles.summitYardarm}>
              <PrimaryNav activeKey={activeKey} variant="summit-gate" />
              <ConsultationAction variant="summit-gate" />
            </div>
          </div>
          <div className={styles.summitMobileTrigger}>
            <MobileMenuButton
              isOpen={menu.isOpen}
              panelId={menu.panelId}
              toggleMenu={menu.toggleMenu}
              triggerRef={menu.triggerRef}
              variant="summit-gate"
            />
          </div>
        </div>
      </div>
      <MobileNavPanel activeKey={activeKey} menu={menu} variant="summit-gate" />
    </header>
  );
}
