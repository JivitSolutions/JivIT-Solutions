import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (signUpError) throw signUpError;

            // Create profile
            if (data?.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: data.user.id,
                            full_name: fullName,
                            role: 'viewer', // Default role
                        }
                    ]);

                if (profileError) {
                    console.error("Error creating profile:", profileError);
                }
            }

            navigate('/login');

        } catch (err) {
            console.error("Registration error:", err);

            // Handle Supabase Rate Limits Gracefully for Dev
            if (err.message && err.message.toLowerCase().includes('rate limit')) {
                setError("Dev Warning: Email rate limit exceeded. Redirecting to login (Mock Success)...");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                return;
            }

            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-split">
            {/* Left Side: Visual */}
            <div className="login-visual">
                <div className="visual-overlay"></div>
                <div className="visual-content">
                    <h2>Join the<br />Evolution.</h2>
                    <p>Create an account to access premium IT solutions and wellness resources.</p>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Abstract Tech"
                    className="bg-image"
                />
            </div>

            {/* Right Side: Form */}
            <div className="login-form-container">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="back-button"
                    aria-label="Go back"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                </button>

                <div className="form-wrapper">
                    <h3>Create Account</h3>
                    <p className="form-subtext">Enter your details to register.</p>

                    <form onSubmit={handleRegister} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                placeholder="Your Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        {error && <p className="error-text" style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

                        {/* Spacer to match Login's form-actions gap */}
                        <div style={{ marginBottom: '2rem' }}></div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        <div className="form-footer">
                            <p>Already have an account? <Link to="/login">Sign In</Link></p>
                        </div>

                        {/* <div className="login-hint" style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666', borderLeft: '3px solid #007bff', paddingLeft: '10px', background: '#f8f9fa', padding: '10px' }}>
                            <strong>Dev Note:</strong> Use Login page with:<br />
                            <strong>Admin:</strong> admin@jivit.com / admin1003<br />
                            <strong>User:</strong> user@jivit.com / user123
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
