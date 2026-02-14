import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../lib/adminService';

const Students = () => {
    const [programCategories, setProgramCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPrograms = async () => {
            // Fail-safe timeout
            const timer = setTimeout(() => setLoading(false), 10000);

            try {
                const data = await adminService.getStudentPrograms();

                const settings = await adminService.getSettings();
                const categoryConfig = settings.program_categories || [
                    { id: 'student-career', label: 'Student & Career Services', tag: 'Development & Growth', desc: 'Bridging academia and the workforce.' },
                    { id: 'research', label: 'Research & Innovation', tag: 'Knowledge Pursuit', desc: 'Ethical, open research initiatives.' }
                ];

                const groups = {};
                categoryConfig.forEach(cat => {
                    groups[cat.id] = {
                        id: cat.id,
                        category: cat.label,
                        categoryTag: cat.tag,
                        categoryDescription: cat.desc,
                        programs: []
                    };
                });

                if (data && Array.isArray(data)) {
                    data.forEach(program => {
                        const catId = program.category || 'student-career';
                        if (groups[catId]) {
                            groups[catId].programs.push(program);
                        }
                    });
                }

                setProgramCategories(Object.values(groups).filter(g => g.programs.length > 0));
                clearTimeout(timer);
            } catch (error) {
                console.error('Error loading programs:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPrograms();
    }, []);

    if (loading) return (
        <div className="loading-state-full">
            <div className="premium-spinner"></div>
            <p>Gathering Knowledge Initiatives...</p>
        </div>
    );

    return (
        <main>
            <section className="page-header">
                <div className="container">
                    <span className="page-tag">Next Generation</span>
                    <h1>Student Programs & Research</h1>
                    <p className="page-lead">
                        Empowering students through rigorous internships, career development,
                        and cutting-edge research initiatives with long-term societal impact.
                    </p>
                </div>
            </section>

            {programCategories.length > 0 ? (
                programCategories.map((category, idx) => (
                    <section
                        key={category.id}
                        className={`service-category-section ${idx % 2 !== 0 ? 'bg-alt' : ''}`}
                    >
                        <div className="container">
                            <div className="category-header">
                                <span className="category-tag">{category.categoryTag}</span>
                                <h2>{category.category}</h2>
                                <p className="category-description">{category.categoryDescription}</p>
                            </div>

                            <div className="service-cards-grid">
                                {category.programs.map((program) => (
                                    <Link
                                        key={program.id}
                                        to={`/students/${program.id}`}
                                        className="service-card-minimal"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <div className="card-content-wrapper">
                                            <h3>{program.title}</h3>
                                            <p>{program.subtitle}</p>
                                            <div className="card-arrow">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="card-watermark">
                                            {category.id === 'research' ? 'RESEARCH' : 'CAREER'}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                ))
            ) : (
                <section className="empty-state-section">
                    <div className="container text-center">
                        <div className="empty-indicator">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#D2C7BB" strokeWidth="1">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                        </div>
                        <h2>Academic Portals Opening Soon</h2>
                        <p>We are currently finalizing our next batch of student programs and research fellowships. <br />Join our waiting list to be notified early.</p>
                        <a href="mailto:students@jivitsolutions.com" className="btn btn-outline" style={{ marginTop: '2rem' }}>Notify Me</a>
                    </div>
                </section>
            )}

            <section className="cta-section" style={{ padding: '100px 0', backgroundColor: 'var(--bg-main)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2>Ready to Launch Your Career?</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Apply for our student programs and research initiatives. Join a community
                        committed to growth, learning, and making a positive impact.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="mailto:students@jivitsolutions.com" className="btn btn-primary">Apply for Programs</a>
                        <a href="mailto:research@jivitsolutions.com" className="btn btn-outline">Join Research Team</a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Students;
