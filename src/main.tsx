import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";

import { GlobalErrorHandler, ErrorBoundary } from "@/providers/ErrorBoundary";
import { router } from "./router";
import store from "@/app/store";
import "@/styles/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalErrorHandler>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <RouterProvider router={router} />
        </StoreProvider>
      </ErrorBoundary>
    </GlobalErrorHandler>
  </StrictMode>
);
