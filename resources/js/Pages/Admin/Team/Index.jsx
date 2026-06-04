import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ team }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this team member?')) {
            destroy(route('admin.team.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                        Team Members
                    </h2>
                    <Link
                        href={route('admin.team.create')}
                        className="rounded bg-pink-600 px-4 py-2 text-white hover:bg-pink-500 font-semibold"
                    >
                        Add Member
                    </Link>
                </div>
            }
        >
            <Head title="Team Members" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-2xl sm:rounded-2xl dark:bg-zinc-900 border dark:border-zinc-800">
                        <div className="p-6 text-white font-bold">
                            
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b dark:border-zinc-700">
                                        <th className="p-3">Image</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Role</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {team.map((member) => (
                                        <tr key={member.id} className="border-b dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                            <td className="p-3">
                                                {member.image ? (
                                                    <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">?</div>
                                                )}
                                            </td>
                                            <td className="p-3 font-semibold">{member.name}</td>
                                            <td className="p-3 text-sm text-gray-400">{member.role}</td>
                                            <td className="p-3 space-x-3">
                                                <Link href={route('admin.team.edit', member.id)} className="text-pink-500 hover:text-pink-400 font-semibold">Edit</Link>
                                                <button onClick={() => handleDelete(member.id)} className="text-red-500 hover:text-red-400 font-semibold">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {team.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="p-6 text-center text-gray-500">No team members found.</td>
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
