import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ThumbsUp, MessageCircle, Send } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
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
            feed.likes_count += 1; // Optimistic update
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        post(route('featured-feeds.comment', feed.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                // Optimistic comment addition
                feed.comments.unshift({
                    id: Date.now(),
                    name: data.name,
                    comment: data.comment,
                    created_at: new Date().toISOString()
                });
            }
        });
    };

    // Format date similar to "9 April"
    const feedDate = new Date(feed.created_at);
    const dateFormatted = feedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });

    return (
        <motion.div 
            className="bg-[#18191A] rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex flex-col w-full max-w-lg mx-auto snap-center shrink-0"
            whileHover={{ y: -5 }}
        >
            {/* Header */}
            <div className="flex items-center p-4">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1">
                        <ApplicationLogo className="w-full h-full text-black" />
                    </div>
                    {/* Active Dot */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#18191A] rounded-full"></div>
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-white font-bold text-[15px] leading-tight">Nexorah</h3>
                    <div className="flex items-center text-[#B0B3B8] text-[13px] mt-0.5">
                        <span>{dateFormatted}</span>
                        <span className="mx-1">·</span>
                        <Globe className="w-3 h-3" />
                    </div>
                </div>
            </div>

            {/* Content / Caption */}
            <div className="px-4 pb-3">
                <div 
                    className="text-[#E4E6EB] text-[15px] leading-relaxed nexorah-prose"
                    dangerouslySetInnerHTML={{ __html: feed.content }}
                />
            </div>

            {/* Image attached */}
            {feed.image_path && (
                <div className="w-full bg-black">
                    <img 
                        src={feed.image_path} 
                        alt="Featured post" 
                        className="w-full max-h-[500px] object-contain"
                    />
                </div>
            )}

            {/* Engagement Stats */}
            <div className="px-4 py-2 flex items-center justify-between border-b border-white/10 text-[#B0B3B8] text-[13px]">
                <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                        <ThumbsUp className="w-2.5 h-2.5 text-white fill-current" />
                    </div>
                    <span>{feed.likes_count}</span>
                </div>
                <div>
                    <button onClick={() => setShowComments(!showComments)} className="hover:underline">
                        {feed.comments ? feed.comments.length : 0} comments
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-2 py-1 flex items-center justify-between">
                <button 
                    onClick={handleLike}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-[14px] transition-colors ${liked ? 'text-blue-500' : 'text-[#B0B3B8] hover:bg-white/5'}`}
                >
                    <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    Like
                </button>
                <button 
                    onClick={() => setShowComments(!showComments)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-[#B0B3B8] font-semibold text-[14px] hover:bg-white/5 rounded-lg transition-colors"
                >
                    <MessageCircle className="w-5 h-5" />
                    Comment
                </button>
            </div>

            {/* Comments Section */}
            <AnimatePresence>
                {showComments && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-white/5"
                    >
                        <div className="p-4 bg-[#141516]">
                            <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white uppercase">
                                    {data.name ? data.name.charAt(0) : 'U'}
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Your Name..." 
                                        className="w-full bg-[#3A3B3C] border-none rounded-full text-[#E4E6EB] text-[14px] px-4 py-1.5 focus:ring-1 focus:ring-pink-500"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder="Write a comment..." 
                                            className="w-full bg-[#3A3B3C] border-none rounded-full text-[#E4E6EB] text-[14px] px-4 py-2 pr-10 focus:ring-1 focus:ring-pink-500"
                                            value={data.comment}
                                            onChange={e => setData('comment', e.target.value)}
                                            required
                                        />
                                        <button 
                                            type="submit" 
                                            disabled={processing}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-pink-500 hover:text-pink-400 p-1"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                {feed.comments && feed.comments.map(comment => (
                                    <div key={comment.id} className="flex gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white uppercase mt-1">
                                            {comment.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-[#3A3B3C] rounded-2xl px-3 py-2 inline-block max-w-full">
                                                <h4 className="text-white text-[13px] font-bold leading-tight">{comment.name}</h4>
                                                <p className="text-[#E4E6EB] text-[14px] leading-tight mt-0.5">{comment.comment}</p>
                                            </div>
                                            <div className="text-[12px] text-[#B0B3B8] ml-2 mt-1">
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </div>
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
        <section className="py-16 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-2">
                            Featured <span style={{ color: primaryColor }}>Updates</span>
                        </h2>
                        <p className="text-gray-400 text-lg">Stay tuned with the latest announcements.</p>
                    </div>
                </div>

                <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory custom-scrollbar hide-scrollbar-on-mobile">
                    {feeds.map((feed) => (
                        <FeaturedFeedCard key={feed.id} feed={feed} primaryColor={primaryColor} />
                    ))}
                </div>
            </div>
        </section>
    );
}
