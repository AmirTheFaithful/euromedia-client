import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router";

import { ErrorFallback, LoadingFallback } from "@/fallbacks";

const HomePage = lazy(() => import("@/pages/Home"));
const SignupPage = lazy(() => import("@/pages/Signup"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HomePage />
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SignupPage />
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
  },
]);
