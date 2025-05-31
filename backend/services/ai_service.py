import os
from dotenv import load_dotenv
import httpx
import logging
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
        self.api_key = os.getenv('GROQ_API_KEY')
        if not self.api_key:
            raise ValueError("GROQ_API_KEY environment variable is not set")
        
        self.base_url = "https://api.groq.com/openai/v1"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        logger.info("Initialized Groq AI Service")

    async def get_response(self, message: str) -> str:
        """Get a response from Groq AI."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=self.headers,
                    json={
                        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
                        "messages": [
                            {
                                "role": "system",
                                "content": """You are Nova, an AI learning assistant for students.
                                You explain concepts clearly and provide helpful examples.
                                If asked about programming, always include code examples.
                                Keep responses concise but informative.
                                Be friendly and encouraging."""
                            },
                            {
                                "role": "user",
                                "content": message
                            }
                        ]
                    }
                )
                response.raise_for_status()
                data = response.json()
                return data['choices'][0]['message']['content']
        except Exception as e:
            logger.error(f"Error in AI service: {str(e)}")
            raise

# Create a singleton instance
ai_service = AIService() 