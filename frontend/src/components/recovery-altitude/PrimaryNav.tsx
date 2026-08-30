import { Fragment } from "react";

import { formatRouteNumber, getNavItems } from "./data";
import styles from "./Header.module.css";
import type { HeaderVariant, NavKey } from "./types";

interface PrimaryNavProps {
  variant: HeaderVariant;
  activeKey: NavKey;
  mobile?: boolean;
  onNavigate?: () => void;
  /** Desktop-only: insert a flexible spacer after this many items (0-based count). */
  splitIndex?: number;
}

export function PrimaryNav({
  variant,
  activeKey,
  mobile = false,
  onNavigate,
  splitIndex,
}: PrimaryNavProps) {
  const items = getNavItems(variant);

  return (
    <nav
      aria-label={mobile ? "Mobile primary navigation" : "Primary navigation"}
      className={`${styles.primaryNav} ${styles[`primaryNav--${variant}`]} ${mobile ? styles["primaryNav--mobile"] : ""}`}
    >
      <ul className={styles.navList}>
        {items.map((item, index) => {
          const isActive = item.key === activeKey;

          return (
            <Fragment key={item.key}>
              <li className={styles.navItem}>
                <a
                  aria-current={isActive ? "page" : undefined}
                  className={`${styles.navLink} ${isActive ? styles["navLink--active"] : ""}`}
                  href={item.href}
                  onClick={onNavigate}
                >
                  {variant === "field-register" || mobile ? (
                    <span aria-hidden="true" className={styles.navNumber}>
                      {formatRouteNumber(index)}
                    </span>
                  ) : null}
                  <span>{item.label}</span>
                  {variant === "trailhead" && isActive ? (
                    <span aria-hidden="true" className={styles.activeDots}>
                      <i />
                      <i />
                    </span>
                  ) : null}
                </a>
              </li>
              {!mobile && splitIndex === index + 1 ? (
                <li aria-hidden="true" className={styles.navGap} />
              ) : null}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
}
