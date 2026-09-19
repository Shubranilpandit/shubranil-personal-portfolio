-- ==========================================================
-- TRON: LEGACY PERSONAL DIGITAL IDENTITY & PORTFOLIO SEED
-- User: Shubranil Pandit | MCA Data Science
-- ==========================================================

-- 1. Default Admin User (Default Password: Admin@Tron2026)
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'shubranil.pandit@example.com', 'scrypt:32768:8:1$Lyw5NsM9RvhCBBjp$ee65e2c8596ac3ad7f38adb2477ff28c1d90067c4eb23ef2d95488d96c6a990aed7084a9b78a980303d529872733179929d8a9c5294674fb8507a97e489c80c5', 'admin');

-- 2. Personal Profile / Identity Core
INSERT INTO profile (
    full_name, title, tagline, bio, avatar_url, status, location, email, github_url, linkedin_url, resume_url, current_focus, system_version
) VALUES (
    'SHUBRANIL PANDIT',
    'MCA Student | Data Science | Developer | Problem Solver',
    'Architecting intelligent systems, high-dimensional data pipelines, and full-stack cyber interfaces.',
    'I am a Master of Computer Applications (MCA) student specializing in Data Science. I build intelligent systems, data-driven applications, and practical software solutions while exploring the intersection of Artificial Intelligence, Machine Learning, Big Data, and Modern Full-Stack Engineering. My focus centers on building reliable architectures that translate complex multi-modal data and predictive algorithms into high-impact digital experiences.',
    '/assets/shubranil-core.svg',
    '● SYSTEM ONLINE',
    'India',
    'shubranil.pandit@gmail.com',
    'https://github.com/shubranil-pandit',
    'https://linkedin.com/in/shubranil-pandit',
    '/api/resume/download',
    'Currently architecting Stability-Aware ADR Mining algorithms, deep retrieval-augmented generation (RAG) engines, and real-time computer vision applications.',
    'CYBER-GRID v2.5.0-LGCY'
);

-- 3. Education Timeline
INSERT INTO education (degree, field_of_study, institution, duration, current_status, grade, coursework, sort_order) VALUES
(
    'Master of Computer Applications (MCA)',
    'Data Science & Artificial Intelligence',
    'Institute of Computer Applications & Technology',
    '2024 - 2026',
    'In Progress (Final Year)',
    'Current CGPA: 8.7 / 10.0',
    'Advanced Machine Learning, Deep Neural Networks, Big Data Computing & Distributed Systems (Hadoop/HDFS), High-Dimensional Data Mining, Cloud Architectures, Advanced Database Management Systems, Statistical Inference',
    1
),
(
    'Bachelor of Science / Computer Applications',
    'Computer Science & Mathematics',
    'University Department of Computer Science',
    '2021 - 2024',
    'Completed (First Class with Distinction)',
    'Final CGPA: 8.5 / 10.0',
    'Data Structures & Algorithms, Object-Oriented Programming (Python/Java), Relational Database Management, Web Engineering, Discrete Mathematics, Probability & Applied Statistics',
    2
);

-- 4. Skills Matrix (with realistic indicators)
INSERT INTO skills (category, name, proficiency_level, icon, sort_order) VALUES
-- Programming
('Programming', 'Python', 'Project Experience', 'python', 1),
('Programming', 'JavaScript', 'Working Knowledge', 'javascript', 2),
('Programming', 'SQL', 'Project Experience', 'database', 3),
('Programming', 'HTML5', 'Working Knowledge', 'code', 4),
('Programming', 'CSS3', 'Working Knowledge', 'layout', 5),

-- Data Science / ML
('Data Science / ML', 'Pandas', 'Project Experience', 'table', 6),
('Data Science / ML', 'NumPy', 'Project Experience', 'binary', 7),
('Data Science / ML', 'Scikit-Learn', 'Project Experience', 'brain', 8),
('Data Science / ML', 'OpenCV', 'Working Knowledge', 'eye', 9),
('Data Science / ML', 'Matplotlib & Seaborn', 'Working Knowledge', 'bar-chart', 10),
('Data Science / ML', 'Machine Learning Algorithms', 'Project Experience', 'cpu', 11),
('Data Science / ML', 'Data Preprocessing & EDA', 'Project Experience', 'filter', 12),

