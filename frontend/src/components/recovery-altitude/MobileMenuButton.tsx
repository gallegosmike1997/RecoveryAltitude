import { Button } from "@nextui-org/react";
import { Menu, X } from "lucide-react";
import type { RefObject } from "react";

import styles from "./Header.module.css";
import type { HeaderVariant } from "./types";

interface MobileMenuButtonProps {
  variant: HeaderVariant;
  isOpen: boolean;
  panelId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  toggleMenu: () => void;
}

export function MobileMenuButton({
  variant,
  isOpen,
  panelId,
  triggerRef,
  toggleMenu,
}: MobileMenuButtonProps) {
  const Icon = isOpen ? X : Menu;

  return (
    <Button
      aria-controls={panelId}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Menu"}
      className={`${styles.menuButton} ${styles[`menuButton--${variant}`]}`}
      disableRipple
      isIconOnly
      radius="none"
      ref={triggerRef}
      variant="bordered"
      onPress={toggleMenu}
    >
      <Icon aria-hidden="true" className={styles.menuIcon} size={19} strokeWidth={1.8} />
    </Button>
  );
}
