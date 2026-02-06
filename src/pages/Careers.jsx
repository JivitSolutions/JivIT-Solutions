import { Link } from "react-router-dom";

const Careers = () => {
    const openings = [
        { title: "Senior Software Engineer", type: "Full-time", location: "Remote / Mumbai", dept: "IT Division" },
        { title: "UI/UX Designer", type: "Full-time", location: "Remote", dept: "Creative Division" },
        { title: "Wellness Content Strategist", type: "Contract", location: "Remote", dept: "Wellness Division" },
        { title: "Project Manager", type: "Full-time", location: "Mumbai", dept: "Operations" },
        { title: "React Developer", type: "Full-time", location: "Remote", dept: "IT Division" },
        { title: "Mindfulness Coach", type: "Part-time", location: "Hybrid", dept: "Wellness Division" }
    ];

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
                    <div className="directory-grid">
                        {openings.map((role, idx) => (
                            <div key={idx} className="directory-card career-card">
                                <p className="division-label" style={{ marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                                    {role.dept}
                                </p>
                                <h3>{role.title}</h3>
                                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                    {role.location} • {role.type}
                                </p>
                                <Link to="/contact" className="text-link">Apply Now →</Link>
                            </div>
                        ))}
                    </div>
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
