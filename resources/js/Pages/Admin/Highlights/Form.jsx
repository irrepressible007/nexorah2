import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useRef, useState } from 'react';

export default function Form({ highlight }) {
    const isEditing = !!highlight.id;

    const { data, setData, post, processing, errors } = useForm({
        title: highlight.title || '',
        description: highlight.description || '',
        display_order: highlight.display_order || 0,
        media_file: null,
        _method: isEditing ? 'put' : 'post',
    });

    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(highlight.media_path || null);
    const [previewType, setPreviewType] = useState(highlight.media_type || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('media_file', file);
            setPreviewUrl(URL.createObjectURL(file));
            setPreviewType(file.type.startsWith('video/') ? 'video' : 'image');
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        const routeName = isEditing ? 'admin.highlights.update' : 'admin.highlights.store';
        const routeParams = isEditing ? highlight.id : undefined;
        
        post(route(routeName, routeParams), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                    {isEditing ? 'Edit Highlight' : 'Add Highlight'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Highlight' : 'Add Highlight'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md p-6">
                        <form onSubmit={submit} className="space-y-6 max-w-2xl">
                            
                            <div>
                                <InputLabel htmlFor="title" value="Highlight Title" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description (Optional)" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="border-white/10 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full h-24"
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="display_order" value="Display Order" />
                                <TextInput
                                    id="display_order"
                                    type="number"
                                    name="display_order"
                                    value={data.display_order}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('display_order', e.target.value)}
                                    required
                                />
                                <p className="text-xs text-gray-400 mt-1">Lower numbers appear first.</p>
                                <InputError message={errors.display_order} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="media_file" value={isEditing ? "Media File (Leave blank to keep existing)" : "Media File (Image or Video)"} />
                                <input
                                    type="file"
                                    id="media_file"
                                    ref={fileInputRef}
                                    accept="image/*,video/*"
                                    className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 dark:file:bg-gray-200 dark:file:text-gray-800 dark:hover:file:bg-white"
                                    onChange={handleFileChange}
                                    required={!isEditing}
                                />
                                <p className="text-xs text-gray-400 mt-1">Max size: 20MB. Supported formats: JPG, PNG, GIF, MP4, MOV, WEBM.</p>
                                <InputError message={errors.media_file} className="mt-2" />
                                
                                {previewUrl && (
                                    <div className="mt-4 border border-gray-700 rounded-lg overflow-hidden bg-black flex items-center justify-center max-w-sm">
                                        {previewType === 'video' ? (
                                            <video src={previewUrl} controls className="max-h-64 max-w-full" />
                                        ) : (
                                            <img src={previewUrl} alt="Preview" className="max-h-64 max-w-full object-contain" />
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                <PrimaryButton disabled={processing}>
                                    {isEditing ? 'Save Changes' : 'Upload Highlight'}
                                </PrimaryButton>
                                <Link
                                    href={route('admin.highlights.index')}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 uppercase tracking-widest font-semibold"
                                >
                                    Cancel
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
