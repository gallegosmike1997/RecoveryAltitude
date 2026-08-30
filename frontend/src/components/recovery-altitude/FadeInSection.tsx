"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

export function FadeInSection({ children, className = "", delay = 0, y = 28 }: FadeInSectionProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
