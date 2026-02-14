-- JivIT Solutions: Premium Seed Data Master Script
-- This script enhances the database with a high-density, enterprise-grade content set.

-- 1. SCHEMA ENHANCEMENTS (Ensure these columns exist)
ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE services ADD COLUMN IF NOT EXISTS icon_name text;
ALTER TABLE job_openings ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE job_openings ADD COLUMN IF NOT EXISTS icon_name text;
ALTER TABLE student_programs ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE student_programs ADD COLUMN IF NOT EXISTS icon_name text;

-- 2. CLEANUP (Optional: Remove existing data to avoid duplicates)
DELETE FROM activity_logs;
DELETE FROM applications;
DELETE FROM student_programs;
DELETE FROM job_openings;
DELETE FROM services;
DELETE FROM site_settings;

-- 3. SERVICES (IT Solutions, Wellness, Platform Enablement)
INSERT INTO services (title, subtitle, description, benefits, category, status, image_url, icon_name) VALUES
-- IT SOLUTIONS
(
    'Bespoke Cloud Architecture', 
    'Scalable, secure infrastructure for the modern age.', 
    'We design and implement custom cloud environments that prioritize high availability, rigorous security, and cost optimization. Built with Terraform and AWS/Azure best practices.', 
    ARRAY['99.99% Infrastructure Availability', 'Automated Security Patching', 'Cloud-Native Cost Optimization', 'Global Multi-Region Deployment'],
    'it-solutions', 'published',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', 'CloudCo'
),
(
    'AI-Driven Predictive Analytics', 
    'Transforming data into foresight.', 
    'Leverage machine learning to predict market trends and user behavior. Our models integrate seamlessly into your existing data pipeline for real-time decision support.', 
    ARRAY['Real-time Pattern Recognition', 'Custom Neural Network Design', 'Fraud Detection Algorithms', 'Actionable Business Intelligence'],
    'it-solutions', 'published',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80', 'Zap'
),
(
    'Sustainable Tech Consulting', 
    'Eco-friendly digital transformation.', 
    'We help enterprises reduce their carbon footprint through green coding practices, energy-efficient cloud hosting, and circular technology procurement.', 
    ARRAY['Carbon Footprint Audits', 'Energy-Efficient Software Design', 'Green Cloud Migration', 'ESG Compliance Reporting'],
    'it-solutions', 'published',
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80', 'Leaf'
),

-- WELLNESS SERVICES
(
    'Mindfulness & High-Performance Coaching', 
    'Clarity for leaders and creators.', 
    'A transformative program designed for executives to cultivate mental resilience, reduce burnout, and achieve peak performance via evidence-based mindfulness.', 
    ARRAY['1-on-1 Elite Performance Mentoring', 'Stress Management Frameworks', 'Emotional Intelligence Development', 'Focused Cognitive Training'],
    'wellness', 'published',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80', 'Heart'
),
(
    'Corporate Zen & Productivity', 
    'Harmonizing the modern workspace.', 
    'Integration of yoga, meditation, and ergonomic flow into the corporate environment to boost employee satisfaction and creativity.', 
    ARRAY['On-site Meditation Sessions', 'Ergonomic Workflow Audits', 'Mental Health Support Systems', 'Team Bonding Retreats'],
    'wellness', 'published',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80', 'Smile'
),
(
    'Bespoke Healing Retreats', 
    'Deep transformation in natural settings.', 
    'Curated 7-day immersive experiences focusing on holistic health, detoxification, and spiritual re-alignment at our sanctuary locations.', 
    ARRAY['Bio-Individual Detox Plans', 'Nature-Immersive Therapy', 'Daily Holistic Workshops', 'Lifelong Aftercare Strategy'],
    'wellness', 'published',
    'https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&w=1200&q=80', 'Map'
),

-- PLATFORM ENABLEMENT
(
    'SME Accelerator Kit', 
    'Digital transformation for micro-enterprises.', 
    'We provide small business owners with a pre-configured suite of tools to manage operations, digital marketing, and customer relations.', 
    ARRAY['Omnichannel CRM Access', 'Automated Lead Capture', 'Financial Dashboard Integration', 'Simplified Inventory Management'],
    'platform-enablement', 'published',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', 'Rocket'
);

