import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Index({ subscribers }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                        Vanguard Subscribers
                    </h2>
                    <span className="text-sm text-gray-400">Total: {subscribers.total}</span>
                </div>
            }
        >
            <Head title="Subscribers" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mb-4 rounded-md bg-green-50 dark:bg-green-900/30 p-4">
                            <div className="text-sm font-medium text-green-800 dark:text-green-400">
                                {flash.success}
                            </div>
                        </div>
                    )}

                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md overflow-hidden">
                        <table className="min-w-full divide-y divide-white/5">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Subscribed At</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#111] border border-white/5 divide-y divide-white/5">
                                {subscribers.data.length > 0 ? subscribers.data.map((sub) => (
                                    <tr key={sub.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-bold">
                                            {sub.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {new Date(sub.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link 
                                                href={route('admin.subscribers.destroy', sub.id)} 
                                                method="delete" 
                                                as="button" 
                                                className="text-red-600 dark:text-red-400 hover:text-red-900"
                                            >
                                                Remove
                                            </Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                                            No subscribers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
