-- ==========================================================
-- JivIT SOLUTIONS: MASTER DATABASE STRUCTURE & SEEDING
-- Project ID: hiqdqtgsbevdjgtgkgat
-- ==========================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- 2. ENUMS
do $$ begin
    create type content_status as enum ('draft', 'published', 'archived');
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type user_role as enum ('admin', 'editor', 'viewer');
exception
    when duplicate_object then null;
end $$;

-- 3. TABLES
create table if not exists profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text,
    role user_role default 'viewer',
    avatar_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- SEED ADMIN USER (password: admin123)
-- Only for local development. In production, use the Supabase Auth UI.
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, instance_id)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@jivit.com', crypt('admin123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"System Admin"}', now(), now(), 'authenticated', '00000000-0000-0000-0000-000000000000')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profiles (id, full_name, role)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'System Admin', 'admin')
ON CONFLICT (id) DO NOTHING;

create table if not exists services (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    subtitle text,
    description text,
    benefits text[],
    category text, -- it-solutions, wellness, platform-enablement
    status content_status default 'published',
    image_url text,
    icon_name text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    created_by uuid references auth.users(id),
    deleted_at timestamptz
);

create table if not exists job_openings (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    department text,
    location text,
    type text,
    description text,
    requirements text[],
    status content_status default 'published',
    image_url text,
    icon_name text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    created_by uuid references auth.users(id),
    deleted_at timestamptz
);

create table if not exists student_programs (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    category text, 
    subtitle text,
    description text,
    benefits text[],
    status content_status default 'published',
    image_url text,
    icon_name text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    created_by uuid references auth.users(id),
    deleted_at timestamptz
);

