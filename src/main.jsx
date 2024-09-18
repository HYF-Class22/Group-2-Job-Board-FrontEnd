import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route } from "react-router-dom";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipesPage from "./RecipesPage.jsx";
import JobsPage from "./components/JobsPage.jsx";
import JobDetails from "./components/JobDetails/JobDetails.jsx"
import AccountDetails from "./components/AccountDetails/AccountDetails.jsx";
import DeleteJob from "./components/DeleteJob/DeleteJob.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/recipes", element: <RecipesPage /> },
  { path: "/myjobs", element: <JobsPage /> },
  { path: "/myjob/:id", element: <JobDetails /> },
  { path: "/delete/:id", element: <DeleteJob /> },
  { Route, path: "/account-details", element: <AccountDetails /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