-- Backend
('Backend', 'Flask', 'Project Experience', 'server', 13),
('Backend', 'Node.js', 'Familiar', 'box', 14),
('Backend', 'RESTful API Design', 'Working Knowledge', 'network', 15),

-- Databases
('Databases', 'PostgreSQL', 'Project Experience', 'hard-drive', 16),
('Databases', 'Relational Schema Design', 'Working Knowledge', 'layers', 17),

-- Tools & Environments
('Tools', 'Git & GitHub', 'Project Experience', 'git-branch', 18),
('Tools', 'VS Code', 'Project Experience', 'terminal', 19),
('Tools', 'PyCharm', 'Working Knowledge', 'compass', 20),
('Tools', 'Jupyter Notebook', 'Project Experience', 'book-open', 21),
('Tools', 'Google Colab', 'Project Experience', 'cloud', 22),

-- Big Data
('Big Data', 'Hadoop Ecosystem', 'Working Knowledge', 'server', 23),
('Big Data', 'HDFS', 'Working Knowledge', 'hard-drive', 24),
('Big Data', 'MapReduce Paradigms', 'Familiar', 'workflow', 25),
('Big Data', 'YARN', 'Familiar', 'activity', 26),

-- AI / GenAI
('AI / GenAI', 'Retrieval-Augmented Generation (RAG)', 'Project Experience', 'zap', 27),
('AI / GenAI', 'Vector Databases (Chroma/FAISS)', 'Working Knowledge', 'database', 28),
('AI / GenAI', 'Embeddings & Semantic Search', 'Working Knowledge', 'search', 29),
('AI / GenAI', 'Local LLM Deployment (Ollama/Transformers)', 'Working Knowledge', 'cpu', 30),
('AI / GenAI', 'Prompt Engineering & Context Curation', 'Project Experience', 'message-square', 31);

