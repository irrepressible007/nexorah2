import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar({ settings, currentPage }) {
    const primaryColor = settings?.primary_color || '#ec4899';
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => { setMobileOpen(false); }, [currentPage]);

    const navLinks = [
        { label: 'Home',    href: '/',                        routeName: 'home' },
        { label: 'Events',  href: route('events.index'),      routeName: 'events.index' },
        { label: 'Blog',    href: route('blog.index'),        routeName: 'blog.index' },
        { label: 'About',   href: route('about'),             routeName: 'about' },
        { label: 'Contact', href: route('contact'),           routeName: 'contact' },
    ];

    const { auth } = usePage().props;

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 lg:px-10 transition-all duration-500 ${
                    scrolled
                        ? 'py-3 bg-black/85 backdrop-blur-md border-b border-white/5 shadow-2xl'
                        : 'py-6 bg-transparent'
                }`}
            >
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src="/logo/Nexorah New logo.png"
                        alt="Nexorah Logo"
                        className="h-10 w-auto drop-shadow-md"
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-widest uppercase">
                    {navLinks.map((link) => {
                        const isActive = currentPage === link.routeName;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="relative group transition-colors duration-300"
                                style={{ color: isActive ? primaryColor : undefined }}
                            >
                                <span className={`hover:text-white transition-colors ${isActive ? '' : 'text-gray-300'}`}>
                                    {link.label}
                                </span>
                                {/* Animated underline */}
                                <span
                                    className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                                    style={{ background: primaryColor, width: isActive ? '100%' : undefined }}
                                />
                            </Link>
                        );
                    })}

                    {auth?.user && (
                        <Link
                            href={route('dashboard')}
                            className="px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all duration-300 hover:text-black"
                            style={{ borderColor: primaryColor, color: primaryColor, ['--tw-hover-bg']: primaryColor }}
                            onMouseEnter={e => { e.currentTarget.style.background = primaryColor; e.currentTarget.style.color = 'black'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = primaryColor; }}
                        >
                            Admin ↗
                        </Link>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2 z-50"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
                        className="block w-6 h-0.5 bg-white origin-center"
                    />
                    <motion.span
                        animate={{ opacity: mobileOpen ? 0 : 1 }}
                        className="block w-6 h-0.5 bg-white"
                    />
                    <motion.span
                        animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
                        className="block w-6 h-0.5 bg-white origin-center"
                    />
                </button>
            </motion.nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.35 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-4xl font-black uppercase tracking-wider hover:text-white transition-colors"
                                    style={{ color: currentPage === link.routeName ? primaryColor : '#6b7280' }}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        {auth?.user && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                <Link href={route('dashboard')} className="text-sm font-bold uppercase tracking-widest" style={{ color: primaryColor }}>
                                    Admin Panel ↗
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
