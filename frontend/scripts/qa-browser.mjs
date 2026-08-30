/**
 * Deep browser QA for the Recovery Altitude frontend.
 *
 * Usage:
 *   node scripts/qa-browser.mjs [baseUrl]        # full matrix (default http://127.0.0.1:3100)
 *   QA_FAST=1 node scripts/qa-browser.mjs [url]  # quick pass for dev-server hydration checks
 *
 * Exits 1 when any check fails. Requires Edge (or EDGE_PATH pointing at a
 * Chromium executable). Uses puppeteer-core, so no browser download happens.
 */
/* global process */
import { existsSync } from "node:fs";

import puppeteer from "puppeteer-core";

const BASE_URL = process.argv[2] ?? "http://127.0.0.1:3100";
const EDGE_CANDIDATES = [
  process.env.EDGE_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].filter(Boolean);
const executablePath = EDGE_CANDIDATES.find((candidate) => existsSync(candidate));

if (!executablePath) {
  console.error("No Edge executable found. Install Edge or set EDGE_PATH.");
  process.exit(2);
}

const FAST_MODE = process.env.QA_FAST === "1";

const ROUTES = FAST_MODE
  ? ["/", "/altitude-wellness", "/field-register"]
  : [
      "/",
      "/field-register",
      "/trailhead",
      "/summit-gate",
      "/programs",
      "/altitude-wellness",
      "/recovery-support",
      "/approach",
      "/resources",
      "/about",
    ];
const ALL_WIDTHS = FAST_MODE
  ? [390, 1280]
  : [360, 390, 480, 640, 768, 820, 900, 1024, 1100, 1199, 1200, 1280, 1366, 1440, 1680, 1920];
const INTERACTIVE_WIDTHS = [360, 768, 900, 1199, 1280];

const EXPECTED_ACTIVE = {
  "/": "/programs",
  "/field-register": "/programs",
  "/trailhead": "/programs",
  "/summit-gate": "/programs",
  "/programs": "/programs",
  "/altitude-wellness": "/altitude-wellness",
  "/recovery-support": "/recovery-support",
  "/approach": "/approach",
  "/resources": "/resources",
  "/about": "/about",
};

const failures = [];
const notes = [];

const fail = (route, width, message) => {
  failures.push(`${route} @${width} — ${message}`);
  console.log(`  FAIL  ${route} @${width} — ${message}`);
};
const note = (message) => {
  notes.push(message);
  console.log(`  NOTE  ${message}`);
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * In-page layout inspection. Runs in the browser; must stay self-contained.
 */
async function inspectPageLayout(page, width) {
  return page.evaluate((viewportWidth) => {
    const describe = (el) => {
      const tag = el.tagName.toLowerCase();
      const text = (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 28);
      return `${tag}${text ? `:"${text}"` : ""}`;
    };

    const offenders = [];
    for (const el of document.body.querySelectorAll("*")) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;
      if (el.closest('[aria-hidden="true"]')) continue;
      if (rect.right > viewportWidth + 1 || rect.left < -1) {
        offenders.push(`${describe(el)} right=${Math.round(rect.right)}`);
        if (offenders.length >= 6) break;
      }
    }

    const overlaps = [];
    const header = document.querySelector("header[data-variant]");
    if (header) {
      const nodes = Array.from(
        header.querySelectorAll("a, button, span, p, strong, small, img"),
      ).filter((el) => {
        if (el.closest('[aria-hidden="true"]')) return false;
        const rect = el.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) return false;
        const hasOwnText = Array.from(el.childNodes).some(
          (node) => node.nodeType === 3 && node.textContent.trim().length > 0,
        );
        return hasOwnText || el.tagName === "IMG" || el.tagName === "BUTTON";
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          if (a.contains(b) || b.contains(a)) continue;
          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          const x = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
          const y = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
          if (x > 1 && y > 1) {
            overlaps.push({
              entry: `${describe(a)} × ${describe(b)} (${Math.round(x)}×${Math.round(y)}px)`,
              significant: x > 6 && y > 6,
            });
          }
        }
      }
    }

    let band = null;
    const bandNav = header?.querySelector('nav[aria-label="Primary navigation"]');
    if (header?.dataset.variant === "field-register" && bandNav) {
      const navRect = bandNav.getBoundingClientRect();
      const bandRect = bandNav.parentElement.getBoundingClientRect();
      band = {
        navRight: Math.round(navRect.right),
        bandRight: Math.round(bandRect.right),
        overflow: navRect.right > bandRect.right + 0.5,
      };
    }

    return {
      scrollWidth: document.documentElement.scrollWidth,
      offenders,
      overlaps,
      band,
      skipLink: Boolean(document.querySelector('a[href="#main-content"]')),
      skipTarget: Boolean(document.getElementById("main-content")),
      consultationTarget: Boolean(document.getElementById("consultation")),
      current: header?.querySelector('a[aria-current="page"]')?.getAttribute("href") ?? null,
    };
  }, width);
}

