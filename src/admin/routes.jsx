// @ts-nocheck
import { createHashRouter } from "react-router-dom";
import ApplicationLayout from "../components/application-layout/LayoutOne";
import ErrorPage from "./pages/error/Error";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";

function createAddonComponent(addonId, componentName) {
  return function AddonComponent() {
    const addon = window['NovaToolsAddons']?.[addonId];
    if (addon && addon[componentName]) {
      const Component = addon[componentName];
      return <Component />;
    }
    return <div className="p-6">Loading...</div>;
  };
}

const addonRoutes = (window['novaTools']?.addonRoutes || []).map((route) => {
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
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "login", element: <LoginPage /> },
      ...addonRoutes,
    ],
  },
]);
