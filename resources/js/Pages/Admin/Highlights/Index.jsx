import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash, Image as ImageIcon, Film } from 'lucide-react';

export default function Index({ highlights }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this highlight?')) {
            destroy(route('admin.highlights.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                        Manage Highlights
                    </h2>
                    <Link
                        href={route('admin.highlights.create')}
                        className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 transition ease-in-out duration-150"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Highlight
                    </Link>
                </div>
            }
        >
            <Head title="Highlights" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/5">
                                <thead className="bg-black/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Media</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Details</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Order</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-transparent divide-y divide-white/5">
                                    {highlights.map((highlight) => (
                                        <tr key={highlight.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-16 w-24 rounded bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden border border-white/5">
                                                    {highlight.media_type === 'video' ? (
                                                        <div className="relative w-full h-full">
                                                            <video src={highlight.media_path} className="w-full h-full object-cover opacity-50" />
                                                            <Film className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white drop-shadow" />
                                                        </div>
                                                    ) : (
                                                        <div className="relative w-full h-full">
                                                            <img src={highlight.media_path} className="w-full h-full object-cover" alt={highlight.title} />
                                                            <ImageIcon className="absolute bottom-1 right-1 w-4 h-4 text-white drop-shadow opacity-75" />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-white font-bold uppercase tracking-wider">{highlight.title}</div>
                                                <div className="text-xs text-gray-400 mt-1 line-clamp-2 max-w-xs whitespace-normal">{highlight.description || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-400">
                                                {highlight.display_order}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.highlights.edit', highlight.id)} className="text-pink-500 hover:text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)] mr-4">
                                                    <Edit className="w-4 h-4 inline" />
                                                </Link>
                                                <button onClick={() => handleDelete(highlight.id)} className="text-red-500 hover:text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
                                                    <Trash className="w-4 h-4 inline" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {highlights.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-400">
                                                No highlights found. Upload some amazing photos or videos!
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
