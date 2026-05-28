import React from "react";
import { createHashRouter } from "react-router-dom";
import ApplicationLayout from "../components/application-layout/LayoutOne";
import Settings from "./pages/settings";
import ErrorPage from "./pages/error/Error";
import Inbox from "./pages/inbox";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/login";
import Charts from "./pages/charts";

function createAddonComponent(addonId, componentName) {
  return function AddonComponent() {
    const addon = window.NovaToolsAddons?.[addonId];
    if (addon && addon[componentName]) {
      const Component = addon[componentName];
      return <Component />;
    }
    return <div className="p-6">Loading...</div>;
  };
}

const coreChildren = [
  { path: "/", element: <Dashboard /> },
  { path: "dashboard", element: <Dashboard /> },
  { path: "inbox", element: <Inbox /> },
  { path: "settings", element: <Settings /> },
  { path: "login", element: <LoginPage /> },
  { path: "charts", element: <Charts /> },
];

const addonRoutes = (window.novaTools?.addonRoutes || []).map((route) => {
  const AddonComponent = createAddonComponent(route.addonId, route.component);
  return {
    path: route.path,
    element: <AddonComponent />,
  };
});

export const router = createHashRouter([
  {
    path: "/",
    element: <ApplicationLayout />,
    errorElement: <ErrorPage />,
    children: [...coreChildren, ...addonRoutes],
  },
]);
