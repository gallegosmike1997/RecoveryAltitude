import { nextui } from "@nextui-org/theme";

const recoveryAltitudeTheme = nextui({
  defaultTheme: "light",
  themes: {
    light: {
      layout: {
        radius: {
          small: "0px",
          medium: "0px",
          large: "0px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "2px",
        },
        boxShadow: {
          small: "none",
          medium: "none",
          large: "none",
        },
      },
      colors: {
        background: "#FBFAF2",
        foreground: "#10232E",
        content1: "#FBFAF2",
        content2: "#FFFFFF",
        content3: "#4B817E",
        content4: "#205F67",
        divider: "#4B817E",
        focus: "#F1B34C",
        overlay: "#10232E",
        default: {
          DEFAULT: "#FBFAF2",
          foreground: "#10232E",
        },
        primary: {
          DEFAULT: "#F1B34C",
          foreground: "#10232E",
        },
        secondary: {
          DEFAULT: "#205F67",
          foreground: "#FBFAF2",
        },
        success: {
          DEFAULT: "#4B817E",
          foreground: "#10232E",
        },
        warning: {
          DEFAULT: "#F1B34C",
          foreground: "#10232E",
        },
        danger: {
          DEFAULT: "#10232E",
          foreground: "#FBFAF2",
        },
      },
    },
  },
});

export default recoveryAltitudeTheme;
