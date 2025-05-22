from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    """Request model for the chat endpoint."""
    message: str = Field(..., description="The user's message or question")

class TranslateRequest(BaseModel):
    """Request model for the translation endpoint."""
    text: str = Field(..., description="Text to translate")
    target_language: str = Field(..., description="Target language code (e.g., 'fr', 'es')")

class SummaryRequest(BaseModel):
    """Request model for the summarization endpoint."""
    text: str = Field(..., description="Text to summarize") 