import { Link } from '@inertiajs/react';
import SeoMeta from '@/Components/SeoMeta';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import PageHero from '@/Components/PageHero';
import { motion } from 'framer-motion';
import { useState } from 'react';
import CardTopBar from '@/Components/CardTopBar';

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 40 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Index({ events, settings }) {
    const primaryColor = settings?.primary_color || '#ec4899';
    const [filter, setFilter] = useState('all');

    const filters = [
        { label: 'All',      value: 'all' },
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Past',     value: 'past' },
    ];

    const filtered = (events.data || []).filter(e => {
        if (filter === 'all') return true;
        if (filter === 'upcoming') return e.status === 'upcoming' || e.status === 'draft';
        return e.status === 'past';
    });

    return (
        <>
            <SeoMeta title="Events" description="Upcoming and past events engineered for unforgettable experiences." />
            <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white">
                <Navbar settings={settings} currentPage="events.index" />

                <PageHero
                    title="The Spectacles"
                    highlightWord="Spectacles"
                    subtitle="Upcoming and past events engineered for unforgettable experiences."
                    primaryColor={primaryColor}
                >
                    {/* Filter Chips */}
                    <div className="flex gap-3 flex-wrap mt-2">
                        {filters.map(f => (
                            <motion.button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full border transition-all duration-300"
                                style={{
                                    borderColor: filter === f.value ? primaryColor : 'rgba(255,255,255,0.12)',
                                    background:  filter === f.value ? primaryColor : 'transparent',
                                    color:       filter === f.value ? '#000' : '#9ca3af',
                                }}
                            >
                                {f.label}
                            </motion.button>
                        ))}
                    </div>
                </PageHero>

                <main className="px-6 lg:px-20 max-w-7xl mx-auto pb-32">
                    {filtered.length > 0 ? (
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {filtered.map((event) => (
                                <motion.div key={event.id} variants={item}>
                                    <Link
                                        href={route('events.show', event.slug)}
                                        className="block group relative cursor-pointer"
                                    >
                                        <motion.div
                                            whileHover={{ rotateX: 4, rotateY: -4, scale: 1.03 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                                            className="relative rounded-2xl overflow-hidden border border-white/5"
                                            onMouseEnter={e => {
                                                e.currentTarget.style.borderColor = `${primaryColor}44`;
                                                e.currentTarget.style.boxShadow = `0 0 30px ${primaryColor}18, 0 20px 60px rgba(0,0,0,0.6)`;
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            <div className="aspect-[4/5] overflow-hidden bg-zinc-900 relative">
                                                <CardTopBar event={event} primaryColor={primaryColor} />
                                                <img
                                                    src={event.cover_image || `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop&sig=${event.id}`}
                                                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                                                    style={{ '--tw-scale-x': 1.08, '--tw-scale-y': 1.08 }}
                                                    alt={event.title}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                                            </div>

                                            <div className="absolute bottom-0 left-0 p-7 w-full">
                                                <h4 className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-md leading-tight">
                                                    {event.title}
                                                </h4>
                                                <p className="text-gray-400 mt-2 line-clamp-2 text-sm max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                                                    {event.description?.replace(/<[^>]+>/g, '')}
                                                </p>
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                                                    style={{ color: primaryColor }}
                                                >
                                                    View Event <span>→</span>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gray-600 uppercase tracking-widest text-center py-24 text-sm"
                        >
                            No events match this filter.
                        </motion.p>
                    )}

                    {/* Pagination */}
                    {(events.prev_page_url || events.next_page_url) && (
                        <div className="mt-16 flex justify-between items-center border-t border-white/5 pt-8">
                            {events.prev_page_url ? (
                                <Link href={events.prev_page_url} className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                                    ← Previous
                                </Link>
                            ) : <div />}
                            {events.next_page_url ? (
                                <Link href={events.next_page_url} className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                                    Next →
                                </Link>
                            ) : <div />}
                        </div>
                    )}
                </main>

                <Footer settings={settings} />
            </div>
        </>
    );
}
