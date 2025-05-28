import os
import httpx
from typing import Dict, Any
import logging
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIService:
    """Service for interacting with the Groq API."""
    
    def __init__(self):
        """Initialize the AI service with configuration from environment variables."""
        self.api_key = os.getenv("GROQ_API_KEY", "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")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY environment variable is not set")
            
        self.api_url = "https://api.groq.com/openai/v1"
        self.model = "meta-llama/llama-4-scout-17b-16e-instruct"
        
        logger.info(f"Initializing AI Service with URL: {self.api_url}")
        logger.info(f"Using model: {self.model}")
            
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    async def _make_request(
        self,
        prompt: str,
        system_message: str | None = None,
        temperature: float = 0.7,
        max_tokens: int = 2000
    ) -> Dict[str, Any]:
        """Make a request to the AI API."""
        try:
            messages = []
            if system_message:
                messages.append({"role": "system", "content": system_message})
            messages.append({"role": "user", "content": prompt})
            
            request_data = {
                "model": self.model,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens
            }
            
            endpoint = f"{self.api_url}/chat/completions"
            logger.info(f"Request data: {json.dumps(request_data, indent=2)}")
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    endpoint,
                    headers=self.headers,
                    json=request_data,
                    timeout=30.0
                )
                
                response_json = None
                try:
                    response_json = response.json()
                except Exception as e:
                    logger.error(f"Failed to parse response as JSON: {str(e)}")
                    logger.error(f"Response text: {response.text}")
                    raise Exception("Failed to parse API response")

                if response.status_code != 200:
                    error_detail = response_json.get('error', {}).get('message', 'Unknown error') if response_json else 'Unknown error'
                    logger.error(f"API request failed with status {response.status_code}")
                    logger.error(f"Error detail: {error_detail}")
                    logger.error(f"Response headers: {dict(response.headers)}")
                    raise Exception(f"API request failed: {error_detail}")
                
                logger.info(f"Successful response: {json.dumps(response_json, indent=2)}")
                return response_json
                
        except httpx.TimeoutException:
            logger.error("Request timed out")
            raise Exception("Request to AI service timed out")
        except httpx.RequestError as e:
            logger.error(f"Request failed: {str(e)}")
            raise Exception(f"Failed to connect to AI service: {str(e)}")
        except Exception as e:
            logger.error(f"Error making AI request: {str(e)}")
            raise

    async def get_chat_response(self, message: str) -> Dict[str, str]:
        """Get a chat response from the AI."""
        system_message = """You are Nova, an AI learning assistant for students.
        You explain concepts clearly and provide helpful examples.
        If asked about programming, always include code examples.
        Keep responses concise but informative.
        Be friendly and encouraging."""
        
        try:
            response = await self._make_request(
                prompt=message,
                system_message=system_message
            )
            
            if not response.get("choices") or not response["choices"][0].get("message"):
                logger.error(f"Unexpected response format: {json.dumps(response, indent=2)}")
                raise Exception("Invalid response format from AI service")
            
            return {
                "response": response["choices"][0]["message"]["content"].strip()
            }
        except Exception as e:
            logger.error(f"Error getting chat response: {str(e)}")
            raise

    async def translate_text(self, text: str, target_language: str) -> Dict[str, str]:
        """Translate text using the AI."""
        prompt = f"Translate the following text to {target_language}. Only respond with the translation, no explanations:\n\n{text}"
        
        try:
            response = await self._make_request(
                prompt=prompt,
                temperature=0.3  # Lower temperature for more consistent translations
            )
            
            if not response.get("choices") or not response["choices"][0].get("message"):
                logger.error(f"Unexpected response format: {json.dumps(response, indent=2)}")
                raise Exception("Invalid response format from AI service")
            
            return {
                "translated": response["choices"][0]["message"]["content"].strip()
            }
        except Exception as e:
            logger.error(f"Error translating text: {str(e)}")
            raise

    async def summarize_text(self, text: str) -> Dict[str, str]:
        """Summarize text using the AI."""
        prompt = f"Summarize the following text concisely. Only provide the summary, no explanations:\n\n{text}"
        
        try:
            response = await self._make_request(
                prompt=prompt,
                temperature=0.3  # Lower temperature for more consistent summaries
            )
            
            if not response.get("choices") or not response["choices"][0].get("message"):
                logger.error(f"Unexpected response format: {json.dumps(response, indent=2)}")
                raise Exception("Invalid response format from AI service")
            
            return {
                "summary": response["choices"][0]["message"]["content"].strip()
            }
        except Exception as e:
            logger.error(f"Error summarizing text: {str(e)}")
            raise

# Create a singleton instance
ai_service = AIService() 