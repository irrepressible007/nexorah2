import { Link } from '@inertiajs/react';
import SeoMeta from '@/Components/SeoMeta';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const stats = [
    { label: 'Events Hosted',  value: '150+' },
    { label: 'Cities Covered', value: '12+' },
    { label: 'Attendees',      value: '50K+' },
    { label: 'Years Active',   value: '5+' },
];

export default function About({ team, faqs, partners, settings }) {
    const primaryColor = settings?.primary_color || '#ec4899';
    const [openFaq, setOpenFaq] = useState(null);
    const [flippedCard, setFlippedCard] = useState(null);

    return (
        <>
            <SeoMeta title="About Nexorah" description="Beyond expectations. Premier event management firm." />
            <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white pb-32 overflow-x-hidden">
                <Navbar settings={settings} currentPage="about" />

                {/* Hero */}
                <div className="pt-44 pb-20 px-6 lg:px-20 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-px w-24 mb-8 origin-left"
                            style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}
                        />
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
                            Beyond <br />
                            <span style={{ color: primaryColor }}>Expectations</span>
                        </h2>
                        <div className="max-w-2xl text-gray-400 text-lg leading-relaxed">
                            <p className="mb-4">Nexorah is a premier event management firm specializing in creating immersive, highly engaging, and meticulously planned experiences.</p>
                            <p>From large-scale corporate summits to extravagant galas, we don't just host events — we engineer unforgettable spectacles.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Row */}
                <div className="px-6 lg:px-20 max-w-7xl mx-auto mb-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="rounded-2xl p-8 text-center"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = `${primaryColor}44`;
                                    e.currentTarget.style.boxShadow = `0 0 24px ${primaryColor}18`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: primaryColor }}>
                                    {stat.value}
                                </div>
                                <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Team Section — Flip Cards */}
                <div className="px-6 lg:px-20 max-w-7xl mx-auto mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-6 mb-14"
                    >
                        <div className="h-px w-8 flex-shrink-0" style={{ background: primaryColor }} />
                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">The Masterminds</h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team && team.length > 0 ? team.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative"
                                style={{ perspective: 1200, height: 380 }}
                                onMouseEnter={() => setFlippedCard(member.id)}
                                onMouseLeave={() => setFlippedCard(null)}
                            >
                                <motion.div
                                    animate={{ rotateY: flippedCard === member.id ? 180 : 0 }}
                                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
                                >
                                    {/* Front */}
                                    <div style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }} className="rounded-2xl overflow-hidden">
                                        <img
                                            src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a1a1a&color=ffffff&size=512`}
                                            alt={member.name}
                                            className="w-full h-full object-cover filter grayscale"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-6">
                                            <h4 className="text-lg font-black uppercase tracking-wide text-white">{member.name}</h4>
                                            <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: primaryColor }}>{member.role}</p>
                                        </div>
                                    </div>
                                    {/* Back */}
                                    <div
                                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
                                        className="rounded-2xl p-7 flex flex-col justify-center"
                                    >
                                        <div
                                            className="absolute inset-0 rounded-2xl"
                                            style={{ background: `linear-gradient(135deg, ${primaryColor}22, rgba(0,0,0,0.95))`, border: `1px solid ${primaryColor}44` }}
                                        />
                                        <div className="relative z-10">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black mb-4" style={{ background: `${primaryColor}33`, color: primaryColor }}>
                                                {member.name.charAt(0)}
                                            </div>
                                            <h4 className="text-lg font-black uppercase tracking-wide text-white mb-1">{member.name}</h4>
                                            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>{member.role}</p>
                                            {member.bio && <p className="text-sm text-gray-400 leading-relaxed line-clamp-5">{member.bio}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )) : (
                            <p className="text-gray-500 italic col-span-4">No team members added yet.</p>
                        )}
                    </div>
                </div>

                {/* Partners Strip */}
                {partners && partners.length > 0 && (
                    <div className="py-20 mb-32 border-y" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}>
                        <div className="px-6 lg:px-20 max-w-7xl mx-auto text-center">
                            <p className="text-xs font-black uppercase tracking-widest mb-12 text-gray-600">Trusted By Elite Organizations</p>
                            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
                                {partners.map((partner, index) => (
                                    <motion.div
                                        key={partner.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.08 }}
                                        className="opacity-40 hover:opacity-100 transition-all duration-300 w-28 md:w-36"
                                    >
                                        {partner.website_url ? (
                                            <a href={partner.website_url} target="_blank" rel="noopener noreferrer">
                                                {partner.logo_image
                                                    ? <img src={partner.logo_image} alt={partner.company_name} className="w-full h-auto filter invert" />
                                                    : <span className="text-lg font-black uppercase tracking-wider text-white">{partner.company_name}</span>
                                                }
                                            </a>
                                        ) : (
                                            partner.logo_image
                                                ? <img src={partner.logo_image} alt={partner.company_name} className="w-full h-auto filter invert" />
                                                : <span className="text-lg font-black uppercase tracking-wider text-white">{partner.company_name}</span>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ Section */}
                <div className="px-6 lg:px-20 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                            Declassified <span style={{ color: primaryColor }}>Intel</span>
                        </h3>
                    </motion.div>

                    <div className="space-y-3">
                        {faqs && faqs.length > 0 ? faqs.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.07 }}
                                className="rounded-xl overflow-hidden"
                                style={{
                                    border: openFaq === faq.id ? `1px solid ${primaryColor}44` : '1px solid rgba(255,255,255,0.06)',
                                    background: openFaq === faq.id ? `${primaryColor}08` : 'rgba(255,255,255,0.02)',
                                    transition: 'border-color 0.3s, background 0.3s',
                                }}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                                >
                                    <span className="font-bold text-base uppercase tracking-wider text-white">{faq.question}</span>
                                    <motion.span
                                        animate={{ rotate: openFaq === faq.id ? 45 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-xl font-thin flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border"
                                        style={{
                                            color: primaryColor,
                                            borderColor: `${primaryColor}55`,
                                            minWidth: '1.5rem',
                                        }}
                                    >
                                        +
                                    </motion.span>
                                </button>
                                <AnimatePresence>
                                    {openFaq === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )) : (
                            <p className="text-gray-500 italic text-center">No FAQs added yet.</p>
                        )}
                    </div>
                </div>

                <Footer settings={settings} />
            </div>
        </>
    );
}
