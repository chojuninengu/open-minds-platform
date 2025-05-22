import os
import httpx
from typing import Dict, Any, Optional
import logging
from datetime import datetime
from dotenv import load_dotenv
from backend.models.request import NovaModel

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class NovaAIService:
    """Service for interacting with AI models via Kivoyo."""
    
    def __init__(self):
        """Initialize the Nova AI service."""
        self.api_key = os.getenv("KIVOYO_API_KEY")
        if not self.api_key:
            raise ValueError("KIVOYO_API_KEY environment variable is not set")
        
        self._base_url = "https://ai.kivoyo.com"
        self.default_model = NovaModel.CODING_TEACHER
        
        logger.info("Initializing Nova AI Service")
        logger.info(f"Default model: {self.default_model}")
            
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    async def _make_request(
        self,
        prompt: str,
        model: Optional[NovaModel] = None,
        system_message: Optional[str] = None
    ) -> Dict[Any, Any]:
        """Make a request to the Kivoyo API.
        
        Args:
            prompt: The user's prompt/message
            model: The AI model to use
            system_message: Optional system message to set AI behavior
            
        Returns:
            Dict containing the API response
        """
        try:
            model = model or self.default_model
            
            messages = []
            if system_message:
                messages.append({"role": "system", "content": system_message})
            messages.append({"role": "user", "content": prompt})
            
            request_data = {
                "model": model.value,
                "messages": messages,
                "temperature": 0.7,
                "max_tokens": 2000
            }
            
            endpoint = f"{self._base_url}/v1/chat/completions"
            logger.info(f"Making request to model: {model.value}")
            logger.info(f"Endpoint: {endpoint}")
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    endpoint,
                    headers=self.headers,
                    json=request_data,
                    timeout=30.0
                )
                
                logger.info(f"Response status: {response.status_code}")
                response.raise_for_status()
                return response.json()
                
        except Exception as e:
            logger.error(f"Error making AI request: {str(e)}")
            raise

    async def get_chat_response(self, message: str, model: Optional[NovaModel] = None) -> Dict[str, str]:
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
            response = await self._make_request(message, model, system_message)
            return {
                "response": response["choices"][0]["message"]["content"],
                "model": model.value if model else self.default_model.value
            }
        except Exception as e:
            logger.error(f"Error getting chat response: {str(e)}")
            raise

    async def translate_text(self, text: str, target_language: str) -> Dict[str, str]:
        """Translate text using the AI.
        
        Args:
            text: Text to translate
            target_language: Target language code
            
        Returns:
            Dict with translated text and language info
        """
        prompt = f"""Translate the following text to {target_language}.
        Only respond with the translation, no explanations.
        
        Text: {text}"""
        
        try:
            response = await self._make_request(
                prompt,
                NovaModel.CODING_TEACHER,
                "You are a precise translator. Respond only with the translation."
            )
            
            return {
                "translated": response["choices"][0]["message"]["content"],
                "target_language": target_language,
                "source_language": "auto"  # Could be enhanced with language detection
            }
        except Exception as e:
            logger.error(f"Error translating text: {str(e)}")
            raise

    async def summarize_text(self, text: str) -> Dict[str, str]:
        """Summarize text using the AI.
        
        Args:
            text: Text to summarize
            
        Returns:
            Dict with summary and length reduction
        """
        prompt = f"""Summarize the following text concisely.
        Focus on key points and maintain clarity.
        
        Text: {text}"""
        
        try:
            response = await self._make_request(
                prompt,
                NovaModel.CODER_SUMMARY,
                "You are a precise summarizer. Focus on key technical points."
            )
            
            summary = response["choices"][0]["message"]["content"]
            reduction = round((1 - len(summary) / len(text)) * 100)
            
            return {
                "summary": summary,
                "length_reduction": f"{reduction}%"
            }
        except Exception as e:
            logger.error(f"Error summarizing text: {str(e)}")
            raise

# Create a singleton instance
nova_ai = NovaAIService() 