// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  endpoints: {
    chat: "/api/chat/",
    health: "/api/chat/health",
  },
} as const;
