# Makefile for AI-RPG

# Variables
UVICORN=poetry run uvicorn

.PHONY: install run test lint

# Install dependencies
install:
	poetry install

# Run the application
run:
	$(UVICORN) docs.main:app --host 0.0.0.0 --port 8000 --reload
