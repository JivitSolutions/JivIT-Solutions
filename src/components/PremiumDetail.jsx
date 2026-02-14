import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const PremiumDetail = ({
    category,
    title,
    subtitle,
    description,
    ctaText,
    ctaAction,
    imagePrimary,
    imageSecondary,
    benefits,
    backLink = "/",
}) => {
    const navigate = useNavigate();

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const floatImage = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.5, duration: 1 },
        },
    };

    return (
        <div
            className="premium-detail-page"
            style={{
                background: "#f3f4f6",
                minHeight: "100vh",
                width: "100%",
            }}
        >
            {/* SECTION WRAPPER */}
            <div
                className="content-scroller"
                style={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "120px 40px",
                }}
            >
                <motion.div
                    className="yacht-club-card"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        backgroundColor: "#ffffff",
                        width: "100%",
                        maxWidth: "1400px",
                        minHeight: "750px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1.2fr",
                        overflow: "hidden",
                    }}
                >
                    {/* LEFT COLUMN */}
                    <div
                        className="card-left-col"
                        style={{
                            padding: "100px 80px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        {/* Top Meta */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "80px",
                            }}
                        >
                            <motion.button
                                onClick={() => navigate(-1)}
                                whileHover={{ x: -5 }}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "#94a3b8",
                                }}
                            >
                                ← Back
                            </motion.button>

                            <span
                                style={{
                                    fontSize: "0.75rem",
                                    color: "#cbd5e1",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Founded in 2024
                            </span>
                        </div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.span
                                variants={fadeInUp}
                                style={{
                                    display: "block",
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.25em",
                                    textTransform: "uppercase",
                                    color: "#64748b",
                                    marginBottom: "2rem",
                                    fontWeight: 600,
                                }}
                            >
                                {category}
                            </motion.span>

                            <motion.h1
                                variants={fadeInUp}
                                style={{
                                    fontSize: "clamp(3rem, 4.5vw, 4.2rem)",
                                    lineHeight: 1.05,
                                    color: "#0f172a",
                                    fontFamily: "serif",
                                    fontWeight: 600,
                                    marginBottom: "1rem",
                                }}
                            >
                                {title}
                            </motion.h1>

                            {subtitle && (
                                <motion.h2
                                    variants={fadeInUp}
                                    style={{
                                        fontFamily: "Georgia, serif",
                                        fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
                                        fontStyle: "italic",
                                        color: "#64748b",
                                        marginBottom: "3rem",
                                    }}
                                >
                                    {subtitle}
                                </motion.h2>
                            )}

                            <motion.p
                                variants={fadeInUp}
                                style={{
                                    fontSize: "1.05rem",
                                    lineHeight: 1.8,
                                    color: "#475569",
                                    maxWidth: "520px",
                                    marginBottom: "3rem",
                                }}
                            >
                                {description}
                            </motion.p>

                            {/* BENEFITS */}
                            {benefits && benefits.length > 0 && (
                                <motion.div variants={fadeInUp} style={{ marginBottom: "3rem" }}>
                                    <h3
                                        style={{
                                            fontSize: "0.75rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.25em",
                                            color: "#94a3b8",
                                            marginBottom: "1.5rem",
                                        }}
                                    >
                                        Key Highlights
                                    </h3>

                                    <ul
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "0.8rem",
                                            listStyle: "none",
                                            padding: 0,
                                        }}
                                    >
                                        {benefits.map((benefit, index) => (
                                            <li
                                                key={index}
                                                style={{
                                                    background: "#f1f5f9",
                                                    padding: "10px 18px",
                                                    borderRadius: "100px",
                                                    fontSize: "0.85rem",
                                                    color: "#334155",
                                                }}
                                            >
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            <motion.div variants={fadeInUp}>
                                {ctaAction ? (
                                    <button onClick={ctaAction} className="yacht-btn">
                                        {ctaText || "Request Consultation"}
                                    </button>
                                ) : (
                                    <Link to="/contact" className="yacht-btn">
                                        {ctaText || "Request Consultation"}
                                    </Link>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div
                        className="card-right-col"
                        style={{
                            position: "relative",
                            background: "#ffffff",
                        }}
                    >
                        {/* Main Image */}
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${imagePrimary})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />

                        {/* Floating Secondary Image */}
                        {imageSecondary && (
                            <motion.div
                                variants={floatImage}
                                initial="hidden"
                                animate="visible"
                                className="floating-img-container"
                                style={{
                                    position: "absolute",
                                    bottom: "100px",
                                    left: "-70px",
                                    width: "300px",
                                    height: "380px",
                                    background: "#ffffff",
                                    padding: "12px",
                                    boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                                }}
                            >
                                <img
                                    src={imageSecondary}
                                    alt="Detail"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>

            <style>{`
        .yacht-btn {
          padding: 18px 45px;
          background: transparent;
          border: 1px solid #0f172a;
          color: #0f172a;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .yacht-btn:hover {
          background: #0f172a;
          color: #ffffff;
        }

        @media (max-width: 1024px) {
          .yacht-club-card {
            grid-template-columns: 1fr !important;
          }

          .card-right-col {
            height: 400px;
            order: -1;
          }

          .floating-img-container {
            display: none;
          }

          .card-left-col {
            padding: 60px 40px !important;
          }
        }

        @media (max-width: 768px) {
          .content-scroller {
            padding: 60px 20px !important;
          }

          .card-left-col {
            padding: 40px 20px !important;
          }
        }
      `}</style>
        </div>
    );
};

export default PremiumDetail;
