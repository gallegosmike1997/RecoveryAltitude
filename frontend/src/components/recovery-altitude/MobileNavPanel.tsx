import { ConsultationAction } from "./ConsultationAction";
import { descriptor } from "./data";
import { PrimaryNav } from "./PrimaryNav";
import styles from "./Header.module.css";
import type { HeaderVariant, MenuController, NavKey } from "./types";

interface MobileNavPanelProps {
  variant: HeaderVariant;
  activeKey: NavKey;
  menu: MenuController;
}

export function MobileNavPanel({ variant, activeKey, menu }: MobileNavPanelProps) {
  const actionFirst = variant === "summit-gate";

  return (
    <div
      aria-label="Mobile navigation panel"
      className={`${styles.mobilePanel} ${styles[`mobilePanel--${variant}`]}`}
      hidden={!menu.isOpen}
      id={menu.panelId}
    >
      <p className={styles.mobileDescriptor}>{descriptor}</p>
      {actionFirst ? <ConsultationAction variant={variant} /> : null}
      <PrimaryNav
        activeKey={activeKey}
        mobile
        onNavigate={menu.handleNavigate}
        variant={variant}
      />
      {!actionFirst ? <ConsultationAction variant={variant} /> : null}
    </div>
  );
}
