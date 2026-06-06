import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import CardTopBar from '@/Components/CardTopBar';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Custom Line Height support
const Parchment = Quill.import('parchment');
const LineHeightStyle = new Parchment.Attributor.Style('lineHeight', 'line-height', {
    scope: Parchment.Scope.BLOCK,
    whitelist: ['1.0', '1.2', '1.5', '2.0', '2.5', '3.0']
});
Quill.register(LineHeightStyle, true);

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'lineHeight': ['1.0', '1.2', '1.5', '2.0', '2.5', '3.0'] }],
        ['link', 'clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'align',
    'list', 'bullet',
    'lineHeight',
    'link'
];

export default function Form({ feed }) {
    const isEditing = !!feed;
    const { data, setData, post, processing, errors } = useForm({
        content: feed?.content || '',
        image: null,
        is_active: feed ? feed.is_active : true,
    });

    const submit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            post(route('admin.featured-feeds.update.post', feed.id));
        } else {
            post(route('admin.featured-feeds.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                    {isEditing ? 'Edit Featured Feed Post' : 'Create Featured Feed Post'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Post' : 'Create Post'} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md overflow-hidden">
                        <CardTopBar title={isEditing ? 'Post Details' : 'New Post'} />
                        
                        <form onSubmit={submit} className="p-6 space-y-6">
                            
                            <div>
                                <InputLabel htmlFor="content" value="Post Content / Caption" className="text-white" />
                                <div className="mt-1 bg-white text-black rounded-lg overflow-hidden border-2 focus-within:border-pink-500 transition-colors">
                                    <ReactQuill 
                                        theme="snow" 
                                        value={data.content} 
                                        onChange={(val) => setData('content', val)} 
                                        modules={modules}
                                        formats={formats}
                                        className="min-h-[200px]"
                                    />
                                </div>
                                {errors.content && <p className="mt-2 text-sm text-red-500">{errors.content}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="image" value="Attached Image" className="text-white" />
                                    {isEditing && feed.image_path && (
                                        <div className="mb-4">
                                            <p className="text-xs text-gray-500 mb-2">Current Image:</p>
                                            <img src={feed.image_path} alt="Current" className="w-full h-48 object-cover rounded-lg border border-white/10" />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id="image"
                                        className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500/10 file:text-pink-500 hover:file:bg-pink-500/20 transition-all cursor-pointer border border-white/10 rounded-xl"
                                        onChange={e => setData('image', e.target.files[0])}
                                    />
                                    {errors.image && <p className="mt-2 text-sm text-red-500">{errors.image}</p>}
                                </div>

                                <div className="flex flex-col justify-center space-y-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-700 bg-gray-900 text-pink-600 shadow-sm focus:ring-pink-500"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                        />
                                        <span className="ml-2 text-sm text-gray-300 font-bold uppercase tracking-wider">Active</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-8 border-t border-white/10 pt-6">
                                <PrimaryButton disabled={processing} className="bg-pink-600 hover:bg-pink-500">
                                    {isEditing ? 'Save Changes' : 'Create Post'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
