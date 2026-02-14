# Dashboard Implementation Plan: JivIT Solutions Growth Platform

This document outlines the strategic implementation of the administrative dashboard, focusing on secure communication and data integrity.

## Phase 1: Database & Security (Active)
- [x] Define SQL Schema with core tables (`services`, `job_openings`, etc.)
- [x] Implement Row Level Security (RLS) policies for RBAC (Admin vs Public).
- [x] Configure Soft-delete mechanism using `deleted_at`.
- [ ] Initialize Supabase project with these tables.

## Phase 2: Authentication & RBAC Logic
- [ ] Connect `profiles` table to Supabase Auth triggers.
- [ ] Implement a custom hook `useAdmin` to verify administrative status on the frontend.
- [ ] Build a middle layer for database operations to validate payloads before sending to Supabase.

## Phase 3: Content Management Modules
### 1. Product & Service Manager
- **Functionality**: CRUD for services.
- **Workflow**: Create as Draft -> Preview -> Publish.
- **Validation**: Ensure all required fields (Title, Category) are present.

### 2. Careers & Student Program Desk
- **Functionality**: Manage postings.
- **Control**: Toggle 'Active' status (mapped to `published` in DB).

### 3. Unified Application Inbox
- **Functionality**: Read-only access to incoming applications for admins.
- **Status Tracking**: Update status from 'New' to 'Reviewing/Done'.

## Phase 4: Operational Intelligence
- [ ] **Activity Logs**: Implement a trigger-based or application-level logger for admin actions.
- [ ] **Analytics Dashboard**: Interpret application trends and program popularity.

## Phase 5: Dynamic Frontend Integration
- [ ] Replace static arrays in `ProductsServices.jsx`, `Careers.jsx`, and `Students.jsx` with real-time Supabase fetches.
- [ ] Implement loading states and error boundaries for better user experience.

---

### Security Checklist
- [ ] No write access for public users.
- [ ] `anon` key restricted to Read-only on published items.
- [ ] All sensitive business logs restricted to `admin` role.
