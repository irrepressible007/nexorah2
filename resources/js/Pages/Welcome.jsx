import { Link } from '@inertiajs/react';
import SeoMeta from '@/Components/SeoMeta';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Welcome({ auth, events, settings, testimonials, partners, highlights }) {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

    // Ensure we have a default hex code format if the user enters something else
    const primaryColor = settings?.primary_color || '#ec4899'; 

    return (
        <>
            <SeoMeta 
                title={settings?.homepage_title || "Home"} 
                description={settings?.homepage_subtitle}
                image={settings?.homepage_cover_url}
            />
            
            {/* Global Wrapper: Dark Mode Default, GTA Style */}
            <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden">
                
                <Navbar settings={settings} currentPage="home" auth={auth} />

                {/* Hero Section - Edge to Edge Image */}
                <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                    {/* Background Image with Parallax */}
                    <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
                        <img 
                            src={settings?.homepage_cover_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"} 
                            alt="Concert Crowd" 
                            className="w-full h-full object-cover opacity-60"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black"></div>
                    </motion.div>

                    {/* Hero Content */}
                    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-6xl md:text-8xl lg:text-[130px] font-black uppercase tracking-tighter leading-none text-transparent bg-clip-text pb-4"
                            style={{ backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, #a855f7, #eab308)` }}
                        >
                            {settings?.homepage_title ? (
                                settings.homepage_title.split(' ').map((word, i) => (
                                    <span key={i}>{word} {i === 0 ? <br/> : ''}</span>
                                ))
                            ) : (
                                <>Experience<br/>The Grandeur</>
                            )}
                        </motion.h2>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light"
                        >
                            {settings?.homepage_subtitle || "Nexorah creates breathtaking, unforgettable events. Welcome to the next level of event management."}
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="mt-12"
                        >
                            <Link href={route('events.index')} className="inline-block px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all duration-300" style={{ ':hover': { backgroundColor: primaryColor, color: 'white' } }}>
                                Discover Events
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Upcoming Events Section */}
                <section className="py-32 px-6 lg:px-20 bg-black">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-16 border-l-4 pl-6" style={{ borderColor: primaryColor }}>
                            Upcoming <span className="text-gray-600">Spectacles</span>
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events && events.length > 0 ? (
                            events.map((event, index) => (
                                <Link 
                                    href={route('events.show', event.slug)}
                                    key={event.id}
                                    className="block group relative cursor-pointer"
                                >
                                    <motion.div 
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.1 * index }}
                                    >
                                        <div className="aspect-[4/5] overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800">
                                            <img src={event.cover_image || `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop&sig=${event.id}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 mix-blend-luminosity hover:mix-blend-normal" alt={event.title} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <p className="font-bold uppercase tracking-widest text-xs mb-2" style={{ color: primaryColor }}>
                                                {event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'TBA'}
                                            </p>
                                            <h4 className="text-2xl font-bold uppercase tracking-wide text-white drop-shadow-md">{event.title}</h4>
                                            <p className="text-gray-400 mt-2 line-clamp-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{event.description?.replace(/<[^>]+>/g, '')}</p>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-500 uppercase tracking-widest col-span-full">More spectacular events coming soon...</p>
                        )}
                    </div>

                    {events && events.length > 0 && (
                        <div className="mt-16 flex justify-center">
                            <Link 
                                href={route('events.index')} 
                                className="inline-block px-10 py-4 font-bold text-white uppercase tracking-widest text-sm rounded-full transition-all duration-300 bg-transparent border-2 hover:bg-white hover:text-black hover:-translate-y-1"
                                style={{ borderColor: primaryColor }}
                            >
                                Show All Events
                            </Link>
                        </div>
                    )}
                </section>

                {/* Highlights Marquee Section */}
                {(() => {
                    const dummyHighlights = [
                        { id: 'd1', title: 'Grand Opening Night', description: 'A night to remember forever', media_type: 'image', media_path: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&auto=format&fit=crop' },
                        { id: 'd2', title: 'Neon Stage Show', description: 'Lights, beats, and pure energy', media_type: 'image', media_path: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700&auto=format&fit=crop' },
                        { id: 'd3', title: 'VIP Gala Evening', description: 'Elegance meets extravagance', media_type: 'image', media_path: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=700&auto=format&fit=crop' },
                        { id: 'd4', title: 'Fire & Sound Festival', description: 'Where the crowd becomes one', media_type: 'image', media_path: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&auto=format&fit=crop' },
                        { id: 'd5', title: 'Afterparty Legends', description: 'The night never truly ends', media_type: 'image', media_path: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&auto=format&fit=crop' },
                        { id: 'd6', title: 'Campus Takeover', description: 'Youth, vision, and power', media_type: 'image', media_path: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=700&auto=format&fit=crop' },
                        { id: 'd7', title: 'Rooftop Soirée', description: 'Above the city, above the rest', media_type: 'image', media_path: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=700&auto=format&fit=crop' },
                    ];
                    const displayItems = (highlights && highlights.length > 0) ? highlights : dummyHighlights;
                    return (
                    <section className="py-24 bg-black overflow-hidden border-t border-zinc-900">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16 px-6"
                        >
                            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                                {settings?.homepage_highlights_title
                                    ? (
                                        <>
                                            {settings.homepage_highlights_title.split(' ').slice(0, -1).join(' ')}{' '}
                                            <span style={{ color: primaryColor }}>
                                                {settings.homepage_highlights_title.split(' ').slice(-1)}
                                            </span>
                                        </>
                                    )
                                    : (<>Our <span style={{ color: primaryColor }}>Masterpieces</span></>)
                                }
                            </h3>
                            {settings?.homepage_highlights_subtitle && (
                                <p className="text-gray-400 mt-4 max-w-2xl mx-auto uppercase tracking-widest text-sm font-semibold">
                                    {settings.homepage_highlights_subtitle}
                                </p>
                            )}
                        </motion.div>

                        {/* Infinite Marquee Track */}
                        <div className="relative">
                            {/* Left / Right fade gradients */}
                            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
                            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

                            <div
                                className="flex gap-6 w-max"
                                style={{
                                    animation: 'nexorah-marquee 40s linear infinite',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                                onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
                            >
                                {/* Render items twice for seamless loop */}
                                {[...displayItems, ...displayItems].map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative flex-shrink-0 w-72 h-52 md:w-96 md:h-64 rounded-2xl overflow-hidden group border border-white/5 shadow-2xl"
                                    >
                                        {item.media_type === 'video' ? (
                                            <video
                                                src={item.media_path}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <img
                                                src={item.media_path}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                                            <h4 className="text-white font-bold uppercase tracking-wider text-sm">{item.title}</h4>
                                            {item.description && (
                                                <p className="text-gray-300 text-xs mt-1 line-clamp-2">{item.description}</p>
                                            )}
                                        </div>
                                        {/* Subtle always-on bottom gradient */}
                                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <style>{`
                            @keyframes nexorah-marquee {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                        `}</style>
                    </section>
                    );
                })()}

                {/* Partners & Sponsors Section */}
                <section className="py-32 px-6 lg:px-20 bg-zinc-950 border-t border-b border-zinc-900">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                            Our <span style={{ color: primaryColor }}>Allies</span>
                        </h3>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto uppercase tracking-widest text-sm font-semibold">
                            The visionaries who make the grandeur possible
                        </p>
                    </motion.div>

                    <div className="overflow-hidden w-full relative pb-12 pt-4">
                        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-8 md:gap-12">
                            {partners && partners.length > 0 ? (
                                [...partners, ...partners].map((partner, index) => {
                                    const Content = (
                                        <div className="flex flex-col items-center justify-center text-center group cursor-pointer shrink-0 w-[85vw] md:w-[400px] h-auto min-h-[300px] bg-black border border-white/10 rounded-2xl shadow-2xl p-8 hover:border-pink-500/50 hover:-translate-y-2 transition-all duration-300">
                                            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-6">
                                                {partner.logo_image ? (
                                                    <img 
                                                        src={partner.logo_image} 
                                                        alt={partner.company_name} 
                                                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100" 
                                                    />
                                                ) : (
                                                    <span className="text-white/20 font-bold tracking-widest uppercase text-xs">No Logo</span>
                                                )}
                                            </div>
                                            <h4 className="text-xl font-bold text-white uppercase tracking-wider group-hover:text-pink-400 transition-colors">
                                                {partner.company_name}
                                            </h4>
                                            {partner.subtitle && (
                                                <p className="text-sm text-gray-500 uppercase tracking-widest mt-2 font-semibold">
                                                    {partner.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    );

                                    return partner.website_url ? (
                                        <a key={`${partner.id}-${index}`} href={partner.website_url} target="_blank" rel="noopener noreferrer" className="block shrink-0">
                                            {Content}
                                        </a>
                                    ) : (
                                        <div key={`${partner.id}-${index}`} className="block shrink-0">
                                            {Content}
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500 uppercase tracking-widest w-screen text-center">Partners will be unveiled soon.</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Animated Testimonials / Reviews Section */}
                <section className="py-32 px-6 lg:px-20 bg-zinc-950 relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
                            The <span style={{ color: primaryColor }}>Word</span> on the Street
                        </h3>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto uppercase tracking-widest text-sm font-semibold">What our legendary clients have to say</p>
                    </motion.div>

                    <div className="overflow-hidden w-full relative py-8">
                        <div className="flex w-max animate-marquee-rev hover:[animation-play-state:paused] gap-8">
                            {testimonials && testimonials.length > 0 ? (
                                [...testimonials, ...testimonials].map((testimonial, index) => (
                                    <div
                                        key={`${testimonial.id}-${index}`}
                                        className="bg-black border border-white/10 p-8 rounded-2xl shadow-2xl relative group shrink-0 w-[85vw] md:w-[400px] hover:scale-105 hover:rotate-1 transition-transform duration-300"
                                    >
                                        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: primaryColor, color: 'white' }}>
                                            "
                                        </div>
                                        <div className="flex text-yellow-500 mb-6 text-xl">
                                            {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                                        </div>
                                        <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed whitespace-normal">
                                            "{testimonial.review_text}"
                                        </p>
                                        <div className="mt-auto border-t border-white/10 pt-4">
                                            <h4 className="font-bold text-white uppercase tracking-wider">{testimonial.client_name}</h4>
                                            <p className="text-sm" style={{ color: primaryColor }}>{testimonial.client_company}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 uppercase tracking-widest w-screen text-center">Reviews will appear here shortly.</p>
                            )}
                        </div>
                    </div>
                </section>



                <Footer settings={settings} />
            </div>
        </>
    );
}
