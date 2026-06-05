import { useState, useEffect } from 'react';

export default function CardTopBar({ event, primaryColor }) {
    const [timeLeft, setTimeLeft] = useState(null);
    const [statusLabel, setStatusLabel] = useState(event.status);

    useEffect(() => {
        if (event.status !== 'upcoming' || !event.event_date) {
            setStatusLabel(event.status);
            return;
        }
        const calc = () => {
            const diff = new Date(event.event_date) - new Date();
            if (diff <= 0) {
                setTimeLeft(null);
                setStatusLabel('ongoing');
                return;
            }
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
            const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
            const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
            setTimeLeft(`${d}D : ${h}H : ${m}M : ${s}S`);
            setStatusLabel('upcoming');
        };
        calc();
        const id = setInterval(calc, 1000);
        return () => clearInterval(id);
    }, [event.event_date, event.status]);

    return (
        <div className="absolute top-0 left-0 w-full p-4 flex flex-col md:flex-row gap-3 justify-between items-start md:items-start z-20 pointer-events-none">
            {/* Status and Date */}
            <div className="flex flex-col gap-2 items-start">
                <span className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center gap-2 text-white shadow-xl">
                    {(statusLabel === 'upcoming' || statusLabel === 'ongoing') && <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: primaryColor }} />}
                    {statusLabel}
                </span>
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-gray-300 shadow-xl">
                    {event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'TBA'}
                </span>
            </div>

            {/* Timer */}
            {statusLabel === 'upcoming' && timeLeft && (
                <div className="px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border font-bold text-base tracking-widest text-white shadow-2xl" style={{ borderColor: `${primaryColor}40` }}>
                    {timeLeft}
                </div>
            )}
        </div>
    );
}
