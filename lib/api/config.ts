export const DORRA_API_CONFIG = {
  // Use proxy in development, direct API in production
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/api/dorra"
      : "https://hackathon-api.aheadafrica.org",
  apiKey: "V5NTCNA3LF:0T8ZMX2IICW2BP6TMVWPZH6WHELHPT9L",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${
      process.env.NEXT_PUBLIC_DORRA_API_KEY ||
      "V5NTCNA3LF:0T8ZMX2IICW2BP6TMVWPZH6WHELHPT9L"
    }`,
  },
};
