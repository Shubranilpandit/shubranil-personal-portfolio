"""WSGI application entry point."""
import sys
from pathlib import Path

# Ensure project root is in sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
sys.path.insert(0, str(Path(__file__).resolve().parent))

try:
    from backend.app import app
except ModuleNotFoundError:
    from app import app

if __name__ == "__main__":
    app.run()
