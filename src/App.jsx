import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsServices from './pages/ProductsServices';
import Students from './pages/Students';
import Careers from './pages/Careers';
import Login from './pages/Login';
import Contact from './pages/Contact';

function AppContent() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div className="app-container">
            {!isLoginPage && <Navbar />}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products-services" element={<ProductsServices />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            {!isLoginPage && <Footer />}
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
