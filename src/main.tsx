import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { GlobalErrorHandler, ErrorBoundary } from "@/providers/ErrorBoundary";
import { router } from "./router";
import "@/styles/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalErrorHandler>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </GlobalErrorHandler>
  </StrictMode>
);
