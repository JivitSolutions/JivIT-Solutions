import { useState, useEffect } from 'react';
import { adminService } from '../../lib/adminService';
import {
    Settings as SettingsIcon,
    Save,
    Globe,
    Mail,
    Shield,
    Bell,
    Info,
    RefreshCw
} from 'lucide-react';

const Settings = () => {
    const [settings, setSettings] = useState({
        site_name: 'JivIT Solutions',
        contact_email: 'hello@jivitsolutions.com',
        maintenance_mode: false,
        enable_applications: true,
        notification_email: 'admin@jivitsolutions.com',
        social_links: {
            linkedin: '',
            twitter: '',
            instagram: ''
        }
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await adminService.getSettings();
            if (Object.keys(data).length > 0) {
                setSettings(prev => ({ ...prev, ...data }));
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (key, value) => {
        setSaving(true);
        try {
            await adminService.updateSetting(key, value);
            setMessage({ type: 'success', text: `Setting "${key}" updated successfully!` });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: `Failed to update ${key}` });
        } finally {
            setSaving(false);
        }
    };

    const handleBulkSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            // In a real app, you might want a bulk update endpoint or loop through
            const promises = Object.entries(settings).map(([key, value]) =>
                adminService.updateSetting(key, value)
            );
            await Promise.all(promises);
            setMessage({ type: 'success', text: 'All settings saved successfully!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Error saving settings' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading-state">Loading configuration...</div>;

    return (
        <div className="admin-page">
            <header className="page-header-admin">
                <div>
                    <h1>System Settings</h1>
                    <p>Configure global parameters and platform preferences.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchSettings}
                        className="btn-icon-secondary"
                        title="Reload"
                    >
                        <RefreshCw size={18} />
                    </button>
                </div>
            </header>

            {message && (
                <div className={`status-banner ${message.type}`}>
                    <Info size={18} />
                    <span>{message.text}</span>
                </div>
            )}

            <form onSubmit={handleBulkSave} className="settings-container">
                <div className="settings-grid">
                    {/* General Settings */}
                    <section className="settings-card">
                        <div className="card-header">
                            <Globe size={20} className="text-indigo" />
                            <h3>General Configuration</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Site Name</label>
                                <input
                                    type="text"
                                    value={settings.site_name}
                                    onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Primary Contact Email</label>
                                <div className="input-with-icon">
                                    <Mail size={16} />
                                    <input
                                        type="email"
                                        value={settings.contact_email}
                                        onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Security & Access */}
                    <section className="settings-card">
                        <div className="card-header">
                            <Shield size={20} className="text-indigo" />
                            <h3>Security & Access</h3>
                        </div>
                        <div className="card-body">
                            <div className="toggle-group">
                                <div className="toggle-info">
                                    <p className="toggle-label">Maintenance Mode</p>
                                    <p className="toggle-hint">Hides the frontend website from the public.</p>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.maintenance_mode}
                                        onChange={(e) => setSettings({ ...settings, maintenance_mode: e.target.checked })}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="toggle-group mt-4">
                                <div className="toggle-info">
                                    <p className="toggle-label">Accept Applications</p>
                                    <p className="toggle-hint">Enable or disable the career application forms.</p>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.enable_applications}
                                        onChange={(e) => setSettings({ ...settings, enable_applications: e.target.checked })}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Notifications */}
                    <section className="settings-card">
                        <div className="card-header">
                            <Bell size={20} className="text-indigo" />
                            <h3>System Notifications</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Admin Notification Email</label>
                                <input
                                    type="email"
                                    value={settings.notification_email}
                                    onChange={(e) => setSettings({ ...settings, notification_email: e.target.value })}
                                />
                                <p className="helper-text">Where system alerts and new application alerts are sent.</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="settings-footer">
                    <button type="submit" disabled={saving} className="btn-save-large">
                        <Save size={20} />
                        <span>{saving ? 'Applying Changes...' : 'Save All Changes'}</span>
                    </button>
                </div>
            </form>

            <style>{`
                .admin-page { padding: 2.5rem; background: #f8fafc; min-height: 100vh; }
                .settings-container { max-width: 1000px; margin: 0 auto; }
                
                .settings-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                .settings-card {
                    background: white;
                    border-radius: 20px;
                    border: 1px solid #e2e8f0;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                }

                .card-header {
                    padding: 1.5rem 2rem;
                    background: #fcfcfd;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .card-header h3 { font-size: 1.1rem; font-weight: 700; color: #0f172a; }

                .card-body { padding: 2rem; }

                .status-banner {
                    max-width: 1000px;
                    margin: 0 auto 2rem;
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    font-weight: 500;
                }
                .status-banner.success { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
                .status-banner.error { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }

                .form-group { margin-bottom: 1.5rem; }
                .form-group label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #475569;
                    margin-bottom: 0.5rem;
                }
                .form-group input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    background: #f8fafc;
                    transition: all 0.2s;
                }
                .form-group input:focus {
                    outline: none;
                    border-color: #6366f1;
                    background: white;
                }

                .input-with-icon { position: relative; }
                .input-with-icon svg {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                }
                .input-with-icon input { padding-left: 2.75rem; }

                .toggle-group {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem 0;
                }
                .toggle-label { font-weight: 600; color: #1e293b; margin-bottom: 0.15rem; }
                .toggle-hint { font-size: 0.8rem; color: #64748b; }

                .switch {
                    position: relative;
                    display: inline-block;
                    width: 50px;
                    height: 26px;
                }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-color: #e2e8f0;
                    transition: .4s;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 18px; width: 18px;
                    left: 4px; bottom: 4px;
                    background-color: white;
                    transition: .4s;
                }
                input:checked + .slider { background-color: #6366f1; }
                input:checked + .slider:before { transform: translateX(24px); }
                .slider.round { border-radius: 34px; }
                .slider.round:before { border-radius: 50%; }

                .settings-footer {
                    display: flex;
                    justify-content: center;
                    padding-bottom: 4rem;
                }

                .btn-save-large {
                    background: #6366f1;
                    color: white;
                    padding: 1rem 3rem;
                    border-radius: 16px;
                    font-weight: 700;
                    font-size: 1rem;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    transition: all 0.3s;
                    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
                }
                .btn-save-large:hover {
                    background: #4f46e5;
                    transform: translateY(-2px);
                    box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.4);
                }
                .btn-save-large:disabled { opacity: 0.7; transform: none; cursor: not-allowed; }

                .btn-icon-secondary {
                    background: white;
                    border: 1px solid #e2e8f0;
                    padding: 0.6rem;
                    border-radius: 10px;
                    cursor: pointer;
                    color: #64748b;
                    transition: all 0.2s;
                }
                .btn-icon-secondary:hover { background: #f8fafc; color: #0f172a; }

                .helper-text { font-size: 0.75rem; color: #94a3b8; margin-top: 0.4rem; }
                .mt-4 { margin-top: 1rem; }
                .text-indigo { color: #6366f1; }
            `}</style>
        </div>
    );
};

export default Settings;
