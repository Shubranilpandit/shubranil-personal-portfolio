import json
import pytest
from backend.app import create_app
from backend.models import db, User, Profile


@pytest.fixture
def client():
    app = create_app("development")
    app.config["TESTING"] = True

    with app.test_client() as client:
        # App context already initialized and seeded with default data
        yield client


def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["status"] == "ONLINE"
    assert "database" in data
    assert data["database"]["status"] == "ONLINE"


def test_profile_endpoint(client):
    response = client.get("/api/profile")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["data"]["full_name"] == "SHUBRANIL PANDIT"
    assert "Data Science" in data["data"]["title"]


def test_skills_endpoint(client):
    response = client.get("/api/skills")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["status"] == "success"
    assert len(data["categories"]) > 0


def test_projects_endpoint(client):
    response = client.get("/api/projects")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["status"] == "success"
    titles = [p["title"] for p in data["data"]]
    assert any("V-Mirror" in t for t in titles)
    assert any("Pharmacovigilance" in t for t in titles)


def test_contact_validation(client):
    # Empty payload should fail
    response = client.post("/api/contact", json={})
    assert response.status_code == 400
    data = json.loads(response.data)
    assert data["code"] == "VALIDATION_FAILED"

    # Valid payload should succeed
    valid_payload = {
        "name": "Alan Bradley",
        "email": "alan@flynn.com",
        "subject": "Encom Grid Coordination",
        "message": "Greetings Shubranil, this is a verified transmission regarding your AI models.",
    }
    res2 = client.post("/api/contact", json=valid_payload)
    assert res2.status_code == 201
    d2 = json.loads(res2.data)
    assert d2["status"] == "success"
    assert "TRX-" in d2["transmission_code"]


def test_auth_and_admin_protection(client):
    # Unauthenticated access to admin overview should be rejected
    unauth = client.get("/api/admin/overview")
    assert unauth.status_code == 401

    # Login with valid default credentials
    login_res = client.post(
        "/api/auth/login",
        json={"username": "admin", "password": "Admin@Tron2026"},
    )
    assert login_res.status_code == 200
    login_data = json.loads(login_res.data)
    assert "token" in login_data
    token = login_data["token"]

    # Authenticated access to admin overview with Bearer token
    auth_headers = {"Authorization": f"Bearer {token}"}
    auth_res = client.get("/api/admin/overview", headers=auth_headers)
    assert auth_res.status_code == 200
    stats = json.loads(auth_res.data)
    assert stats["status"] == "success"
    assert "counts" in stats
    assert stats["counts"]["projects"] >= 4
