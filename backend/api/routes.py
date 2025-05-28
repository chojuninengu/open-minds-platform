from fastapi import APIRouter, HTTPException
from backend.models.request import ChatRequest, TranslateRequest, SummaryRequest
from backend.models.response import ChatResponse, TranslateResponse, SummaryResponse, HealthResponse
from backend.services.ai_service import ai_service
import logging

# Configure logging
logger = logging.getLogger(__name__)

# Create router with prefix
router = APIRouter(prefix="/api/nova")

@router.get("/", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    try:
        return HealthResponse(message="Nova API is live")
    except Exception as e:
        logger.error(f"Error in health check endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/ask", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat endpoint for getting AI responses.
    
    Example request:
        POST /api/nova/ask
        {
            "message": "Explain recursion"
        }
    """
    try:
        logger.info(f"Chat request - Message: {request.message}")
        
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
            
        response = await ai_service.get_chat_response(request.message)
        logger.info("Successfully generated chat response")
        return ChatResponse(**response)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to get AI response. Please try again later."
        )

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
        
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
            
        if not request.target_language.strip():
            raise HTTPException(status_code=400, detail="Target language cannot be empty")
            
        response = await ai_service.translate_text(request.text, request.target_language)
        logger.info("Successfully translated text")
        return TranslateResponse(**response)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in translate endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to translate text. Please try again later."
        )

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
        
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
            
        response = await ai_service.summarize_text(request.text)
        logger.info("Successfully generated summary")
        return SummaryResponse(**response)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in summary endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to generate summary. Please try again later."
        ) 