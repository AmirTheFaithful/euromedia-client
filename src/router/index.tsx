import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router";

import { ErrorFallback, LoadingFallback } from "@/fallbacks";

const HomePage = lazy(() => import("@/pages/Home"));
const SignupPage = lazy(() => import("@/pages/Signup"));
const SigninPage = lazy(() => import("@/pages/Signin"));
const PostAuthPage = lazy(() => import("@/pages/PostAuthSetup"));

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
  {
    path: "/signin",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SigninPage />
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/scenes/postauth",
    element: <PostAuthPage />,
  },
]);
