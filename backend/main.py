from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from backend.api.routes import router
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Nova AI Assistant",
    description="A student-focused AI assistant powered by Claude 3",
    version="1.0.0"
)

# Configure CORS
default_origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ju-nine.github.io"
]
allowed_origins = os.getenv("ALLOWED_ORIGINS", ",".join(default_origins)).split(",")
logger.info(f"Configured CORS with origins: {allowed_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(router)

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint that provides API information."""
    return {
        "message": "Nova AI API is live",
        "version": "1.0.0",
        "docs_url": "/docs",
        "endpoints": {
            "chat": "/api/nova/ask",
            "translate": "/api/nova/translate",
            "summary": "/api/nova/summary"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 