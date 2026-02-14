import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PremiumDetail from '../components/PremiumDetail';
import { adminService } from '../lib/adminService';

const StudentDetail = () => {
    const { id } = useParams();
    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const data = await adminService.getStudentProgramById(id);
                setProgram(data);
            } catch (error) {
                console.error('Error fetching program:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProgram();
    }, [id]);

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="premium-spinner"></div>
        </div>
    );

    if (!program) return (
        <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
            <h2>Program not found</h2>
            <Link to="/students" className="btn btn-outline" style={{ marginTop: '2rem' }}>Back to Programs</Link>
        </div>
    );

    return (
        <PremiumDetail
            category={program.category === 'research' ? 'Research Initiative' : 'Career Program'}
            title={program.title}
            subtitle={program.subtitle}
            description={program.description}
            ctaText="Apply Now"
            ctaAction={() => window.location.href = `mailto:students@jivitsolutions.com?subject=Application for ${program.title}`}
            imagePrimary={program.image_url}
            // Use same image or a fallback/secondary one if available for the cutout
            imageSecondary={program.image_url}
        />
    );
};

export default StudentDetail;
