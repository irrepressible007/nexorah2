import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash } from 'lucide-react';

export default function Index({ posts }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            destroy(route('admin.posts.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                        Manage Blog Posts
                    </h2>
                    <Link
                        href={route('admin.posts.create')}
                        className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 transition ease-in-out duration-150"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Create Post
                    </Link>
                </div>
            }
        >
            <Head title="Blog Posts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/5">
                                <thead className="bg-black/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Author</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-transparent divide-y divide-white/5">
                                    {posts.data.map((post) => (
                                        <tr key={post.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white font-bold">
                                                {post.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {post.author || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 capitalize">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.posts.edit', post.id)} className="text-pink-500 hover:text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)] mr-4">
                                                    <Edit className="w-4 h-4 inline" />
                                                </Link>
                                                <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
                                                    <Trash className="w-4 h-4 inline" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {posts.data.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-400">
                                                No blog posts found.
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
