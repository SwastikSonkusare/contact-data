import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import ContactForm from "./components/ContactForm";
import Dashboard from "./components/Dashboard";
import App from "./App";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        {" "}
        <ContactForm />{" "}
      </App>
    ),
  },
  {
    path: "dashboard",
    element: (
      <App>
        <Dashboard />
      </App>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RouterProvider>
  </QueryClientProvider>
);
