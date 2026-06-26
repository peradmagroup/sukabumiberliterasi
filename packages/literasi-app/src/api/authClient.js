import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return window.location.origin; // Otomatis pakai URL Netlify
  }
  return "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseUrl()
});
