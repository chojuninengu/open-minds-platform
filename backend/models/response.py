from pydantic import BaseModel, Field
from typing import Optional

class HealthResponse(BaseModel):
    """Response model for the health check endpoint."""
    message: str = Field(..., description="Health check message")

class ChatResponse(BaseModel):
    """Response model for the chat endpoint.
    
    Example:
        {
            "response": "Recursion is a programming concept where a function calls itself...",
            "model": "coding-teacher"
        }
    """
    response: str = Field(..., description="AI-generated response")
    model: str = Field(..., description="The AI model used")

class TranslateResponse(BaseModel):
    """Response model for the translate endpoint.
    
    Example:
        {
            "translated": "Hello world",
            "source_language": "es",
            "target_language": "en"
        }
    """
    translated: str = Field(..., description="Translated text")
    model: str = Field(..., description="The AI model used")

class SummaryResponse(BaseModel):
    """Response model for the summary endpoint.
    
    Example:
        {
            "summary": "Key points from the document...",
            "length_reduction": "75%"
        }
    """
    summary: str = Field(..., description="Summarized text")
    model: str = Field(..., description="The AI model used") 