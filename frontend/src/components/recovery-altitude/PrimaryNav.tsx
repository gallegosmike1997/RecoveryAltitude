import { formatRouteNumber, getNavItems } from "./data";
import styles from "./Header.module.css";
import type { HeaderVariant, NavKey } from "./types";

interface PrimaryNavProps {
  variant: HeaderVariant;
  activeKey: NavKey;
  mobile?: boolean;
  onNavigate?: () => void;
}

export function PrimaryNav({ variant, activeKey, mobile = false, onNavigate }: PrimaryNavProps) {
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
            <li className={styles.navItem} key={item.key}>
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
          );
        })}
      </ul>
    </nav>
  );
}
