export const DORRA_API_CONFIG = {
  // Always use proxy to avoid CORS issues
  baseURL: "/api/dorra",
  apiKey: "V5NTCNA3LF:0T8ZMX2IICW2BP6TMVWPZH6WHELHPT9L",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${
      process.env.NEXT_PUBLIC_DORRA_API_KEY ||
      "V5NTCNA3LF:0T8ZMX2IICW2BP6TMVWPZH6WHELHPT9L"
    }`,
  },
};
