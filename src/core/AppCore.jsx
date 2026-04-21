// src/core/AppCore.jsx
// Core application startup logic, configuration, and initialization

export const AppConfig = {
  appName: "Vivaha",
  version: "1.0.0",
  apiEndpoints: {
    gemini: import.meta.env.VITE_GEMINI_API_KEY,
  },
  features: {
    premiumEnabled: true,
    aiAssistantEnabled: true,
    sustainabilityEnabled: true,
  },
  demoMode: true,
};

export const initializeApp = () => {
  console.log(`Starting ${AppConfig.appName} v${AppConfig.version}`);
  console.log(`Demo Mode: ${AppConfig.demoMode}`);
  
  // Initialize any core services here
  const isAuthenticated = localStorage.getItem("user") !== null;
  
  return {
    config: AppConfig,
    isAuthenticated,
    startTime: new Date().toISOString(),
  };
};

export default { AppConfig, initializeApp };