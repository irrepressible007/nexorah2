import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const SidebarContent = () => (
        <>
            <div className="flex h-20 items-center px-6 border-b border-white/5">
                <Link href="/">
                    <ApplicationLogo className="block h-10 w-auto text-white drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]" />
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 hide-scrollbar">
                <div className="mb-6 px-2">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-pink-500 mb-4">Command Center</h3>
                    <div className="space-y-1">
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</NavLink>
                        <NavLink href={route('admin.settings.index')} active={route().current('admin.settings.*')}>Settings</NavLink>
                        <NavLink href={route('admin.logs.index')} active={route().current('admin.logs.*')}>Logs</NavLink>
                    </div>
                </div>

                <div className="mb-6 px-2">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-4">Resources</h3>
                    <div className="space-y-1">
                        <NavLink href={route('admin.events.index')} active={route().current('admin.events.*')}>Events</NavLink>
                        <NavLink href={route('admin.posts.index')} active={route().current('admin.posts.*')}>Blog</NavLink>
                        <NavLink href={route('admin.partners.index')} active={route().current('admin.partners.*')}>Partners</NavLink>
                        <NavLink href={route('admin.team.index')} active={route().current('admin.team.*')}>Team</NavLink>
                        <NavLink href={route('admin.faqs.index')} active={route().current('admin.faqs.*')}>FAQs</NavLink>
                        <NavLink href={route('admin.testimonials.index')} active={route().current('admin.testimonials.*')}>Testimonials</NavLink>
                        <NavLink href={route('admin.inquiries.index')} active={route().current('admin.inquiries.*')}>Inquiries</NavLink>
                        <NavLink href={route('admin.highlights.index')} active={route().current('admin.highlights.*')}>Highlights</NavLink>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans dark selection:bg-pink-500 selection:text-white">
            
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 fixed inset-y-0 z-50 bg-[#0a0a0a] border-r border-white/5 shadow-2xl">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                            className="fixed inset-y-0 left-0 w-72 bg-[#0a0a0a] border-r border-white/5 shadow-2xl z-50 flex flex-col lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="lg:pl-72 flex flex-col min-h-screen">
                
                {/* Topbar */}
                <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                        </button>
                        
                        {header && (
                            <div className="hidden sm:block text-lg font-bold text-white tracking-widest uppercase">
                                {header}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-white/20">
                                    {user.name}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content contentClasses="py-1 bg-[#111] border border-white/10 rounded-xl shadow-2xl">
                                <Dropdown.Link href={route('profile.edit')} className="text-gray-300 hover:bg-white/5 hover:text-white">
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button" className="text-pink-500 hover:bg-pink-500/10">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Mobile Header Title */}
                {header && (
                    <div className="sm:hidden px-4 py-4 bg-[#0a0a0a] border-b border-white/5">
                        <div className="text-lg font-bold text-white tracking-widest uppercase">
                            {header}
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 relative">
                    {/* Decorative Background Glows */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
