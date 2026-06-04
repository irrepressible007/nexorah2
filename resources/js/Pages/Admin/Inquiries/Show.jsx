import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ inquiry }) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this inquiry?')) {
            destroy(route('admin.inquiries.destroy', inquiry.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                        View Inquiry
                    </h2>
                    <Link
                        href={route('admin.inquiries.index')}
                        className="rounded bg-zinc-700 px-4 py-2 text-white hover:bg-zinc-600 font-semibold text-sm"
                    >
                        Back to List
                    </Link>
                </div>
            }
        >
            <Head title={`Inquiry from ${inquiry.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-2xl sm:rounded-2xl dark:bg-zinc-900 border dark:border-zinc-800 p-8">
                        
                        <div className="mb-8 border-b dark:border-zinc-800 pb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{inquiry.subject}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span>From: <strong className="text-white">{inquiry.name}</strong> ({inquiry.email})</span>
                                <span>&bull;</span>
                                <span>{new Date(inquiry.created_at).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-8">
                            {inquiry.message}
                        </div>

                        <div className="flex gap-4 pt-6 border-t dark:border-zinc-800">
                            <a 
                                href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`}
                                className="bg-pink-600 hover:bg-pink-500 text-white font-semibold py-2 px-6 rounded transition"
                            >
                                Reply via Email
                            </a>
                            <button 
                                onClick={handleDelete}
                                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-6 rounded transition"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
