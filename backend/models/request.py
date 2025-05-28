from pydantic import BaseModel, Field
from typing import Optional

class ChatRequest(BaseModel):
    """Request model for the chat endpoint."""
    message: str = Field(..., description="The user's message")

class TranslateRequest(BaseModel):
    """Request model for the translate endpoint."""
    text: str = Field(..., description="Text to translate")
    target_language: str = Field(..., description="Target language")

class SummaryRequest(BaseModel):
    """Request model for the summary endpoint."""
    text: str = Field(..., description="Text to summarize") 