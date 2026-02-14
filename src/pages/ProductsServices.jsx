import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../lib/adminService';

const ProductsServices = () => {
    const [serviceCategories, setServiceCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadServices = async () => {
            try {
                // Parallel fetch for speed
                const [data, settings] = await Promise.all([
                    adminService.getServices(),
                    adminService.getSettings()
                ]);

                if (!isMounted) return;

                const categoryConfig = settings.service_categories || [
                    { id: 'it-solutions', label: 'IT Solutions', tag: 'Enterprise-Grade', desc: 'Scalable technology infrastructure.' },
                    { id: 'wellness', label: 'Wellness', tag: 'Healing Ecosystem', desc: 'Empowering personal growth.' },
                    { id: 'platform-enablement', label: 'Platform Enablement', tag: 'Business Growth', desc: 'Empowering small businesses.' }
                ];

                const groups = {};
                // Initialize groups
                categoryConfig.forEach(cat => {
                    groups[cat.id] = {
                        id: cat.id,
                        category: cat.label,
                        categoryTag: cat.tag,
                        categoryDescription: cat.desc,
                        services: []
                    };
                });

                if (data && Array.isArray(data)) {
                    data.forEach(service => {
                        const catId = service.category || 'it-solutions';
                        // Dynamically create category group if it doesn't exist
                        if (!groups[catId]) {
                            groups[catId] = {
                                id: catId,
                                category: catId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                                categoryTag: 'Specialized Service',
                                categoryDescription: 'Tailored solutions for your business.',
                                services: []
                            };
                        }
                        groups[catId].services.push(service);
                    });
                }

                setServiceCategories(Object.values(groups).filter(g => g.services.length > 0));
            } catch (error) {
                console.error('Data Fetch Error:', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadServices();

        return () => { isMounted = false; };
    }, []);

    if (loading) return (
        <div className="loading-state-full">
            <div className="premium-spinner"></div>
            <p>Curating Digital Experiences...</p>
        </div>
    );

    return (
        <main>
            <section className="page-header">
                <div className="container">
                    <span className="page-tag">Our Platform</span>
                    <h1>Products & Services</h1>
                    <p className="page-lead">
                        A comprehensive, multi-domain service ecosystem spanning enterprise IT,
                        wellness platforms, and small business enablement.
                    </p>
                </div>
            </section>

            {serviceCategories.length > 0 ? (
                serviceCategories.map((category, idx) => (
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
                                {category.services.map((service) => (
                                    <Link
                                        key={service.id}
                                        to={`/services/${service.id}`}
                                        className="service-card-minimal"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <div className="card-content-wrapper">
                                            <h3>{service.title}</h3>
                                            <p>{service.subtitle}</p>
                                            <div className="card-arrow">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="card-watermark">
                                            {category.id === 'it-solutions' ? 'INNOVATION' :
                                                category.id === 'wellness' ? 'WELLNESS' : 'PLATFORM'}
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
                        <h2>Refining Our Portfolio</h2>
                        <p>We are currently updating our service catalog with new enterprise-grade offerings. <br />Please check back shortly or contact our team for immediate inquiries.</p>
                        <Link to="/contact" className="btn btn-outline" style={{ marginTop: '2rem' }}>Get in Touch</Link>
                    </div>
                </section>
            )}
        </main>
    );
};

export default ProductsServices;
