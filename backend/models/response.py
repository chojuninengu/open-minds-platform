from pydantic import BaseModel, Field

class HealthResponse(BaseModel):
    """Response model for the health check endpoint."""
    message: str = Field(..., description="Health check message")

class ChatResponse(BaseModel):
    """Response model for the chat endpoint."""
    response: str = Field(..., description="AI-generated response")

class TranslateResponse(BaseModel):
    """Response model for the translate endpoint."""
    translated: str = Field(..., description="Translated text")

class SummaryResponse(BaseModel):
    """Response model for the summary endpoint."""
    summary: str = Field(..., description="Summarized text") 