import { useState, useEffect } from 'react';
import { adminService } from '../../lib/adminService';
import { useAdmin } from '../../hooks/useAdmin';
import {
    LayoutDashboard,
    Briefcase,
    GraduationCap,
    Package,
    Users,
    Activity,
    Plus,
    ChevronRight,
    Search,
    AlertCircle,
    CheckCircle2,
    Clock,
    TrendingUp,
    Database,
    Zap,
    RefreshCw
} from 'lucide-react';

const Dashboard = () => {
    const { profile } = useAdmin();
    const [stats, setStats] = useState({
        services: 0,
        published_services: 0,
        jobs: 0,
        published_jobs: 0,
        applications: 0,
        new_applications: 0,
        recentLogs: [],
        system_status: 'operational'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch individually to prevent one failure from blocking everything
                const servicesData = await adminService.getServices(true).catch(() => []);
                const jobsData = await adminService.getJobOpenings(true).catch(() => []);
                const applicationsData = await adminService.getApplications().catch(() => []);
                const logsData = await adminService.getActivityLogs(8).catch(() => []);

                setStats({
                    services: servicesData.length,
                    published_services: servicesData.filter(s => s.status === 'published').length,
                    jobs: jobsData.length,
                    published_jobs: jobsData.filter(j => j.status === 'published').length,
                    applications: applicationsData.length,
                    new_applications: applicationsData.filter(a => a.status === 'new').length,
                    recentLogs: logsData,
                    system_status: 'operational'
                });
            } catch (error) {
                console.error('Critical Dashboard Error:', error);
                setStats(prev => ({ ...prev, system_status: 'degraded' }));
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const biCards = [
        {
            title: 'Business Offerings',
            main: stats.services,
            sub: `${stats.published_services} Live`,
            icon: Package,
            color: '#4A5D73',
            trend: '+12%',
            link: '/admin/services'
        },
        {
            title: 'Hiring Pipeline',
            main: stats.jobs,
            sub: `${stats.published_jobs} Open Roles`,
            icon: Briefcase,
            color: '#4A5D73',
            trend: 'Active',
            link: '/admin/hiring'
        },
        {
            title: 'Talent Intake',
            main: stats.applications,
            sub: `${stats.new_applications} Unread`,
            icon: Users,
            color: '#4A5D73',
            trend: 'New',
            link: '/admin/applications'
        },
    ];

    if (loading) return (
        <div className="admin-dashboard-loading">
            <RefreshCw className="animate-spin" size={32} />
            <p>Initiating Command Center...</p>
        </div>
    );

    return (
        <div className="command-center">
            {/* Top Bar / Header */}
            <header className="cc-header">
                <div className="header-greeting">
                    <p className="cc-breadcrumb">Management Dashboard / Overview</p>
                    <h1>Command Center</h1>
                    <p className="cc-welcome">Welcome back, {profile?.full_name?.split(' ')[0] || 'Admin'}. System performance is optimal.</p>
                </div>

                <div className="cc-system-health">
                    <div className={`health-badge ${stats.system_status}`}>
                        <Database size={14} />
                        <span>Supabase {stats.system_status}</span>
                    </div>
                    <div className="cc-current-time">
                        <Clock size={14} />
                        <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                </div>
            </header>

            {/* High-Level BI Grid */}
            <section className="cc-bi-grid">
                {biCards.map((card, idx) => (
                    <div key={idx} className="bi-card" onClick={() => window.location.href = card.link}>
                        <div className="bi-top">
                            <div className="bi-icon" style={{ backgroundColor: `${card.color}10` }}>
                                <card.icon size={22} color={card.color} />
                            </div>
                            <span className="bi-trend">{card.trend}</span>
                        </div>
                        <div className="bi-content">
                            <p className="bi-label">{card.title}</p>
                            <h2 className="bi-value">{card.main}</h2>
                            <p className="bi-sub">{card.sub}</p>
                        </div>
                        <div className="bi-action">
                            <span>Manage</span>
                            <ChevronRight size={14} />
                        </div>
                    </div>
                ))}
            </section>

            <div className="cc-main-grid">
                {/* Productive Workflow Section */}
                <div className="cc-column left">
                    <section className="cc-workflow-card">
                        <div className="card-header-cc">
                            <div className="header-title">
                                <Zap size={18} className="text-accent" />
                                <h2>Quick Workflow</h2>
                            </div>
                        </div>
                        <div className="workflow-buttons">
                            <button onClick={() => window.location.href = '/admin/services'} className="workflow-item">
                                <div className="wf-icon"><Plus size={18} /></div>
                                <div className="wf-text">
                                    <p>New Service</p>
                                    <span>Expand business portfolio</span>
                                </div>
                            </button>
                            <button onClick={() => window.location.href = '/admin/hiring'} className="workflow-item">
                                <div className="wf-icon"><Briefcase size={18} /></div>
                                <div className="wf-text">
                                    <p>Post Job</p>
                                    <span>Grow your specialized team</span>
                                </div>
                            </button>
                            <button onClick={() => window.location.href = '/admin/applications'} className="workflow-item">
                                <div className="wf-icon"><Users size={18} /></div>
                                <div className="wf-text">
                                    <p>Talent Review</p>
                                    <span>{stats.new_applications} pending reviews</span>
                                </div>
                            </button>
                        </div>
                    </section>

                    <section className="cc-pipeline-card">
                        <div className="card-header-cc">
                            <div className="header-title">
                                <TrendingUp size={18} className="text-accent" />
                                <h2>Business Health</h2>
                            </div>
                        </div>
                        <div className="health-metrics">
                            <div className="metric-row">
                                <span>Platform Enablement</span>
                                <div className="progress-bar-container">
                                    <div className="progress-fill" style={{ width: '75%' }}></div>
                                </div>
                                <span className="metric-pct">75%</span>
                            </div>
                            <div className="metric-row">
                                <span>IT Solutions Reach</span>
                                <div className="progress-bar-container">
                                    <div className="progress-fill" style={{ width: '92%' }}></div>
                                </div>
                                <span className="metric-pct">92%</span>
                            </div>
                            <div className="metric-row">
                                <span>Wellness Healing</span>
                                <div className="progress-bar-container">
                                    <div className="progress-fill" style={{ width: '45%' }}></div>
                                </div>
                                <span className="metric-pct">45%</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Activity and Intelligence Section */}
                <div className="cc-column right">
                    <section className="cc-activity-card">
                        <div className="card-header-cc">
                            <div className="header-title">
                                <Activity size={18} className="text-accent" />
                                <h2>Audit Trail</h2>
                            </div>
                            <button className="btn-text-only">View All</button>
                        </div>
                        <div className="activity-feed-cc">
                            {stats.recentLogs.map((log) => (
                                <div key={log.id} className="activity-row-cc">
                                    <div className={`activity-bullet ${log.action.toLowerCase()}`}></div>
                                    <div className="activity-info-cc">
                                        <p><strong>{log.action}</strong> {log.entity_type.replace('_', ' ')}</p>
                                        <div className="activity-meta-cc">
                                            <span>{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            <span className="dot"></span>
                                            <span>{new Date(log.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    {log.action === 'CREATE' && <Plus size={14} className="text-muted" />}
                                </div>
                            ))}
                            {stats.recentLogs.length === 0 && (
                                <div className="empty-activity">
                                    <p>System log is currently quiet.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>

            <style>{`
                .command-center {
                    padding: 2.5rem;
                    background: #F6F4EF; /* Premium Warm Cream */
                    min-height: 100vh;
                    color: #2B2B2B; /* Deep Charcoal Heading */
                }

                /* Header Styling */
                .cc-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 2.5rem;
                }
                .cc-breadcrumb { font-size: 0.75rem; color: #787878; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
                .cc-header h1 { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.25rem; }
                .cc-welcome { color: #5A5A5A; font-size: 1rem; }
                
                .cc-system-health { display: flex; gap: 1rem; align-items: center; }
                .health-badge {
                    display: flex; align-items: center; gap: 0.5rem;
                    padding: 0.5rem 1rem; border-radius: 99px;
                    font-size: 0.8rem; font-weight: 600;
                }
                .health-badge.operational { background: #E1E8E1; color: #2D5A27; }
                .health-badge.degraded { background: #fee2e2; color: #b91c1c; }
                .cc-current-time {
                    display: flex; align-items: center; gap: 0.5rem;
                    color: #787878; font-size: 0.8rem; font-weight: 500;
                }

                /* BI Cards Grid */
                .cc-bi-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                }
                .bi-card {
                    background: #E6DDD3; /* Warm Sand */
                    padding: 1.75rem;
                    border-radius: 20px;
                    border: 1px solid #D2C7BB;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .bi-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px -8px rgba(43,43,43,0.1);
                    border-color: #4A5D73;
                }
                .bi-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
                .bi-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .bi-trend { font-size: 0.7rem; font-weight: 700; color: #4A5D73; background: #fff; padding: 0.25rem 0.6rem; border-radius: 6px; }
                .bi-label { font-size: 0.85rem; font-weight: 600; color: #5A5A5A; margin-bottom: 0.5rem; }
                .bi-value { font-size: 2rem; font-weight: 800; margin-bottom: 0.25rem; }
                .bi-sub { font-size: 0.8rem; color: #787878; }
                .bi-action {
                    margin-top: 1.5rem; display: flex; align-items: center; gap: 0.25rem;
                    font-size: 0.75rem; font-weight: 700; color: #4A5D73;
                    opacity: 0; transform: translateX(-10px); transition: all 0.3s;
                }
                .bi-card:hover .bi-action { opacity: 1; transform: translateX(0); }

                /* Main Grid Columns */
                .cc-main-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 2rem; }
                .cc-column { display: flex; flex-direction: column; gap: 2rem; }

                /* Card Commons */
                .cc-workflow-card, .cc-pipeline-card, .cc-activity-card {
                    background: white; border-radius: 24px; border: 1px solid #D2C7BB; padding: 2rem;
                    box-shadow: 0 1px 3px rgba(43,43,43,0.05);
                }
                .card-header-cc { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
                .header-title { display: flex; align-items: center; gap: 0.75rem; }
                .header-title h2 { font-size: 1.1rem; font-weight: 700; }
                .text-accent { color: #4A5D73; }

                /* Workflow Items */
                .workflow-buttons { display: flex; flex-direction: column; gap: 1rem; }
                .workflow-item {
                    display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem;
                    border: 1px solid #E6DDD3; border-radius: 16px; background: #fff;
                    cursor: pointer; transition: all 0.2s; width: 100%; text-align: left;
                }
                .workflow-item:hover { background: #F6F4EF; border-color: #4A5D73; transform: scale(1.01); }
                .wf-icon { 
                    width: 40px; height: 40px; border-radius: 10px; background: #4A5D73; color: #fff;
                    display: flex; align-items: center; justify-content: center;
                }
                .wf-text p { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.1rem; }
                .wf-text span { font-size: 0.8rem; color: #787878; }

                /* Pipeline / Progress */
                .health-metrics { display: flex; flex-direction: column; gap: 1.5rem; }
                .metric-row { display: grid; grid-template-columns: 140px 1fr 40px; align-items: center; gap: 1.5rem; }
                .metric-row span { font-size: 0.85rem; font-weight: 600; color: #5A5A5A; }
                .progress-bar-container { height: 8px; background: #E6DDD3; border-radius: 4px; overflow: hidden; }
                .progress-fill { height: 100%; background: #4A5D73; border-radius: 4px; }
                .metric-pct { font-weight: 700; color: #2B2B2B; text-align: right; }

                /* Activity Feed */
                .activity-feed-cc { display: flex; flex-direction: column; gap: 1.5rem; }
                .activity-row-cc { display: flex; align-items: center; gap: 1.25rem; padding-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; }
                .activity-row-cc:last-child { border: none; padding-bottom: 0; }
                .activity-bullet { width: 8px; height: 8px; border-radius: 50%; background: #D2C7BB; }
                .activity-bullet.create { background: #2D5A27; box-shadow: 0 0 0 4px rgba(45, 90, 39, 0.1); }
                .activity-bullet.update { background: #4A5D73; box-shadow: 0 0 0 4px rgba(74, 93, 115, 0.1); }
                .activity-bullet.delete { background: #b91c1c; box-shadow: 0 0 0 4px rgba(185, 28, 28, 0.1); }
                .activity-info-cc p { font-size: 0.9rem; color: #2B2B2B; margin-bottom: 0.2rem; }
                .activity-meta-cc { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: #787878; }
                .dot { width: 3px; height: 3px; border-radius: 50%; background: #D2C7BB; }
                
                .btn-text-only { background: none; border: none; font-weight: 700; color: #4A5D73; cursor: pointer; font-size: 0.85rem; }
                .text-muted { color: #D2C7BB; }

                @media (max-width: 1200px) {
                    .cc-main-grid { grid-template-columns: 1fr; }
                    .cc-bi-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 768px) {
                    .cc-bi-grid { grid-template-columns: 1fr; }
                    .cc-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
                }

                .admin-dashboard-loading {
                    height: 80vh; display: flex; flex-direction: column; 
                    align-items: center; justify-content: center; gap: 1rem;
                    color: #4A5D73;
                }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin { animation: spin 1s linear infinite; }
            `}</style>
        </div>
    );
};

export default Dashboard;
