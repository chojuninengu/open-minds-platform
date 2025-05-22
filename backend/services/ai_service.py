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
        self.api_key = "sk-94fbdf40052a41ebb9ffb2f4949fc117"  # Using the provided API key
        self.model = os.getenv("CLAUDE_MODEL", "coder")  # Using the coder model as default
        self.api_url = "https://ai.kivoyo.com"  # Using base URL
        
        logger.info(f"Initializing AI Service with URL: {self.api_url}")
        logger.info(f"Using model: {self.model}")
        logger.info(f"API Key present: {bool(self.api_key)}")
            
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",  # Using Bearer token authentication
            "Content-Type": "application/json",
            "Accept": "application/json"
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
            request_data = {
                "model": self.model,
                "messages": [
                    {"role": "system", "content": "You are Nova, a helpful AI assistant."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.7,
                "max_tokens": 1000
            }
            
            endpoint = f"{self.api_url}/v1/chat/completions"  # Using /v1/chat/completions
            logger.info(f"Making request to: {endpoint}")
            logger.info(f"Request headers: {self.headers}")
            logger.info(f"Request data: {request_data}")
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    endpoint,
                    headers=self.headers,
                    json=request_data,
                    timeout=30.0
                )
                
                logger.info(f"API Response Status: {response.status_code}")
                logger.info(f"API Response Headers: {dict(response.headers)}")
                
                try:
                    response_json = response.json()
                    logger.info(f"API Response Body: {response_json}")
                except Exception as e:
                    logger.error(f"Failed to parse response as JSON: {str(e)}")
                    logger.info(f"Raw response text: {response.text}")
                
                response.raise_for_status()
                return response_json
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP Status Error: {e.response.status_code}")
            logger.error(f"Response headers: {dict(e.response.headers)}")
            logger.error(f"Response body: {e.response.text}")
            raise
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