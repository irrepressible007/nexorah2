import { Link } from '@inertiajs/react';
import SeoMeta from '@/Components/SeoMeta';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import PageHero from '@/Components/PageHero';
import { motion } from 'framer-motion';

const readingTime = (content) => Math.max(1, Math.ceil((content?.split(' ')?.length || 200) / 200));

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } };

export default function Index({ posts, settings }) {
    const primaryColor = settings?.primary_color || '#ec4899';
    const allPosts = posts.data || [];
    const [featured, ...rest] = allPosts;

    return (
        <>
            <SeoMeta title="Intel (Blog)" description="News, insights, and behind the scenes from Nexorah." />
            <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white">
                <Navbar settings={settings} currentPage="blog.index" />

                <PageHero
                    title="Latest Intel"
                    highlightWord="Intel"
                    subtitle="News, insights, and behind the scenes."
                    primaryColor={primaryColor}
                />

                <main className="px-6 lg:px-20 max-w-7xl mx-auto pb-32">
                    {allPosts.length > 0 ? (
                        <>
                            {/* Featured Post */}
                            {featured && (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="mb-16"
                                >
                                    <Link href={route('blog.show', featured.slug)} className="group block">
                                        <div
                                            className="relative rounded-2xl overflow-hidden border border-white/5 transition-all duration-500"
                                            onMouseEnter={e => {
                                                e.currentTarget.style.borderColor = `${primaryColor}44`;
                                                e.currentTarget.style.boxShadow = `0 0 40px ${primaryColor}18`;
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            <div className="grid md:grid-cols-2">
                                                <div className="aspect-video md:aspect-auto md:h-72 overflow-hidden bg-zinc-900">
                                                    <img
                                                        src={featured.cover_image || `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop`}
                                                        alt={featured.title}
                                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                                    />
                                                </div>
                                                <div className="p-8 md:p-10 flex flex-col justify-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: `${primaryColor}22`, color: primaryColor }}>
                                                            Featured
                                                        </span>
                                                        <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                                                            {readingTime(featured.content)} min read
                                                        </span>
                                                    </div>
                                                    <p className="text-xs uppercase tracking-widest mb-3 font-bold" style={{ color: primaryColor }}>
                                                        {new Date(featured.published_at || featured.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 group-hover:text-gray-200 transition-colors">
                                                        {featured.title}
                                                    </h3>
                                                    <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider mt-auto pt-4 border-t border-white/5">
                                                        <span>By {featured.author || 'Nexorah'}</span>
                                                        <span className="group-hover:text-white transition-colors font-bold" style={{ color: primaryColor }}>
                                                            Read Article →
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )}

                            {/* Remaining Posts Grid */}
                            {rest.length > 0 && (
                                <>
                                    <div className="flex items-center gap-6 mb-10">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-500">All Dispatches</span>
                                        <div className="flex-1 h-px bg-white/5" />
                                    </div>
                                    <motion.div
                                        variants={container}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    >
                                        {rest.map((post) => (
                                            <motion.div key={post.id} variants={item}>
                                                <Link href={route('blog.show', post.slug)} className="group block h-full">
                                                    <div
                                                        className="h-full rounded-2xl overflow-hidden border border-white/5 flex flex-col transition-all duration-400"
                                                        onMouseEnter={e => {
                                                            e.currentTarget.style.borderColor = `${primaryColor}44`;
                                                            e.currentTarget.style.boxShadow = `0 0 30px ${primaryColor}14, 0 20px 60px rgba(0,0,0,0.5)`;
                                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                                        }}
                                                        onMouseLeave={e => {
                                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                                            e.currentTarget.style.boxShadow = 'none';
                                                            e.currentTarget.style.transform = 'translateY(0)';
                                                        }}
                                                    >
                                                        {/* Accent top border */}
                                                        <div
                                                            className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                                                            style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}
                                                        />
                                                        <div className="aspect-video overflow-hidden bg-zinc-900">
                                                            <img
                                                                src={post.cover_image || `https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop&sig=${post.id}`}
                                                                alt={post.title}
                                                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                                            />
                                                        </div>
                                                        <div className="p-6 flex flex-col flex-1" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                                            <div className="flex items-center gap-3 mb-3">
                                                                <p className="text-xs uppercase tracking-widest font-bold" style={{ color: primaryColor }}>
                                                                    {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                                </p>
                                                                <span className="text-xs text-gray-600 uppercase tracking-wider font-bold">
                                                                    {readingTime(post.content)} min
                                                                </span>
                                                            </div>
                                                            <h3 className="text-lg font-black text-white mb-4 line-clamp-2 leading-snug">{post.title}</h3>
                                                            <div className="mt-auto flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider pt-4 border-t border-white/5">
                                                                <span>By {post.author || 'Nexorah'}</span>
                                                                <span className="group-hover:text-white transition-colors">Read →</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-600 uppercase tracking-widest text-center py-24 text-sm">No transmissions at this time.</p>
                    )}

                    {/* Pagination */}
                    {(posts.prev_page_url || posts.next_page_url) && (
                        <div className="mt-16 flex justify-between items-center border-t border-white/5 pt-8">
                            {posts.prev_page_url ? (
                                <Link href={posts.prev_page_url} className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">← Newer</Link>
                            ) : <div />}
                            {posts.next_page_url ? (
                                <Link href={posts.next_page_url} className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Older →</Link>
                            ) : <div />}
                        </div>
                    )}
                </main>

                <Footer settings={settings} />
            </div>
        </>
    );
}
