"use client";
import { GoogleAnalytics as GAnalytics } from "nextjs-google-analytics";

export const GoogleAnalytics = () => {
  return <GAnalytics trackPageViews />;
};

export default GoogleAnalytics;
