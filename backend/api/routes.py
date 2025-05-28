from fastapi import APIRouter, HTTPException
from ..models.request import ChatRequest, TranslateRequest, SummaryRequest
from ..models.response import ChatResponse, TranslateResponse, SummaryResponse, HealthResponse
from ..services.ai_service import ai_service
import logging

# Configure logging
logger = logging.getLogger(__name__)

# Create router with prefix
router = APIRouter(prefix="/api/nova")

@router.get("/", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(message="Nova API is live")

@router.post("/ask", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat endpoint for getting AI responses.
    
    Example request:
        POST /api/nova/ask
        {
            "message": "Explain recursion",
            "model": "coder"
        }
    """
    try:
        logger.info(f"Chat request - Message: {request.message}, Model: {request.model}")
        response = await ai_service.get_chat_response(request.message, request.model)
        logger.info("Successfully generated chat response")
        return ChatResponse(**response)
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/translate", response_model=TranslateResponse)
async def translate(request: TranslateRequest):
    """Translation endpoint.
    
    Example request:
        POST /api/nova/translate
        {
            "text": "Hola mundo",
            "target_language": "en"
        }
    """
    try:
        logger.info(f"Translation request - Text: {request.text[:50]}..., Target: {request.target_language}")
        response = await ai_service.translate_text(request.text, request.target_language)
        logger.info("Successfully translated text")
        return TranslateResponse(**response)
    except Exception as e:
        logger.error(f"Error in translate endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/summary", response_model=SummaryResponse)
async def summarize(request: SummaryRequest):
    """Text summarization endpoint.
    
    Example request:
        POST /api/nova/summary
        {
            "text": "Very long document text..."
        }
    """
    try:
        logger.info(f"Summary request - Text: {request.text[:50]}...")
        summary = await ai_service.summarize_text(request.text)
        logger.info("Successfully generated summary")
        return SummaryResponse(summary=summary)
    except Exception as e:
        logger.error(f"Error in summary endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 