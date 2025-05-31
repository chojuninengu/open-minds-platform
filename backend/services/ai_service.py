import os
from dotenv import load_dotenv
from anthropic import Anthropic
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIService:
    """Service for interacting with the Claude API."""
    
    def __init__(self):
        """Initialize the AI service with configuration from environment variables."""
        self.api_key = os.getenv('CLAUDE_API_KEY')
        if not self.api_key:
            raise ValueError("CLAUDE_API_KEY environment variable is not set")
        
        self.client = Anthropic(api_key=self.api_key)
        logger.info("Initialized Claude AI Service")

    async def get_response(self, message: str) -> str:
        """Get a response from Claude AI."""
        try:
            response = await self.client.messages.create(
                model="claude-3-opus-20240229",
                max_tokens=1024,
                messages=[{
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
                }]
            )
            return response.content[0].text
        except Exception as e:
            logger.error(f"Error in AI service: {str(e)}")
            raise

# Create a singleton instance
ai_service = AIService() 