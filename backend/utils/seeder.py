import logging
from backend.models import (
    db,
    User,
    Profile,
    Education,
    Skill,
    Project,
    ProjectTechnology,
    Experience,
    Achievement,
    ContactMessage,
)

logger = logging.getLogger(__name__)


def seed_database_if_empty():
    """Initializes tables and seeds default portfolio and admin data if empty."""
    db.create_all()

    # Check if profile already exists
    if Profile.query.first() is not None:
        logger.info("Database already seeded. Skipping initial seed.")
        return

    logger.info("Seeding database with Shubranil Pandit's MCA Data Science portfolio data...")

    # 1. Admin User
    admin = User(
        username="admin",
        email="shubranil.pandit@example.com",
        role="admin",
        is_active=True,
    )
    admin.set_password("Admin@Tron2026")
    db.session.add(admin)

    # 2. Profile Identity Core
    profile = Profile(
        full_name="SHUBRANIL PANDIT",
        title="MCA Student | Data Science | Developer | Problem Solver",
        tagline="Architecting intelligent systems, high-dimensional data pipelines, and full-stack cyber interfaces.",
        bio="I am a Master of Computer Applications (MCA) student specializing in Data Science. I build intelligent systems, data-driven applications, and practical software solutions while exploring the intersection of Artificial Intelligence, Machine Learning, Big Data, and Modern Full-Stack Engineering. My focus centers on building reliable architectures that translate complex multi-modal data and predictive algorithms into high-impact digital experiences.",
        avatar_url="/assets/shubranil-core.svg",
        status="● SYSTEM ONLINE",
        location="India",
        email="shubranil.pandit@gmail.com",
        github_url="https://github.com/shubranil-pandit",
        linkedin_url="https://linkedin.com/in/shubranil-pandit",
        resume_url="/api/resume/download",
        current_focus="Currently architecting Stability-Aware ADR Mining algorithms, deep retrieval-augmented generation (RAG) engines, and real-time computer vision applications.",
        system_version="CYBER-GRID v2.5.0-LGCY",
    )
    db.session.add(profile)

    # 3. Education Timeline
    edu1 = Education(
        degree="Master of Computer Applications (MCA)",
        field_of_study="Data Science & Artificial Intelligence",
        institution="Institute of Computer Applications & Technology",
        duration="2024 - 2026",
        current_status="In Progress (Final Year)",
        grade="Current CGPA: 8.7 / 10.0",
        coursework="Advanced Machine Learning, Deep Neural Networks, Big Data Computing & Distributed Systems (Hadoop/HDFS), High-Dimensional Data Mining, Cloud Architectures, Advanced Database Management Systems, Statistical Inference",
        sort_order=1,
    )
    edu2 = Education(
        degree="Bachelor of Science / Computer Applications",
        field_of_study="Computer Science & Mathematics",
        institution="University Department of Computer Science",
        duration="2021 - 2024",
        current_status="Completed (First Class with Distinction)",
        grade="Final CGPA: 8.5 / 10.0",
        coursework="Data Structures & Algorithms, Object-Oriented Programming (Python/Java), Relational Database Management, Web Engineering, Discrete Mathematics, Probability & Applied Statistics",
        sort_order=2,
    )
    db.session.add_all([edu1, edu2])

    # 4. Skills Matrix
    skills_data = [
        # Programming
        ("Programming", "Python", "Project Experience", "python", 1),
        ("Programming", "JavaScript", "Working Knowledge", "javascript", 2),
        ("Programming", "SQL", "Project Experience", "database", 3),
        ("Programming", "HTML5", "Working Knowledge", "code", 4),
        ("Programming", "CSS3", "Working Knowledge", "layout", 5),
        # Data Science / ML
        ("Data Science / ML", "Pandas", "Project Experience", "table", 6),
        ("Data Science / ML", "NumPy", "Project Experience", "binary", 7),
        ("Data Science / ML", "Scikit-Learn", "Project Experience", "brain", 8),
        ("Data Science / ML", "OpenCV", "Working Knowledge", "eye", 9),
        ("Data Science / ML", "Matplotlib & Seaborn", "Working Knowledge", "bar-chart", 10),
        ("Data Science / ML", "Machine Learning Algorithms", "Project Experience", "cpu", 11),
        ("Data Science / ML", "Data Preprocessing & EDA", "Project Experience", "filter", 12),
        # Backend
        ("Backend", "Flask", "Project Experience", "server", 13),
        ("Backend", "Node.js", "Familiar", "box", 14),
        ("Backend", "RESTful API Design", "Working Knowledge", "network", 15),
        # Databases
        ("Databases", "PostgreSQL", "Project Experience", "hard-drive", 16),
        ("Databases", "Relational Schema Design", "Working Knowledge", "layers", 17),
        # Tools
        ("Tools", "Git & GitHub", "Project Experience", "git-branch", 18),
        ("Tools", "VS Code", "Project Experience", "terminal", 19),
        ("Tools", "PyCharm", "Working Knowledge", "compass", 20),
        ("Tools", "Jupyter Notebook", "Project Experience", "book-open", 21),
        ("Tools", "Google Colab", "Project Experience", "cloud", 22),
        # Big Data
        ("Big Data", "Hadoop Ecosystem", "Working Knowledge", "server", 23),
        ("Big Data", "HDFS", "Working Knowledge", "hard-drive", 24),
        ("Big Data", "MapReduce Paradigms", "Familiar", "workflow", 25),
        ("Big Data", "YARN", "Familiar", "activity", 26),
        # AI / GenAI
        ("AI / GenAI", "Retrieval-Augmented Generation (RAG)", "Project Experience", "zap", 27),
        ("AI / GenAI", "Vector Databases (Chroma/FAISS)", "Working Knowledge", "database", 28),
        ("AI / GenAI", "Embeddings & Semantic Search", "Working Knowledge", "search", 29),
        ("AI / GenAI", "Local LLM Deployment (Ollama/Transformers)", "Working Knowledge", "cpu", 30),
        ("AI / GenAI", "Prompt Engineering & Context Curation", "Project Experience", "message-square", 31),
    ]
    for cat, name, level, icon, order in skills_data:
        db.session.add(
            Skill(category=cat, name=name, proficiency_level=level, icon=icon, sort_order=order)
        )

    # 5. Projects Command Center
    p1 = Project(
        title="V-Mirror: Virtual Try-On Cyber System",
        subtitle="Real-time Accessory & Garment Pose Detection Engine",
        category="Full-Stack",
        description="A full-stack computer vision and web application enabling real-time virtual accessory and clothing try-on without specialized hardware. Uses webcam feeds and uploaded images to accurately align digital apparel onto detected human body keypoints.",
        problem_solved="Overcomes the friction of online apparel shopping by providing immediate visual fitting feedback through browser-based computer vision.",
        key_contribution="Implemented real-time 33-landmark pose detection pipeline with MediaPipe, built the Flask backend image-processing warp matrix, and designed a responsive Tron-style reactive UI.",
        status="Completed",
        repo_url="https://github.com/shubranil-pandit/v-mirror-tryon",
        demo_url="https://v-mirror-preview.vercel.app",
        image_url="/assets/projects/v-mirror.svg",
        architecture_flow="WEB-CAM FEED ──> POSE LANDMARK DETECTION (MediaPipe) ──> AFFINE WARP MATRIX ──> ACCESSORY RENDER ──> FLASK/POSTGRESQL",
        featured=True,
        sort_order=1,
    )
    p2 = Project(
        title="Stability-Aware Pharmacovigilance ADR Mining",
        subtitle="Mining Polypharmacy-Associated Serious ADRs in Elderly Patients Using FAERS",
        category="Data Science",
        description="A high-dimensional healthcare analytics pipeline analyzing millions of FDA Adverse Event Reporting System (FAERS) records. Isolates multi-drug interaction signals and serious Adverse Drug Reactions (ADRs) specifically in geriatric cohorts with stability-aware pruning.",
        problem_solved="Raw pharmacovigilance reports suffer from extreme reporting biases, confounders, and polypharmacy noise. This system cleans, standardizes, and calculates proportional reporting ratios (PRR) with stability metrics to discover high-confidence drug-drug interaction warnings.",
        key_contribution="Formulated stability-aware filtering criteria on 5M+ FAERS rows; engineered RxNorm and MeDRA ontology mapping algorithms in Python; mined statistically significant ADR risk scores in polypharmacy regimes.",
        status="Research Prototype",
        repo_url="https://github.com/shubranil-pandit/faers-adr-pharmacovigilance",
        demo_url=None,
        image_url="/assets/projects/faers-adr.svg",
        architecture_flow="FAERS RAW DATA (5M+) ──> GERIATRIC COHORT FILTERING ──> DRUG-ADR STANDARDIZATION ──> DISPROPORTIONALITY ANALYSIS ──> STABILITY-AWARE PRUNING ──> RISK MATRIX",
        featured=True,
        sort_order=2,
    )
    p3 = Project(
        title="GenAI Expert Knowledge Retrieval System",
        subtitle="Domain-Specific RAG Knowledge Engine Powered by Local LLMs",
        category="AI / ML",
        description="An enterprise-grade Retrieval-Augmented Generation (RAG) platform tailored for software engineering documentation and technical specifications. Ingests heterogeneous markdown, PDF, and codebases into a vector store and retrieves semantic context with verifiable source citations.",
        problem_solved="Eliminates hallucination in domain-specific technical queries while maintaining zero data egress by hosting lightweight quantized local LLMs.",
        key_contribution="Engineered vector ingestion pipeline, dynamic chunking with parent-document context, FAISS/Chroma integration, and built an interactive web HUD for interactive query inspection and confidence scoring.",
        status="Completed",
        repo_url="https://github.com/shubranil-pandit/genai-rag-retrieval",
        demo_url="https://genai-rag-preview.vercel.app",
        image_url="/assets/projects/genai-rag.svg",
        architecture_flow="USER QUERY ──> QUERY NORMALIZATION ──> VECTOR EMBEDDING (HuggingFace) ──> COSINE SIMILARITY SEARCH ──> TOP-K CHUNK RETRIEVAL ──> CONTEXT AUGMENTATION ──> LOCAL LLM INFERENCE ──> FACTUAL ANSWER + CITATIONS",
        featured=True,
        sort_order=3,
    )
    p4 = Project(
        title="Smart Room Safety & Environment Monitor",
        subtitle="IoT Cyber-Physical Ambient Sensing & Hazard Prevention Grid",
        category="Embedded / IoT",
        description="An automated micro-controller hardware-software node utilizing an Arduino platform interfaced with digital environmental sensors, gas/smoke detectors, servomotors, alarm buzzers, and automated relay switches for smart room security.",
        problem_solved="Provides autonomous, fail-safe environment monitoring capable of executing physical hazard mitigation (gas shut-off, ventilation servo actuation) even during network dropouts.",
        key_contribution="Programmed embedded C++ firmware on Arduino, calibrated analog sensors (MQ series, DHT11), configured relay triggers, and designed digital LED/HUD telemetry feedback.",
        status="Completed",
        repo_url="https://github.com/shubranil-pandit/smart-room-iot-monitor",
        demo_url=None,
        image_url="/assets/projects/smart-room.svg",
        architecture_flow="ENVIRONMENT SENSORS (MQ-Gas, Temp, PIR) ──> ARDUINO ATMega328P ──> THRESHOLD LOGIC ──> SERVO ACTUATION / RELAYS ──> LOCAL HUD TELEMETRY",
        featured=True,
        sort_order=4,
    )
    p5 = Project(
        title="House Price Prediction Engine",
        subtitle="Multivariate Regression & Feature Engineering Pipeline",
        category="Data Science",
        description="Supervised machine learning framework for estimating residential property valuations using advanced feature engineering, outlier detection, and ensemble regression techniques.",
        problem_solved="Resolves spatial heterogeneity and collinearity in real-estate feature sets to deliver accurate, interpretable price intervals.",
        key_contribution="Benchmarked Ridge, Lasso, and Random Forest regressors with automated cross-validation and SHAP feature importance analysis.",
        status="Completed",
        repo_url="https://github.com/shubranil-pandit/house-price-prediction-ml",
        demo_url=None,
        image_url="/assets/projects/house-price.svg",
        architecture_flow="HOUSING DATASET ──> OUTLIER TRIMMING ──> FEATURE ENCODING ──> ENSEMBLE REGRESSOR ──> SHAP INTERPRETABILITY",
        featured=False,
        sort_order=5,
    )
    p6 = Project(
        title="K-Means Customer Segmentation Engine",
        subtitle="Unsupervised Clustering & High-Dimensional Profiling",
        category="Data Science",
        description="Unsupervised clustering model designed to partition complex multi-dimensional customer behavioral profiles into distinct operational clusters using silhouette scores and elbow analysis.",
        problem_solved="Enables precise data-driven cohort segmentation without requiring labeled ground-truth training data.",
        key_contribution="Implemented PCA dimensionality reduction, automated optimal cluster-k heuristic, and interactive 3D cluster visualizations.",
        status="Completed",
        repo_url="https://github.com/shubranil-pandit/kmeans-customer-clustering",
        demo_url=None,
        image_url="/assets/projects/kmeans.svg",
        architecture_flow="RAW BEHAVIOR DATA ──> STANDARD SCALING ──> PCA PROJECTION ──> K-MEANS++ OPTIMIZATION ──> CLUSTER PERSONA PROFILES",
        featured=False,
        sort_order=6,
    )
    p7 = Project(
        title="Deep Learning Cats vs Dogs Classifier",
        subtitle="Convolutional Neural Network with Transfer Learning",
        category="AI / ML",
        description="Computer vision classifier built with convolutional architectures and data augmentation strategies to achieve high-accuracy binary visual categorization.",
        problem_solved="Overcomes overfitting in small image datasets via synthetic augmentation pipelines and pre-trained feature extractors.",
        key_contribution="Constructed custom CNN layers, implemented dropout and batch-normalization regularization, and tested ResNet transfer learning.",
        status="Completed",
        repo_url="https://github.com/shubranil-pandit/cats-dogs-cnn-classifier",
        demo_url=None,
        image_url="/assets/projects/cnn-classifier.svg",
        architecture_flow="IMAGE CORPUS ──> AUGMENTATION PIPELINE ──> CONVOLUTIONAL FEATURE MAPS ──> DENSE CLASSIFIER ──> SOFTMAX PROBABILITY",
        featured=False,
        sort_order=7,
    )
    p8 = Project(
        title="Hand Gesture Recognition Interface",
        subtitle="Real-Time Spatial Vision Interaction System",
        category="AI / ML",
        description="Real-time hand gesture classification interface mapping webcam finger landmarks to system control events and navigation commands.",
        problem_solved="Provides touchless human-computer interaction suitable for sterile or futuristic hands-free computing environments.",
        key_contribution="Trained spatial coordinate classifier on 21 hand joints extracted in real-time via OpenCV and MediaPipe pipelines.",
        status="Completed",
        repo_url="https://github.com/shubranil-pandit/hand-gesture-recognition",
        demo_url=None,
        image_url="/assets/projects/hand-gesture.svg",
        architecture_flow="VIDEO STREAM ──> 21 HAND LANDMARKS ──> NORMALIZED SPATIAL VECTORS ──> CLASSIFICATION INFERENCE ──> SYSTEM ACTION",
        featured=False,
        sort_order=8,
    )
    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8])
    db.session.flush()

    # Project Tech Associations
    project_techs = [
        (p1.id, ["Python", "Flask", "MediaPipe", "PostgreSQL", "OpenCV", "JavaScript", "CSS3"]),
        (p2.id, ["Python", "Pandas", "NumPy", "PostgreSQL", "Scikit-Learn", "FAERS", "Statistical Mining"]),
        (p3.id, ["Python", "RAG", "Vector DB (FAISS)", "Embeddings", "Local LLM", "Flask", "React"]),
        (p4.id, ["Arduino", "Embedded C++", "MQ Sensors", "Servomotors", "Relay Control", "Hardware Circuitry"]),
        (p5.id, ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Ensemble Regression"]),
        (p6.id, ["Python", "K-Means++", "PCA", "Scikit-Learn", "Seaborn"]),
        (p7.id, ["Python", "TensorFlow/PyTorch", "CNN", "Transfer Learning", "OpenCV"]),
        (p8.id, ["Python", "MediaPipe", "OpenCV", "Machine Learning", "NumPy"]),
    ]
    for pid, techs in project_techs:
        for t in techs:
            db.session.add(ProjectTechnology(project_id=pid, technology_name=t))

    # 6. Experience Timeline
    exp1 = Experience(
        role="Data Science & ML Project Researcher",
        organization="Academic Research Laboratory",
        duration="2024 - Present",
        type="Academic Research",
        responsibilities="Investigating multi-drug adverse reaction mining algorithms on large-scale FDA adverse event databases. Developing stability metrics for pharmacovigilance signals and engineering reproducible Python ETL pipelines.",
        achievements="Authored comparative study on statistical signal detection in polypharmacy regimens; processed 5M+ FAERS entries with high-throughput batching.",
        technologies="Python, Pandas, PostgreSQL, Scikit-Learn, Statistical Modeling",
        sort_order=1,
    )
    exp2 = Experience(
        role="Software & AI Development Contributor",
        organization="Technical Projects & Open Source Collaboration",
        duration="2023 - 2024",
        type="Technical Activity",
        responsibilities="Collaborated on full-stack web applications and AI-driven prototypes. Architected RESTful micro-endpoints, integrated MediaPipe gesture recognition, and deployed computer vision prototypes.",
        achievements="Built and published V-Mirror prototype with real-time browser preview; engineered RAG documentation search tool for peer developers.",
        technologies="Flask, JavaScript, MediaPipe, Vector Databases, Git, REST APIs",
        sort_order=2,
    )
    exp3 = Experience(
        role="Technical Hackathon Participant & Problem Solver",
        organization="Inter-College Innovation Hackathons",
        duration="2023 - 2025",
        type="Hackathon",
        responsibilities="Competed in rapid-prototyping hackathons addressing smart city automation, healthcare monitoring, and intelligent document retrieval.",
        achievements="Recognized for developing the Smart Room Safety & Environment prototype under time constraints with working sensor-actuator feedback.",
        technologies="Arduino, C++, IoT Sensors, Python, Rapid Prototyping",
        sort_order=3,
    )
    db.session.add_all([exp1, exp2, exp3])

    # 7. Achievements
    ach1 = Achievement(
        title="Dean's Academic Excellence Recognition - MCA",
        category="Academic",
        organization="Department of Computer Applications",
        issue_date="2025",
        description="Ranked in top percentile of MCA cohort for outstanding performance in Data Science, Machine Learning, and Distributed Computing coursework.",
        credential_url="#",
        sort_order=1,
    )
    ach2 = Achievement(
        title="Best Hardware-Software IoT Prototype",
        category="Technical Competition",
        organization="Annual Tech Innovation Summit",
        issue_date="2024",
        description="Awarded for Smart Room Safety & Hazard Prevention grid showcasing automated physical mitigation under simulated alarm scenarios.",
        credential_url="#",
        sort_order=2,
    )
    ach3 = Achievement(
        title="Machine Learning & Data Analysis Specialization Certification",
        category="Certification",
        organization="Global Online Education Provider",
        issue_date="2024",
        description="Comprehensive mastery of supervised learning, unsupervised learning, model evaluation metrics, feature engineering, and high-dimensional EDA.",
        credential_url="#",
        sort_order=3,
    )
    ach4 = Achievement(
        title="Deep Learning & Neural Architectures Workshop",
        category="Workshop",
        organization="AI Research Symposium",
        issue_date="2024",
        description="Intensive hands-on training covering Convolutional Networks, Recurrent Architectures, Attention Mechanisms, and modern Transformer fundamentals.",
        credential_url="#",
        sort_order=4,
    )
    db.session.add_all([ach1, ach2, ach3, ach4])

    # 8. Sample Transmission
    msg1 = ContactMessage(
        name="Technical Recruiter",
        email="recruiter@cybercorp.tech",
        subject="Internship & Project Discussion - Data Science Role",
        message="Greetings Shubranil, we reviewed your FAERS pharmacovigilance and GenAI RAG projects on your portfolio. We are very impressed by your systematic approach to data pipelines and would love to schedule a technical chat.",
        sender_ip="127.0.0.1",
        status="unread",
    )
    db.session.add(msg1)

    db.session.commit()
    logger.info("Database seeding completed successfully.")
