import { Link, useForm } from '@inertiajs/react';
import SeoMeta from '@/Components/SeoMeta';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { motion } from 'framer-motion';
import { useState } from 'react';

function FloatingInput({ id, label, type = 'text', value, onChange, error, multiline = false }) {
    const [focused, setFocused] = useState(false);
    const isActive = focused || value;

    const inputClass = "w-full bg-transparent border-0 border-b text-white pt-5 pb-2 text-sm font-medium focus:outline-none transition-colors duration-300 resize-none";
    const borderStyle = { borderBottomColor: focused ? 'var(--primary, #ec4899)' : 'rgba(255,255,255,0.12)' };

    return (
        <div className="relative">
            <label
                htmlFor={id}
                className="absolute left-0 top-0 text-xs font-bold uppercase tracking-widest transition-all duration-300 pointer-events-none"
                style={{
                    color: isActive ? 'var(--primary, #ec4899)' : 'rgba(255,255,255,0.3)',
                    transform: isActive ? 'translateY(0) scale(1)' : 'translateY(20px) scale(1)',
                    fontSize: isActive ? '0.65rem' : '0.75rem',
                }}
            >
                {label}
            </label>
            {multiline ? (
                <textarea
                    id={id}
                    rows={4}
                    value={value}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={onChange}
                    className={inputClass}
                    style={borderStyle}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={onChange}
                    className={inputClass}
                    style={borderStyle}
                />
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

export default function Contact({ settings }) {
    const primaryColor = settings?.primary_color || '#ec4899';
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '', email: '', subject: '', message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), { onSuccess: () => reset() });
    };

    const contactItems = [
        {
            label: 'Headquarters',
            value: settings?.contact_address || 'Vice City Marina, Level 42',
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            ),
        },
        {
            label: 'Direct Line',
            value: settings?.contact_phone || '1-800-NEXORAH',
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            ),
        },
        {
            label: 'Secure Email',
            value: settings?.contact_email || 'contact@nexorah.com',
            icon: (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            ),
        },
    ];

    return (
        <>
            <SeoMeta
                title={settings?.contact_page_title || 'Establish Contact'}
                description={settings?.contact_page_subtitle || 'Secure line to Nexorah Command.'}
            />
            <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white pb-32 overflow-x-hidden">
                <Navbar settings={settings} currentPage="contact" />

                {/* Decorative background */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: primaryColor }} />
                    <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full blur-3xl opacity-5" style={{ background: primaryColor }} />
                </div>

                <main className="pt-36 px-6 lg:px-20 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-20 items-start">

                        {/* Left: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="h-px w-16 mb-8 origin-left"
                                style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}
                            />
                            <h2
                                className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6"
                                dangerouslySetInnerHTML={{
                                    __html: (settings?.contact_page_title || `Establish <span style="color:${primaryColor}">Contact</span>`)
                                        .replace('Contact', `<span style="color:${primaryColor}">Contact</span>`)
                                }}
                            />
                            <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold mb-16 max-w-sm leading-relaxed">
                                {settings?.contact_page_subtitle || 'Secure line to Nexorah Command. Send us your brief, inquiry, or partnership request.'}
                            </p>

                            <div className="space-y-10">
                                {contactItems.map((ci, i) => (
                                    <motion.div
                                        key={ci.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                                        className="flex items-start gap-5"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                            style={{ background: `${primaryColor}18`, color: primaryColor }}
                                        >
                                            {ci.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-gray-600 mb-1">{ci.label}</p>
                                            <p className="text-base font-bold text-white uppercase tracking-wider">{ci.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div
                                className="rounded-2xl p-8 md:p-12 relative overflow-hidden"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    boxShadow: `0 0 80px ${primaryColor}0a`,
                                }}
                            >
                                {/* Glow orb */}
                                <div
                                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                                    style={{ background: `${primaryColor}18` }}
                                />

                                {wasSuccessful ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-16"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ repeat: 2, duration: 0.4 }}
                                            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                                            style={{ background: `${primaryColor}22`, color: primaryColor }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                        <h3 className="text-2xl font-black uppercase tracking-widest mb-3">Transmission Sent</h3>
                                        <p className="text-gray-500 font-semibold uppercase tracking-widest text-xs">We'll respond to your signal shortly.</p>
                                        <button
                                            onClick={() => reset()}
                                            className="mt-8 text-xs font-black uppercase tracking-widest border-b transition-colors"
                                            style={{ color: primaryColor, borderBottomColor: primaryColor }}
                                        >
                                            Send Another
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={submit} className="space-y-8 relative z-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <FloatingInput id="name" label="Agent Name" value={data.name} onChange={e => setData('name', e.target.value)} error={errors.name} />
                                            <FloatingInput id="email" label="Secure Email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} error={errors.email} />
                                        </div>
                                        <FloatingInput id="subject" label="Subject / Mission Brief" value={data.subject} onChange={e => setData('subject', e.target.value)} error={errors.subject} />
                                        <FloatingInput id="message" label="Full Message" value={data.message} onChange={e => setData('message', e.target.value)} error={errors.message} multiline />

                                        <motion.button
                                            type="submit"
                                            disabled={processing}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 text-black font-black uppercase tracking-widest text-sm rounded-lg disabled:opacity-60 transition-opacity"
                                            style={{ background: processing ? '#555' : primaryColor }}
                                        >
                                            {processing ? 'Transmitting...' : 'Send Transmission →'}
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </main>

                <Footer settings={settings} />
            </div>
        </>
    );
}
