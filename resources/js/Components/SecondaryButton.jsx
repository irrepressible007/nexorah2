import { motion } from 'framer-motion';

export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <motion.button
            {...props}
            type={type}
            whileHover={!disabled ? { scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            className={
                `inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] ${
                    disabled && 'opacity-50 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}
