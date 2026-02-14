import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PremiumDetail from '../components/PremiumDetail';
import { adminService } from '../lib/adminService';

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await adminService.getServiceById(id);
                setService(data);
            } catch (error) {
                console.error('Error fetching service:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [id]);

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="premium-spinner"></div>
        </div>
    );

    if (!service) return (
        <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
            <h2>Service not found</h2>
            <Link to="/products-services" className="btn btn-outline" style={{ marginTop: '2rem' }}>Back to Services</Link>
        </div>
    );

    return (
        <PremiumDetail
            category={
                service.category === 'it-solutions' ? 'IT Infrastructure' :
                    service.category === 'wellness' ? 'Wellness Program' : 'Platform Enablement'
            }
            title={service.title}
            subtitle={service.subtitle}
            description={service.description}
            ctaText="Request Consultation"
            ctaAction={() => window.location.href = `mailto:hello@jivitsolutions.com?subject=Consultation for ${service.title}`}
            imagePrimary={service.image_url}
            imageSecondary={service.image_url}
            benefits={service.benefits} // Pass benefits array
        />
    );
};

export default ServiceDetail;
