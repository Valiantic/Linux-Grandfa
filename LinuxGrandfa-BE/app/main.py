from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import chat_router

# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="""
    🐧 LinuxGrandfa API - Your wise Linux system administration assistant!
    
    This API powers the LinuxGrandfa chatbot, which helps users learn about 
    Linux commands, system administration, and DevOps best practices.
    
    ## Features
    
    * **Chat with Nesti** - Ask questions about Linux commands and get friendly, educational responses
    * **Image Analysis** - Share terminal screenshots or config files for analysis
    * **Focused Expertise** - Responses are strictly limited to Linux/Unix system administration topics
    """,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(chat_router)


@app.get("/", tags=["root"])
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Welcome to LinuxGrandfa API! 🐧",
        "docs": "/docs",
        "health": "/api/chat/health"
    }


@app.get("/health", tags=["health"])
async def health():
    """Global health check endpoint."""
    return {
        "status": "healthy",
        "app": settings.app_name,
        "version": settings.app_version
    }
