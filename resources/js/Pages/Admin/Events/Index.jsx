import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash } from 'lucide-react';

export default function Index({ events }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this event?')) {
            destroy(route('admin.events.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                        Manage Events
                    </h2>
                    <Link
                        href={route('admin.events.create')}
                        className="inline-flex items-center px-6 py-3 bg-pink-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition-all hover:-translate-y-1"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Event
                    </Link>
                </div>
            }
        >
            <Head title="Events" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/5">
                                <thead className="bg-black/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-transparent divide-y divide-white/5">
                                    {events.data.map((event) => (
                                        <tr key={event.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-bold">
                                                {event.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'TBA'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-400">
                                                {event.display_order}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 capitalize">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' : event.status === 'past' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {event.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.events.edit', event.id)} className="text-pink-500 hover:text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)] mr-4">
                                                    <Edit className="w-4 h-4 inline" />
                                                </Link>
                                                <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
                                                    <Trash className="w-4 h-4 inline" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {events.data.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-400">
                                                No events found.
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
