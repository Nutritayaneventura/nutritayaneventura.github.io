from app.services.llm import Llm, Message
from app.services.logger import Logger
from typing import Dict, List

logger = Logger()
conversation_history: Dict[str, List[Message]] = {}
character_description: Dict[str, str] = {}


class LlmService:
    def __init__(self, ip_address: str):
        self.ip_address = ip_address
        self.llm = Llm()
        self.history = self._get_history(ip_address) or [self.llm.system_message]
        self.descriptions = self._get_character_description(ip_address) or ""

    def _get_history(self, ip_address: str) -> List[Message]:
        return conversation_history.get(ip_address)

    def _get_character_description(self, ip_address: str) -> str:
        return character_description.get(ip_address)

    def _set_history(self, ip_address: str, history: List[Message]):
        conversation_history[ip_address] = history

    def _set_character_description(self, ip_address: str, description: str):
        character_description[ip_address] = description

    def generate_dm_response(self, prompt: str) -> str:
        try:
            logger.log(f"Generating DM response...")

            if prompt:
                self.history.append(Message("user", prompt))

                if not self.descriptions:
                    logger.log(f"Generating character description...")

                    prompt = (
                        "Create a description of a D&D character based on the details provided:\n"
                        "<Details Start>\n"
                        f"{prompt}\n"
                        "<Details End>\n"
                        "\nOutput only the character description, including: name, gender, race, class, and main physical features.\n"
                        "If physical features are not provided in the details, generate them.\n"
                        "Use less than 30 words.\n"
                        "\nResponse Example: Rodrick is a male human warrior with long dark hair, pale skin, and a scar on his left eye."
                    )

                    ai_response = self.llm.invoke([Message("user", prompt)])
                    self._set_character_description(
                        self.ip_address, ai_response.content
                    )
                    logger.log(
                        f"Character description generated: {ai_response.content}"
                    )

            ai_response = self._invoke_llm()
            self._set_history(self.ip_address, self.history)
            return ai_response.content
        except Exception as e:
            logger.log(f"Error generating DM response: {e}")
            return "There was an error generating the response"

    def _invoke_llm(self) -> Message:
        ai_response = self.llm.invoke(self.history)
        self.history.append(ai_response)
        return ai_response

    def generate_image_prompt(self, dm_response: str) -> str:
        try:
            logger.log(f"Generating image prompt...")

            prompt = (
                "Create a detailed description of an image that will be used as illustration for the following scene of a D&D game:\n"
                "<Scene Description Start>\n"
                f"{dm_response}\n"
                "<Scene Description End>\n"
            )
            if self.descriptions:
                prompt += f"Main character description: {self.descriptions}\n"
            prompt += (
                "Do not add characters not present in the scene description.\n"
                "Output only the image description. Use around 100 words.\n"
                "\nResponse Example: In the dimly lit, shadowy hideout, Rodrick stands tall with his long dark hair cascading over his shoulders and a prominent scar marring his left eye. His muscular build exudes strength and confidence. Eyllina, her fiery red hair wild and eyes sparkling with joy, throws herself into his arms, initiating a passionate kiss. The scene captures a moment of intense emotion, with shadows dancing on the walls from the flickering torchlight. Rodrick's response, whether he reciprocates fervently, remains relaxed, or gently pushes her away, is left open-ended, leaving viewers to imagine the unfolding drama.\n"
                "Response Example 2: The scene is set in a dark, old castle. Terifying shadows paint the walls with fear. A throne sits in the center of the room, covered in cobwebs. A spider like humanly figure, cloaked in darkness, sits on the throne, their red eyes glowing with malice. The figure's hand reaches out, beckoning the viewer to come closer. The scene is eerie and unsettling, leaving the viewer with a sense of dread.\n"
            )

            ai_response = self.llm.invoke([Message("user", prompt)])
            return f"Image style: cinematic. {ai_response.content}"
        except Exception as e:
            logger.log(f"Error generating image prompt: {e}")
            return None
