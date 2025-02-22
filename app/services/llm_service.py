from langchain_core.messages.human import HumanMessage
from langchain_core.messages.base import BaseMessage
from langchain_core.messages.ai import AIMessage
from app.services.llm import Llm
from app.services.logger import Logger

logger = Logger()


class LlmService:
    def __init__(self):
        self.llm = Llm()
        self.history: list[BaseMessage] = [self.llm.system_message]

    def generate_dm_response(self, prompt: str) -> str:
        try:
            logger.log(f"Generating DM response...")
            return "The adventurers are traveling through the desert, riding on camels. The sun is setting, casting long shadows across the dunes. The caravan is led by a group of adventurers, each with their own unique appearance and equipment. The adventurers are on a quest to find a lost city hidden in the sands, rumored to be filled with treasure and ancient artifacts. As they journey through the desert, they encounter a series of challenges and obstacles, testing their skills and resolve. The adventurers must work together to overcome these challenges and reach their destination before it's too late."

            self.history.append(HumanMessage(prompt))
            ai_response = self._invoke_llm()
            return ai_response.content
        except Exception as e:
            logger.log(f"Error generating DM response: {e}")
            return "There was an error generating the response"

    def _invoke_llm(self) -> AIMessage:
        ai_response = self.llm.invoke(self.history)
        self.history.append(ai_response)
        return ai_response

    def generate_image_prompt(self, dm_response: str) -> str:
        try:
            logger.log(f"Generating image prompt...")
            return (
                "Desert landscape with a caravan of camels and a group of adventurers"
            )

            prompt = (
                "Create a detailed description of an image that will be used as background for the following scene of a D&D game:\n"
                "<Scene Description Start>\n"
                f"{dm_response}\n"
                "<Scene Description End>\n"
                "\nOutput only the image description. Use around 100 words."
            )
            ai_response = self.llm.invoke([HumanMessage(prompt)])
            return "Image style: cinematic D&D adventure. " + ai_response.content
        except Exception as e:
            logger.log(f"Error generating image prompt: {e}")
            return None
