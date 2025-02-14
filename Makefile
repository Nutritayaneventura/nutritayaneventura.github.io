# Makefile for AI-RPG

# Variables
PYTHON=poetry run python
UVICORN=poetry run uvicorn

.PHONY: install run test lint

# Install dependencies
install:
	poetry install

# Run the application
run:
	$(UVICORN) app.main:app --host 0.0.0.0 --port 8000 --reload

# Run tests with pytest
test:
	poetry run pytest

# Clean up __pycache__ and other temporary files
clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +
