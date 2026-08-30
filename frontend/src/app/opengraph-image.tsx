import { ImageResponse } from "next/og";

export const alt = "Recovery Altitude — Outdoor recovery & altitude wellness";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#fbfaf2",
          fontFamily: "Barlow Condensed, Arial Narrow, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              width: "54px",
              height: "3px",
              backgroundColor: "#f1b34c",
            }}
          />
          <p
            style={{
              margin: 0,
              color: "#4b817e",
              fontSize: "14px",
              fontFamily: "IBM Plex Mono, Courier New, monospace",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Outdoor recovery &amp; altitude wellness
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h1
            style={{
              margin: 0,
              color: "#10232e",
              fontSize: "72px",
              fontWeight: 600,
              letterSpacing: "-2px",
              lineHeight: 0.95,
            }}
          >
            Recovery Altitude
          </h1>
          <p
            style={{
              margin: 0,
              color: "#56706d",
              fontSize: "24px",
              maxWidth: "600px",
              lineHeight: 1.3,
              fontFamily: "Atkinson Hyperlegible, Arial, sans-serif",
            }}
          >
            A considered return to movement, built for people who want more confidence in the outdoors.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#10232e",
              fontSize: "14px",
              fontFamily: "IBM Plex Mono, Courier New, monospace",
              letterSpacing: "1px",
            }}
          >
            recoveryaltitude.com
          </p>
          <p
            style={{
              margin: 0,
              color: "#205f67",
              fontSize: "14px",
              fontFamily: "IBM Plex Mono, Courier New, monospace",
              letterSpacing: "1px",
            }}
          >
            RA / 01
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
