import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash } from 'lucide-react';

export default function Index({ testimonials }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            destroy(route('admin.testimonials.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                        Manage Testimonials
                    </h2>
                    <Link
                        href={route('admin.testimonials.create')}
                        className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 transition ease-in-out duration-150"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                    </Link>
                </div>
            }
        >
            <Head title="Testimonials" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/5">
                                <thead className="bg-black/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Client Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-transparent divide-y divide-white/5">
                                    {testimonials.data.map((testimonial) => (
                                        <tr key={testimonial.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-bold">
                                                {testimonial.client_name} <span className="text-gray-500 font-normal">({testimonial.client_company || 'N/A'})</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500">
                                                {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.testimonials.edit', testimonial.id)} className="text-pink-500 hover:text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)] mr-4">
                                                    <Edit className="w-4 h-4 inline" />
                                                </Link>
                                                <button onClick={() => handleDelete(testimonial.id)} className="text-red-500 hover:text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
                                                    <Trash className="w-4 h-4 inline" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {testimonials.data.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-400">
                                                No testimonials found.
                                            </td>
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
