import { JSX, Suspense } from "react";
import { createBrowserRouter } from "react-router";

import HomePage from "@/pages/Home";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
]);
