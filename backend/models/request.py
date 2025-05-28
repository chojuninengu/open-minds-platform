from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class NovaModel(str, Enum):
    """Available AI models for Nova."""
    CODING_TEACHER = "coding-teacher"
    CODER = "coder"
    CODER_SUMMARY = "coder-summary"
    CODER_COMMIT = "coder-commit"
    CODER_AUTOCOMPLETE = "coder-autocomplete"
    CODER_EXERCISES = "coder-exercises"

class ChatRequest(BaseModel):
    """Request model for the chat endpoint."""
    message: str = Field(..., description="The user's message")
    model: Optional[str] = Field(
        default="coding-teacher",
        description="The AI model to use"
    )

class TranslateRequest(BaseModel):
    """Request model for the translate endpoint."""
    text: str = Field(..., description="Text to translate")
    target_language: str = Field(..., description="Target language")
    model: Optional[str] = None

class SummaryRequest(BaseModel):
    """Request model for the summary endpoint."""
    text: str = Field(..., description="Text to summarize")
    model: Optional[str] = None 