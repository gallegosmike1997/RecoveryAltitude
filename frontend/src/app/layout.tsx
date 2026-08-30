import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recovery Altitude — Outdoor recovery & altitude wellness",
  description:
    "Recovery Altitude helps people find a steadier return to movement through outdoor recovery and altitude wellness.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
