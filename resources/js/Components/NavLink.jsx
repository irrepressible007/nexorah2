import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'relative flex items-center px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-300 rounded-xl group overflow-hidden ' +
                (active
                    ? 'text-white bg-white/10'
                    : 'text-gray-500 hover:text-white hover:bg-white/5') +
                ' ' + className
            }
        >
            {active && (
                <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500 rounded-r-full shadow-[0_0_10px_rgba(236,72,153,0.8)]"
                />
            )}
            <span className={`relative z-10 ${active ? 'pl-2' : 'group-hover:pl-2'} transition-all duration-300`}>
                {children}
            </span>
        </Link>
    );
}
