import type { HeaderVariant, NavItem } from "./types";

export const brandName = "RECOVERY ALTITUDE";
export const descriptor = "Outdoor recovery & altitude wellness";
export const consultationLabel = "Book a consultation";

export const navItems: NavItem[] = [
  { key: "programs", label: "Programs", href: "#programs", group: "service" },
  {
    key: "altitude",
    label: "Altitude wellness",
    href: "#altitude-wellness",
    group: "service",
  },
  {
    key: "recovery",
    label: "Recovery support",
    href: "#recovery-support",
    group: "service",
  },
  { key: "approach", label: "Our approach", href: "#approach", group: "context" },
  { key: "resources", label: "Resources", href: "#resources", group: "context" },
  { key: "about", label: "About", href: "#about", group: "context" },
];

const variantOrder: Record<HeaderVariant, Array<NavItem["key"]>> = {
  "trailhead": ["programs", "altitude", "recovery", "resources", "about"],
  "summit-gate": ["approach", "programs", "altitude", "recovery", "resources"],
  "field-register": [
    "programs",
    "altitude",
    "recovery",
    "approach",
    "resources",
    "about",
  ],
};

export function getNavItems(variant: HeaderVariant) {
  return variantOrder[variant]
    .map((key) => navItems.find((item) => item.key === key))
    .filter((item): item is NavItem => Boolean(item));
}

export function formatRouteNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}
