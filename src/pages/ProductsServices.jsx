import { useState } from 'react';
import SidePanel from '../components/SidePanel';

const ProductsServices = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const serviceCategories = [
        {
            id: 'it-solutions',
            category: 'IT Solutions',
            categoryTag: 'Enterprise-Grade Technology',
            categoryDescription: 'Revenue-driving, scalable technology infrastructure for modern enterprises.',
            services: [
                {
                    id: 1,
                    title: "Strategic IT Consulting",
                    subtitle: "Aligning technology with business velocity",
                    description: "Transform your business with strategic technology roadmaps that align with your organizational goals. Our consultants bring deep expertise in enterprise architecture, digital transformation, and technology strategy to help you make informed decisions that drive growth.",
                    benefits: [
                        "Comprehensive technology assessment and gap analysis",
                        "Digital transformation roadmap development",
                        "Technology stack modernization strategies",
                        "Vendor management and technology selection",
                        "Risk mitigation and compliance planning",
                        "Long-term strategic partnership and advisory"
                    ]
                },
                {
                    id: 2,
                    title: "Software Development",
                    subtitle: "Custom solutions for unique challenges",
                    description: "Build powerful, scalable software tailored to your specific business needs. From concept to deployment, our development team delivers robust solutions using cutting-edge technologies and agile methodologies.",
                    benefits: [
                        "Full-stack custom software development",
                        "Agile development methodology",
                        "Modern tech stack (React, Node.js, Python, Java)",
                        "Microservices architecture design",
                        "API development and integration",
                        "Continuous deployment and DevOps practices"
                    ]
                },
                {
                    id: 3,
                    title: "Platform & Application Engineering",
                    subtitle: "Reliable, scalable platform architecture",
                    description: "Design and engineer platforms built for reliability, performance, and scale. We create robust application architectures that support your business growth while maintaining exceptional user experiences.",
                    benefits: [
                        "Scalable platform architecture design",
                        "High-availability system implementation",
                        "Performance optimization and tuning",
                        "Load balancing and auto-scaling",
                        "Database optimization and management",
                        "Real-time data processing capabilities"
                    ]
                },
                {
                    id: 4,
                    title: "Web Application Development",
                    subtitle: "Modern, responsive web experiences",
                    description: "Create stunning, high-performance web applications that engage users and drive conversions. Our team specializes in building responsive, accessible, and SEO-optimized web solutions.",
                    benefits: [
                        "Progressive Web Apps (PWA) development",
                        "Responsive and mobile-first design",
                        "React, Vue, and Angular expertise",
                        "SEO optimization and performance tuning",
                        "Cross-browser compatibility",
                        "Modern UI/UX implementation"
                    ]
                },
                {
                    id: 5,
                    title: "Cloud Architecture & Deployment",
                    subtitle: "Scalable cloud infrastructure solutions",
                    description: "Leverage the power of cloud computing with expertly designed and managed cloud infrastructure. We help you migrate, optimize, and scale your applications on AWS, Azure, and Google Cloud Platform.",
                    benefits: [
                        "Multi-cloud architecture and deployment",
                        "Cloud migration and modernization",
                        "Infrastructure as Code (Terraform, CloudFormation)",
                        "Serverless architecture implementation",
                        "Cost optimization strategies",
                        "24/7 cloud infrastructure monitoring"
                    ]
                },
                {
                    id: 6,
                    title: "Cybersecurity & Digital Security",
                    subtitle: "Fortifying your digital assets",
                    description: "Protect your business with enterprise-grade security solutions. Our cybersecurity experts implement comprehensive security strategies to safeguard your data, applications, and infrastructure.",
                    benefits: [
                        "Security audit and vulnerability assessment",
                        "Penetration testing and threat modeling",
                        "Data encryption and secure authentication",
                        "Compliance management (GDPR, HIPAA, SOC 2)",
                        "Security monitoring and incident response",
                        "Employee security awareness training"
                    ]
                },
                {
                    id: 7,
                    title: "IT Infrastructure Support",
                    subtitle: "Reliable, proactive infrastructure management",
                    description: "Keep your IT infrastructure running smoothly with our comprehensive support services. We provide proactive monitoring, maintenance, and rapid issue resolution to minimize downtime.",
                    benefits: [
                        "24/7 infrastructure monitoring and support",
                        "Network management and optimization",
                        "Server administration and maintenance",
                        "Backup and disaster recovery planning",
                        "Hardware and software lifecycle management",
                        "Help desk and end-user support"
                    ]
                },
                {
                    id: 8,
                    title: "Scalable & Secure System Design",
                    subtitle: "Future-proof technology foundations",
                    description: "Build systems designed to grow with your business. We architect scalable, secure solutions that accommodate increasing demands while maintaining performance and reliability.",
                    benefits: [
                        "Distributed system architecture",
                        "Horizontal and vertical scaling strategies",
                        "Security-first design principles",
                        "Fault-tolerant system implementation",
                        "Performance benchmarking and optimization",
                        "Technical documentation and knowledge transfer"
                    ]
                }
            ]
        },
        {
            id: 'wellness',
            category: 'Wellness & Healing Services',
            categoryTag: 'Digital Platform & Ecosystem',
            categoryDescription: 'Empowering personal growth, balance, and transformation through technology-enabled wellness experiences.',
            services: [
                {
                    id: 9,
                    title: "Inner Healing Programs",
                    subtitle: "Guided journeys toward emotional wholeness",
                    description: "Discover transformative healing programs designed to help you process emotions, release trauma, and cultivate inner peace. Our certified practitioners guide you through evidence-based techniques in a safe, supportive environment.",
                    benefits: [
                        "Trauma-informed healing approaches",
                        "Emotional release and processing techniques",
                        "Personalized healing journey mapping",
                        "Safe, non-clinical support environment",
                        "Integration of mind-body practices",
                        "Ongoing progress tracking and support"
                    ]
                },
                {
                    id: 10,
                    title: "Wellness & Mindfulness Programs",
                    subtitle: "Cultivating presence and balance",
                    description: "Learn mindfulness practices that reduce stress, improve focus, and enhance overall well-being. Our programs combine meditation, breathwork, and mindful living techniques for sustainable lifestyle change.",
                    benefits: [
                        "Guided meditation and breathwork sessions",
                        "Stress reduction techniques",
                        "Mindful living practices",
                        "Digital resources and mobile app access",
                        "Community support and group sessions",
                        "Progress tracking and personalized insights"
                    ]
                },
                {
                    id: 11,
                    title: "Personal Transformation Coaching",
                    subtitle: "Unlock your fullest potential",
                    description: "Work one-on-one with certified transformation coaches who help you clarify goals, overcome obstacles, and create lasting positive change in your personal and professional life.",
                    benefits: [
                        "Personalized coaching sessions",
                        "Goal setting and accountability",
                        "Limiting belief identification and reframing",
                        "Habit formation and behavior change",
                        "Life purpose and values exploration",
                        "Confidential, judgment-free support"
                    ]
                },
                {
                    id: 12,
                    title: "Mental Wellbeing Support",
                    subtitle: "Non-clinical mental health guidance",
                    description: "Access compassionate support for mental clarity, emotional resilience, and psychological well-being. Our programs complement professional therapy but are non-clinical in nature.",
                    benefits: [
                        "Peer support and community connection",
                        "Coping strategies for daily challenges",
                        "Emotional regulation techniques",
                        "Self-care planning and implementation",
                        "Mental health education resources",
                        "Referral network to licensed professionals"
                    ]
                },
                {
                    id: 13,
                    title: "Holistic Healing Practices",
                    subtitle: "Integrating ancient wisdom with modern science",
                    description: "Explore holistic modalities including energy healing, Ayurveda, traditional practices, and integrative approaches to health and wellness guided by experienced practitioners.",
                    benefits: [
                        "Energy healing and chakra balancing",
                        "Ayurvedic wellness consultations",
                        "Yoga and movement therapy",
                        "Sound healing and vibrational medicine",
                        "Nutrition and lifestyle guidance",
                        "Personalized holistic wellness plans"
                    ]
                },
                {
                    id: 14,
                    title: "Digital Enablement for Wellness Practitioners",
                    subtitle: "Technology platform for independent healers",
                    description: "Empower your wellness practice with our digital platform. Reach more clients, manage bookings, and grow your business with tools designed specifically for wellness professionals.",
                    benefits: [
                        "Professional profile and online presence",
                        "Booking and scheduling management",
                        "Client relationship management tools",
                        "Digital payment processing",
                        "Marketing and visibility support",
                        "Practice analytics and insights"
                    ]
                },
                {
                    id: 15,
                    title: "Community-based Wellness Initiatives",
                    subtitle: "Collective healing and growth",
                    description: "Join a supportive community of individuals committed to wellness and personal growth. Participate in group programs, workshops, and events that foster connection and shared transformation.",
                    benefits: [
                        "Group workshops and programs",
                        "Wellness events and retreats",
                        "Online community platform access",
                        "Peer support circles",
                        "Shared learning resources",
                        "Collaborative healing experiences"
                    ]
                }
            ]
        },
        {
            id: 'platform-enablement',
            category: 'Platform Enablement for Small-Scale Businesses',
            categoryTag: 'Long-term Vision Initiative',
            categoryDescription: 'Empowering small businesses and independent professionals with accessible, scalable technology.',
            services: [
                {
                    id: 16,
                    title: "Digital Enablement for Small Businesses",
                    subtitle: "Technology without enterprise complexity",
                    description: "Access enterprise-grade technology solutions tailored for small business needs and budgets. We help you establish a strong digital presence and operational efficiency without the complexity.",
                    benefits: [
                        "Website and digital presence setup",
                        "Business process automation",
                        "CRM and productivity tools",
                        "Digital marketing foundations",
                        "E-commerce enablement",
                        "Affordable, scalable solutions"
                    ]
                },
                {
                    id: 17,
                    title: "Technology Support for Independent Professionals",
                    subtitle: "Empowering solo practitioners",
                    description: "Get the technology support you need to run your independent practice efficiently. From booking systems to client management, we provide tools that help you focus on your craft.",
                    benefits: [
                        "Practice management software",
                        "Online booking and scheduling",
                        "Client communication tools",
                        "Document and contract management",
                        "Payment processing integration",
                        "Mobile-friendly solutions"
                    ]
                },
                {
                    id: 18,
                    title: "Platform Visibility for Wellness & Service Providers",
                    subtitle: "Reach your ideal clients",
                    description: "Gain visibility on our curated platform connecting service providers with clients seeking authentic, high-quality services. Build your reputation and grow your client base organically.",
                    benefits: [
                        "Verified provider profiles",
                        "Category-specific visibility",
                        "Client reviews and ratings",
                        "Lead generation support",
                        "SEO-optimized listings",
                        "Analytics and performance tracking"
                    ]
                },
                {
                    id: 19,
                    title: "Business Growth through IT Infrastructure",
                    subtitle: "Scale without technical debt",
                    description: "Build a solid IT foundation that supports your business growth. We help you implement systems and infrastructure that scale efficiently as your business expands.",
                    benefits: [
                        "Scalable IT infrastructure planning",
                        "Cloud-based business systems",
                        "Data security and backup solutions",
                        "Growth-oriented technology roadmap",
                        "Cost-effective tool selection",
                        "Ongoing technical guidance"
                    ]
                }
            ]
        }
    ];

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
        setTimeout(() => setSelectedService(null), 300);
    };

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

            {serviceCategories.map((category, idx) => (
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
                                <div
                                    key={service.id}
                                    className="service-card-minimal"
                                    onClick={() => handleServiceClick(service)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handleServiceClick(service);
                                        }
                                    }}
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
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* Side Panel */}
            {selectedService && (
                <SidePanel
                    isOpen={isPanelOpen}
                    onClose={handleClosePanel}
                    title={selectedService.title}
                    subtitle={selectedService.subtitle}
                    description={selectedService.description}
                    benefits={selectedService.benefits}
                    ctaText="Request Consultation"
                />
            )}
        </main>
    );
};

export default ProductsServices;
