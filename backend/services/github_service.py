import time
import logging
import requests
from flask import current_app

logger = logging.getLogger(__name__)

_github_cache = {
    "timestamp": 0,
    "data": None,
    "ttl_seconds": 3600,  # 1 hour cache
}


def get_github_repositories():
    """Fetch GitHub repositories with intelligent caching and fallback."""
    now = time.time()

    # Serve from cache if fresh
    if _github_cache["data"] and (now - _github_cache["timestamp"] < _github_cache["ttl_seconds"]):
        return _github_cache["data"]

    username = current_app.config.get("GITHUB_USERNAME", "shubranil-pandit")
    token = current_app.config.get("GITHUB_TOKEN")

    headers = {"Accept": "application/vnd.github.v3+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    try:
        url = f"https://api.github.com/users/{username}/repos?sort=updated&per_page=12"
        response = requests.get(url, headers=headers, timeout=5)

        if response.status_code == 200:
            repos_raw = response.json()
            repos = [
                {
                    "id": r.get("id"),
                    "name": r.get("name"),
                    "full_name": r.get("full_name"),
                    "description": r.get("description") or "No description provided.",
                    "html_url": r.get("html_url"),
                    "language": r.get("language") or "Python",
                    "stargazers_count": r.get("stargazers_count", 0),
                    "forks_count": r.get("forks_count", 0),
                    "updated_at": r.get("updated_at"),
                    "topics": r.get("topics", []),
                    "homepage": r.get("homepage"),
                }
                for r in repos_raw
                if not r.get("fork", False)  # prioritize original repos
            ]

            _github_cache["timestamp"] = now
            _github_cache["data"] = {
                "source": "github_api",
                "username": username,
                "repositories": repos,
                "total": len(repos),
            }
            return _github_cache["data"]
        else:
            logger.warning(f"GitHub API returned {response.status_code}: {response.text}")
    except Exception as e:
        logger.warning(f"Error fetching from GitHub API: {e}")

    # Fallback to curated project repositories
    fallback_repos = [
        {
            "id": 101,
            "name": "v-mirror-tryon",
            "full_name": f"{username}/v-mirror-tryon",
            "description": "Virtual Try-On web system with real-time landmark pose detection and clothing warp alignment.",
            "html_url": f"https://github.com/{username}/v-mirror-tryon",
            "language": "Python",
            "stargazers_count": 8,
            "forks_count": 2,
            "updated_at": "2026-02-15T12:00:00Z",
            "topics": ["computervision", "mediapipe", "flask", "tryon"],
            "homepage": "https://v-mirror-preview.vercel.app",
        },
        {
            "id": 102,
            "name": "faers-adr-pharmacovigilance",
            "full_name": f"{username}/faers-adr-pharmacovigilance",
            "description": "Stability-aware mining of polypharmacy-associated serious ADRs in elderly cohorts using FAERS.",
            "html_url": f"https://github.com/{username}/faers-adr-pharmacovigilance",
            "language": "Python",
            "stargazers_count": 14,
            "forks_count": 4,
            "updated_at": "2026-03-01T09:30:00Z",
            "topics": ["data-science", "healthcare", "pharmacovigilance", "faers", "pandas"],
            "homepage": None,
        },
        {
            "id": 103,
            "name": "genai-rag-retrieval",
            "full_name": f"{username}/genai-rag-retrieval",
            "description": "Domain-specific RAG knowledge retrieval engine utilizing vector embeddings and local LLM inference.",
            "html_url": f"https://github.com/{username}/genai-rag-retrieval",
            "language": "Python",
            "stargazers_count": 19,
            "forks_count": 5,
            "updated_at": "2026-03-10T15:45:00Z",
            "topics": ["rag", "genai", "embeddings", "faiss", "transformers"],
            "homepage": "https://genai-rag-preview.vercel.app",
        },
        {
            "id": 104,
            "name": "smart-room-iot-monitor",
            "full_name": f"{username}/smart-room-iot-monitor",
            "description": "IoT embedded system for ambient environmental telemetry, smoke/gas detection and servo actuation.",
            "html_url": f"https://github.com/{username}/smart-room-iot-monitor",
            "language": "C++",
            "stargazers_count": 6,
            "forks_count": 1,
            "updated_at": "2025-11-20T18:20:00Z",
            "topics": ["arduino", "iot", "sensors", "hardware"],
            "homepage": None,
        },
        {
            "id": 105,
            "name": "cats-dogs-cnn-classifier",
            "full_name": f"{username}/cats-dogs-cnn-classifier",
            "description": "Deep learning convolutional neural network with data augmentation and transfer learning.",
            "html_url": f"https://github.com/{username}/cats-dogs-cnn-classifier",
            "language": "Python",
            "stargazers_count": 5,
            "forks_count": 0,
            "updated_at": "2025-10-12T14:10:00Z",
            "topics": ["deep-learning", "cnn", "computervision"],
            "homepage": None,
        },
    ]

    return {
        "source": "curated_fallback",
        "username": username,
        "repositories": fallback_repos,
        "total": len(fallback_repos),
    }
