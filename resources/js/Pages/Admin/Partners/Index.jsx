import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash } from 'lucide-react';

export default function Index({ partners }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this partner?')) {
            destroy(route('admin.partners.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                        Manage Partners
                    </h2>
                    <Link
                        href={route('admin.partners.create')}
                        className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 transition ease-in-out duration-150"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Partner
                    </Link>
                </div>
            }
        >
            <Head title="Partners" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/5">
                                <thead className="bg-black/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Logo</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company & Subtitle</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Website</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-transparent divide-y divide-white/5">
                                    {partners.map((partner) => (
                                        <tr key={partner.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {partner.logo_image ? (
                                                    <img src={partner.logo_image} alt={partner.company_name} className="h-10 w-10 rounded object-contain bg-gray-100" />
                                                ) : (
                                                    <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500">None</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-white font-bold">{partner.company_name}</div>
                                                <div className="text-sm text-gray-400">{partner.subtitle || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {partner.website_url ? <a href={partner.website_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{partner.website_url}</a> : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.partners.edit', partner.id)} className="text-pink-500 hover:text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)] mr-4">
                                                    <Edit className="w-4 h-4 inline" />
                                                </Link>
                                                <button onClick={() => handleDelete(partner.id)} className="text-red-500 hover:text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
                                                    <Trash className="w-4 h-4 inline" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {partners.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-400">
                                                No partners found.
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
