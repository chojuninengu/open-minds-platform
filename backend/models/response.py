from pydantic import BaseModel, Field
from typing import Optional

class ChatResponse(BaseModel):
    """Response model for the chat endpoint.
    
    Example:
        {
            "response": "Recursion is a programming concept where a function calls itself...",
            "model": "coding-teacher"
        }
    """
    response: str = Field(..., description="AI-generated response")
    model: str = Field(..., description="The AI model used for the response")

class TranslateResponse(BaseModel):
    """Response model for the translation endpoint.
    
    Example:
        {
            "translated": "Hello world",
            "source_language": "es",
            "target_language": "en"
        }
    """
    translated: str = Field(..., description="Translated text")
    source_language: Optional[str] = Field(None, description="Detected source language")
    target_language: str = Field(..., description="Target language used")

class SummaryResponse(BaseModel):
    """Response model for the summarization endpoint.
    
    Example:
        {
            "summary": "Key points from the document...",
            "length_reduction": "75%"
        }
    """
    summary: str = Field(..., description="Summarized text")
    length_reduction: Optional[str] = Field(None, description="Percentage of length reduction")

class HealthResponse(BaseModel):
    """Response model for the health check endpoint.
    
    Example:
        {
            "message": "Nova API is live",
            "version": "1.0.0"
        }
    """
    message: str = Field(..., description="API status message")
    version: str = Field(default="1.0.0", description="API version") 