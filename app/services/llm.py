import os
from openai import OpenAI

LLM_MODEL = os.getenv("LLM_MODEL")
LLM_KEY = os.getenv("LLM_KEY")


class Message:
    def __init__(self, role: str, content: str, **kwargs):
        self.role = role
        self.content = content

    def to_dict(self):
        return {
            "role": self.role,
            "content": self.content,
        }


class Llm:
    def __init__(self):
        self.system_message = self._get_system_message()
        self.llm = self._get()

    def invoke(self, history: list[Message]) -> Message:
        completion = self.llm.chat.completions.create(
            model=LLM_MODEL,
            messages=[message.to_dict() for message in history],
            n=1,
        )
        return Message("assistant", completion.choices[0].message.content)

    def _get(self) -> OpenAI:
        llm = OpenAI()
        return llm

    def _get_system_message(self) -> Message:
        return Message(
            "system",
            (
                "You are the Dungeon Master of a D&D game.\n"
                "You always respond to players messages acting as the Dungeon Master in the game.\n"
                "Start the game by describing the scene and asking the player to describe his character. Ask for the character's name, race, and class (listing the options available for race and class). Also mention that a physical description of the character is optional.\n"
                "In every turn after the first one (when the player describes his character), you must describe the current scene and ask the player what is his action, giving him 3 options to choose from."
            ),
        )
