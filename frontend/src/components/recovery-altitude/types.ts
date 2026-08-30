import type { ReactNode, RefObject } from "react";

export type HeaderVariant = "trailhead" | "summit-gate" | "field-register";

export type NavKey =
  | "programs"
  | "altitude"
  | "recovery"
  | "approach"
  | "resources"
  | "about";

export type NavGroup = "service" | "context";

export interface NavItem {
  key: NavKey;
  label: string;
  href: string;
  group: NavGroup;
}

export interface HeaderProps {
  variant: HeaderVariant;
  activeKey?: NavKey;
}

export interface MenuController {
  isOpen: boolean;
  panelId: string;
  triggerId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  toggleMenu: () => void;
  closeMenu: (restoreFocus?: boolean) => void;
  handleNavigate: () => void;
}

export interface VariantHeaderProps {
  activeKey: NavKey;
  menu: MenuController;
}

export interface HeaderShellProps extends VariantHeaderProps {
  children: ReactNode;
}
