from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
from anthropic import Anthropic

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
anthropic = Anthropic(api_key=os.getenv("CLAUDE_API_KEY"))

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
        # Prepare the message with context
        message = f"Context: {request.context}\nQuestion: {request.prompt}"
        
        # Call Claude API
        response = anthropic.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            messages=[{
                "role": "user",
                "content": f"{NOVA_SYSTEM_PROMPT}\n\n{message}"
            }]
        )
        
        return AskResponse(answer=response.content[0].text, language=request.language)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/nova/translate", response_model=TranslateResponse)
async def translate_text(request: TranslateRequest):
    try:
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
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/nova/summary", response_model=SummaryResponse)
async def summarize_text(request: SummaryRequest):
    try:
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
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 