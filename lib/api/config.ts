export const DORRA_API_CONFIG = {
  // Always use proxy to avoid CORS issues
  baseURL: "/api/dorra",
  apiKey: process.env.NEXT_PUBLIC_DORRA_API_KEY || "",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${process.env.NEXT_PUBLIC_DORRA_API_KEY || ""}`,
  },
};
