import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, Users, MessageSquare, FileText } from 'lucide-react';

export default function Dashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                    Dashboard Overview
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md p-6 flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900/50 dark:text-blue-400">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Total Events</p>
                                <p className="text-2xl font-bold text-white font-bold">{stats.events_count}</p>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md p-6 flex items-center space-x-4">
                            <div className="p-3 bg-green-100 text-green-600 rounded-full dark:bg-green-900/50 dark:text-green-400">
                                <FileText size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Blog Posts</p>
                                <p className="text-2xl font-bold text-white font-bold">{stats.posts_count}</p>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md p-6 flex items-center space-x-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-full dark:bg-purple-900/50 dark:text-purple-400">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Total Inquiries</p>
                                <p className="text-2xl font-bold text-white font-bold">{stats.inquiries_count}</p>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md p-6 flex items-center space-x-4">
                            <div className="p-3 bg-red-100 text-red-600 rounded-full dark:bg-red-900/50 dark:text-red-400">
                                <Users size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Unread Inquiries</p>
                                <p className="text-2xl font-bold text-white font-bold">{stats.unread_inquiries}</p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
