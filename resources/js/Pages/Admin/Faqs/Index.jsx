import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ faqs }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this FAQ?')) {
            destroy(route('admin.faqs.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                        FAQs
                    </h2>
                    <Link
                        href={route('admin.faqs.create')}
                        className="rounded bg-pink-600 px-4 py-2 text-white hover:bg-pink-500 font-semibold"
                    >
                        Add FAQ
                    </Link>
                </div>
            }
        >
            <Head title="FAQs" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-2xl sm:rounded-2xl dark:bg-zinc-900 border dark:border-zinc-800">
                        <div className="p-6 text-white font-bold">
                            
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b dark:border-zinc-700">
                                        <th className="p-3">Order</th>
                                        <th className="p-3">Question</th>
                                        <th className="p-3">Answer</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {faqs.map((faq) => (
                                        <tr key={faq.id} className="border-b dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                            <td className="p-3">{faq.order}</td>
                                            <td className="p-3 font-semibold">{faq.question}</td>
                                            <td className="p-3 text-sm text-gray-400 line-clamp-1">{faq.answer}</td>
                                            <td className="p-3 space-x-3">
                                                <Link href={route('admin.faqs.edit', faq.id)} className="text-pink-500 hover:text-pink-400 font-semibold">Edit</Link>
                                                <button onClick={() => handleDelete(faq.id)} className="text-red-500 hover:text-red-400 font-semibold">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {faqs.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="p-6 text-center text-gray-500">No FAQs found.</td>
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
