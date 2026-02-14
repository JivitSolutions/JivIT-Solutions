import { Link } from "react-router-dom";

import { useState, useEffect } from 'react';
import { adminService } from '../lib/adminService';

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            // Fail-safe timeout
            const timer = setTimeout(() => setLoading(false), 10000);

            try {
                const data = await adminService.getJobOpenings(); // Only published
                setJobs(data);
                clearTimeout(timer);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) return (
        <div className="loading-state-full">
            <div className="premium-spinner"></div>
            <p>Scanning the Horizon for Talent...</p>
        </div>
    );

    return (
        <main className="career-page">
            <section className="page-header">
                <div className="container">
                    <span className="page-tag">Join Us</span>
                    <h1>Build the Future of <br /> Tech & Wellness</h1>
                    <p className="page-lead">
                        We are looking for exceptional talent who believe in our dual mission of digital excellence and human evolution.
                    </p>
                </div>
            </section>

            <section className="content-block">
                <div className="container">
                    <h2 className="section-title">Open Roles</h2>
                    {jobs.length > 0 ? (
                        <div className="directory-grid">
                            {jobs.map((role) => (
                                <div key={role.id} className="directory-card career-card">
                                    <p className="division-label" style={{ marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                                        {role.department}
                                    </p>
                                    <h3>{role.title}</h3>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                        {role.location} • {role.type}
                                    </p>
                                    <Link to={`/careers/${role.id}`} className="text-link">Apply Now →</Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state-section" style={{ padding: '60px 0' }}>
                            <div className="empty-indicator">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#D2C7BB" strokeWidth="1">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <h3>All Positions Filled</h3>
                            <p>We've currently found our match for all open roles. <br />However, we're always scouting for extraordinary minds.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="content-block bg-light">
                <div className="container text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 className="section-title">Don't see a perfect fit?</h2>
                    <p>
                        We are always interested in meeting people who share our values.
                        Send us your resume and a short note about why you'd like to join JivIT.
                    </p>
                    <div style={{ marginTop: '2.5rem' }}>
                        <a href="mailto:careers@jivitsolutions.com" className="btn btn-primary">General Application</a>
                    </div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="content-block">
                <div className="container">
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>Why JivIT?</h2>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <span className="service-index">01</span>
                            <h3>Dual Impact</h3>
                            <p>Work on projects that blend cutting-edge technology with meaningful wellness initiatives.</p>
                        </div>
                        <div className="feature-card">
                            <span className="service-index">02</span>
                            <h3>Flexible Culture</h3>
                            <p>Remote-first environment with focus on work-life harmony and personal growth.</p>
                        </div>
                        <div className="feature-card">
                            <span className="service-index">03</span>
                            <h3>Growth Mindset</h3>
                            <p>Continuous learning budget, mentorship programs, and clear career progression paths.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Careers;
