import { motion } from 'framer-motion';

/**
 * PageHero — Shared animated hero header for all inner pages.
 * Usage:
 *   <PageHero
 *     title="The Spectacles"
 *     highlightWord="Spectacles"
 *     subtitle="Upcoming and past events engineered for unforgettable experiences."
 *     primaryColor="#ec4899"
 *   />
 */
export default function PageHero({ title, highlightWord, subtitle, primaryColor = '#ec4899', children }) {
    // Build title with highlighted last word (or specific word)
    const words = title ? title.split(' ') : [];
    const highlight = highlightWord || words[words.length - 1];

    return (
        <div className="pt-40 pb-20 px-6 lg:px-20 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {/* Thin accent line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="h-px w-24 mb-8 origin-left"
                    style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }}
                />

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                    {words.map((word, i) => (
                        <span key={i}>
                            {word === highlight ? (
                                <span style={{ color: primaryColor }}>{word}</span>
                            ) : (
                                <span className="text-white">{word}</span>
                            )}
                            {i < words.length - 1 ? ' ' : ''}
                        </span>
                    ))}
                </h2>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="text-gray-400 max-w-2xl uppercase tracking-widest text-sm font-semibold leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {children && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8"
                    >
                        {children}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
