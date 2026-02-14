import { useState, useEffect } from 'react';
import { Briefcase, Plus, Search, MapPin, Clock, Edit2, Trash2 } from 'lucide-react';
import JobModal from '../../components/admin/JobModal';
import { adminService } from '../../lib/adminService';

const HiringDesk = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await adminService.getJobOpenings(true);
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveJob = async (formData) => {
        try {
            if (currentJob) {
                await adminService.updateJobOpening(currentJob.id, formData);
            } else {
                await adminService.createJobOpening(formData);
            }
            fetchJobs();
            setIsModalOpen(false);
        } catch (error) {
            throw error;
        }
    };

    const handleEdit = (job) => {
        setCurrentJob(job);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setCurrentJob(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this posting?')) {
            try {
                await adminService.softDeleteJobOpening(id);
                fetchJobs();
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const filteredJobs = jobs.filter(j =>
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <header className="page-header-admin">
                <div>
                    <h1>Hiring Desk</h1>
                    <p>Manage job postings and student program opportunities.</p>
                </div>
                <button
                    className="btn btn-primary flex items-center gap-2"
                    onClick={handleAddNew}
                >
                    <Plus size={18} />
                    <span>Post New Role</span>
                </button>
            </header>

            <div className="admin-controls">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search roles or departments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="loading-state">Loading postings...</div>
            ) : (
                <div className="postings-grid">
                    {filteredJobs.map((job) => (
                        <div key={job.id} className="job-admin-card">
                            <div className="job-main-info">
                                <span className="dept-tag">{job.department}</span>
                                <h3>{job.title}</h3>
                                <div className="meta-info">
                                    <span><MapPin size={14} /> {job.location}</span>
                                    <span><Clock size={14} /> {job.type}</span>
                                </div>
                            </div>
                            <div className="job-admin-actions">
                                <span className={`status-tag ${job.status}`}>{job.status}</span>
                                <div className="actions-group">
                                    <button
                                        className="icon-btn edit"
                                        onClick={() => handleEdit(job)}
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        className="icon-btn delete"
                                        onClick={() => handleDelete(job.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredJobs.length === 0 && (
                        <div className="empty-state">
                            <p>No postings found. Start growing your team!</p>
                        </div>
                    )}
                </div>
            )}

            <JobModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveJob}
                job={currentJob}
            />

            <style>{`
                .admin-page { padding: 2.5rem; background: #f8fafc; min-height: 100vh; }
                .page-header-admin {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2.5rem;
                }
                .page-header-admin h1 { font-size: 1.875rem; font-weight: 800; color: #0f172a; margin-bottom: 0.25rem; }
                .page-header-admin p { color: #64748b; font-size: 1rem; }
                
                .btn-primary {
                    background: #6366f1;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 12px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
                }
                .btn-primary:hover {
                    background: #4f46e5;
                    transform: translateY(-1px);
                    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
                }

                .admin-controls { margin-bottom: 2rem; }
                .search-box {
                    max-width: 400px;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: white;
                    padding: 0.75rem 1.25rem;
                    border-radius: 14px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                    transition: all 0.2s;
                }
                .search-box:focus-within {
                    border-color: #6366f1;
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
                }
                .search-box input {
                    border: none;
                    outline: none;
                    width: 100%;
                    font-size: 0.95rem;
                    color: #1e293b;
                }

                .postings-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
                    gap: 1.5rem;
                }
                .job-admin-card {
                    background: white;
                    padding: 1.75rem;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    transition: all 0.3s;
                }
                .job-admin-card:hover {
                    border-color: #6366f1;
                    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
                    transform: translateY(-2px);
                }
                .dept-tag {
                    color: #6366f1;
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.75rem;
                    display: inline-block;
                    background: #f5f3ff;
                    padding: 0.25rem 0.6rem;
                    border-radius: 6px;
                }
                .job-main-info h3 { font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem; }
                .meta-info {
                    display: flex;
                    gap: 1.25rem;
                    color: #64748b;
                    font-size: 0.85rem;
                }
                .meta-info span { display: flex; align-items: center; gap: 0.4rem; }
                
                .job-admin-actions {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 1.25rem;
                }
                .status-tag {
                    font-size: 0.65rem;
                    padding: 0.35rem 0.75rem;
                    border-radius: 8px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .status-tag.published { background: #dcfce7; color: #15803d; }
                .status-tag.draft { background: #f1f5f9; color: #475569; }
                
                .actions-group { display: flex; gap: 0.5rem; }
                .icon-btn { 
                    background: #f8fafc; border: 1px solid #e2e8f0; cursor: pointer; color: #64748b; 
                    padding: 0.6rem; border-radius: 10px; transition: all 0.2s;
                }
                .icon-btn:hover { background: #fff; color: #6366f1; border-color: #6366f1; }
                .icon-btn.delete:hover { background: #fef2f2; color: #ef4444; border-color: #fecaca; }
                
                .empty-state { 
                    grid-column: 1 / -1; 
                    text-align: center; 
                    padding: 5rem; 
                    background: white; 
                    border-radius: 20px; 
                    border: 2px dashed #e2e8f0;
                    color: #94a3b8;
                }
                @media (max-width: 640px) {
                    .postings-grid { grid-template-columns: 1fr; }
                    .page-header-admin { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default HiringDesk;
