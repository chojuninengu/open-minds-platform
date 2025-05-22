import os
import httpx
from typing import Dict, Any
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIService:
    """Service for interacting with the Claude AI API via ai.kivoyo.com."""
    
    def __init__(self):
        """Initialize the AI service with configuration from environment variables."""
        self.api_key = os.getenv("CLAUDE_API_KEY")
        self.model = os.getenv("CLAUDE_MODEL", "claude-3-sonnet")
        self.api_url = os.getenv("AI_API_URL", "https://ai.kivoyo.com/api")
        
        if not self.api_key:
            raise ValueError("CLAUDE_API_KEY environment variable is not set")
            
        self.headers = {
            "X-API-Key": self.api_key,
            "Content-Type": "application/json"
        }

    async def _make_request(self, prompt: str) -> Dict[Any, Any]:
        """Make a request to the Kivoyo AI API.
        
        Args:
            prompt: The prompt to send to the AI.
            
        Returns:
            Dict containing the API response.
            
        Raises:
            Exception: If the API request fails.
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.api_url}/chat/completions",
                    headers=self.headers,
                    json={
                        "model": self.model,
                        "messages": [
                            {"role": "system", "content": "You are Nova, a helpful AI assistant."},
                            {"role": "user", "content": prompt}
                        ],
                        "temperature": 0.7,
                        "max_tokens": 1000
                    },
                    timeout=30.0
                )
                logger.info(f"API Response Status: {response.status_code}")
                logger.info(f"API Response Headers: {response.headers}")
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error making AI API request: {str(e)}")
            raise

    async def get_chat_response(self, message: str) -> str:
        """Get a chat response from the AI.
        
        Args:
            message: The user's message.
            
        Returns:
            The AI's response.
        """
        system_prompt = """You are Nova, an AI learning assistant for students.
        You explain concepts clearly and provide helpful examples.
        If asked about programming, always include code examples.
        Keep responses concise but informative.
        Be friendly and encouraging."""
        
        try:
            response = await self._make_request(message)
            return response["choices"][0]["message"]["content"]
        except Exception as e:
            logger.error(f"Error getting chat response: {str(e)}")
            raise

    async def translate_text(self, text: str, target_language: str) -> str:
        """Translate text using the AI.
        
        Args:
            text: Text to translate.
            target_language: Target language code.
            
        Returns:
            Translated text.
        """
        prompt = f"Translate the following text to {target_language}. Only respond with the translation, no explanations:\n\n{text}"
        
        try:
            response = await self._make_request(prompt)
            return response["choices"][0]["message"]["content"]
        except Exception as e:
            logger.error(f"Error translating text: {str(e)}")
            raise

    async def summarize_text(self, text: str) -> str:
        """Summarize text using the AI.
        
        Args:
            text: Text to summarize.
            
        Returns:
            Summarized text.
        """
        prompt = f"Summarize the following text concisely. Only provide the summary, no explanations:\n\n{text}"
        
        try:
            response = await self._make_request(prompt)
            return response["choices"][0]["message"]["content"]
        except Exception as e:
            logger.error(f"Error summarizing text: {str(e)}")
            raise

# Create a singleton instance
ai_service = AIService() 