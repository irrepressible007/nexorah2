import { motion } from 'framer-motion';

export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <motion.button
            {...props}
            whileHover={!disabled ? { scale: 1.02, filter: "brightness(1.1)" } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            className={
                `inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] ${
                    disabled && 'opacity-50 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}
