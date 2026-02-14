import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

import { adminService } from '../lib/adminService';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [siteName, setSiteName] = useState('JivIT Solutions');
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        const fetchSettings = async () => {
            try {
                const settings = await adminService.getSettings();
                if (settings.site_name) setSiteName(settings.site_name);
            } catch (error) { }
        };
        fetchSettings();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Services', path: '/products-services' },
        { name: 'Students', path: '/students' },
        { name: 'Careers', path: '/careers' },
        { name: 'Narratives', path: '/blog' },
        { name: 'Contact', path: '/contact', type: 'cta' }
    ];

    return (
        <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-layout">
                <Link to="/" className="logo">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="logo-text"
                    >
                        {siteName}
                    </motion.span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="site-nav desktop-only">
                    <ul>
                        {navLinks.map((link, idx) => (
                            <motion.li
                                key={link.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    to={link.path}
                                    className={`${isActive(link.path) ? 'active' : ''} ${link.type === 'cta' ? 'nav-cta' : ''}`}
                                >
                                    {link.name}
                                </Link>
                            </motion.li>
                        ))}
                        <motion.li
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: navLinks.length * 0.1 }} // Adjust delay for login link
                        >
                            <Link to="/login" className="nav-login">Login</Link>
                        </motion.li>
                    </ul>
                </nav>

                <button
                    className={`menu-toggle ${isOpen ? 'active' : ''}`}
                    aria-label="Toggle navigation"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mobile-nav"
                    >
                        <ul>
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={isActive(link.path) ? 'active' : ''}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
