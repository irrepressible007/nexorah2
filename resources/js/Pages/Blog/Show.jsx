import { Link } from '@inertiajs/react';
import SeoMeta from '@/Components/SeoMeta';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

export default function Show({ post, settings }) {
    const primaryColor = settings?.primary_color || '#ec4899';
    const cleanContent = DOMPurify.sanitize(post.content);
    const articleRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: articleRef, offset: ['start start', 'end end'] });
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const readTime = Math.max(1, Math.ceil((post.content?.split(' ')?.length || 200) / 200));

    return (
        <>
            <SeoMeta
                title={post.title}
                description={post.excerpt || post.content?.substring(0, 160)}
                image={post.cover_image}
            />
            <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white pb-32" ref={articleRef}>

                {/* Reading Progress Bar */}
                <motion.div
                    style={{
                        scaleX,
                        transformOrigin: 'left',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        zIndex: 9999,
                        background: `linear-gradient(90deg, ${primaryColor}, #a855f7)`,
                    }}
                />

                <Navbar settings={settings} currentPage="blog.index" />

                {/* Hero */}
                <div className="w-full h-[65vh] relative overflow-hidden bg-zinc-900">
                    <motion.img
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 7, ease: 'linear' }}
                        src={post.cover_image || `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop&sig=${post.id}`}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full px-6 lg:px-20 pb-12 max-w-4xl">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                            <div className="flex items-center gap-4 mb-4">
                                <p className="text-xs uppercase tracking-widest font-black" style={{ color: primaryColor }}>
                                    {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                                <span className="text-gray-600">·</span>
                                <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">{readTime} min read</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-lg">
                                {post.title}
                            </h1>
                            <p className="text-gray-400 mt-4 font-semibold tracking-widest uppercase text-xs">
                                By <span className="text-white">{post.author || 'Nexorah'}</span>
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Article Content */}
                <main className="px-6 lg:px-20 max-w-3xl mx-auto mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="nexorah-prose"
                        dangerouslySetInnerHTML={{ __html: cleanContent }}
                    />

                    {/* Author Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-20 rounded-2xl p-8 flex items-center gap-6"
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.07)',
                        }}
                    >
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black flex-shrink-0"
                            style={{ background: `${primaryColor}22`, color: primaryColor }}
                        >
                            {(post.author || 'N').charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Written by</p>
                            <p className="text-lg font-black text-white uppercase tracking-wider">{post.author || 'Nexorah'}</p>
                            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Nexorah Intelligence Division</p>
                        </div>
                    </motion.div>

                    {/* Back Link */}
                    <div className="mt-12 pt-8 border-t border-white/5">
                        <Link
                            href={route('blog.index')}
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors group"
                        >
                            <motion.span
                                animate={{ x: [-2, 2, -2] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                            >←</motion.span>
                            Back to Intel
                        </Link>
                    </div>
                </main>

                <Footer settings={settings} />
            </div>
        </>
    );
}