-- 5. Projects Command Center
INSERT INTO projects (
    title, subtitle, category, description, problem_solved, key_contribution, status, repo_url, demo_url, image_url, architecture_flow, featured, sort_order
) VALUES
(
    'V-Mirror: Virtual Try-On Cyber System',
    'Real-time Accessory & Garment Pose Detection Engine',
    'Full-Stack',
    'A full-stack computer vision and web application enabling real-time virtual accessory and clothing try-on without specialized hardware. Uses webcam feeds and uploaded images to accurately align digital apparel onto detected human body keypoints.',
    'Overcomes the friction of online apparel shopping by providing immediate visual fitting feedback through browser-based computer vision.',
    'Implemented real-time 33-landmark pose detection pipeline with MediaPipe, built the Flask backend image-processing warp matrix, and designed a responsive Tron-style reactive UI.',
    'Completed',
    'https://github.com/shubranil-pandit/v-mirror-tryon',
    'https://v-mirror-preview.vercel.app',
    '/assets/projects/v-mirror.svg',
    'WEB-CAM FEED ──> POSE LANDMARK DETECTION (MediaPipe) ──> AFFINE WARP MATRIX ──> ACCESSORY RENDER ──> FLASK/POSTGRESQL',
    TRUE,
    1
),
(
    'Stability-Aware Pharmacovigilance ADR Mining',
    'Mining Polypharmacy-Associated Serious ADRs in Elderly Patients Using FAERS',
    'Data Science',
    'A high-dimensional healthcare analytics pipeline analyzing millions of FDA Adverse Event Reporting System (FAERS) records. Isolates multi-drug interaction signals and serious Adverse Drug Reactions (ADRs) specifically in geriatric cohorts with stability-aware pruning.',
    'Raw pharmacovigilance reports suffer from extreme reporting biases, confounders, and polypharmacy noise. This system cleans, standardizes, and calculates proportional reporting ratios (PRR) with stability metrics to discover high-confidence drug-drug interaction warnings.',
    'Formulated stability-aware filtering criteria on 5M+ FAERS rows; engineered RxNorm and MeDRA ontology mapping algorithms in Python; mined statistically significant ADR risk scores in polypharmacy regimes.',
    'Research Prototype',
    'https://github.com/shubranil-pandit/faers-adr-pharmacovigilance',
    NULL,
    '/assets/projects/faers-adr.svg',
    'FAERS RAW DATA (5M+) ──> GERIATRIC COHORT FILTERING ──> DRUG-ADR STANDARDIZATION ──> DISPROPORTIONALITY ANALYSIS ──> STABILITY-AWARE PRUNING ──> RISK MATRIX',
    TRUE,
    2
),
(
    'GenAI Expert Knowledge Retrieval System',
    'Domain-Specific RAG Knowledge Engine Powered by Local LLMs',
    'AI / ML',
    'An enterprise-grade Retrieval-Augmented Generation (RAG) platform tailored for software engineering documentation and technical specifications. Ingests heterogeneous markdown, PDF, and codebases into a vector store and retrieves semantic context with verifiable source citations.',
    'Eliminates hallucination in domain-specific technical queries while maintaining zero data egress by hosting lightweight quantized local LLMs.',
    'Engineered vector ingestion pipeline, dynamic chunking with parent-document context, FAISS/Chroma integration, and built an interactive web HUD for interactive query inspection and confidence scoring.',
    'Completed',
    'https://github.com/shubranil-pandit/genai-rag-retrieval',
    'https://genai-rag-preview.vercel.app',
    '/assets/projects/genai-rag.svg',
    'USER QUERY ──> QUERY NORMALIZATION ──> VECTOR EMBEDDING (HuggingFace) ──> COSINE SIMILARITY SEARCH ──> TOP-K CHUNK RETRIEVAL ──> CONTEXT AUGMENTATION ──> LOCAL LLM INFERENCE ──> FACTUAL ANSWER + CITATIONS',
    TRUE,
    3
),
(
    'Smart Room Safety & Environment Monitor',
    'IoT Cyber-Physical Ambient Sensing & Hazard Prevention Grid',
    'Embedded / IoT',
    'An automated micro-controller hardware-software node utilizing an Arduino platform interfaced with digital environmental sensors, gas/smoke detectors, servomotors, alarm buzzers, and automated relay switches for smart room security.',
    'Provides autonomous, fail-safe environment monitoring capable of executing physical hazard mitigation (gas shut-off, ventilation servo actuation) even during network dropouts.',
    'Programmed embedded C++ firmware on Arduino, calibrated analog sensors (MQ series, DHT11), configured relay triggers, and designed digital LED/HUD telemetry feedback.',
    'Completed',
    'https://github.com/shubranil-pandit/smart-room-iot-monitor',
    NULL,
    '/assets/projects/smart-room.svg',
    'ENVIRONMENT SENSORS (MQ-Gas, Temp, PIR) ──> ARDUINO ATMega328P ──> THRESHOLD LOGIC ──> SERVO ACTUATION / RELAYS ──> LOCAL HUD TELEMETRY',
    TRUE,
    4
),
(
    'House Price Prediction Engine',
    'Multivariate Regression & Feature Engineering Pipeline',
    'Data Science',
    'Supervised machine learning framework for estimating residential property valuations using advanced feature engineering, outlier detection, and ensemble regression techniques.',
    'Resolves spatial heterogeneity and collinearity in real-estate feature sets to deliver accurate, interpretable price intervals.',
    'Benchmarked Ridge, Lasso, and Random Forest regressors with automated cross-validation and SHAP feature importance analysis.',
    'Completed',
    'https://github.com/shubranil-pandit/house-price-prediction-ml',
    NULL,
    '/assets/projects/house-price.svg',
    'HOUSING DATASET ──> OUTLIER TRIMMING ──> FEATURE ENCODING ──> ENSEMBLE REGRESSOR ──> SHAP INTERPRETABILITY',
    FALSE,
    5
),
(
    'K-Means Customer Segmentation Engine',
    'Unsupervised Clustering & High-Dimensional Profiling',
    'Data Science',
    'Unsupervised clustering model designed to partition complex multi-dimensional customer behavioral profiles into distinct operational clusters using silhouette scores and elbow analysis.',
    'Enables precise data-driven cohort segmentation without requiring labeled ground-truth training data.',
    'Implemented PCA dimensionality reduction, automated optimal cluster-k heuristic, and interactive 3D cluster visualizations.',
    'Completed',
    'https://github.com/shubranil-pandit/kmeans-customer-clustering',
    NULL,
    '/assets/projects/kmeans.svg',
    'RAW BEHAVIOR DATA ──> STANDARD SCALING ──> PCA PROJECTION ──> K-MEANS++ OPTIMIZATION ──> CLUSTER PERSONA PROFILES',
    FALSE,
    6
),
(
    'Deep Learning Cats vs Dogs Classifier',
    'Convolutional Neural Network with Transfer Learning',
    'AI / ML',
    'Computer vision classifier built with convolutional architectures and data augmentation strategies to achieve high-accuracy binary visual categorization.',
    'Overcomes overfitting in small image datasets via synthetic augmentation pipelines and pre-trained feature extractors.',
    'Constructed custom CNN layers, implemented dropout and batch-normalization regularization, and tested ResNet transfer learning.',
    'Completed',
    'https://github.com/shubranil-pandit/cats-dogs-cnn-classifier',
    NULL,
    '/assets/projects/cnn-classifier.svg',
    'IMAGE CORPUS ──> AUGMENTATION PIPELINE ──> CONVOLUTIONAL FEATURE MAPS ──> DENSE CLASSIFIER ──> SOFTMAX PROBABILITY',
    FALSE,
    7
),
(
    'Hand Gesture Recognition Interface',
    'Real-Time Spatial Vision Interaction System',
    'AI / ML',
    'Real-time hand gesture classification interface mapping webcam finger landmarks to system control events and navigation commands.',
    'Provides touchless human-computer interaction suitable for sterile or futuristic hands-free computing environments.',
    'Trained spatial coordinate classifier on 21 hand joints extracted in real-time via OpenCV and MediaPipe pipelines.',
    'Completed',
    'https://github.com/shubranil-pandit/hand-gesture-recognition',
    NULL,
    '/assets/projects/hand-gesture.svg',
    'VIDEO STREAM ──> 21 HAND LANDMARKS ──> NORMALIZED SPATIAL VECTORS ──> CLASSIFICATION INFERENCE ──> SYSTEM ACTION',
    FALSE,
    8
);

