import { Exo, Inter, Lato, Montserrat, Raleway } from "next/font/google";
import localFont from "next/font/local";

// ============================================================================
//  Fonts
// ============================================================================

//  Google Fonts
// ============================================================================

// -Variable ------------------------------------------------------------------
export const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// -Regular -------------------------------------------------------------------
export const exoFont = Exo({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const montserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const ralewayFont = Raleway({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const latoFont = Lato({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
});

//  Local Fonts
// ============================================================================

export const graphikFont = localFont({
  variable: "--font-graphik",
  src: [
    {
      path: "../assets/fonts/Graphik-Medium.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Graphik-Regular.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Graphik-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Graphik-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export const tiemposFont = localFont({
  variable: "--font-tiempos",
  src: [
    {
      path: "../assets/fonts/TiemposText-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/TiemposText-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/TiemposText-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/TiemposText-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/TiemposText-Italic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/TiemposText-SemiboldItalic.woff",
      weight: "600",
      style: "italic",
    },
    {
      path: "../assets/fonts/TiemposText-BoldItalic.woff",
      weight: "700",
      style: "italic",
    },
  ],
});

export const tiemposHeadlineFont = localFont({
  variable: "--font-tiemposHeadline",
  src: [
    {
      path: "../assets/fonts/TiemposHeadline-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/TiemposHeadline-Medium.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/TiemposHeadline-Regular.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/TiemposHeadline-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/TiemposHeadline-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/TiemposHeadline-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
});

export const avenirFont = localFont({
  variable: "--font-avenir",
  src: [
    {
      path: "../assets/fonts/AvenirNextLTPro-UltLtCn.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/AvenirNextLTPro-Regular.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/AvenirNextLTPro-MediumCn.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/AvenirNextLTPro-Demi.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/AvenirNextLTPro-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/AvenirNextLTPro-HeavyCn.woff",
      weight: "900",
      style: "normal",
    },
  ],
});
