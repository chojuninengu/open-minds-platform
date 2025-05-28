import os
import httpx
from typing import Dict, Any, Optional
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIService:
    """Service for interacting with the Claude AI API."""
    
    def __init__(self):
        """Initialize the AI service with configuration from environment variables."""
        self.api_key = os.getenv("CLAUDE_API_KEY")
        if not self.api_key:
            raise ValueError("CLAUDE_API_KEY environment variable is not set")
            
        self.api_url = os.getenv("CLAUDE_API_URL", "https://ai.kivoyo.com")
        self.default_model = os.getenv("CLAUDE_MODEL", "coding-teacher")
        
        logger.info(f"Initializing AI Service with URL: {self.api_url}")
        logger.info(f"Using default model: {self.default_model}")
            
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    async def _make_request(
        self,
        prompt: str,
        model: Optional[str] = None,
        system_message: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 2000
    ) -> Dict[Any, Any]:
        """Make a request to the AI API.
        
        Args:
            prompt: The prompt to send to the AI
            model: Optional model override
            system_message: Optional system message
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens in response
            
        Returns:
            Dict containing the API response
            
        Raises:
            Exception: If the API request fails
        """
        try:
            messages = []
            if system_message:
                messages.append({"role": "system", "content": system_message})
            messages.append({"role": "user", "content": prompt})
            
            request_data = {
                "model": model or self.default_model,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens
            }
            
            endpoint = f"{self.api_url}/v1/chat/completions"
            logger.info(f"Making request to model: {model or self.default_model}")
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    endpoint,
                    headers=self.headers,
                    json=request_data,
                    timeout=30.0
                )
                
                if response.status_code != 200:
                    error_detail = response.json().get('detail', 'Unknown error')
                    raise Exception(f"API request failed: {error_detail}")
                    
                return response.json()
                
        except Exception as e:
            logger.error(f"Error making AI request: {str(e)}")
            raise

    async def get_chat_response(
        self,
        message: str,
        model: Optional[str] = None
    ) -> Dict[str, str]:
        """Get a chat response from the AI.
        
        Args:
            message: The user's message
            model: Optional model override
            
        Returns:
            Dict with response text and model used
        """
        system_message = """You are Nova, an AI learning assistant for students.
        You explain concepts clearly and provide helpful examples.
        If asked about programming, always include code examples.
        Keep responses concise but informative.
        Be friendly and encouraging."""
        
        try:
            response = await self._make_request(
                prompt=message,
                model=model,
                system_message=system_message
            )
            
            return {
                "response": response["choices"][0]["message"]["content"],
                "model": model or self.default_model
            }
        except Exception as e:
            logger.error(f"Error getting chat response: {str(e)}")
            raise

    async def translate_text(
        self,
        text: str,
        target_language: str,
        model: Optional[str] = None
    ) -> Dict[str, str]:
        """Translate text using the AI.
        
        Args:
            text: Text to translate
            target_language: Target language
            model: Optional model override
            
        Returns:
            Dict with translated text and model used
        """
        prompt = f"Translate the following text to {target_language}. Only respond with the translation, no explanations:\n\n{text}"
        
        try:
            response = await self._make_request(
                prompt=prompt,
                model=model,
                temperature=0.3  # Lower temperature for more consistent translations
            )
            
            return {
                "translated": response["choices"][0]["message"]["content"].strip(),
                "model": model or self.default_model
            }
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