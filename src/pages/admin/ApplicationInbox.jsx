import { useState, useEffect } from 'react';
import { adminService } from '../../lib/adminService';
import { Mail, Phone, Calendar, CheckCircle, Clock } from 'lucide-react';

const ApplicationInbox = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const data = await adminService.getApplications();
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await adminService.updateApplicationStatus(id, newStatus);
            fetchApplications();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="admin-page">
            <header className="page-header-admin">
                <div>
                    <h1>Application Inbox</h1>
                    <p>Track and manage inquiries from potential talent and students.</p>
                </div>
            </header>

            {loading ? (
                <div className="loading-state">Loading applications...</div>
            ) : (
                <div className="inbox-list">
                    {applications.map((app) => (
                        <div key={app.id} className={`app-row ${app.status}`}>
                            <div className="app-main">
                                <div className="app-user-info">
                                    <h3>{app.first_name} {app.last_name}</h3>
                                    <p className="app-meta">
                                        <Mail size={14} /> {app.email}
                                        {app.phone && <span> • <Phone size={14} /> {app.phone}</span>}
                                    </p>
                                </div>
                                <div className="app-intent">
                                    <span className="app-source">Seeking: {app.source_type}</span>
                                    <span className="app-date"><Calendar size={14} /> {new Date(app.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="app-message-box">
                                <p>{app.message || 'No message provided.'}</p>
                            </div>

                            <div className="app-footer">
                                <div className="app-status-control">
                                    <span className={`status-bubble ${app.status}`}>{app.status}</span>
                                    <select
                                        value={app.status}
                                        onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                                        className="status-select"
                                    >
                                        <option value="new">New</option>
                                        <option value="reviewing">Reviewing</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                                <div className="app-actions">
                                    {app.resume_url && <a href={app.resume_url} target="_blank" className="btn btn-secondary btn-sm">View Resume</a>}
                                </div>
                            </div>
                        </div>
                    ))}
                    {applications.length === 0 && (
                        <div className="empty-inbox">
                            <p>No applications received yet. They will appear here once users apply on the website.</p>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                .admin-page { padding: 2rem; }
                .inbox-list { display: flex; flex-direction: column; gap: 1.5rem; }
                .app-row {
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e5e7eb;
                    padding: 1.5rem;
                    transition: border-color 0.2s;
                }
                .app-row.new { border-left: 4px solid #6366f1; }
                .app-main {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }
                .app-user-info h3 { margin-bottom: 0.25rem; font-size: 1.1rem; }
                .app-meta { 
                    display: flex; 
                    align-items: center; 
                    gap: 0.5rem; 
                    color: #6b7280; 
                    font-size: 0.875rem; 
                }
                .app-intent { text-align: right; }
                .app-source { 
                    display: block; 
                    font-weight: 600; 
                    color: #6366f1; 
                    text-transform: capitalize;
                    margin-bottom: 0.25rem;
                }
                .app-date { color: #9ca3af; font-size: 0.8rem; display: flex; align-items: center; gap: 0.25rem; }
                .app-message-box {
                    background: #f9fafb;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    font-size: 0.95rem;
                    color: #374151;
                    line-height: 1.5;
                }
                .app-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .app-status-control { display: flex; align-items: center; gap: 1rem; }
                .status-bubble {
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                }
                .status-bubble.new { background: #e0e7ff; color: #4338ca; }
                .status-bubble.reviewing { background: #fef9c3; color: #854d0e; }
                .status-bubble.accepted { background: #dcfce7; color: #166534; }
                .status-bubble.rejected { background: #fee2e2; color: #991b1b; }
                .status-select {
                    padding: 0.35rem;
                    border-radius: 6px;
                    border: 1px solid #d1d5db;
                    font-size: 0.875rem;
                }
            `}</style>
        </div>
    );
};

export default ApplicationInbox;
