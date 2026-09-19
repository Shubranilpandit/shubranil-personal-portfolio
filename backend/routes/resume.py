import os
from pathlib import Path
from flask import Blueprint, send_file, jsonify, current_app, Response

resume_bp = Blueprint("resume", __name__, url_prefix="/api/resume")


def ensure_resume_file():
    """Ensure a placeholder or real resume PDF exists in the static folder."""
    static_dir = Path(current_app.config["STATIC_FOLDER"])
    static_dir.mkdir(parents=True, exist_ok=True)
    resume_path = static_dir / "Shubranil_Pandit_Resume.pdf"

    if not resume_path.exists():
        # Generate a minimal valid PDF container
        # Minimal PDF 1.4 template with metadata
        pdf_content = (
            b"%PDF-1.4\n"
            b"1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n"
            b"2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n"
            b"3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>endobj\n"
            b"4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\n"
            b"5 0 obj<</Length 248>>stream\n"
            b"BT /F1 20 Tf 50 720 Td (SHUBRANIL PANDIT - MCA DATA SCIENCE) Tj ET\n"
            b"BT /F1 12 Tf 50 680 Td (Email: shubranil.pandit@gmail.com | Specialization: Data Science & AI) Tj ET\n"
            b"BT /F1 12 Tf 50 650 Td (Key Projects: V-Mirror Virtual Try-On, FAERS ADR Mining, GenAI RAG Engine) Tj ET\n"
            b"BT /F1 12 Tf 50 620 Td (Skills: Python, Machine Learning, PostgreSQL, Flask, Big Data, PyTorch) Tj ET\n"
            b"endstream\nendobj\n"
            b"xref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000056 00000 n \n0000000111 00000 n \n0000000212 00000 n \n0000000279 00000 n \n"
            b"trailer<</Size 6/Root 1 0 R>>\nstartxref\n579\n%%EOF\n"
        )
        with open(resume_path, "wb") as f:
            f.write(pdf_content)

    return resume_path


@resume_bp.route("/download", methods=["GET"])
def download_resume():
    """Download Shubranil Pandit's Resume as PDF."""
    resume_path = ensure_resume_file()
    return send_file(
        resume_path,
        as_attachment=True,
        download_name="Shubranil_Pandit_Resume.pdf",
        mimetype="application/pdf",
    )


@resume_bp.route("/view", methods=["GET"])
def view_resume():
    """View Shubranil Pandit's Resume in browser tab."""
    resume_path = ensure_resume_file()
    return send_file(
        resume_path,
        as_attachment=False,
        mimetype="application/pdf",
    )