create table if not exists applications (
    id uuid default uuid_generate_v4() primary key,
    first_name text not null,
    last_name text not null,
    email text not null,
    phone text,
    resume_url text,
    portfolio_url text,
    message text,
    source_type text,
    source_id uuid,
    status text default 'new',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists site_settings (
    key text primary key,
    value jsonb,
    updated_at timestamptz default now(),
    updated_by uuid references auth.users(id)
);

create table if not exists blogs (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    slug text unique not null,
    excerpt text,
    content text,
    image_url text,
    category text,
    status content_status default 'published',
    published_at timestamptz default now(),
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted_at timestamptz
);

-- 4. RLS (Open for development, but structured)
alter table services enable row level security;
drop policy if exists "Services are public" on services;
create policy "Services are public" on services for select using (true);

alter table job_openings enable row level security;
drop policy if exists "Jobs are public" on job_openings;
create policy "Jobs are public" on job_openings for select using (true);

alter table student_programs enable row level security;
drop policy if exists "Programs are public" on student_programs;
create policy "Programs are public" on student_programs for select using (true);

alter table blogs enable row level security;
drop policy if exists "Blogs are public" on blogs;
create policy "Blogs are public" on blogs for select using (true);

alter table site_settings enable row level security;
drop policy if exists "Settings are public" on site_settings;
create policy "Settings are public" on site_settings for select using (true);

-- 5. PREMIUM SEED DATA
DELETE FROM services;
INSERT INTO services (title, subtitle, description, category, benefits, image_url) VALUES
('Cloud Infrastructure', 'Scalable, Secure, Global', 'Architecting robust cloud environments on AWS, Azure, and GCP.', 'it-solutions', 
 ARRAY['Serverless Architecture', 'DevOps Automation', 'Multi-region Deployment'], 
 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000'),
('Holistic Healing', 'Inner Peace transformed', 'Personal journeys for mindfulness and emotional health.', 'wellness', 
 ARRAY['Guided Meditation', 'Clarity Coaching', 'Wellness Retreats'], 
 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000');

DELETE FROM blogs;
INSERT INTO blogs (title, slug, excerpt, content, category, image_url) VALUES
('The Future of Ethical AI', 'future-of-ethical-ai', 'Exploring the intersection of advanced machine learning and human values.', '<p>Technology is moving at a breakneck pace, but the soul of innovation must remain human...</p>', 'Technology', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200'),
('Mindfulness in the Digital Age', 'mindfulness-digital-age', 'How to maintain focus and peace in a world of constant notification.', '<p>Our attention is the most valuable currency in the modern world...</p>', 'Wellness', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200');

DELETE FROM site_settings;
INSERT INTO site_settings (key, value) VALUES 
('site_name', '"JivIT Solutions"'),
('hero_tagline', '"Digital Excellence, Human Evolution"'),
('service_categories', '[
    {"id": "it-solutions", "label": "IT Solutions", "tag": "Enterprise", "desc": "Scalable Infrastructure"},
    {"id": "wellness", "label": "Wellness", "tag": "Personal", "desc": "Inner Growth"}
]');

DELETE FROM job_openings;
INSERT INTO job_openings (title, department, location, type, status) VALUES
('Principal Engineer', 'Engineering', 'Remote', 'Full-time', 'published'),
('Wellness Facilitator', 'People', 'Pune', 'Part-time', 'published');

DELETE FROM student_programs;
INSERT INTO student_programs (title, category, subtitle, description, status) VALUES
('Summer AI Internship', 'student-career', 'ML Foundations', 'Deep dive into LLMs and neural networks.', 'published');

-- ==========================================================
-- JivIT SOLUTIONS: EXTENDED PREMIUM SEED DATA
-- ==========================================================

-- ================================
-- SERVICES (10 PRODUCTS)
-- ================================
DELETE FROM services;

INSERT INTO services 
(title, subtitle, description, category, benefits, image_url)
VALUES

-- IT SOLUTIONS (4)
('Cloud Infrastructure Engineering',
 'Scalable, Secure, Global',
 'Architecting enterprise-grade cloud systems across AWS, Azure and GCP.',
 'it-solutions',
 ARRAY['Serverless Architecture','DevOps Automation','Multi-Region Deployment','Cost Optimization'],
 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000'),

('AI & Machine Learning Platforms',
 'Intelligent Systems at Scale',
 'Building production-ready AI systems and LLM integrations.',
 'it-solutions',
 ARRAY['Model Deployment','MLOps Pipelines','LLM Integration','Data Engineering'],
 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000'),

('Enterprise SaaS Development',
 'Modern Product Architecture',
 'Full-stack SaaS development with secure multi-tenant systems.',
 'it-solutions',
 ARRAY['Microservices','API Architecture','Authentication Systems','Scalable Databases'],
 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000'),

('Cybersecurity & Compliance',
 'Security by Design',
 'Advanced security frameworks and compliance implementation.',
 'it-solutions',
 ARRAY['Zero Trust Architecture','Vulnerability Assessment','SOC Integration','Data Encryption'],
 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000'),

-- WELLNESS (3)
('Holistic Healing Programs',
 'Inner Peace Transformed',
 'Guided personal transformation journeys.',
 'wellness',
 ARRAY['Guided Meditation','Energy Alignment','Emotional Healing','Retreat Programs'],
 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000'),

('Corporate Mindfulness Workshops',
 'Productive & Balanced Teams',
 'Workplace wellness programs for modern organizations.',
 'wellness',
 ARRAY['Stress Management','Focus Training','Team Mindfulness','Executive Coaching'],
 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000'),

('Yoga & Breathwork Therapy',
 'Body-Mind Synchronization',
 'Therapeutic yoga and pranayama sessions.',
 'wellness',
 ARRAY['Guided Yoga','Breath Control','Mental Clarity','Recovery Sessions'],
 'https://images.unsplash.com/photo-1506126279646-a697353d3166?q=80&w=1000'),

-- PLATFORM ENABLEMENT (3)
('Smart City Traffic Platform',
 'AI-Powered Urban Intelligence',
 'Community-driven traffic safety and violation reporting platform.',
 'platform-enablement',
 ARRAY['Citizen Reporting','Edge AI Detection','Emergency Integration','Dynamic Routing'],
 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1000'),

('EdTech Learning Platform',
 'Next-Gen Digital Education',
 'Scalable LMS and AI-driven learning analytics.',
 'platform-enablement',
 ARRAY['Live Classes','AI Assessments','Progress Analytics','Certification Engine'],
 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000'),

('HealthTech Monitoring System',
 'Remote Care Intelligence',
 'Digital health tracking and remote patient systems.',
 'platform-enablement',
 ARRAY['Real-time Monitoring','Data Visualization','Patient Alerts','Secure Medical Records'],
 'https://images.unsplash.com/photo-1580281657527-47f249e9f0d7?q=80&w=1000');



-- ================================
-- JOB OPENINGS (5)
-- ================================
DELETE FROM job_openings;

INSERT INTO job_openings 
(title, department, location, type, description, requirements, status)
VALUES

('Senior Full Stack Engineer',
 'Engineering',
 'Remote',
 'Full-time',
 'Lead scalable SaaS and AI product development.',
 ARRAY['5+ Years Experience','React + Node.js','Cloud Deployment','System Design'],
 'published'),

('AI Research Engineer',
 'AI Division',
 'Bangalore',
 'Full-time',
 'Develop machine learning pipelines and LLM solutions.',
 ARRAY['Deep Learning','PyTorch/TensorFlow','MLOps','Research Background'],
 'published'),

('DevOps Cloud Architect',
 'Infrastructure',
 'Remote',
 'Full-time',
 'Design and manage global cloud deployments.',
 ARRAY['AWS/GCP/Azure','Kubernetes','CI/CD','Infrastructure as Code'],
 'published'),

('Product Designer (UI/UX)',
 'Design',
 'Pune',
 'Full-time',
 'Design luxury minimalist digital products.',
 ARRAY['Figma','Design Systems','UX Research','Responsive Design'],
 'published'),

('Wellness Program Director',
 'Wellness',
 'Pune',
 'Part-time',
 'Lead holistic and corporate wellness initiatives.',
 ARRAY['Therapy Certification','Public Speaking','Program Design','Leadership'],
 'published');



-- ================================
-- STUDENT PROGRAMS (10)
-- ================================
DELETE FROM student_programs;

INSERT INTO student_programs
(title, category, subtitle, description, benefits, status)
VALUES

('Summer AI Internship',
 'student-career',
 'Machine Learning Foundations',
 'Hands-on training in neural networks and LLM systems.',
 ARRAY['Live Projects','Mentorship','Certification','Stipend Opportunity'],
 'published'),

('Cloud Engineering Bootcamp',
 'student-career',
 'DevOps & Infrastructure',
 'Learn CI/CD, Docker, Kubernetes and cloud deployments.',
 ARRAY['AWS Labs','Real Deployments','Certification','Portfolio Project'],
 'published'),

('Full Stack Developer Internship',
 'student-career',
 'React + Node Mastery',
 'Build production-ready web applications.',
 ARRAY['Code Reviews','Team Collaboration','Live API Work','Deployment Training'],
 'published'),

('Cybersecurity Training Program',
 'student-career',
 'Ethical Hacking Basics',
 'Introduction to penetration testing and security systems.',
 ARRAY['Security Labs','CTF Challenges','Certification','Industry Mentorship'],
 'published'),

('Smart City Research Fellowship',
 'student-research',
 'Urban AI Systems',
 'Work on intelligent transportation and smart governance.',
 ARRAY['Research Paper','Prototype Development','Faculty Mentorship','Conference Exposure'],
 'published'),

('Data Science Internship',
 'student-career',
 'Data Analytics & Visualization',
 'Hands-on analytics using Python and real datasets.',
 ARRAY['Dashboard Building','ML Models','Industry Dataset','Portfolio Support'],
 'published'),

('UI/UX Design Fellowship',
 'student-career',
 'Luxury Digital Design',
 'Create high-end user experiences.',
 ARRAY['Figma Training','Design System','Live Client Work','Portfolio Review'],
 'published'),

('Wellness & Mindfulness Certification',
 'student-wellness',
 'Holistic Growth',
 'Personal growth and meditation training.',
 ARRAY['Guided Practice','Retreat Access','Certification','Coaching Sessions'],
 'published'),

('Entrepreneurship Incubator Program',
 'student-startup',
 'Startup Foundations',
 'Learn product validation and startup scaling.',
 ARRAY['Pitch Deck Training','Investor Connect','Mentorship','Prototype Funding'],
 'published'),

('Advanced AI Research Lab',
 'student-research',
 'Deep Neural Networks',
 'Advanced research on LLMs and reinforcement learning.',
 ARRAY['GPU Access','Research Mentorship','Paper Publication','Conference Support'],
 'published');