-- 6. Project Technologies Association
INSERT INTO project_technologies (project_id, technology_name) VALUES
(1, 'Python'), (1, 'Flask'), (1, 'MediaPipe'), (1, 'PostgreSQL'), (1, 'OpenCV'), (1, 'JavaScript'), (1, 'CSS3'),
(2, 'Python'), (2, 'Pandas'), (2, 'NumPy'), (2, 'PostgreSQL'), (2, 'Scikit-Learn'), (2, 'FAERS'), (2, 'Statistical Mining'),
(3, 'Python'), (3, 'RAG'), (3, 'Vector DB (FAISS)'), (3, 'Embeddings'), (3, 'Local LLM'), (3, 'Flask'), (3, 'React'),
(4, 'Arduino'), (4, 'Embedded C++'), (4, 'MQ Sensors'), (4, 'Servomotors'), (4, 'Relay Control'), (4, 'Hardware Circuitry'),
(5, 'Python'), (5, 'Scikit-Learn'), (5, 'Pandas'), (5, 'Matplotlib'), (5, 'Ensemble Regression'),
(6, 'Python'), (6, 'K-Means++'), (6, 'PCA'), (6, 'Scikit-Learn'), (6, 'Seaborn'),
(7, 'Python'), (7, 'TensorFlow/PyTorch'), (7, 'CNN'), (7, 'Transfer Learning'), (7, 'OpenCV'),
(8, 'Python'), (8, 'MediaPipe'), (8, 'OpenCV'), (8, 'Machine Learning'), (8, 'NumPy');

