import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    navigate('/login');
                    return;
                }

                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, [navigate]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="premium-spinner"></div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>My Profile</h1>

                <div className="profile-card" style={{
                    background: '#fff',
                    padding: '3rem',
                    borderRadius: '2px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            color: '#94a3b8'
                        }}>
                            {profile?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{profile?.full_name}</h2>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.75rem',
                                background: '#f1f5f9',
                                borderRadius: '99px',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: '#64748b'
                            }}>
                                {profile?.role || 'Member'}
                            </span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Account Details</h3>
                        <p style={{ color: '#64748b' }}>Manage your personal information and preferences.</p>
                        {/* Placeholder for future editable fields */}
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="btn btn-outline"
                        style={{ borderColor: '#ef4444', color: '#ef4444' }}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
