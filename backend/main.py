from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
from anthropic import Anthropic
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Nova AI Assistant")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Anthropic client
api_key = os.getenv("CLAUDE_API_KEY")
if not api_key:
    logger.error("CLAUDE_API_KEY not found in environment variables")
    raise ValueError("CLAUDE_API_KEY not found in environment variables")

logger.info("Initializing Anthropic client...")
anthropic = Anthropic(api_key=api_key)

# Pydantic models
class AskRequest(BaseModel):
    prompt: str
    language: str
    context: str

class AskResponse(BaseModel):
    answer: str
    language: str

class TranslateRequest(BaseModel):
    text: str
    targetLang: str

class TranslateResponse(BaseModel):
    translatedText: str

class SummaryRequest(BaseModel):
    text: str

class SummaryResponse(BaseModel):
    summary: str

# System prompt for Nova
NOVA_SYSTEM_PROMPT = """You are Nova, an AI learning assistant for students. 
You explain concepts clearly and provide helpful examples.
If asked about programming, always include code examples.
Keep responses concise but informative.
Be friendly and encouraging."""

@app.post("/api/nova/ask", response_model=AskResponse)
async def ask_nova(request: AskRequest):
    try:
        logger.info(f"Received ask request with prompt: {request.prompt}")
        
        # Prepare the message with context
        message = f"Context: {request.context}\nQuestion: {request.prompt}"
        
        # Call Claude API
        logger.info("Calling Claude API...")
        response = anthropic.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            messages=[{
                "role": "user",
                "content": f"{NOVA_SYSTEM_PROMPT}\n\n{message}"
            }]
        )
        
        logger.info("Successfully received response from Claude API")
        return AskResponse(answer=response.content[0].text, language=request.language)
    except Exception as e:
        logger.error(f"Error in ask_nova: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/nova/translate", response_model=TranslateResponse)
async def translate_text(request: TranslateRequest):
    try:
        logger.info(f"Received translation request for language: {request.targetLang}")
        
        # Use Claude for translation
        response = anthropic.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            messages=[{
                "role": "user",
                "content": f"Translate the following text to {request.targetLang}:\n\n{request.text}"
            }]
        )
        
        return TranslateResponse(translatedText=response.content[0].text)
    except Exception as e:
        logger.error(f"Error in translate_text: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/nova/summary", response_model=SummaryResponse)
async def summarize_text(request: SummaryRequest):
    try:
        logger.info(f"Received summary request")
        
        response = anthropic.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            messages=[{
                "role": "user",
                "content": f"Summarize the following text concisely:\n\n{request.text}"
            }]
        )
        
        return SummaryResponse(summary=response.content[0].text)
    except Exception as e:
        logger.error(f"Error in summarize_text: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 