-- ==========================================================
-- TRON: LEGACY PERSONAL DIGITAL IDENTITY & PORTFOLIO DATABASE
-- PostgreSQL Database Schema
-- User: Shubranil Pandit | MCA Data Science
-- ==========================================================

-- Clean existing tables if needed (in reverse dependency order)
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS project_technologies CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS experience CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Admin Users Table (Secure Password Hashing & JWT Auth)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Personal Profile / Identity Table
CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    title VARCHAR(200) NOT NULL,
    tagline VARCHAR(300),
    bio TEXT NOT NULL,
    avatar_url VARCHAR(500),
    status VARCHAR(100) DEFAULT '● SYSTEM ONLINE',
    location VARCHAR(150),
    email VARCHAR(255),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    resume_url VARCHAR(255),
    current_focus TEXT,
    system_version VARCHAR(50) DEFAULT 'TRON-OS v2.5.0',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Education Timeline Table
CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    degree VARCHAR(150) NOT NULL,
    field_of_study VARCHAR(150) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    current_status VARCHAR(100) DEFAULT 'In Progress',
    grade VARCHAR(50),
    coursework TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Technical Skills Matrix Table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL, -- 'Programming', 'Data Science / ML', 'Backend', 'Databases', 'Tools', 'Big Data', 'AI / GenAI'
    name VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(50) NOT NULL, -- 'Learning', 'Familiar', 'Working Knowledge', 'Project Experience'
    icon VARCHAR(100),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Projects Command Center Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(255),
    category VARCHAR(100) NOT NULL, -- 'AI / ML', 'Data Science', 'Full-Stack', 'Embedded / IoT'
    description TEXT NOT NULL,
    problem_solved TEXT,
    key_contribution TEXT,
    status VARCHAR(50) DEFAULT 'Completed', -- 'Completed', 'In Development', 'Research Prototype'
    repo_url VARCHAR(500),
    demo_url VARCHAR(500),
    image_url VARCHAR(500),
    architecture_flow TEXT, -- JSON or ASCII pipeline visualization
    featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Project Technologies Association Table
CREATE TABLE project_technologies (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    technology_name VARCHAR(100) NOT NULL
);

-- 7. Experience / Research / Practical Timeline Table
CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    role VARCHAR(150) NOT NULL,
    organization VARCHAR(200) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    type VARCHAR(100) DEFAULT 'Internship', -- 'Internship', 'Academic Research', 'Technical Activity', 'Hackathon'
    responsibilities TEXT NOT NULL,
    achievements TEXT,
    technologies VARCHAR(300),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Achievements Database Table
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Certification', 'Hackathon', 'Academic', 'Technical Competition', 'Research', 'Workshop'
    organization VARCHAR(200),
    issue_date VARCHAR(100),
    description TEXT,
    credential_url VARCHAR(500),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Certifications Table
CREATE TABLE certifications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(200) NOT NULL,
    issue_date VARCHAR(100),
    credential_id VARCHAR(150),
    credential_url VARCHAR(500),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Contact Transmissions Table
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    sender_ip VARCHAR(50),
    status VARCHAR(50) DEFAULT 'unread', -- 'unread', 'read', 'archived', 'replied'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for optimal lookup performance
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_messages_status ON contact_messages(status);
