import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main-content">
                <Outlet />
            </main>
            <style>{`
                .admin-layout {
                    display: flex;
                    min-height: 100vh;
                    background: #f9fafb;
                }
                .admin-main-content {
                    flex: 1;
                    height: 100vh;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;
