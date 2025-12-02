# LinuxGrandfa Backend API 🐧

A FastAPI-powered backend service for the LinuxGrandfa chatbot - your wise Linux system administration assistant!

## Features

- **AI-Powered Responses**: Uses Google's Gemini 2.5 model for intelligent responses
- **Linux-Focused**: Strictly answers questions about Linux system administration
- **Image Analysis**: Can analyze terminal screenshots and config files
- **Character Personality**: Maintains a friendly "Linux Grandpa" persona named Nesti

## Project Structure

```
LinuxGrandfa-BE/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config/
│   │   ├── __init__.py
│   │   └── settings.py      # Environment configuration
│   ├── models/
│   │   ├── __init__.py
│   │   └── chat.py          # Pydantic models
│   ├── routers/
│   │   ├── __init__.py
│   │   └── chat.py          # API endpoints
│   └── services/
│       ├── __init__.py
│       └── gemini_service.py # Gemini AI integration
├── .env.example              # Example environment file
├── .gitignore
├── requirements.txt
└── README.md
```

## Setup

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Gemini API key
# Get your key from: https://aistudio.google.com/apikey
```

### 4. Run the Server

```bash
# Development mode with auto-reload
uvicorn app.main:app --reload --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

### Chat

- `POST /api/chat/` - Send a message to the Linux Grandfa assistant
- `GET /api/chat/health` - Health check for chat service

### General

- `GET /` - API information
- `GET /health` - Global health check
- `GET /docs` - Swagger UI documentation
- `GET /redoc` - ReDoc documentation

## Example Request

```bash
curl -X POST "http://localhost:8000/api/chat/" \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I list all files in a directory?"}'
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `GEMINI_MODEL` | Gemini model to use | `gemini-2.5-flash-preview-05-20` |
| `APP_NAME` | Application name | `LinuxGrandfa API` |
| `APP_VERSION` | Application version | `1.0.0` |
| `DEBUG` | Debug mode | `false` |
| `CORS_ORIGINS` | Allowed CORS origins | `["http://localhost:3000"]` |

## License

MIT
