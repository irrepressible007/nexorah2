import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash } from 'lucide-react';
import CardTopBar from '@/Components/CardTopBar';

export default function Index({ feeds }) {
    const handleDelete = (feed) => {
        if (confirm('Are you sure you want to delete this featured feed post?')) {
            router.delete(route('admin.featured-feeds.destroy', feed.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                        Featured Feed
                    </h2>
                    <Link
                        href={route('admin.featured-feeds.create')}
                        className="inline-flex items-center px-4 py-2 bg-pink-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-pink-500 transition-all"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add New Post
                    </Link>
                </div>
            }
        >
            <Head title="Featured Feed" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md overflow-hidden">
                        <CardTopBar title="Manage Featured Feed" />
                        
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead className="bg-black">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Content Snippet</th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Engagement</th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 bg-[#111]">
                                    {feeds.data.map((feed) => (
                                        <tr key={feed.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {feed.image_path ? (
                                                    <img src={feed.image_path} alt="Feed" className="w-16 h-16 rounded object-cover border border-white/10" />
                                                ) : (
                                                    <div className="w-16 h-16 rounded bg-gray-800 border border-white/10 flex items-center justify-center text-xs text-gray-500">No Img</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-300 max-w-xs truncate" dangerouslySetInnerHTML={{ __html: feed.content }}></div>
                                                <div className="text-xs text-gray-500 mt-1">{new Date(feed.created_at).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-pink-500">{feed.likes_count} Likes</div>
                                                <div className="text-xs text-gray-400">{feed.comments_count} Comments</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${feed.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {feed.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.featured-feeds.edit', feed.id)} className="text-pink-500 hover:text-pink-400 mr-4 inline-flex items-center">
                                                    <Edit className="w-4 h-4 mr-1" /> Edit
                                                </Link>
                                                <button onClick={() => handleDelete(feed)} className="text-red-500 hover:text-red-400 inline-flex items-center">
                                                    <Trash className="w-4 h-4 mr-1" /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {feeds.data.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500 font-bold tracking-widest uppercase">
                                                No featured feeds found. Add your first post!
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
