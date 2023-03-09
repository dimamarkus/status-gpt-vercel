"use client";
import { Toaster } from "react-hot-toast";
// import { GoogleAnalytics } from "nextjs-google-analytics";

const RootComponents = () => {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 2000 }} />
      {/* <GoogleAnalytics trackPageViews /> */}
    </>
  );
};

export default RootComponents;
