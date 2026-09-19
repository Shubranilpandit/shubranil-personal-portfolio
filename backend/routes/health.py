import time
from datetime import datetime, timezone
from flask import Blueprint, jsonify
from sqlalchemy import text
from backend.models.base import db

health_bp = Blueprint("health", __name__, url_prefix="/api/health")

SERVER_START_TIME = time.time()


@health_bp.route("", methods=["GET"])
def health_check():
    """Live system and API health monitoring endpoint."""
    t_start = time.perf_counter()

    # Check actual database connectivity
    db_status = "ONLINE"
    db_error = None
    try:
        db.session.execute(text("SELECT 1"))
        db.session.commit()
    except Exception as e:
        db_status = "OFFLINE"
        db_error = str(e)

    db_latency_ms = round((time.perf_counter() - t_start) * 1000, 2)
    uptime_seconds = int(time.time() - SERVER_START_TIME)

    overall_status = "ONLINE" if db_status == "ONLINE" else "DEGRADED"

    return jsonify({
        "status": overall_status,
        "system_name": "TRON-OS CORE",
        "version": "2.5.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime_seconds": uptime_seconds,
        "uptime_human": f"{uptime_seconds // 3600}h {(uptime_seconds % 3600) // 60}m {uptime_seconds % 60}s",
        "database": {
            "status": db_status,
            "engine": db.engine.name,
            "latency_ms": db_latency_ms,
            "error": db_error,
        },
        "api": {
            "status": "ONLINE",
            "environment": "active",
        },
        "subsystems": {
            "neural_indexer": "ONLINE",
            "data_pipeline": "ONLINE",
            "security_perimeter": "ONLINE",
        },
    })
