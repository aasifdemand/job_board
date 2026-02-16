import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/shared/theme-provider.tsx";
import { Toaster } from "@/components/ui/sonner";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes />
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
