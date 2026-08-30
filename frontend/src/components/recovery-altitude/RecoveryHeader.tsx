"use client";

import { useHeaderController } from "./HeaderController";
import { FieldRegisterHeader } from "./FieldRegisterHeader";
import { SummitGateHeader } from "./SummitGateHeader";
import { TrailheadHeader } from "./TrailheadHeader";
import type { HeaderProps } from "./types";

export function RecoveryHeader({ variant, activeKey = "programs" }: HeaderProps) {
  const menu = useHeaderController(variant);
  const props = { activeKey, menu };

  switch (variant) {
    case "summit-gate":
      return <SummitGateHeader {...props} />;
    case "field-register":
      return <FieldRegisterHeader {...props} />;
    case "trailhead":
    default:
      return <TrailheadHeader {...props} />;
  }
}
