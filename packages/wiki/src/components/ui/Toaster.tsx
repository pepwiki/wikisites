import { Toaster as SonnerToaster } from "solid-sonner";

export default function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          "font-family": "Inter, system-ui, sans-serif",
        },
      }}
      theme="dark"
      class="dark-only"
    />
  );
}