/**
 * Mobile menu behavior: open, panel row gaps, Escape close, resize guard.
 */
async function runMenuChecks(page, route, width, variant) {
  const panelId = `ra-${variant}-menu-panel`;
  const triggerHandle = await page.$("header[data-variant] button[aria-controls]");
  if (!triggerHandle) {
    fail(route, width, "menu trigger button missing");
    return;
  }
  const visible = await triggerHandle.evaluate(
    (el) => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0,
  );
  if (!visible) return; // desktop layout: no trigger by design

  await triggerHandle.click();
  try {
    await page.waitForFunction(
      (id) => {
        const el = document.getElementById(id);
        return Boolean(el) && !el.hidden && el.offsetHeight > 0;
      },
      { timeout: 2500 },
      panelId,
    );
  } catch {
    fail(route, width, "mobile menu did not open");
    return;
  }

  const worstGap = await page.evaluate((id) => {
    const rows = Array.from(document.getElementById(id)?.querySelectorAll("nav li") ?? []);
    let worst = 0;
    for (let i = 1; i < rows.length; i++) {
      const prev = rows[i - 1].getBoundingClientRect();
      const curr = rows[i].getBoundingClientRect();
      worst = Math.max(worst, Math.round((curr.top - prev.bottom) * 10) / 10);
    }
    return worst;
  }, panelId);
  if (worstGap > 2) {
    fail(route, width, `mobile panel nav rows have ${worstGap}px vertical gaps (expected 0)`);
  }

  await page.keyboard.press("Escape");
  try {
    await page.waitForFunction(
      (id) => {
        const el = document.getElementById(id);
        return Boolean(el) && (el.hidden || el.offsetHeight === 0);
      },
      { timeout: 2500 },
      panelId,
    );
  } catch {
    fail(route, width, "Escape did not close the mobile menu");
  }

  await triggerHandle.click();
  await page
    .waitForFunction((id) => !document.getElementById(id)?.hidden, { timeout: 2500 }, panelId)
    .catch(() => {});

  if (width + 2 < 1200) {
    await page.setViewport({ width: width + 2, height: 900 });
    await sleep(120);
    const stillOpen = await page.evaluate((id) => {
      const el = document.getElementById(id);
      return Boolean(el) && !el.hidden && el.offsetHeight > 0;
    }, panelId);
    if (!stillOpen) {
      fail(route, width, `menu closed on resize to ${width + 2}px (panel is the nav surface below 1200px)`);
    }
  }

  await page.setViewport({ width: 1200, height: 900 });
  await sleep(120);
  const closedAtDesktop = await page.evaluate((id) => {
    const el = document.getElementById(id);
    return !el || el.hidden || el.offsetHeight === 0;
  }, panelId);
  if (!closedAtDesktop) fail(route, width, "menu panel still visible at 1200px");

  await page.setViewport({ width, height: 900 });
  await sleep(80);
}

/**
 * Finder chips (Programs "route finder" / Altitude "field focus") and the
 * exclusive-accordion <details> groups.
 */
async function runSectionChecks(page, route, width) {
  const chipHandles = await page.$$("main [aria-pressed]");
  for (const chip of chipHandles) {
    const sectionSel = await chip.evaluate((el) => {
      const section = el.closest("section");
      return section && section.id ? `#${section.id}` : null;
    });
    if (!sectionSel) continue;

    await chip.click();
    await sleep(60);

    const pressed = await chip.evaluate((el) => el.getAttribute("aria-pressed"));
    if (pressed !== "true") fail(route, width, `finder chip in ${sectionSel} did not become aria-pressed`);

    const state = await page.evaluate((sel) => {
      const buttons = Array.from(document.querySelectorAll(`${sel} [aria-pressed]`));
      return {
        pressedCount: buttons.filter((b) => b.getAttribute("aria-pressed") === "true").length,
        result:
          document
            .querySelector(`${sel} [aria-live="polite"]`)
            ?.textContent?.replace(/\s+/g, " ")
            .trim() ?? "",
      };
    }, sectionSel);
    if (state.pressedCount !== 1) {
      fail(route, width, `${state.pressedCount} finder chips pressed in ${sectionSel} (expected 1)`);
    }
    if (!state.result) fail(route, width, `finder result text missing in ${sectionSel} after selection`);

    if (sectionSel === "#altitude-wellness") {
      const hrefs = await page.$$eval(
        '#altitude-wellness [aria-live="polite"] a',
        (els) => els.map((el) => el.getAttribute("href")),
      );
      for (const href of hrefs) {
        const exists = await page.evaluate((h) => Boolean(document.querySelector(h)), href);
        if (!exists) fail(route, width, `finder result anchor target ${href} not found`);
      }
    }
  }

  const accordion = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll("main details"));
    const byName = new Map();
    for (const details of all) {
      const name = details.getAttribute("name") ?? "";
      if (!byName.has(name)) byName.set(name, []);
      byName.get(name).push(details);
    }
    const report = {};
    for (const [name, list] of byName) {
      if (list.length < 2) continue;
      list.forEach((details) => {
        details.open = false;
      });
      list[0].querySelector("summary")?.click();
      list[1].querySelector("summary")?.click();
      report[name] = list.map((details) => details.open);
    }
    return report;
  });
  for (const [name, states] of Object.entries(accordion)) {
    const openCount = states.filter(Boolean).length;
    if (openCount !== 1) {
      fail(route, width, `exclusive accordion "${name}" expected 1 open, got ${openCount} (${states.join(",")})`);
    }
  }
}

