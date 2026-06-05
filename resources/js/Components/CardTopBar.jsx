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
        <div className="absolute top-0 left-0 w-full p-5 flex flex-col gap-3 z-20 pointer-events-none">
            {/* Top Row: Status (Left) and Date (Right) */}
            <div className="flex justify-between items-start w-full gap-2">
                <span className="px-3 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] rounded bg-black/80 backdrop-blur-md border border-white/20 flex items-center gap-2 text-white shadow-2xl">
                    {(statusLabel === 'upcoming' || statusLabel === 'ongoing') && <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: primaryColor }} />}
                    {statusLabel}
                </span>
                <span className="px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-2xl">
                    {event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'TBA'}
                </span>
            </div>

            {/* Timer Row */}
            {statusLabel === 'upcoming' && timeLeft && (
                <div className="self-center mt-2 px-5 py-2 rounded-lg bg-black/90 backdrop-blur-md border-2 font-bold text-base sm:text-lg tracking-[0.2em] text-white shadow-[0_0_30px_rgba(0,0,0,0.8)]" style={{ borderColor: primaryColor, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    {timeLeft}
                </div>
            )}
        </div>
    );
}
