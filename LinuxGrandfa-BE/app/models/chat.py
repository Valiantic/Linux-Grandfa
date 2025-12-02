from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional


class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"


class ChatRequest(BaseModel):
    """Request model for chat messages."""
    
    message: str = Field(
        ...,
        min_length=1,
        max_length=4000,
        description="The user's message text"
    )
    images: Optional[list[str]] = Field(
        default=None,
        description="List of base64 encoded images (data URLs)"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "How do I list files in Linux?",
                "images": None
            }
        }


class ChatResponse(BaseModel):
    """Response model for chat messages."""
    
    response: str = Field(
        ...,
        description="The assistant's response message"
    )
    role: MessageRole = Field(
        default=MessageRole.ASSISTANT,
        description="The role of the message sender"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "response": "To list files in Linux, use the 'ls' command...",
                "role": "assistant"
            }
        }
