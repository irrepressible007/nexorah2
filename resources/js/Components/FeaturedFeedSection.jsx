import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Send, Sparkles } from 'lucide-react';
import { useForm, router } from '@inertiajs/react';

function FeaturedFeedCard({ feed, primaryColor }) {
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        comment: ''
    });

    const handleLike = () => {
        if (!liked) {
            router.post(route('featured-feeds.like', feed.id), {}, { preserveScroll: true });
            setLiked(true);
            feed.likes_count += 1;
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        post(route('featured-feeds.comment', feed.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                feed.comments.unshift({
                    id: Date.now(),
                    name: data.name,
                    comment: data.comment,
                    created_at: new Date().toISOString()
                });
            }
        });
    };

    const feedDate = new Date(feed.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: `0 20px 40px -10px ${primaryColor}40` }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col w-full max-w-sm mx-auto snap-center shrink-0 bg-zinc-900/40 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden"
        >
            {/* Top Header */}
            <div className="p-6 pb-4 flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${primaryColor}, #a855f7)` }}
                        >
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">Nexorah Exclusives</h3>
                        <p className="text-gray-400 text-xs font-semibold tracking-wider mt-1">{feedDate}</p>
                    </div>
                </div>
            </div>

            {/* Rich Text Content */}
            <div className="px-6 pb-4">
                <div 
                    className="text-gray-300 text-sm leading-relaxed nexorah-prose font-light"
                    dangerouslySetInnerHTML={{ __html: feed.content }}
                />
            </div>

            {/* Attached Image (Padded instead of full bleed) */}
            {feed.image_path && (
                <div className="px-4 pb-4">
                    <div className="relative rounded-2xl overflow-hidden group">
                        <img 
                            src={feed.image_path} 
                            alt="Featured post" 
                            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>
            )}

            {/* Engagement Stats & Actions (Modern minimalist) */}
            <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                <div className="flex gap-6">
                    <button 
                        onClick={handleLike}
                        className="flex items-center gap-2 group transition-all"
                    >
                        <Heart 
                            className={`w-6 h-6 transition-colors duration-300 ${liked ? 'fill-pink-500 text-pink-500' : 'text-gray-400 group-hover:text-pink-400'}`} 
                        />
                        <span className={`text-sm font-bold ${liked ? 'text-pink-500' : 'text-gray-400 group-hover:text-pink-400'}`}>
                            {feed.likes_count}
                        </span>
                    </button>

                    <button 
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center gap-2 group transition-all"
                    >
                        <MessageSquare className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        <span className="text-sm font-bold text-gray-400 group-hover:text-purple-400">
                            {feed.comments ? feed.comments.length : 0}
                        </span>
                    </button>
                </div>
            </div>

            {/* Modern Comments Section */}
            <AnimatePresence>
                {showComments && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-white/5 bg-black/40"
                    >
                        <div className="p-6">
                            <form onSubmit={handleCommentSubmit} className="mb-6 flex flex-col gap-3">
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm px-4 py-3 focus:ring-2 focus:border-transparent transition-all"
                                    style={{ '--tw-ring-color': primaryColor }}
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Add a comment..." 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm px-4 py-3 pr-12 focus:ring-2 focus:border-transparent transition-all"
                                        style={{ '--tw-ring-color': primaryColor }}
                                        value={data.comment}
                                        onChange={e => setData('comment', e.target.value)}
                                        required
                                    />
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white disabled:opacity-50"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>

                            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {feed.comments && feed.comments.map(comment => (
                                    <div key={comment.id} className="flex gap-3">
                                        <div 
                                            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white uppercase shadow-lg"
                                            style={{ background: `linear-gradient(to right, ${primaryColor}, #a855f7)` }}
                                        >
                                            {comment.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="text-white text-xs font-bold uppercase tracking-wider">{comment.name}</h4>
                                                <span className="text-[10px] text-gray-500 font-semibold">{new Date(comment.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-300 text-sm font-light leading-relaxed">{comment.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FeaturedFeedSection({ feeds, primaryColor }) {
    if (!feeds || feeds.length === 0) return null;

    return (
        <section className="py-32 relative z-10 overflow-hidden bg-zinc-950 border-t border-b border-zinc-900">
            {/* Background Glow */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-20">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 relative z-10"
                >
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                        Featured <span style={{ color: primaryColor }}>Updates</span>
                    </h3>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto uppercase tracking-widest text-sm font-semibold">
                        Exclusive insights and announcements
                    </p>
                </motion.div>

                <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory custom-scrollbar hide-scrollbar-on-mobile relative z-10">
                    {feeds.map((feed) => (
                        <FeaturedFeedCard key={feed.id} feed={feed} primaryColor={primaryColor} />
                    ))}
                </div>
            </div>
        </section>
    );
}
