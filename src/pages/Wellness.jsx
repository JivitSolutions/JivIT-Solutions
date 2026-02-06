import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const Wellness = () => {
    return (
        <main className="wellness-page">
            <section className="page-header">
                <div className="container">
                    <motion.span
                        className="page-tag"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Sanctuary
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Inner Healing & <br /> Wellness Platform
                    </motion.h1>
                    <motion.p
                        className="page-lead"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Empowering independent practitioners and seekers on their journey of transformation.
                    </motion.p>
                </div>
            </section>

            <section className="content-block">
                <div className="container two-col-layout">
                    <motion.div className="philosophy-text" {...fadeInUp}>
                        <h2 className="section-title">For Practitioners</h2>
                        <p>
                            We provide a sophisticated digital stage for mindfulness coaches, yoga instructors, and alternative healers.
                            Our platform handles the technical complexity so you can focus on the human connection.
                        </p>
                        <ul className="wellness-list">
                            <li>Business visibility in a curated directory</li>
                            <li>Integrated booking and scheduling tools</li>
                            <li>Community of like-minded professionals</li>
                            <li>Digital enablement for global reach</li>
                        </ul>
                    </motion.div>
                    <motion.div
                        className="philosophy-image"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1350&q=80"
                            alt="Yoga and meditation"
                        />
                    </motion.div>
                </div>
            </section>

            <section className="content-block bg-light">
                <div className="container two-col-layout reverse">
                    <motion.div className="philosophy-text" {...fadeInUp}>
                        <h2 className="section-title">For Seekers</h2>
                        <p>
                            Discover transformative programs tailored to your personal growth. From meditation retreats to executive coaching,
                            find the guidance you need in a premium, secure digital environment.
                        </p>
                        <div className="hero-actions" style={{ marginTop: '2rem' }}>
                            <Link to="/contact" className="btn btn-primary">Book a Session</Link>
                        </div>
                    </motion.div>
                    <motion.div
                        className="philosophy-image"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: -0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1350&q=80"
                            alt="Calm nature scene"
                        />
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default Wellness;
