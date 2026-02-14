import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatAssistant from './components/Assistant/ChatAssistant';
import Home from './pages/Home';
import ProductsServices from './pages/ProductsServices';
import Students from './pages/Students';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import StudentDetail from './pages/StudentDetail';
import ServiceDetail from './pages/ServiceDetail';
import CareerDetail from './pages/CareerDetail';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ServiceManager from './pages/admin/ServiceManager';
import HiringDesk from './pages/admin/HiringDesk';
import ApplicationInbox from './pages/admin/ApplicationInbox';
import Settings from './pages/admin/Settings';

function AppContent() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isAdminLoginPage = location.pathname === '/admin-login';
    const isRegisterPage = location.pathname === '/register';
    const isAdminPage = location.pathname.startsWith('/admin');
    const isPremiumDetail =
        location.pathname.startsWith('/careers/') ||
        location.pathname.startsWith('/students/') ||
        location.pathname.startsWith('/services/');

    const isLayoutHidden = isLoginPage || isAdminLoginPage || isRegisterPage || isAdminPage || isPremiumDetail;

    return (
        <div className="app-container">
            {!isLayoutHidden && <Navbar />}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/careers/:id" element={<CareerDetail />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/students/:id" element={<StudentDetail />} />
                    <Route path="/products-services" element={<ProductsServices />} />
                    <Route path="/services/:id" element={<ServiceDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* Admin Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/admin" element={<Dashboard />} />
                            <Route path="/admin/services" element={<ServiceManager />} />
                            <Route path="/admin/hiring" element={<HiringDesk />} />
                            <Route path="/admin/applications" element={<ApplicationInbox />} />
                            <Route path="/admin/settings" element={<Settings />} />
                        </Route>
                    </Route>
                </Routes>
            </main>
            {!isLayoutHidden && <Footer />}
            {!isLayoutHidden && <ChatAssistant />}
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    );
}

export default App;
