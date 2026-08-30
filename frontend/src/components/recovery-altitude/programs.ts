export interface Program {
  id: string;
  name: string;
  tagline: string;
  meta: {
    duration: string;
    intensity: string;
    format: string;
  };
  description: string;
  includes: string[];
  fit: string;
}

export const programs: Program[] = [
  {
    id: "basecamp-reset",
    name: "Basecamp Reset",
    tagline: "A structured return after a long pause.",
    meta: {
      duration: "6 weeks",
      intensity: "Low intensity",
      format: "Guided group",
    },
    description:
      "Basecamp Reset is the starting point for people coming back to movement after injury, illness, or a long time away. The first weeks are deliberately small: short walks, honest check-ins, and a pace that rebuilds trust in your own body before distance or elevation enter the picture.",
    includes: [
      "Weekly guided outings with a trained group leader",
      "A personal pacing plan reviewed every two weeks",
      "Peer circle of six to eight people at a similar stage",
    ],
    fit: "Best if you have been out of regular movement for six months or longer.",
  },
  {
    id: "altitude-acclimation",
    name: "Altitude Acclimation",
    tagline: "Build capacity for elevation, safely.",
    meta: {
      duration: "8 weeks",
      intensity: "Moderate",
      format: "Cohort-based",
    },
    description:
      "This program introduces progressive elevation exposure so altitude stops being a barrier. You will learn how your body responds to thinner air, how to read early warning signs, and how to plan ascents that leave room for recovery instead of pushing through it.",
    includes: [
      "Four staged outings from foothill to alpine trail",
      "Acclimation planning workbook with personal benchmarks",
      "Two one-on-one reviews with a program guide",
    ],
    fit: "Best if you can sustain 45 minutes of continuous movement today.",
  },
  {
    id: "ridge-recovery-series",
    name: "Ridge Recovery Series",
    tagline: "Weekend outings that keep momentum alive.",
    meta: {
      duration: "Ongoing",
      intensity: "All levels",
      format: "Community",
    },
    description:
      "The Ridge Series is the ongoing heartbeat of Recovery Altitude: one supported outing every weekend, rotated across difficulty so everyone has a route that fits. It exists for one reason — the hardest part of recovery is not starting, it is continuing.",
    includes: [
      "A rotating calendar of weekend routes, published monthly",
      "Trail leadership and sweep support on every outing",
      "Seasonal community gatherings after key milestones",
    ],
    fit: "Open to anyone who has completed a program or can hike two hours comfortably.",
  },
  {
    id: "summit-readiness",
    name: "Summit Readiness",
    tagline: "Coaching toward one specific objective.",
    meta: {
      duration: "12 weeks",
      intensity: "Individualized",
      format: "1:1 coaching",
    },
    description:
      "Summit Readiness pairs you with a coach and builds a twelve-week plan around a single, named objective — a trek, a climb, a race, or a crossing. Training blocks, rest weeks, and contingency plans are all built around your real calendar, not an ideal one.",
    includes: [
      "Twelve weekly coaching sessions, in person or remote",
      "A periodized plan built around your target date",
      "Route-specific preparation, including altitude logistics",
    ],
    fit: "Best if you have a named objective with a date attached to it.",
  },
];