-- 7. Experience / Practical Activity Timeline
INSERT INTO experience (role, organization, duration, type, responsibilities, achievements, technologies, sort_order) VALUES
(
    'Data Science & ML Project Researcher',
    'Academic Research Laboratory',
    '2024 - Present',
    'Academic Research',
    'Investigating multi-drug adverse reaction mining algorithms on large-scale FDA adverse event databases. Developing stability metrics for pharmacovigilance signals and engineering reproducible Python ETL pipelines.',
    'Authored comparative study on statistical signal detection in polypharmacy regimens; processed 5M+ FAERS entries with high-throughput batching.',
    'Python, Pandas, PostgreSQL, Scikit-Learn, Statistical Modeling',
    1
),
(
    'Software & AI Development Contributor',
    'Technical Projects & Open Source Collaboration',
    '2023 - 2024',
    'Technical Activity',
    'Collaborated on full-stack web applications and AI-driven prototypes. Architected RESTful micro-endpoints, integrated MediaPipe gesture recognition, and deployed computer vision prototypes.',
    'Built and published V-Mirror prototype with real-time browser preview; engineered RAG documentation search tool for peer developers.',
    'Flask, JavaScript, MediaPipe, Vector Databases, Git, REST APIs',
    2
),
(
    'Technical Hackathon Participant & Problem Solver',
    'Inter-College Innovation Hackathons',
    '2023 - 2025',
    'Hackathon',
    'Competed in rapid-prototyping hackathons addressing smart city automation, healthcare monitoring, and intelligent document retrieval.',
    'Recognized for developing the Smart Room Safety & Environment prototype under time constraints with working sensor-actuator feedback.',
    'Arduino, C++, IoT Sensors, Python, Rapid Prototyping',
    3
);

-- 8. Achievements Database
INSERT INTO achievements (title, category, organization, issue_date, description, credential_url, sort_order) VALUES
(
    'Dean''s Academic Excellence Recognition - MCA',
    'Academic',
    'Department of Computer Applications',
    '2025',
    'Ranked in top percentile of MCA cohort for outstanding performance in Data Science, Machine Learning, and Distributed Computing coursework.',
    '#',
    1
),
(
    'Best Hardware-Software IoT Prototype',
    'Technical Competition',
    'Annual Tech Innovation Summit',
    '2024',
    'Awarded for Smart Room Safety & Hazard Prevention grid showcasing automated physical mitigation under simulated alarm scenarios.',
    '#',
    2
),
(
    'Machine Learning & Data Analysis Specialization Certification',
    'Certification',
    'Global Online Education Provider',
    '2024',
    'Comprehensive mastery of supervised learning, unsupervised learning, model evaluation metrics, feature engineering, and high-dimensional EDA.',
    '#',
    3
),
(
    'Deep Learning & Neural Architectures Workshop',
    'Workshop',
    'AI Research Symposium',
    '2024',
    'Intensive hands-on training covering Convolutional Networks, Recurrent Architectures, Attention Mechanisms, and modern Transformer fundamentals.',
    '#',
    4
);

-- 9. Sample Contact Messages
INSERT INTO contact_messages (name, email, subject, message, sender_ip, status) VALUES
(
    'Technical Recruiter',
    'recruiter@cybercorp.tech',
    'Internship & Project Discussion - Data Science Role',
    'Greetings Shubranil, we reviewed your FAERS pharmacovigilance and GenAI RAG projects on your portfolio. We are very impressed by your systematic approach to data pipelines and would love to schedule a technical chat.',
    '127.0.0.1',
    'unread'
);
