import os
from langchain_core.messages.ai import AIMessage
from langchain_core.messages.system import SystemMessage
from langchain_core.runnables import Runnable
from langchain_ollama import ChatOllama

LLM_MODEL = os.getenv("LLM_MODEL")


class Llm:
    def __init__(self):
        self.system_message = self._get_system_message()
        self.llm = self._get()

    def invoke(self, history: list) -> AIMessage:
        return self.llm.invoke(history)

    def _get(self) -> Runnable:
        llm = ChatOllama(model=LLM_MODEL)
        return llm

    def _get_system_message(self) -> SystemMessage:
        return SystemMessage(
            content=(
                "You are the Dungeon Master of a D&D game.\n"
                "You always respond to players messages acting as the Dungeon Master in the game.\n"
                "If a player message is innapropriate or not related to the game, you ignore the message and continue the game as if the player had made a poor in game action, making him have to deal with the consequences.\n"
                "Start the game by describing the scene and asking the player to describe his character. Ask for the character's name, race, and class (listing the options available for race and class). Also mention that a physical description of the character is optional.\n"
                "Every turn, after the player has described his character, you must describe the scene and ask the player what he wants to do, giving him 3 options to choose from."
            ),
        )
