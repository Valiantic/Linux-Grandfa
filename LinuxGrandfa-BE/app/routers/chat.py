from fastapi import APIRouter, HTTPException, status

from app.models import ChatRequest, ChatResponse, MessageRole
from app.services import gemini_service

router = APIRouter(
    prefix="/api/chat",
    tags=["chat"],
    responses={
        500: {"description": "Internal server error"},
    }
)


@router.post(
    "/",
    response_model=ChatResponse,
    status_code=status.HTTP_200_OK,
    summary="Send a chat message",
    description="Send a message (with optional images) to the Linux Grandfa AI assistant"
)
async def send_message(request: ChatRequest) -> ChatResponse:
    """
    Process a chat message and return AI response.
    
    - **message**: The user's question about Linux system administration
    - **images**: Optional list of base64 encoded images (data URLs)
    
    Returns the AI assistant's response focused on Linux topics.
    """
    try:
        response_text = await gemini_service.generate_response(
            message=request.message,
            images=request.images
        )
        
        return ChatResponse(
            response=response_text,
            role=MessageRole.ASSISTANT
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate response. Please try again."
        )


@router.get(
    "/health",
    status_code=status.HTTP_200_OK,
    summary="Health check",
    description="Check if the chat service is healthy"
)
async def health_check():
    """Health check endpoint for the chat service."""
    return {"status": "healthy", "service": "chat"}
