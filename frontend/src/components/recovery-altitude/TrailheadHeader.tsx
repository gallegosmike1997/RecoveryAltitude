import { BrandLockup } from "./BrandLockup";
import { ConsultationAction } from "./ConsultationAction";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileNavPanel } from "./MobileNavPanel";
import { PrimaryNav } from "./PrimaryNav";
import styles from "./Header.module.css";
import type { VariantHeaderProps } from "./types";

export function TrailheadHeader({ activeKey, menu }: VariantHeaderProps) {
  return (
    <header className={`${styles.header} ${styles.trailheadHeader}`} data-variant="trailhead">
      <div className={styles.trailheadInner}>
        <div className={styles.trailheadBrandArea}>
          <BrandLockup compact variant="trailhead" />
        </div>
        <div className={styles.trailheadRails}>
          <div className={styles.trailheadDescriptor}>
            <span className={styles.routeKicker}>Recovery altitude / field guide</span>
            <span>Outdoor recovery &amp; altitude wellness</span>
          </div>
          <div className={styles.trailheadNavRow}>
            <PrimaryNav activeKey={activeKey} variant="trailhead" />
            <ConsultationAction variant="trailhead" />
            <MobileMenuButton
              isOpen={menu.isOpen}
              panelId={menu.panelId}
              toggleMenu={menu.toggleMenu}
              triggerRef={menu.triggerRef}
              variant="trailhead"
            />
          </div>
        </div>
      </div>
      <MobileNavPanel activeKey={activeKey} menu={menu} variant="trailhead" />
    </header>
  );
}