async function main() {
  console.log(`QA target: ${BASE_URL}`);
  console.log(`Browser:   ${executablePath}`);
  console.log(`Matrix:    ${ROUTES.length} routes × ${ALL_WIDTHS.length} widths\n`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--disable-gpu", "--no-first-run", "--no-default-browser-check"],
  });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  let consoleIssues = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleIssues.push(`console.error: ${msg.text().slice(0, 160)}`);
  });
  page.on("pageerror", (err) => consoleIssues.push(`pageerror: ${String(err.message).slice(0, 160)}`));
  page.on("response", (res) => {
    if (res.status() >= 400) consoleIssues.push(`HTTP ${res.status()} ${res.url()}`);
  });

  const goto = async (route) => {
    const response = await page.goto(`${BASE_URL}${route}`, {
      waitUntil: "load",
      timeout: 30000,
    });
    // Settle web fonts with a cap so a slow font CDN cannot stall the run.
    await page.evaluate(
      () =>
        Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 5000)),
        ]),
    );
    await sleep(150);
    return response?.status() ?? 0;
  };

  for (const route of ROUTES) {
    for (const width of ALL_WIDTHS) {
      consoleIssues = [];
      await page.setViewport({ width, height: 900 });

      let status = 0;
      try {
        status = await goto(route);
      } catch (error) {
        fail(route, width, `navigation failed: ${String(error.message).slice(0, 120)}`);
        continue;
      }
      if (status !== 200 && status !== 304) {
        fail(route, width, `HTTP ${status}`);
        continue;
      }

      const layout = await inspectPageLayout(page, width);

      if (layout.scrollWidth > width + 1) {
        const offenders = layout.offenders.length ? ` — ${layout.offenders.join(" | ")}` : "";
        fail(route, width, `horizontal overflow (scrollWidth ${layout.scrollWidth})${offenders}`);
      }
      for (const overlap of layout.overlaps) {
        if (overlap.significant) fail(route, width, `header overlap: ${overlap.entry}`);
        else note(`${route} @${width} header touch: ${overlap.entry}`);
      }
      if (layout.band) {
        if (layout.band.overflow) {
          fail(route, width, `route band nav overflows band (nav right ${layout.band.navRight} > band right ${layout.band.bandRight})`);
        }
        if (width >= 1200 && width <= 1366) {
          note(`route band fit ${route} @${width}: slack ${layout.band.bandRight - layout.band.navRight}px`);
        }
      }
      if (!layout.skipLink || !layout.skipTarget) fail(route, width, "skip link or #main-content target missing");
      if (!layout.consultationTarget) fail(route, width, "#consultation anchor missing");

      const expected = EXPECTED_ACTIVE[route];
      if (expected && layout.current !== expected) {
        fail(route, width, `aria-current=${layout.current ?? "none"}, expected ${expected}`);
      }
      if (consoleIssues.length > 0) fail(route, width, consoleIssues.slice(0, 4).join(" | "));

      if (INTERACTIVE_WIDTHS.includes(width)) {
        const variant = await page.$eval("header[data-variant]", (el) => el.dataset.variant);
        await runMenuChecks(page, route, width, variant);
        await runSectionChecks(page, route, width);
        await goto(route); // restore a clean state after interactions
      }
    }
    console.log(`OK scan complete: ${route}`);
  }

  await browser.close();

  console.log("\n" + "=".repeat(64));
  console.log(`Loads: ${ROUTES.length * ALL_WIDTHS.length} (+ interactive re-visits)`);
  console.log(`Failures: ${failures.length}`);
  console.log(`Notes: ${notes.length}`);
  if (failures.length > 0) {
    console.log("\nFailures:");
    for (const entry of failures) console.log(`  - ${entry}`);
  }
  process.exit(failures.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(2);
});




