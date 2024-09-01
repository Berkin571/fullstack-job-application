import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppLayout } from "./layout/app-layout";
import { LandingPage } from "./pages/landing-page";
import { Onboarding } from "./pages/onboarding";
import { JobListings } from "./pages/job-listings";
import { Job } from "./pages/job";
import { PostJobs } from "./pages/post-job";
import { SavedJobs } from "./pages/saved-jobs";
import { MyJobs } from "./pages/my-jobs";
import { ThemeProvider } from "./components/theme-provider";

import "./App.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/onboarding", element: <Onboarding /> },
      { path: "/jobs", element: <JobListings /> },
      { path: "/jobs/:id", element: <Job /> },
      { path: "/post-job", element: <PostJobs /> },
      { path: "/saved-job", element: <SavedJobs /> },
      { path: "/my-jobs", element: <MyJobs /> },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
