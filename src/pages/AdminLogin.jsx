import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Developer Bypass for Local Testing
        if (email === 'admin@jivit.com' && password === 'admin1009') {
            console.log('Developer login active');
            localStorage.setItem('jivit_mock_admin', 'true');
            // Mock a successful login behavior
            setTimeout(() => {
                navigate('/admin');
                setLoading(false);
            }, 500);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;

            // Check if user is admin
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', data.user.id)
                .single();

            if (profile?.role === 'admin') {
                navigate('/admin');
            } else {
                setError("Access Denied: You do not have administrative privileges.");
                await supabase.auth.signOut();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-split">
            {/* Left Side: Visual (Dark Theme for Admin) */}
            <div className="login-visual" style={{ background: '#0f172a' }}>
                <div className="visual-overlay" style={{ background: 'rgba(15, 23, 42, 0.8)' }}></div>
                <div className="visual-content">
                    <h2 style={{ color: '#fff' }}>Command Center.</h2>
                    <p style={{ color: '#94a3b8' }}>Secure access for system administrators and authorized personnel only.</p>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Server Room"
                    className="bg-image"
                    style={{ opacity: 0.4 }}
                />
            </div>

            {/* Right Side: Form */}
            <div className="login-form-container" style={{ background: '#f8fafc' }}>
                <div className="form-wrapper" style={{ marginTop: '0' }}>
                    <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '8px', height: '8px', background: '#e11d48', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b' }}>Restricted Access</span>
                    </div>

                    <h3 style={{ color: '#0f172a' }}>Admin Portal</h3>
                    <p className="form-subtext" style={{ color: '#64748b' }}>Verify your credentials to continue.</p>

                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email" style={{ color: '#475569' }}>Admin Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="admin@jivit.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ background: '#fff', borderColor: '#cbd5e1' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" style={{ color: '#475569' }}>Secure Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ background: '#fff', borderColor: '#cbd5e1' }}
                            />
                        </div>

                        {error && <p className="error-text" style={{ color: '#e11d48', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 500 }}>{error}</p>}

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={loading}
                            style={{ background: '#0f172a', borderColor: '#0f172a' }}
                        >
                            {loading ? 'Authenticating...' : 'Access Dashboard'}
                        </button>

                        <div className="form-footer">
                            <Link to="/" style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'none' }}>← Return to Site</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
