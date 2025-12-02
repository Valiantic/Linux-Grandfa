import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
import base64
import re
from typing import Optional

from app.config import settings


class GeminiService:
    """Service for interacting with Google's Gemini AI model."""
    
    SYSTEM_PROMPT = """You are Nesti, a friendly Linux Grandpa (penguin mascot) and Linux expert. You speak warmly with simple language.

RULES:
1. ONLY answer Linux/Unix questions: commands, scripting, servers, networking, files, permissions, packages, processes.

2. For non-Linux topics, say briefly: "Hold on, young G! I only know Linux stuff. Ask me about commands or system admin!"

3. RESPONSE STYLE - Be CONCISE and CLEAR:
   - Keep answers short (2-4 sentences max for simple questions)
   - Show command first, then brief explanation
   - Use simple words, NO technical jargon
   - One practical example is enough
   - Only warn about dangerous commands (rm -rf, sudo) when relevant

4. FORMAT:
   - Command: `command here`
   - Brief explanation in plain English
   - Example if needed

5. For images: analyze if Linux-related (terminal, config, errors). If not, politely decline.

6. Personality: friendly grandpa, use occasional "young G!" or "let me tell ya" but keep it minimal.

Be helpful, be brief, be clear. No walls of text!"""

    def __init__(self):
        """Initialize the Gemini service with API configuration."""
        genai.configure(api_key=settings.gemini_api_key)
        self.model = genai.GenerativeModel(
            model_name=settings.gemini_model,
            system_instruction=self.SYSTEM_PROMPT,
            safety_settings={
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            }
        )
    
    def _extract_image_data(self, data_url: str) -> tuple[str, bytes]:
        """Extract mime type and binary data from a data URL."""
        # Parse data URL: data:image/png;base64,<data>
        match = re.match(r'data:([^;]+);base64,(.+)', data_url)
        if not match:
            raise ValueError("Invalid data URL format")
        
        mime_type = match.group(1)
        base64_data = match.group(2)
        binary_data = base64.b64decode(base64_data)
        
        return mime_type, binary_data
    
    async def generate_response(
        self, 
        message: str, 
        images: Optional[list[str]] = None
    ) -> str:
        """
        Generate a response using Gemini model.
        
        Args:
            message: The user's text message
            images: Optional list of base64 encoded images (data URLs)
            
        Returns:
            The generated response text
        """
        try:
            content_parts = []
            
            # Add images if provided
            if images:
                for image_data_url in images:
                    try:
                        mime_type, binary_data = self._extract_image_data(image_data_url)
                        content_parts.append({
                            "mime_type": mime_type,
                            "data": binary_data
                        })
                    except ValueError as e:
                        # Skip invalid images
                        continue
            
            # Add the text message
            content_parts.append(message)
            
            # Generate response
            response = await self.model.generate_content_async(content_parts)
            
            # Extract and return the text response
            if response.text:
                return response.text
            else:
                return "Well now, this old penguin's brain froze up for a moment! Could ya try askin' that again, young'un?"
                
        except Exception as e:
            # Log the error in production
            print(f"Gemini API Error: {str(e)}")
            return "Aw shucks! Somethin' went wrong with my thinkin' circuits. Give it another try in a moment, would ya?"


# Singleton instance
gemini_service = GeminiService()
