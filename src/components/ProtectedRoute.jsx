import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';

/**
 * Component to protect administrative routes.
 * Redirects to login if not authorized.
 */
const ProtectedRoute = () => {
    const { isAdmin, loading } = useAdmin();

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
                <p>Establishing secure connection...</p>
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
