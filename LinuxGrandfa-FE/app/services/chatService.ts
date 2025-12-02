import { API_CONFIG } from "@/app/config";

export interface ChatApiResponse {
  response: string;
  role: string;
}

export interface ChatApiRequest {
  message: string;
  images?: string[] | null;
}

/**
 * Send a chat message to the API and get a response
 */
export async function sendChatMessage(
  message: string,
  images?: string[]
): Promise<string> {
  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.chat}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          images: images && images.length > 0 ? images : null,
        } as ChatApiRequest),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ChatApiResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error("Failed to get response from API:", error);
    return "Aw shucks! This old penguin's havin' trouble connectin' to the server. Make sure the backend is runnin' and try again, would ya?";
  }
}

/**
 * Check if the chat API is healthy
 */
export async function checkChatHealth(): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.health}`
    );
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Convert File objects to base64 data URLs
 */
export function filesToDataUrls(files: File[]): Promise<string[]> {
  const imagePromises = files.map((file) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  });

  return Promise.all(imagePromises);
}
