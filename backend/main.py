from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
import httpx
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
NOVA_SYSTEM_PROMPT = """You are Nova, an AI learning assistant for African students. 
You explain simply and clearly, in a supportive tone. 
Give short, relatable answers, provide examples, and suggest follow-up questions. 
Translate in French if required."""

@app.post("/api/nova/ask", response_model=AskResponse)
async def ask_nova(request: AskRequest):
    try:
        message = f"{NOVA_SYSTEM_PROMPT}\n\nContext: {request.context}\nQuestion: {request.prompt}"
        response = anthropic.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            messages=[{
                "role": "user",
                "content": message
            }]
        )
        
        answer = response.content[0].text
        return AskResponse(answer=answer, language=request.language)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/nova/translate", response_model=TranslateResponse)
async def translate_text(request: TranslateRequest):
    try:
        # Using LibreTranslate API
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://libretranslate.de/translate",
                json={
                    "q": request.text,
                    "source": "auto",
                    "target": request.targetLang,
                    "format": "text"
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                return TranslateResponse(translatedText=data["translatedText"])
            else:
                raise HTTPException(status_code=500, detail="Translation service error")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/nova/summary", response_model=SummaryResponse)
async def summarize_text(request: SummaryRequest):
    try:
        message = f"Summarize the following text concisely:\n\n{request.text}"
        response = anthropic.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            messages=[{
                "role": "user",
                "content": message
            }]
        )
        
        summary = response.content[0].text
        return SummaryResponse(summary=summary)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 