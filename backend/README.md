# Nova AI Backend

A FastAPI-based backend for the Nova AI Assistant.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -e .
```

3. Create a `.env` file with the following content:
```env
# Groq AI API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=True

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174,https://ju-nine.github.io
```

4. Run the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Available Endpoints

- `GET /`: API information
- `POST /api/nova/ask`: Chat with the AI
- `POST /api/nova/translate`: Translate text
- `POST /api/nova/summary`: Summarize text
