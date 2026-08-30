"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { HeaderVariant, MenuController } from "./types";

export function useHeaderController(variant: HeaderVariant): MenuController {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const triggerId = `ra-${variant}-menu-trigger`;
  const panelId = `ra-${variant}-menu-panel`;

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const handleNavigate = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        closeMenu(true);
      }
    }

    function handleResize() {
      // The mobile panel is the navigation surface below 1200px (matching the
      // CSS breakpoint), so only auto-close once the desktop nav takes over.
      if (window.innerWidth >= 1200) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [closeMenu, isOpen]);

  return {
    isOpen,
    panelId,
    triggerId,
    triggerRef,
    toggleMenu,
    closeMenu,
    handleNavigate,
  };
}