-- 4. JOB OPENINGS
INSERT INTO job_openings (title, department, location, type, description, requirements, status) VALUES
(
    'Senior DevOps Architect', 
    'Engineering', 'Remote / Pune', 'Full-time', 
    'Lead our infrastructure evolution. We are looking for a Terraform and Kubernetes expert who values security and efficiency.', 
    ARRAY['8+ years experience in Cloud Infrastructure', 'Strong knowledge of CI/CD pipelines', 'Experience with Zero-Trust security', 'AWS Solutions Architect Professional certification'],
    'published'
),
(
    'Lead UI/UX Designer', 
    'Product', 'Remote', 'Full-time', 
    'Define the visual language of the JivIT universe. You will lead design systems for both our IT platforms and wellness apps.', 
    ARRAY['Portfolio showcasing premium/enterprise design', 'Expertise in Figma and Prototyping', 'Deep understanding of accessibility', 'Experience with motion design'],
    'published'
),
(
    'Holistic Health Specialist', 
    'Wellness', 'Hybrid (Mumbai)', 'Contract', 
    'Partner with us to deliver 1-on-1 coaching and design transformative retreat curriculum.', 
    ARRAY['Certification in Holistic Nutrition or Psychology', '5+ years coaching experience', 'Excellent public speaking skills', 'Passion for tech-enabled healing'],
    'published'
),
(
    'Strategic Growth Lead', 
    'Business', 'Bangalore', 'Full-time', 
    'Drive the adoption of our SME platform kit across the Indian market.', 
    ARRAY['Proven track record in SaaS growth', 'Strong network in the MSME sector', 'Analytical mindset with ROI focus'],
    'published'
);

-- 5. STUDENT PROGRAMS
INSERT INTO student_programs (title, domain, description, duration, status) VALUES
(
    'Emerging Tech Fellowship', 
    'IT', 
    'A 6-month immersive experience where students work alongside senior engineers on real-world IT infrastructure projects.', 
    '6 Months', 'published'
),
(
    'Mental Health Tech Lab', 
    'Research', 
    'Focused on investigating the impact of digital wellness tools on urban mental health environments.', 
    '1 Year', 'published'
),
(
    'Cyber Defense Academy', 
    'IT', 
    'Intensive training program focused on offensive and defensive security strategies in modern cloud environments.', 
    '3 Months', 'published'
);

-- 6. SITE SETTINGS
INSERT INTO site_settings (key, value) VALUES
('site_name', '"JivIT Solutions"'),
('contact_email', '"hello@jivitsolutions.com"'),
('maintenance_mode', 'false'),
('enable_applications', 'true'),
('notification_email', '"admin@jivitsolutions.com"'),
('hero_tagline', '"Orchestrating Digital Future & Human Potential"'),
('hero_description', '"JivIT Solutions bridges the gap between enterprise-grade engineering and holistic human growth. We build resilient platforms and empower thriving organizations."'),
('service_categories', '[
    {"id": "it-solutions", "label": "IT Solutions", "tag": "Digital Excellence", "desc": "Revenue-driving, scalable technology infrastructure for modern enterprises."},
    {"id": "wellness", "label": "Wellness & Healing", "tag": "Inner Evolution", "desc": "Empowering personal growth and transformation through technology-enabled wellness experiences."},
    {"id": "platform-enablement", "label": "Platform Enablement", "tag": "Business Growth", "desc": "Empowering small businesses and independent professionals with accessible, scalable technology."}
]'),
('program_categories', '[
    {"id": "student-career", "label": "Student Programs", "tag": "Next Generation", "desc": "Rigorous programs that bridge academic theory with real-world application."},
    {"id": "research", "label": "Research & Lab", "tag": "Innovation", "desc": "Conducting ethical, open research at the intersection of technology and humans."}
]');

-- 7. MOCK APPLICATIONS
INSERT INTO applications (first_name, last_name, email, phone, message, source_type, status) VALUES
('Aarav', 'Sharma', 'aarav@example.com', '+91 98765 43210', 'Very excited about the DevOps role!', 'job', 'new'),
('Priya', 'Patel', 'priya@example.com', '+91 98765 43211', 'I have 5 years of yoga teaching experience.', 'job', 'reviewing'),
('Dev', 'Mehta', 'dev@example.com', '+91 98765 43212', 'Interested in the Tech Fellowship.', 'student_program', 'new');

-- 8. RLS BYPASS (FOR DEVELOPMENT ONLY - REMOVE FOR PRODUCTION)
DROP POLICY IF EXISTS "Admins can do everything with services" ON services;
CREATE POLICY "Admins can do everything with services" ON services FOR ALL USING (true);
DROP POLICY IF EXISTS "Admins can do everything with job openings" ON job_openings;
CREATE POLICY "Admins can do everything with job openings" ON job_openings FOR ALL USING (true);
DROP POLICY IF EXISTS "Admins can do everything with programs" ON student_programs;
CREATE POLICY "Admins can do everything with programs" ON student_programs FOR ALL USING (true);
DROP POLICY IF EXISTS "Admins can view all applications" ON applications;
CREATE POLICY "Admins can view all applications" ON applications FOR SELECT USING (true);
DROP POLICY IF EXISTS "Only admins can view activity logs" ON activity_logs;
CREATE POLICY "Only admins can view activity logs" ON activity_logs FOR SELECT USING (true);
DROP POLICY IF EXISTS "Settings viewable by everyone" ON site_settings;
CREATE POLICY "Settings viewable by everyone" ON site_settings FOR SELECT USING (true);
