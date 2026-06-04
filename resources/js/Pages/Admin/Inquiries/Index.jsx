import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ inquiries }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this inquiry?')) {
            destroy(route('admin.inquiries.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                    Contact Inquiries
                </h2>
            }
        >
            <Head title="Contact Inquiries" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-2xl sm:rounded-2xl dark:bg-zinc-900 border dark:border-zinc-800">
                        <div className="p-6 text-white font-bold">
                            
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b dark:border-zinc-700">
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Subject</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inquiries.data && inquiries.data.map((inquiry) => (
                                        <tr key={inquiry.id} className="border-b dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                            <td className="p-3">
                                                {inquiry.status === 'unread' ? (
                                                    <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded font-bold uppercase">New</span>
                                                ) : (
                                                    <span className="text-gray-500 text-xs uppercase">Read</span>
                                                )}
                                            </td>
                                            <td className="p-3 font-semibold">{inquiry.name}</td>
                                            <td className="p-3 text-sm">{inquiry.email}</td>
                                            <td className="p-3 text-sm">{inquiry.subject}</td>
                                            <td className="p-3 text-sm text-gray-400">{new Date(inquiry.created_at).toLocaleDateString()}</td>
                                            <td className="p-3 space-x-3">
                                                <Link href={route('admin.inquiries.show', inquiry.id)} className="text-pink-500 hover:text-pink-400 font-semibold">View</Link>
                                                <button onClick={() => handleDelete(inquiry.id)} className="text-red-500 hover:text-red-400 font-semibold">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!inquiries.data || inquiries.data.length === 0) && (
                                        <tr>
                                            <td colSpan="6" className="p-6 text-center text-gray-500">No inquiries found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
