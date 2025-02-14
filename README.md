# AI-RPG

**AI-RPG** is a proof-of-concept Dungeons & Dragons (D&D) inspired game powered by AI. In this game, players interact with an AI Dungeon Master (DM) via a chat interface. The DM generates narrative responses using a large language model (LLM), while AI-generated images (via Stable Diffusion) and ambient soundtracks create an immersive experience.

## Features

- **AI Dungeon Master:** Engage in interactive storytelling with an AI that drives the adventure.
- **Image Generation:** Visualize game scenes dynamically through AI-powered image generation.
- **Game Mechanics:** Enjoy built-in mechanics such as dice rolling and scene updates.
- **Real-Time Chat:** Experience an interactive, web-based chat interface.
- **Ambient Soundtrack:** Immerse yourself with looping, cool ambient music.

## Setup & Installation

### Prerequisites

- Python 3.9 or higher
- [Poetry](https://python-poetry.org/) installed globally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-rpg
```

### 2. Install Dependencies with Poetry

Use the Makefile target or run Poetry directly:

```bash
make install
```

### 3. Configure Environment Variables

Ensure that your `.env` file in the project root contains the necessary variables:

- `LLM_API_URL`
- `IMAGE_API_URL`

### 4. Run the Application

You can start the FastAPI application using the Makefile:

```bash
make run
```

Then open your browser and navigate to [http://localhost:8000](http://localhost:8000) to access the app.

### 5. Running with Docker

Build and run the container using Docker Compose:

```bash
docker-compose up --build
```

The application will be available at [http://localhost:8000](http://localhost:8000).

## Testing

Run tests using the Makefile:

```bash
make test
```

## Common Tasks (Makefile Targets)

- **Install Dependencies:** `make install`
- **Run Application:** `make run`
- **Run Tests:** `make test`
- **Clean Up Temporary Files:** `make clean`
- **Run Linter (if added):** `make lint`

## Future Enhancements

- Integrate a full event-driven architecture with Kafka.
- Expand game mechanics for richer interactions.
- Enhance the UI/UX for a more immersive experience.
- Add additional AI agents to manage game dynamics.

## License

This project is open source and available under the [MIT License](LICENSE).
