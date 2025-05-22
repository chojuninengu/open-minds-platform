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
    """Request model for the chat endpoint.
    
    Example:
        {
            "message": "Explain recursion",
            "model": "coder"
        }
    """
    message: str = Field(..., description="The user's message or question")
    model: Optional[NovaModel] = Field(
        default=NovaModel.CODING_TEACHER,
        description="The AI model to use for the response"
    )

class TranslateRequest(BaseModel):
    """Request model for the translation endpoint.
    
    Example:
        {
            "text": "Hola mundo",
            "target_language": "en"
        }
    """
    text: str = Field(..., description="Text to translate")
    target_language: str = Field(..., description="Target language code (e.g., 'fr', 'es')")

class SummaryRequest(BaseModel):
    """Request model for the summarization endpoint.
    
    Example:
        {
            "text": "Very long document text..."
        }
    """
    text: str = Field(..., description="Text to summarize") 