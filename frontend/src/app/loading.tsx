export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        background: "var(--ra-ivory)",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "3px solid var(--ra-line)",
          borderTopColor: "var(--ra-teal)",
          borderRadius: "50%",
          animation: "ra-spin 0.8s linear infinite",
        }}
      />
      <p
        style={{
          color: "var(--ra-ink-muted)",
          fontFamily: "var(--ra-font-mono)",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Loading route...
      </p>
      <style>{`
        @keyframes ra-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
