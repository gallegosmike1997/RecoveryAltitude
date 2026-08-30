export interface AltitudeTopic {
  id: string;
  name: string;
  tagline: string;
  meta: {
    focus: string;
    effort: string;
    where: string;
  };
  description: string;
  practices: string[];
  watchFor: string;
}

export const altitudeTopics: AltitudeTopic[] = [
  {
    id: "acclimation-pacing",
    name: "Acclimation pacing",
    tagline: "Let elevation catch up with you, not the other way around.",
    meta: {
      focus: "Climb profile",
      effort: "Gentle",
      where: "Trail & base",
    },
    description:
      "Altitude rewards patience and punishes ambition. Acclimation pacing is the discipline of gaining elevation slowly enough that your body adapts between outings: shorter weeks after big weeks, deliberate low-sleep nights, and honest effort checks that keep the top of every climb below your ceiling.",
    practices: [
      "The ten-percent rule for weekly elevation gain",
      "Scheduled lower-sleep nights during heavy training blocks",
      "Effort checks that cap the top of every outing",
    ],
    watchFor:
      "A mild headache above 2,500 m that fades overnight is common. One that worsens through the day is a signal to descend.",
  },
  {
    id: "hydration-recovery",
    name: "Hydration & recovery",
    tagline: "Mountain air is drier than your body expects.",
    meta: {
      focus: "Daily habits",
      effort: "Low effort",
      where: "Everywhere",
    },
    description:
      "At elevation you lose fluid faster through breath and sweat, and the dry air hides how much. Recovery at altitude is mostly unglamorous: steady fluid intake, electrolytes timed to outings, and a refuel window after every effort that protects the next day's energy.",
    practices: [
      "A personal fluid target adjusted for outing length",
      "Electrolyte timing around long or hot ascents",
      "A 45-minute post-outing refuel window",
    ],
    watchFor:
      "Dark urine, persistent fatigue, or a resting heart rate that stays elevated for days all point to under-recovery, not weakness.",
  },
  {
    id: "cold-exposure",
    name: "Cold & exposure recovery",
    tagline: "Warm back up before the cold decides for you.",
    meta: {
      focus: "Layering systems",
      effort: "Moderate",
      where: "Ridge & alpine",
    },
    description:
      "Cold drains capacity quietly: fingers first, judgment second. This topic covers the practical craft of staying warm enough to keep recovering outdoors — a layering system you can actually operate, a warm-down routine that ends the day well, and the judgment to swap a route when the wind turns.",
    practices: [
      "A three-layer system rehearsed until it is automatic",
      "A warm-down routine for the last thirty minutes outdoors",
      "Wind-day route swaps agreed before leaving the trailhead",
    ],
    watchFor:
      "Numbness that does not resolve within fifteen minutes of warming is a stop-and-assess situation, not a push-on one.",
  },
  {
    id: "breathing-capacity",
    name: "Breathing & capacity",
    tagline: "The cheapest altitude gain is better breathing.",
    meta: {
      focus: "Breathwork",
      effort: "Low effort",
      where: "Home & trail",
    },
    description:
      "Capacity at altitude is built as much on flat ground as on climbs. Cadence breathing, nasal-only warm-ups, and a weekly capacity note give you a readable curve of progress — and a calmer nervous system when the grade steepens and the air thins.",
    practices: [
      "Cadence breathing sets on flat ground, three times weekly",
      "Nasal-only warm-ups before every outing",
      "A weekly capacity note tracking effort at the same pace",
    ],
    watchFor:
      "Dizziness or tingling during breathwork means stop, sit, and return to normal breathing — the sets are gentle by design.",
  },
];
