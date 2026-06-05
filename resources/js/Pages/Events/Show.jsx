import { Link } from '@inertiajs/react';
import SeoMeta from '@/Components/SeoMeta';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

function Countdown({ targetDate, primaryColor }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calc = () => {
            const diff = new Date(targetDate) - new Date();
            if (diff <= 0) return;
            setTimeLeft({
                days:    Math.floor(diff / 86400000),
                hours:   Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            });
        };
        calc();
        const id = setInterval(calc, 1000);
        return () => clearInterval(id);
    }, [targetDate]);

    const units = [
        { label: 'Days',    value: timeLeft.days },
        { label: 'Hours',   value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-3 mt-8 flex-wrap"
        >
            {units.map(u => (
                <div
                    key={u.label}
                    className="flex flex-col items-center justify-center w-20 h-20 rounded-xl"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${primaryColor}33`,
                        boxShadow: `0 0 16px ${primaryColor}18`,
                    }}
                >
                    <span className="text-2xl font-black tabular-nums" style={{ color: primaryColor }}>
                        {String(u.value).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mt-0.5">
                        {u.label}
                    </span>
                </div>
            ))}
        </motion.div>
    );
}

export default function Show({ event, settings }) {
    const primaryColor = settings?.primary_color || '#ec4899';
    const handleRegister = (type) => alert(`Registration for ${type} will be implemented soon!`);
    const isUpcoming = event.status === 'upcoming' && event.event_date;

    return (
        <>
            <SeoMeta
                title={event.title}
                description={event.description ? event.description.replace(/<[^>]+>/g, '').substring(0, 160) : 'Join us for this upcoming event by Nexorah.'}
                image={event.cover_image}
            />
            <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white pb-32">
                <Navbar settings={settings} currentPage="events.index" />

                {/* Hero / Ken Burns Cover */}
                <div className="w-full h-[75vh] relative overflow-hidden bg-zinc-900">
                    <motion.img
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 8, ease: 'linear' }}
                        src={event.cover_image || `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop&sig=${event.id}`}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-55"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

                    {/* Grain overlay */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")" }}
                    />

                    <div className="absolute bottom-0 left-0 w-full px-6 lg:px-20 pb-12 max-w-6xl">
                        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
                            <div className="flex items-center gap-4 mb-5">
                                <span
                                    className="flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full"
                                    style={{
                                        border: `1px solid ${isUpcoming ? `${primaryColor}66` : 'rgba(255,255,255,0.2)'}`,
                                        color: isUpcoming ? primaryColor : '#6b7280',
                                    }}
                                >
                                    {isUpcoming && <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: primaryColor }} />}
                                    {event.status}
                                </span>
                                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">
                                    {event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Date TBA'}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none drop-shadow-2xl">
                                {event.title}
                            </h1>
                            {event.location && (
                                <p className="text-gray-300 mt-5 font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                    {event.location}
                                </p>
                            )}
                            {/* Countdown */}
                            {isUpcoming && <Countdown targetDate={event.event_date} primaryColor={primaryColor} />}
                        </motion.div>
                    </div>
                </div>

                {/* Content Area */}
                <main className="px-6 lg:px-20 max-w-6xl mx-auto mt-16 flex flex-col lg:flex-row gap-16">
                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:w-2/3"
                    >
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 pb-4 border-b border-white/8" style={{ color: primaryColor }}>
                            About The Event
                        </h3>
                        <div className="text-gray-300 leading-relaxed text-lg font-light">
                            {event.description ? (
                                <div 
                                    className="nexorah-prose"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }} 
                                />
                            ) : (
                                <p className="italic text-gray-500">Details for this spectacle are currently classified. Check back soon.</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Sticky Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="lg:w-1/3 lg:sticky lg:top-28 self-start"
                    >
                        <div
                            className="p-8 rounded-2xl space-y-6 relative overflow-hidden"
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                boxShadow: `0 0 60px ${primaryColor}0a`,
                            }}
                        >
                            {/* Glow orb */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: `${primaryColor}15` }} />

                            <h3 className="text-lg font-black uppercase tracking-widest text-white text-center">Join The Experience</h3>

                            <div className="flex flex-col gap-3">
                                {event.registration_link && (
                                    <motion.a
                                        href={event.registration_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full py-4 px-6 text-black font-black uppercase tracking-widest text-xs shadow-lg rounded-lg text-center block"
                                        style={{ background: primaryColor }}
                                    >
                                        Register Now
                                    </motion.a>
                                )}

                                {event.registration_link && (event.ambassador_link || event.volunteer_link) && (
                                    <div className="flex items-center gap-4 py-2">
                                        <div className="flex-1 h-px bg-white/8" />
                                        <span className="text-gray-600 text-xs uppercase tracking-widest">or</span>
                                        <div className="flex-1 h-px bg-white/8" />
                                    </div>
                                )}

                                {event.ambassador_link && (
                                    <motion.a
                                        href={event.ambassador_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ borderColor: 'rgba(255,255,255,0.4)', scale: 1.02 }}
                                        className="w-full py-3 px-6 bg-transparent border border-white/10 text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-colors text-center block"
                                    >
                                        Become a Campus Ambassador
                                    </motion.a>
                                )}

                                {event.volunteer_link && (
                                    <motion.a
                                        href={event.volunteer_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ borderColor: 'rgba(255,255,255,0.4)', scale: 1.02 }}
                                        className="w-full py-3 px-6 bg-transparent border border-white/10 text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-colors text-center block"
                                    >
                                        Volunteer
                                    </motion.a>
                                )}

                                {!event.registration_link && !event.ambassador_link && !event.volunteer_link && (
                                    <p className="text-center text-xs text-gray-500 uppercase tracking-widest mt-2">Registration details TBA</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </main>

                {/* Event Gallery */}
                {event.media && event.media.length > 0 && (
                    <div className="px-6 lg:px-20 max-w-6xl mx-auto mt-24">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-sm font-black uppercase tracking-widest mb-12 flex items-center gap-4"
                            style={{ color: primaryColor }}
                        >
                            <span className="h-px flex-1 max-w-8" style={{ background: primaryColor }} />
                            Visual Intel
                        </motion.h3>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                            {event.media.map((media, index) => (
                                <motion.div
                                    key={media.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.07 }}
                                    className="break-inside-avoid overflow-hidden rounded-xl"
                                >
                                    <img
                                        src={media.file_path}
                                        alt={`Event Media ${index + 1}`}
                                        className="w-full h-auto filter grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 cursor-pointer"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                <Footer settings={settings} />
            </div>
        </>
    );
}
