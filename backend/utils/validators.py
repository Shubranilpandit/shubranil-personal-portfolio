import re
import time
from collections import defaultdict
from flask import request

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

# In-memory rate limiting: { ip_address: [timestamp, ...] }
_rate_limit_store = defaultdict(list)


def validate_email(email: str) -> bool:
    """Validate email address format."""
    if not email or len(email) > 255:
        return False
    return bool(EMAIL_REGEX.match(email))


def check_rate_limit(max_requests: int = 5, window_seconds: int = 3600) -> bool:
    """Sliding-window IP rate limit check. Returns True if allowed, False if limit exceeded."""
    ip = request.headers.get("X-Forwarded-For", request.remote_addr) or "127.0.0.1"
    ip = ip.split(",")[0].strip()
    now = time.time()
    cutoff = now - window_seconds

    # Filter out timestamps older than the window
    _rate_limit_store[ip] = [t for t in _rate_limit_store[ip] if t > cutoff]

    if len(_rate_limit_store[ip]) >= max_requests:
        return False

    _rate_limit_store[ip].append(now)
    return True
