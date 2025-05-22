from pydantic import BaseModel, Field
from typing import Optional

class ChatResponse(BaseModel):
    """Response model for the chat endpoint."""
    response: str = Field(..., description="AI-generated response")
    error: Optional[str] = Field(None, description="Error message if any")

class TranslateResponse(BaseModel):
    """Response model for the translation endpoint."""
    translated: str = Field(..., description="Translated text")
    error: Optional[str] = Field(None, description="Error message if any")

class SummaryResponse(BaseModel):
    """Response model for the summarization endpoint."""
    summary: str = Field(..., description="Summarized text")
    error: Optional[str] = Field(None, description="Error message if any")

class HealthResponse(BaseModel):
    """Response model for the health check endpoint."""
    message: str = Field(..., description="API status message") 