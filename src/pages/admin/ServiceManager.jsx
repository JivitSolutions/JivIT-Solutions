import { useState, useEffect } from 'react';
import { Package, Plus, MoreVertical, Search, Edit2, Trash2 } from 'lucide-react';
import ServiceModal from '../../components/admin/ServiceModal';
import { adminService } from '../../lib/adminService';

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const data = await adminService.getServices(true);
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveService = async (formData) => {
        try {
            if (currentService) {
                await adminService.updateService(currentService.id, formData);
            } else {
                await adminService.createService(formData);
            }
            fetchServices();
            setIsModalOpen(false);
        } catch (error) {
            throw error;
        }
    };

    const handleEdit = (service) => {
        setCurrentService(service);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setCurrentService(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this service? This can be undone by an admin.')) {
            try {
                await adminService.softDeleteService(id);
                fetchServices();
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const toggleStatus = async (service) => {
        const newStatus = service.status === 'published' ? 'draft' : 'published';
        try {
            await adminService.updateService(service.id, { status: newStatus });
            fetchServices();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const filteredServices = services.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <header className="page-header-admin">
                <div>
                    <h1>Service Manager</h1>
                    <p>Add, edit, and publish your business offerings.</p>
                </div>
                <button
                    className="btn btn-primary flex items-center gap-2"
                    onClick={handleAddNew}
                >
                    <Plus size={18} />
                    <span>Add New Service</span>
                </button>
            </header>

            <div className="admin-controls">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="loading-state">Loading services...</div>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Service Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServices.map((service) => (
                                <tr key={service.id}>
                                    <td className="table-main-cell">
                                        <div className="service-title-cell">
                                            <strong>{service.title}</strong>
                                            <span className="subtitle">{service.subtitle}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="category-pill">{service.category || 'Uncategorized'}</span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => toggleStatus(service)}
                                            className={`status-pill ${service.status}`}
                                        >
                                            {service.status}
                                        </button>
                                    </td>
                                    <td>{new Date(service.created_at).toLocaleDateString()}</td>
                                    <td className="actions-cell">
                                        <div className="actions-group">
                                            <button
                                                className="icon-btn edit"
                                                title="Edit"
                                                onClick={() => handleEdit(service)}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                className="icon-btn delete"
                                                title="Remove"
                                                onClick={() => handleDelete(service.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredServices.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="empty-table">No services found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveService}
                service={currentService}
            />

            <style>{`
                .admin-page { padding: 2rem; }
                .page-header-admin {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                .admin-controls {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                .search-box {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: white;
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                }
                .search-box input {
                    border: none;
                    outline: none;
                    width: 100%;
                    font-size: 0.95rem;
                }
                .admin-table-container {
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e5e7eb;
                    overflow: hidden;
                }
                .admin-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }
                .admin-table th {
                    background: #f9fafb;
                    padding: 1rem;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    color: #6b7280;
                    font-weight: 600;
                    border-bottom: 1px solid #e5e7eb;
                }
                .admin-table td {
                    padding: 1rem;
                    border-bottom: 1px solid #f3f4f6;
                    font-size: 0.95rem;
                }
                .service-title-cell { display: flex; flex-direction: column; }
                .subtitle { font-size: 0.8rem; color: #6b7280; margin-top: 0.2rem; }
                .category-pill {
                    background: #f3f4f6;
                    padding: 0.25rem 0.75rem;
                    border-radius: 99px;
                    font-size: 0.85rem;
                }
                .status-pill {
                    border: none;
                    cursor: pointer;
                    padding: 0.25rem 0.75rem;
                    border-radius: 99px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: capitalize;
                }
                .status-pill.published { background: #dcfce7; color: #166534; }
                .status-pill.draft { background: #fef9c3; color: #854d0e; }
                .empty-table { text-align: center; padding: 4rem; color: #9ca3af; }
                .actions-group { display: flex; gap: 0.5rem; }
                .icon-btn { 
                    background: transparent; border: none; cursor: pointer; color: #6b7280; 
                    padding: 0.5rem; border-radius: 4px;
                }
                .icon-btn:hover { background: #f3f4f6; color: #111827; }
                .icon-btn.delete:hover { color: #ef4444; }
            `}</style>
        </div>
    );
};

export default ServiceManager;
