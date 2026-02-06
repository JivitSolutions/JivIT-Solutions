import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
    initial: {},
    whileInView: {
        transition: {
            staggerChildren: 0.15
        }
    },
    viewport: { once: true }
};

import heroEarth from "../assets/hero_earth_editorial.png";

const Home = () => {
    const { scrollY } = useScroll();
    const earthRotate = useTransform(scrollY, [0, 1000], [0, 15]); // Subtle rotation
    const earthY = useTransform(scrollY, [0, 1000], [0, 100]); // Parallax drift

    return (
        <div className="home-wrapper">
            {/* ================= HERO SECTION ================= */}
            <section className="hero-premium">
                <div className="container hero-grid">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.span
                            className="hero-badge"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Global Technology & Transformation
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Orchestrating <br />
                            Digital <span className="gradient-text">Future</span> & <br />
                            <span className="gradient-text">Human Potential</span>
                        </motion.h1>

                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            JivIT Solutions bridges the gap between enterprise-grade engineering
                            and holistic human growth. We build resilient platforms and empower
                            thriving organizations.
                        </motion.p>

                        <motion.div
                            className="hero-cta"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Link to="/products-services" className="btn btn-primary">
                                Explore IT Solutions
                            </Link>
                            <Link to="/products-services" className="btn btn-outline">
                                Discover Wellness
                            </Link>
                        </motion.div>

                        <motion.div
                            className="hero-stats"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <div className="stat-item">
                                <h3>Global</h3>
                                <p>Reach</p>
                            </div>
                            <div className="stat-item">
                                <h3>Enterprise</h3>
                                <p>Standards</p>
                            </div>
                            <div className="stat-item">
                                <h3>Holistic</h3>
                                <p>Impact</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* VISUAL */}
                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                    >
                        <div className="visual-card">
                            <img
                                src={heroEarth}
                                alt="Earth from space"
                                className="earth-image"
                                loading="eager"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ================= DUAL MISSION SHOWCASE ================= */}
            <section className="mission-showcase">
                <div className="container">
                    <motion.div className="section-header" {...fadeInUp}>
                        <span className="section-label">Our Dual Mission</span>
                        <h2>Two Pillars, One Vision</h2>
                        <p className="section-description">
                            We bridge the digital and the personal, combining enterprise-grade
                            IT solutions with transformative wellness services.
                        </p>
                    </motion.div>

                    <div className="mission-grid">
                        {/* IT Solutions Pillar */}
                        <motion.div className="mission-card it-pillar" {...fadeInUp}>
                            <div className="mission-image">
                                <img
                                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                                    alt="Technology and digital innovation"
                                />
                                <div className="mission-overlay"></div>
                            </div>
                            <div className="mission-content">
                                <span className="mission-tag">Digital Excellence</span>
                                <h3>Enterprise IT Solutions</h3>
                                <p>
                                    From cloud architecture to custom software development, we deliver
                                    scalable, secure, and sophisticated technology infrastructure for
                                    modern businesses.
                                </p>
                                <ul className="mission-features">
                                    <li>Strategic Technology Consulting</li>
                                    <li>Custom Platform Development</li>
                                    <li>Cloud Infrastructure & DevOps</li>
                                    <li>Cybersecurity & Compliance</li>
                                </ul>
                                <Link to="/products-services" className="text-link">
                                    Explore IT Services →
                                </Link>
                            </div>
                        </motion.div>

                        {/* Wellness Pillar */}
                        <motion.div
                            className="mission-card wellness-pillar"
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.2 }}
                        >
                            <div className="mission-image">
                                <img
                                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
                                    alt="Mindfulness and inner peace"
                                />
                                <div className="mission-overlay wellness-overlay"></div>
                            </div>
                            <div className="mission-content">
                                <span className="mission-tag wellness-tag">Inner Evolution</span>
                                <h3>Wellness & Transformation</h3>
                                <p>
                                    A dedicated platform for healers, coaches, and wellness professionals.
                                    We empower holistic practice owners to reach clients and transform lives.
                                </p>
                                <ul className="mission-features">
                                    <li>Mindfulness & Meditation Programs</li>
                                    <li>Life & Wellness Coaching</li>
                                    <li>Holistic Health Practitioners</li>
                                    <li>Personal Transformation Journeys</li>
                                </ul>
                                <Link to="/products-services" className="text-link">
                                    Explore Wellness Services →
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= HOW WE WORK ================= */}
            <section className="process-section">
                <div className="container">
                    <motion.div className="section-header centered" {...fadeInUp}>
                        <span className="section-label">Our Approach</span>
                        <h2>Excellence in Every Step</h2>
                    </motion.div>

                    <motion.div
                        className="process-grid"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                    >
                        {[
                            {
                                number: "01",
                                title: "Discovery & Strategy",
                                description: "We begin by understanding your unique challenges, goals, and vision.",

                            },
                            {
                                number: "02",
                                title: "Design & Development",
                                description: "Our team crafts tailored solutions with precision and creativity.",

                            },
                            {
                                number: "03",
                                title: "Launch & Scale",
                                description: "We deploy, monitor, and continuously optimize for peak performance.",

                            },
                            {
                                number: "04",
                                title: "Support & Growth",
                                description: "Long-term partnership ensuring your sustained success.",

                            }
                        ].map((step) => (
                            <motion.div key={step.number} className="process-card" variants={fadeInUp}>
                                <div className="process-icon">{step.icon}</div>
                                <span className="process-number">{step.number}</span>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ================= WELLNESS IMAGE SECTION ================= */}
            <section className="wellness-visual">
                <div className="container">
                    <div className="wellness-grid">
                        <motion.div className="wellness-content" {...fadeInUp}>
                            <span className="section-label wellness-label">Holistic Balance</span>
                            <h2>Nurturing Mind, Body & Spirit</h2>
                            <p>
                                Our wellness platform connects you with certified practitioners who guide
                                your journey toward inner peace, mental clarity, and holistic well-being.
                            </p>
                            <p>
                                Whether you're seeking mindfulness coaching, life transformation programs,
                                or holistic health guidance, we curate experiences that honor your unique path.
                            </p>
                            <Link to="/wellness" className="btn btn-outline">
                                Explore Wellness Services
                            </Link>
                        </motion.div>

                        <motion.div
                            className="wellness-images"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="wellness-image-grid">
                                <div className="wellness-img large">
                                    <img
                                        src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80"
                                        alt="Meditation and mindfulness"
                                    />
                                </div>
                                <div className="wellness-img small">
                                    <img
                                        src="https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=400&q=80"
                                        alt="Yoga and balance"
                                    />
                                </div>
                                <div className="wellness-img small">
                                    <img
                                        src="https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&w=400&q=80"
                                        alt="Nature and serenity"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= STUDENTS & RESEARCH ================= */}
            <section className="future-section">
                <div className="container">
                    <motion.div className="section-header centered" {...fadeInUp}>
                        <span className="section-label">Empowering the Future</span>
                        <h2>Students & Research</h2>
                        <p className="section-description">
                            We invest in the next generation through rigorous internships and
                            open research initiatives.
                        </p>
                    </motion.div>

                    <div className="future-grid">
                        <motion.div className="future-card" {...fadeInUp}>
                            <div className="future-image">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                                    alt="Students collaborating"
                                />
                            </div>
                            <div className="future-content">
                                <h3>Student Internship Program</h3>
                                <p>
                                    Hands-on experience in real-world projects. We mentor students
                                    in both IT and wellness domains, preparing them for impactful careers.
                                </p>
                                <Link to="/students" className="btn btn-outline">
                                    Apply Now
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            className="future-card"
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.2 }}
                        >
                            <div className="future-image">
                                <img
                                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                                    alt="Research and innovation"
                                />
                            </div>
                            <div className="future-content">
                                <h3>Open Research Initiative</h3>
                                <p>
                                    Publishing insights on technology, mental health, and organizational
                                    efficiency. Our research contributes to public knowledge.
                                </p>
                                <Link to="/students" className="text-link">
                                    View our findings →
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= CTA SECTION ================= */}
            <section className="cta-final">
                <div className="container">
                    <motion.div className="cta-content" {...fadeInUp}>
                        <h2>Elevating Enterprises, Empowering Evolution</h2>
                        <p>
                            Whether you need enterprise IT solutions or personal wellness guidance,
                            we're here to support your journey.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn btn-primary btn-large">
                                Get in Touch
                            </Link>
                            <Link to="/" className="btn btn-outline btn-large">
                                Learn More About Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
