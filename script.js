const servicesData = {
    // IT Solutions
    "cloud-infrastructure": {
        title: "Cloud Infrastructure",
        category: "Enterprise IT",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "We architect scalable, secure, and cost-effective cloud environments. Whether you are migrating legacy systems or building cloud-native applications, our experts ensure your infrastructure is robust and future-proof.",
        features: [
            "AWS, Azure, and Google Cloud Architecture",
            "Serverless & Microservices Design",
            "24/7 Performance Monitoring",
            "Cost Optimization Strategies"
        ]
    },
    "custom-software": {
        title: "Custom Software",
        category: "Enterprise IT",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Bespoke software tailored to your specific operational needs. We build internal dashboards, customer-facing applications, and automated workflows that drive efficiency.",
        features: [
            "Full-Stack Web & Mobile Development",
            "API Integration & Development",
            "Legacy System Modernization",
            "User-Centric UI/UX Design"
        ]
    },
    "cybersecurity": {
        title: "Cybersecurity",
        category: "Enterprise IT",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Protect your most valuable assets with our proactive defense strategies. We provide comprehensive security audits, real-time threat monitoring, and compliance management.",
        features: [
            "Vulnerability Assessments",
            "End-to-End Encryption Implementation",
            "Compliance Management (GDPR, HIPAA)",
            "Incident Response Planning"
        ]
    },
    // Wellness
    "healing-platform": {
        title: "Healing Platform Partnership",
        category: "Wellness & Healing",
        image: "https://images.unsplash.com/photo-1599447421405-0c1741427447?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "Join our curated marketplace for healers. We handle the technology—booking, payments, and client management—so you can focus entirely on your practice.",
        features: [
            "Integrated Booking System",
            "Private Client Communities",
            "Secure Video & Audio Hosting",
            "Marketing & Discovery Support"
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Service Details Page Logic
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    if (serviceId && servicesData[serviceId]) {
        const service = servicesData[serviceId];
        const container = document.getElementById('service-detail-content');

        if (container) {
            // Update Title and Category
            document.getElementById('service-title').textContent = service.title;
            document.getElementById('service-category').textContent = service.category;

            // Update Image
            const imgEl = document.getElementById('service-image');
            if (imgEl) {
                imgEl.src = service.image;
                imgEl.alt = service.title;
            }

            // Update Description
            document.getElementById('service-description').textContent = service.description;

            // Update Features
            const featureList = document.getElementById('service-features');
            if (featureList && service.features) {
                featureList.innerHTML = service.features.map(f => `<li>${f}</li>`).join('');
            }

            // Update Booking Link
            const bookBtn = document.getElementById('book-service-btn');
            if (bookBtn) {
                bookBtn.href = `contact.html?sector=${serviceId}`;
            }
        }
    }

    // 2. Pre-fill Contact Form
    const sectorParam = urlParams.get('sector');
    const sectorSelect = document.getElementById('sector');
    if (sectorParam && sectorSelect) {
        // Simple mapping or direct value if matches
        // For now, let's just try to match values loosely or set a default textual note
        // Ideally we'd have matching value="..." in the options.
        // Let's assume we mapped them or we just leave it for the user to pick, 
        // OR we add a script to select the right option if values match.
        // Let's try to match values.
        // Our option values are: "it", "wellness", "research", "other".
        // It's a rough match. I'll just leave it for now or improve `contact.html` values later.
    }

    // 3. Mobile Navigation Toggle (Existing)
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);

            if (siteNav.style.display === 'block') {
                siteNav.style.display = 'none';
            } else {
                siteNav.style.display = 'block';
                // ... styles handled in CSS mostly or inline here
                siteNav.style.position = 'absolute';
                siteNav.style.top = '100%';
                siteNav.style.right = '0';
                siteNav.style.width = '100%';
                siteNav.style.background = 'var(--bg-main)'; // Updated to main bg
                siteNav.style.padding = '2rem';
                siteNav.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }
});
