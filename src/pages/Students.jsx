import { useState } from 'react';
import SidePanel from '../components/SidePanel';

const Students = () => {
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const programCategories = [
        {
            id: 'student-career',
            category: 'Student & Career Services',
            categoryTag: 'Development, Exposure & Growth',
            categoryDescription: 'Rigorous programs that bridge academic theory with real-world application in IT and wellness domains.',
            programs: [
                {
                    id: 1,
                    title: "Internship Programs",
                    subtitle: "IT & Wellness domain experience",
                    description: "Gain hands-on experience through our comprehensive internship programs spanning both technology and wellness sectors. Work on real projects, receive mentorship from industry experts, and build a portfolio that sets you apart.",
                    benefits: [
                        "6-12 month structured internship opportunities",
                        "Real-world project assignments in IT or Wellness",
                        "One-on-one mentorship from senior professionals",
                        "Exposure to enterprise-grade tools and methodologies",
                        "Portfolio development and case study documentation",
                        "Potential for full-time conversion upon graduation"
                    ]
                },
                {
                    id: 2,
                    title: "Career Guidance & Mentorship",
                    subtitle: "Navigate your professional journey",
                    description: "Receive personalized career guidance from professionals who understand the modern job market. Our mentors help you identify strengths, explore opportunities, and create actionable career plans.",
                    benefits: [
                        "One-on-one career counseling sessions",
                        "Personalized career pathway mapping",
                        "Resume and portfolio optimization",
                        "Interview preparation and mock interviews",
                        "Salary negotiation coaching",
                        "Long-term mentor relationships"
                    ]
                },
                {
                    id: 3,
                    title: "Industry Exposure Programs",
                    subtitle: "Real-world insights and networking",
                    description: "Connect with industry leaders, attend workshops, and participate in events that provide deep insights into how businesses operate. Build your professional network while still in school.",
                    benefits: [
                        "Guest lectures from industry practitioners",
                        "Company visits and facility tours",
                        "Tech talks and innovation showcases",
                        "Networking events and career fairs",
                        "Panel discussions on industry trends",
                        "Direct interaction with hiring managers"
                    ]
                },
                {
                    id: 4,
                    title: "Skill Development & Training",
                    subtitle: "Future-ready technical and soft skills",
                    description: "Develop both technical proficiency and essential soft skills through our comprehensive training programs. From coding bootcamps to communication workshops, we prepare you for career success.",
                    benefits: [
                        "Technical skill bootcamps (Web, Mobile, Data Science)",
                        "Soft skills workshops (Communication, Leadership)",
                        "Project management fundamentals",
                        "Design thinking and innovation training",
                        "Agile and modern development methodologies",
                        "Industry-recognized certifications"
                    ]
                },
                {
                    id: 5,
                    title: "Practical Learning & Project Experience",
                    subtitle: "Learning by doing",
                    description: "Apply theoretical knowledge to real-world problems through guided project work. Build tangible solutions, collaborate in teams, and experience the complete software development or wellness program lifecycle.",
                    benefits: [
                        "Real client projects with supervision",
                        "Team collaboration experience",
                        "End-to-end project delivery exposure",
                        "Code review and feedback sessions",
                        "Agile sprint participation",
                        "Deployment and production experience"
                    ]
                }
            ]
        },
        {
            id: 'research',
            category: 'Research & Innovation',
            categoryTag: 'Knowledge-Driven Public Good',
            categoryDescription: 'Conducting ethical, open research at the intersection of technology, mental health, and organizational efficiency.',
            programs: [
                {
                    id: 6,
                    title: "Research on Technology & Mental Health",
                    subtitle: "Exploring digital wellbeing intersections",
                    description: "Contribute to groundbreaking research examining how technology impacts mental health, and how digital tools can be designed to promote wellbeing rather than detract from it.",
                    benefits: [
                        "Participation in active research studies",
                        "Co-authorship opportunities on publications",
                        "Access to research datasets and methodologies",
                        "Collaboration with psychology and tech experts",
                        "Conference presentation opportunities",
                        "Contribution to evidence-based wellness tech"
                    ]
                },
                {
                    id: 7,
                    title: "Research on Organizational Efficiency",
                    subtitle: "Optimizing modern workplaces",
                    description: "Investigate how organizations can leverage technology, culture, and process improvements to achieve peak efficiency while maintaining employee wellbeing and satisfaction.",
                    benefits: [
                        "Study of real organizational case studies",
                        "Data analysis and quantitative research",
                        "Workflow optimization methodologies",
                        "Change management research",
                        "Technology adoption studies",
                        "Publication in academic and industry journals"
                    ]
                },
                {
                    id: 8,
                    title: "Open Research & Publications",
                    subtitle: "Contributing to public knowledge",
                    description: "All our research is published openly for public benefit. Join our team in creating knowledge resources that advance the fields of technology, wellness, and organizational science.",
                    benefits: [
                        "Open-access publication commitment",
                        "Research writing and editorial experience",
                        "Peer review process participation",
                        "Academic and industry collaboration",
                        "Citation and academic recognition",
                        "Building your research portfolio"
                    ]
                },
                {
                    id: 9,
                    title: "Industry–Academia Collaboration",
                    subtitle: "Bridging theory and practice",
                    description: "Work on collaborative research projects that bring together academic rigor and industry insights. Address real-world business challenges with evidence-based solutions.",
                    benefits: [
                        "Joint research projects with companies",
                        "Access to industry data and problems",
                        "Academic supervision and guidance",
                        "Practical application of research",
                        "Networking with both sectors",
                        "Funding and resource support"
                    ]
                },
                {
                    id: 10,
                    title: "Knowledge Sharing Initiatives",
                    subtitle: "Disseminating insights broadly",
                    description: "Help us share research findings through blogs, webinars, workshops, and public talks. Make complex research accessible to wider audiences and drive real-world impact.",
                    benefits: [
                        "Public speaking and presentation skills",
                        "Science communication training",
                        "Blog and article writing opportunities",
                        "Webinar hosting and facilitation",
                        "Community education programs",
                        "Building your thought leadership"
                    ]
                }
            ]
        }
    ];

    const handleProgramClick = (program) => {
        setSelectedProgram(program);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
        setTimeout(() => setSelectedProgram(null), 300);
    };

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

            {programCategories.map((category, idx) => (
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
                                <div
                                    key={program.id}
                                    className="service-card-minimal"
                                    onClick={() => handleProgramClick(program)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handleProgramClick(program);
                                        }
                                    }}
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
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

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

            {/* Side Panel */}
            {selectedProgram && (
                <SidePanel
                    isOpen={isPanelOpen}
                    onClose={handleClosePanel}
                    title={selectedProgram.title}
                    subtitle={selectedProgram.subtitle}
                    description={selectedProgram.description}
                    benefits={selectedProgram.benefits}
                    ctaText="Apply for Program"
                />
            )}
        </main>
    );
};

export default Students;
