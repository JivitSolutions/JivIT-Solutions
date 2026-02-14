-- JivIT Solutions: Supabase Database Schema
-- Version: 1.0.0
-- Description: Enterprise-grade schema for small-scale business growth platform.

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

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

-- Profiles (extends auth.users)
create table if not exists profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text,
    role user_role default 'viewer',
    avatar_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Services
create table if not exists services (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    subtitle text,
    description text,
    benefits text[], -- Array of strings
    category text, -- it-solutions, wellness, platform-enablement
    status content_status default 'draft',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    created_by uuid references auth.users(id),
    deleted_at timestamptz -- For soft-delete
);

-- Job Openings
create table if not exists job_openings (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    department text,
    location text,
    type text, -- Full-time, Part-time, Contract
    description text,
    requirements text[],
    status content_status default 'draft',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    created_by uuid references auth.users(id),
    deleted_at timestamptz
);

-- Student Programs
create table if not exists student_programs (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    domain text, -- IT, Wellness, Research
    description text,
    duration text,
    status content_status default 'draft',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    created_by uuid references auth.users(id),
    deleted_at timestamptz
);

-- Applications
create table if not exists applications (
    id uuid default uuid_generate_v4() primary key,
    first_name text not null,
    last_name text not null,
    email text not null,
    phone text,
    resume_url text,
    portfolio_url text,
    message text,
    source_type text, -- job, student_program
    source_id uuid, -- ID of the job or program
    status text default 'new', -- new, reviewing, rejected, accepted
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Activity Logs
create table if not exists activity_logs (
    id uuid default uuid_generate_v4() primary key,
    admin_id uuid references auth.users(id),
    action text not null,
    entity_type text not null,
    entity_id uuid,
    details jsonb,
    created_at timestamptz default now()
);

-- Site Settings
create table if not exists site_settings (
    key text primary key,
    value jsonb,
    updated_at timestamptz default now(),
    updated_by uuid references auth.users(id)
);

-- Blogs
create table if not exists blogs (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    slug text unique not null,
    excerpt text,
    content text,
    image_url text,
    category text, -- Technology, Wellness, Innovation, etc.
    author_id uuid references auth.users(id),
    status content_status default 'draft',
    published_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted_at timestamptz
);

-- 4. ROW LEVEL SECURITY (RLS)

-- Profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Services
alter table services enable row level security;
create policy "Services are viewable by everyone if published" on services 
    for select using (status = 'published' AND deleted_at IS NULL);
create policy "Admins can do everything with services" on services 
    for all using (
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
    );

-- Job Openings
alter table job_openings enable row level security;
create policy "Jobs are viewable by everyone if published" on job_openings 
    for select using (status = 'published' AND deleted_at IS NULL);
create policy "Admins can do everything with job openings" on job_openings 
    for all using (
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
    );

-- Student Programs
alter table student_programs enable row level security;
create policy "Programs are viewable by everyone if published" on student_programs 
    for select using (status = 'published' AND deleted_at IS NULL);
create policy "Admins can do everything with programs" on student_programs 
    for all using (
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
    );

-- Blogs
alter table blogs enable row level security;
create policy "Blogs are viewable by everyone if published" on blogs 
    for select using (status = 'published' AND deleted_at IS NULL);
create policy "Admins can do everything with blogs" on blogs 
    for all using (
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
    );

-- Applications
alter table applications enable row level security;
create policy "Public can insert applications" on applications for insert with check (true);
create policy "Admins can view all applications" on applications 
    for select using (
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
    );

-- Activity Logs
alter table activity_logs enable row level security;
create policy "Only admins can view activity logs" on activity_logs 
    for select using (
        exists (select 1 from profiles where id = auth.uid() and role = 'admin')
    );

-- 5. FUNCTIONS & TRIGGERS

-- Update timestamp function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Apply timestamp trigger to all relevant tables
create trigger update_services_updated_at before update on services for each row execute procedure update_updated_at_column();
create trigger update_job_openings_updated_at before update on job_openings for each row execute procedure update_updated_at_column();
create trigger update_student_programs_updated_at before update on student_programs for each row execute procedure update_updated_at_column();
create trigger update_applications_updated_at before update on applications for each row execute procedure update_updated_at_column();
create trigger update_profiles_updated_at before update on profiles for each row execute procedure update_updated_at_column();

-- 6. AUTH TRIGGERS
-- Automatically create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, full_name, role, avatar_url)
    values (new.id, new.raw_user_meta_data->>'full_name', 'viewer', new.raw_user_meta_data->>'avatar_url');
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
