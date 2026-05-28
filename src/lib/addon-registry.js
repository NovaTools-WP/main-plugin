window.NovaToolsAddons = window.NovaToolsAddons || {};

export function registerAddonComponent(addonId, componentName, component) {
  if (!window.NovaToolsAddons[addonId]) {
    window.NovaToolsAddons[addonId] = {};
  }
  window.NovaToolsAddons[addonId][componentName] = component;
}

export function getAddonRoutes() {
  return window.novaTools?.addonRoutes || [];
}

export function getAddonComponent(addonId, componentName) {
  return window.NovaToolsAddons?.[addonId]?.[componentName] || null;
}
