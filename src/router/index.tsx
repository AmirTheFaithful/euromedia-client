import { createBrowserRouter } from "react-router";

import HomePage from "@/pages/Home";
import { ErrorFallback } from "@/pages/special";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorFallback />,
  },
]);
