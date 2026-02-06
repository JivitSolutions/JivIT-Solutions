import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        sector: '',
        date: '',
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your inquiry. We will get back to you soon.');
        // Reset form
        setFormData({
            name: '',
            email: '',
            sector: '',
            date: '',
            message: ''
        });
    };

    return (
        <main>
            {/* Hero Header */}
            <section className="contact-header">
                <div className="container">
                    <span className="page-tag">Connect</span>
                    <h1>Let's Build Something Remarkable</h1>
                    <p className="page-lead">
                        Whether you're seeking enterprise IT solutions or wellness platform partnerships,
                        we're here to transform your vision into reality.
                    </p>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-layout">
                        {/* Left: Contact Information */}
                        <div className="contact-info">
                            <h2>Get In Touch</h2>
                            <p className="contact-intro">
                                Our team is ready to discuss your project and explore how we can help
                                you achieve your goals.
                            </p>

                            <div className="info-items">
                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3>Email</h3>
                                        <p>hello@jivitsolutions.com</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3>Headquarters</h3>
                                        <p>123 Innovation Drive<br />Tech Valley, CA 94043</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3>Business Hours</h3>
                                        <p>Mon – Fri: 9:00 AM - 6:00 PM EST<br />Weekend: By Appointment</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="contact-form-wrapper">
                            <form onSubmit={handleSubmit} className="appointment-form">
                                <h3>Request a Consultation</h3>
                                <p className="form-intro">Fill out the form below and we'll respond within 24 hours.</p>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name*</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address*</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="sector">Service Interest*</label>
                                        <div className="select-wrapper">
                                            <select id="sector" value={formData.sector} onChange={handleChange} required>
                                                <option value="" disabled>Select a Service</option>
                                                <option value="it">IT Solutions & Consulting</option>
                                                <option value="wellness">Wellness Platform Partnership</option>
                                                <option value="research">Research Collaboration</option>
                                                <option value="careers">Career Opportunities</option>
                                                <option value="other">Other Inquiry</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Preferred Meeting Date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Project Details*</label>
                                    <textarea
                                        id="message"
                                        rows="6"
                                        placeholder="Tell us about your project, goals, and any specific requirements..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;
