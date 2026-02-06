import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SidePanel = ({ isOpen, onClose, title, subtitle, description, benefits, ctaText = "Book Consultation" }) => {
    // Handle ESC key to close panel
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when panel is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);


    if (!isOpen) return null;

    return (
        <>
            {/* Overlay with blur effect */}
            <div className="modal-overlay" onClick={onClose}></div>

            {/* Centered Modal Panel */}
            <div className="modal-panel">
                {/* Close Button */}
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Modal Content */}
                <div className="modal-content">
                    {subtitle && <span className="modal-tag">{subtitle}</span>}
                    <h2 className="modal-title">{title}</h2>

                    {description && (
                        <div className="modal-description">
                            <p>{description}</p>
                        </div>
                    )}

                    {benefits && benefits.length > 0 && (
                        <div className="modal-benefits">
                            <h3>Key Benefits & Features</h3>
                            <ul>
                                {benefits.map((benefit, idx) => (
                                    <li key={idx}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* CTA Button */}
                    <div className="modal-cta">
                        <Link to="/contact" className="btn btn-primary btn-block">
                            {ctaText}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidePanel;
