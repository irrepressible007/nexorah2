import { Link, useForm, usePage } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { TextHoverEffect, FooterBackgroundGradient } from './ui/hover-footer';

const SocialIcon = ({ href, label, children, delay }) => (
    href ? (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
            whileHover={{ y: -5, scale: 1.15, rotate: 5, boxShadow: "0 10px 25px -5px rgba(236,72,153,0.4)" }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 relative group overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">{children}</span>
        </motion.a>
    ) : null
);

export default function Footer({ settings }) {
    const primaryColor = settings?.primary_color || '#ec4899';
    const { props } = usePage();
    const flash = props.flash || {};

    const { data, setData, post, processing, errors, reset } = useForm({ email: '' });
    const [subscribed, setSubscribed] = useState(false);
    
    // Parallax effect for the background orbs
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end end"] });
    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    const submit = (e) => {
        e.preventDefault();
        post(route('subscribe'), {
            preserveScroll: true,
            onSuccess: () => { setSubscribed(true); reset('email'); setTimeout(() => setSubscribed(false), 5000); },
        });
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer ref={containerRef} className="bg-black pt-32 pb-12 px-6 lg:px-20 font-sans text-white relative overflow-hidden selection:bg-pink-500 selection:text-white">
            
            {/* Animated Gradient Top Border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />
            
            {/* Dynamic Orbs */}
            <motion.div style={{ y: y1 }} className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-30" style={{ background: primaryColor }} />
            <motion.div style={{ y: y2 }} className="absolute top-0 -right-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-20" style={{ background: '#a855f7' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">

                    {/* Brand & Socials (Spans 4 columns) */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                        <Link href="/">
                            <motion.img
                                whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                                src="/logo/Nexorah New logo.png"
                                alt="Nexorah Logo"
                                className="h-16 w-auto mb-8 inline-block drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-loose pr-4 mb-10 font-medium">
                            {settings?.homepage_subtitle || 'Nexorah creates breathtaking, unforgettable events. Welcome to the next level of event management.'}
                        </p>
                        
                        <div className="flex gap-4 flex-wrap">
                            <SocialIcon href={settings?.social_facebook} label="Facebook" delay={0.1}>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </SocialIcon>
                            <SocialIcon href={settings?.social_twitter} label="Twitter / X" delay={0.2}>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </SocialIcon>
                            <SocialIcon href={settings?.social_instagram} label="Instagram" delay={0.3}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                            </SocialIcon>
                            <SocialIcon href={settings?.social_linkedin} label="LinkedIn" delay={0.4}>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Navigation (Spans 2 columns) */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8" style={{ color: primaryColor }}>Navigate</h3>
                        <ul className="space-y-4">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'Events', href: route('events.index') },
                                { label: 'Blog', href: route('blog.index') },
                                { label: 'About', href: route('about') },
                                { label: 'Contact', href: route('contact') },
                            ].map((link, i) => (
                                <motion.li 
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-sm font-semibold tracking-widest uppercase text-gray-400 hover:text-white transition-all group flex items-center gap-3 w-fit"
                                    >
                                        <span className="w-0 group-hover:w-4 h-[2px] transition-all duration-300 rounded-full" style={{ background: primaryColor }} />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact HQ (Spans 2 columns) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8" style={{ color: primaryColor }}>HQ</h3>
                        <address className="not-italic text-sm text-gray-400 space-y-5 font-medium leading-loose">
                            <motion.p whileHover={{ x: 5 }} className="transition-transform duration-300">
                                {settings?.contact_address || '123 Vice City Blvd, Neon District'}
                            </motion.p>
                            <motion.p whileHover={{ x: 5 }} className="transition-transform duration-300">
                                <a href={`mailto:${settings?.contact_email || 'contact@nexorah.com'}`} className="hover:text-pink-400 transition-colors">
                                    {settings?.contact_email || 'contact@nexorah.com'}
                                </a>
                            </motion.p>
                            <motion.p whileHover={{ x: 5 }} className="transition-transform duration-300">
                                <a href={`tel:${settings?.contact_phone || ''}`} className="hover:text-pink-400 transition-colors">
                                    {settings?.contact_phone || '+1 (555) 123-4567'}
                                </a>
                            </motion.p>
                        </address>
                    </div>

                    {/* Newsletter (Spans 4 columns) */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-3 text-white flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor }} />
                                    Join The Vanguard
                                </h3>
                                <p className="text-sm text-gray-400 mb-6 leading-relaxed font-medium">Subscribe for classified updates, VIP drops, and exclusive invites.</p>

                                <form onSubmit={submit} className="flex flex-col gap-4">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="ENTER YOUR EMAIL"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl text-white text-sm px-5 py-4 focus:outline-none transition-all duration-300 placeholder:text-gray-600 placeholder:tracking-widest placeholder:uppercase font-medium focus:border-pink-500 focus:bg-black"
                                            style={{ borderColor: errors.email ? 'red' : '' }}
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        disabled={processing}
                                        whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]"
                                        style={{ background: primaryColor }}
                                    >
                                        {processing ? 'Connecting...' : 'Initialize'}
                                    </motion.button>
                                </form>

                                {errors.email && <p className="text-red-500 text-xs mt-3 font-bold">{errors.email}</p>}
                                {(subscribed || flash.success) && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs mt-4 uppercase tracking-widest font-black flex items-center gap-2"
                                        style={{ color: primaryColor }}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        {flash.success || 'Welcome to the Vanguard.'}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text hover effect */}
                <div className="flex h-[8rem] sm:h-[12rem] md:h-[16rem] lg:h-[20rem] mt-4 lg:-mt-10 mb-10 w-full items-center justify-center">
                    <TextHoverEffect text="NEXORAH" className="z-50 w-full h-full" />
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 relative z-50">
                    <p className="text-xs text-gray-500 font-bold tracking-[0.2em] uppercase order-2 md:order-1 mt-6 md:mt-0">
                        © {new Date().getFullYear()} Nexorah. All Rights Reserved.
                    </p>
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ y: -5, scale: 1.1, backgroundColor: "rgba(236,72,153,0.2)" }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all order-1 md:order-2 border border-white/10 backdrop-blur-sm"
                        title="Back to top"
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 11l-5-5-5 5M12 18V7"/></svg>
                    </motion.button>
                </div>
            </div>

            <FooterBackgroundGradient />
        </footer>
    );
}
