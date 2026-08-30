import { BrandLockup } from "./BrandLockup";
import { ConsultationAction } from "./ConsultationAction";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileNavPanel } from "./MobileNavPanel";
import { PrimaryNav } from "./PrimaryNav";
import styles from "./Header.module.css";
import type { VariantHeaderProps } from "./types";

export function FieldRegisterHeader({ activeKey, menu }: VariantHeaderProps) {
  return (
    <header className={`${styles.header} ${styles.fieldHeader}`} data-variant="field-register">
      <div className={styles.fieldCap} />
      <div className={styles.fieldUpperBand}>
        <div className={styles.fieldDescriptor}>
          <span>Outdoor recovery</span>
          <span>&amp; altitude wellness</span>
        </div>
        <div className={styles.fieldBrandPatch}>
          <BrandLockup variant="field-register" />
        </div>
        <div className={styles.fieldActionArea}>
          <ConsultationAction variant="field-register" />
          <MobileMenuButton
            isOpen={menu.isOpen}
            panelId={menu.panelId}
            toggleMenu={menu.toggleMenu}
            triggerRef={menu.triggerRef}
            variant="field-register"
          />
        </div>
      </div>
      <div className={styles.fieldRouteBand}>
        <PrimaryNav activeKey={activeKey} variant="field-register" />
      </div>
      <MobileNavPanel activeKey={activeKey} menu={menu} variant="field-register" />
    </header>
  );
}
