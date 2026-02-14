import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Briefcase,
    Users,
    Settings,
    LogOut,
    ExternalLink
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdminSidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Overview', path: '/admin', icon: LayoutDashboard },
        { name: 'Services', path: '/admin/services', icon: Package },
        { name: 'Hiring Desk', path: '/admin/hiring', icon: Briefcase },
        { name: 'Applications', path: '/admin/applications', icon: Users },
    ];

    const handleLogout = async () => {
        localStorage.removeItem('jivit_mock_admin');
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-logo">
                <span className="logo-jiv">Jiv</span>
                <span className="logo-it">IT</span>
                <span className="logo-suffix">Admin</span>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <p className="section-label">Management</p>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>

                <div className="nav-section">
                    <p className="section-label">Preferences</p>
                    <Link to="/admin/settings" className={`nav-link ${isActive('/admin/settings') ? 'active' : ''}`}>
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </div>
            </nav>

            <div className="sidebar-footer">
                <Link to="/" target="_blank" className="nav-link external">
                    <ExternalLink size={18} />
                    <span>View Website</span>
                </Link>
                <button onClick={handleLogout} className="nav-link logout-btn">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>

            <style>{`
                .admin-sidebar {
                    width: 260px;
                    height: 100vh;
                    background: #111827;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    position: sticky;
                    top: 0;
                    border-right: 1px solid #1f2937;
                }
                .sidebar-logo {
                    padding: 2rem 1.5rem;
                    font-size: 1.5rem;
                    font-weight: 700;
                    border-bottom: 1px solid #1f2937;
                    margin-bottom: 1rem;
                }
                .logo-jiv { color: white; }
                .logo-it { color: #6366f1; }
                .logo-suffix { 
                    font-size: 0.8rem; 
                    background: #374151; 
                    padding: 0.2rem 0.5rem; 
                    border-radius: 4px; 
                    margin-left: 0.5rem;
                    font-weight: 500;
                }
                .sidebar-nav {
                    flex: 1;
                    padding: 0 1rem;
                }
                .nav-section {
                    margin-bottom: 2rem;
                }
                .section-label {
                    color: #9ca3af;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.75rem;
                    padding-left: 0.75rem;
                }
                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    color: #d1d5db;
                    text-decoration: none;
                    border-radius: 8px;
                    transition: all 0.2s;
                    font-size: 0.95rem;
                }
                .nav-link:hover {
                    background: #1f2937;
                    color: white;
                }
                .nav-link.active {
                    background: #6366f1;
                    color: white;
                    font-weight: 500;
                }
                .sidebar-footer {
                    padding: 1rem;
                    border-top: 1px solid #1f2937;
                }
                .logout-btn {
                    width: 100%;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    margin-top: 0.5rem;
                    text-align: left;
                }
                .logout-btn:hover {
                    color: #ef4444;
                }
                .nav-link.external {
                    color: #9ca3af;
                    font-size: 0.875rem;
                }
            `}</style>
        </aside>
    );
};

export default AdminSidebar;
