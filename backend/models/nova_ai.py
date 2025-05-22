from backend.services.ai_service import AIService

class NovaAI:
    def __init__(self):
        self.service = AIService()

    async def get_chat_response(self, message: str, model: str) -> dict:
        """Generate a chat response using the specified AI model."""
        self.service.model = model  # Dynamically set the model
        result = await self.service._make_request(message)

        # Parse result assuming Claude-style response
        try:
            response_text = result["choices"][0]["message"]["content"]
        except (KeyError, IndexError) as e:
            raise Exception(f"Failed to parse AI response: {e}")

        return {
            "response": response_text.strip(),
            "model": model
        }

    async def translate_text(self, text: str, target_language: str) -> dict:
        """Translate text using a prompt-based approach."""
        prompt = f"Translate the following text to {target_language}:\n\n{text}"
        result = await self.service._make_request(prompt)

        try:
            translated_text = result["choices"][0]["message"]["content"]
        except (KeyError, IndexError) as e:
            raise Exception(f"Failed to parse translation response: {e}")

        return {
            "translated": translated_text.strip(),
            "source_language": None,  # Optional: Use langdetect or another service
            "target_language": target_language
        }

    async def summarize_text(self, text: str) -> dict:
        """Summarize a block of text."""
        prompt = f"Please summarize the following text:\n\n{text}"
        result = await self.service._make_request(prompt)

        try:
            summary = result["choices"][0]["message"]["content"]
        except (KeyError, IndexError) as e:
            raise Exception(f"Failed to parse summary response: {e}")

        return {
            "summary": summary.strip(),
            "length_reduction": None  # Optional: Compute percentage if needed
        }

# Singleton instance
nova_ai = NovaAI() 