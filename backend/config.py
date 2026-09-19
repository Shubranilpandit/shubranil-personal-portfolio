import os
from pathlib import Path
from dotenv import load_dotenv

# Base directory
BASE_DIR = Path(__file__).resolve().parent

# Load .env file from backend or project root
load_dotenv(BASE_DIR / ".env")
load_dotenv(BASE_DIR.parent / ".env")


class Config:
    """Base application configuration with environment variable defaults."""

    SECRET_KEY = os.getenv("SECRET_KEY", "tron-cyber-secret-key-shubranil-2026-mca")

    # Database: Supports PostgreSQL (via DATABASE_URL) with seamless local SQLite fallback
    raw_db_url = os.getenv("DATABASE_URL")
    if raw_db_url:
        # Normalize postgres:// scheme if provided by hosting services like Render/Railway
        if raw_db_url.startswith("postgres://"):
            raw_db_url = raw_db_url.replace("postgres://", "postgresql://", 1)
        SQLALCHEMY_DATABASE_URI = raw_db_url
    else:
        # Seamless local database fallback
        sqlite_path = BASE_DIR / "portfolio.db"
        SQLALCHEMY_DATABASE_URI = f"sqlite:///{sqlite_path.as_posix()}"

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Security & JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", SECRET_KEY)
    JWT_ACCESS_TOKEN_EXPIRES_HOURS = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES_HOURS", "24"))

    # GitHub Integration
    GITHUB_USERNAME = os.getenv("GITHUB_USERNAME", "shubranil-pandit")
    GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", None)

    # CORS
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

    # Rate Limiting configuration
    RATELIMIT_CONTACT_PER_HOUR = int(os.getenv("RATELIMIT_CONTACT_PER_HOUR", "5"))

    # File uploads / static
    STATIC_FOLDER = os.path.join(BASE_DIR, "static")


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
