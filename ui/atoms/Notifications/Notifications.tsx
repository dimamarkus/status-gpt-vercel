"use client";
import { Toaster, ToasterProps } from "react-hot-toast";

const Notifications = (props: ToasterProps) => {
  return <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 2000 }} />;
};

export default Notifications;
