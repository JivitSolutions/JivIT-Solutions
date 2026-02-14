import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const JobModal = ({ isOpen, onClose, onSave, job = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        department: 'IT Division',
        location: 'Remote',
        type: 'Full-time',
        description: '',
        requirements: '',
        status: 'draft'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (job) {
            setFormData({
                ...job,
                requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : ''
            });
        } else {
            setFormData({
                title: '',
                department: 'IT Division',
                location: 'Remote',
                type: 'Full-time',
                description: '',
                requirements: '',
                status: 'draft'
            });
        }
    }, [job, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            requirements: formData.requirements.split('\n').filter(r => r.trim() !== '')
        };

        try {
            await onSave(payload);
            onClose();
        } catch (error) {
            alert('Error saving job: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{job ? 'Edit Job Posting' : 'Add New Job Posting'}</h2>
                    <button onClick={onClose} className="close-btn"><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Job Title</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., Senior Full Stack Developer"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Department</label>
                            <select
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            >
                                <option value="IT Division">IT Division</option>
                                <option value="Wellness Division">Wellness Division</option>
                                <option value="Creative Division">Creative Division</option>
                                <option value="Operations">Operations</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Job Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                placeholder="e.g., Remote / Mumbai"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Publishing Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="draft">Draft (Inactive)</option>
                                <option value="published">Published (Active)</option>
                            </select>
                        </div>

                        <div className="form-group full-width">
                            <label>Job Description</label>
                            <textarea
                                rows="3"
                                placeholder="Provide a brief overview of the role..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="form-group full-width">
                            <label>Requirements (One per line)</label>
                            <textarea
                                rows="5"
                                placeholder="Bachelor's in CS&#10;3+ years React experience&#10;Strong communication"
                                value={formData.requirements}
                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
                        <button type="submit" disabled={loading} className="btn-save">
                            <Save size={18} />
                            <span>{loading ? 'Saving...' : 'Save Posting'}</span>
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(15, 23, 42, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(8px);
                    padding: 1rem;
                }
                .modal-content {
                    background: white;
                    width: 100%;
                    max-width: 650px;
                    max-height: 90vh;
                    border-radius: 20px;
                    overflow-y: auto;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    animation: modalSlideUp 0.3s ease-out;
                }
                @keyframes modalSlideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .modal-header {
                    padding: 1.5rem 2rem;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #fff;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                .modal-header h2 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #0f172a;
                }
                .close-btn {
                    background: #f1f5f9;
                    border: none;
                    cursor: pointer;
                    color: #64748b;
                    padding: 0.5rem;
                    border-radius: 10px;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .close-btn:hover {
                    background: #fee2e2;
                    color: #ef4444;
                    transform: rotate(90deg);
                }
                .admin-form {
                    padding: 2rem;
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }
                .full-width {
                    grid-column: span 2;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-group label {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #475569;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .form-group input, 
                .form-group select, 
                .form-group textarea {
                    padding: 0.75rem 1rem;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    color: #1e293b;
                    transition: all 0.2s;
                    background: #f8fafc;
                }
                .form-group input:focus, 
                .form-group select:focus, 
                .form-group textarea:focus {
                    outline: none;
                    border-color: #6366f1;
                    background: white;
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
                }
                .modal-footer {
                    padding: 1.5rem 2rem;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    background: #f8fafc;
                }
                .btn-cancel {
                    padding: 0.75rem 1.5rem;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    border: 1px solid #e2e8f0;
                    background: white;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-cancel:hover {
                    background: #f1f5f9;
                    color: #0f172a;
                }
                .btn-save {
                    padding: 0.75rem 1.75rem;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    border: none;
                    background: #6366f1;
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
                }
                .btn-save:hover {
                    background: #4f46e5;
                    transform: translateY(-1px);
                    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
                }
                .btn-save:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }
            `}</style>
        </div>
    );
};

export default JobModal;
