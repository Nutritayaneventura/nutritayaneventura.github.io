from pydantic import BaseModel
from typing import Optional, List

class Player(BaseModel):
    id: int
    name: str
    level: int
    stats: dict

class Quest(BaseModel):
    id: int
    title: str
    description: str
    is_active: bool

class ChatInput(BaseModel):
    message: str

class GameState(BaseModel):
    player: Player
    active_quests: List[Quest]
    chat_history: List[ChatInput]
    summary: Optional[str] = None
