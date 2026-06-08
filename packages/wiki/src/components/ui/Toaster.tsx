import { Toaster as SonnerToaster } from "solid-sonner";

export default function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "white",
          border: "1px solid #e2e8f0",
          color: "#1e293b",
          "font-family": "Inter, system-ui, sans-serif",
        },
      }}
      theme="light"
    />
  );
}
