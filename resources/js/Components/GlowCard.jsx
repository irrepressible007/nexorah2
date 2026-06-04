import { motion } from 'framer-motion';

/**
 * GlowCard — A premium glassmorphism card wrapper with neon border hover.
 * Usage: <GlowCard primaryColor="#ec4899" className="p-6">...</GlowCard>
 */
export default function GlowCard({ children, className = '', primaryColor = '#ec4899', onClick, as: Tag = 'div' }) {
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={onClick}
            className={`relative rounded-2xl overflow-hidden cursor-default ${className}`}
            style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.06)',
                '--glow-color': primaryColor,
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${primaryColor}55`;
                e.currentTarget.style.boxShadow = `0 0 24px ${primaryColor}22, 0 20px 60px rgba(0,0,0,0.5)`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {children}
        </motion.div>
    );
}
