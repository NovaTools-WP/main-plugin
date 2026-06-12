import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from "@/components/theme-provider"
const el = document.getElementById("novatools");

if (el) {
  ReactDOM.createRoot(el).render(
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <React.StrictMode>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode></ThemeProvider>,
  );
}
