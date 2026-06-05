import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Parchment = Quill.import('parchment');
const LineHeightStyle = new Parchment.Attributor.Style('lineHeight', 'line-height', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['1.0', '1.2', '1.5', '1.8', '2.0', '2.5', '3.0']
});
Quill.register(LineHeightStyle, true);

export default function Form({ event }) {
    const isEditing = !!event.id;

    const { data, setData, post, put, processing, errors } = useForm({
        _method: isEditing ? 'put' : 'post',
        title: event.title || '',
        description: event.description || '',
        event_date: event.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : '',
        location: event.location || '',
        status: event.status || 'draft',
        registration_link: event.registration_link || '',
        ambassador_link: event.ambassador_link || '',
        volunteer_link: event.volunteer_link || '',
        cover_image_file: null,
        gallery_images: [],
    });

    const submit = (e) => {
        e.preventDefault();
        
        // Since we are uploading files, Inertia automatically handles FormData if we pass a file, but let's be explicit
        if (isEditing) {
            // For PUT requests with files in Laravel, we need to use POST and add _method='PUT'
            post(route('admin.events.update', event.id), {
                forceFormData: true,
            });
        } else {
            post(route('admin.events.store'), {
                forceFormData: true,
            });
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'lineHeight': ['1.0', '1.2', '1.5', '1.8', '2.0', '2.5', '3.0'] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'list': 'ordered'}, { 'list': 'bullet'}, { 'indent': '-1'}, { 'indent': '+1'}],
            [{ 'direction': 'rtl' }, { 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                    {isEditing ? 'Edit Event' : 'Create Event'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Event' : 'Create Event'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md p-6">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div>
                                <InputLabel htmlFor="title" value="Event Title" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <div className="mt-1 bg-white/5 border border-white/10 rounded-md overflow-hidden dark-quill">
                                    <ReactQuill 
                                        theme="snow"
                                        value={data.description}
                                        onChange={(content) => setData('description', content)}
                                        className="text-gray-300 bg-white dark:bg-gray-900 rounded-md"
                                        modules={modules}
                                    />
                                </div>
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="cover_image_file" value="Cover Image" />
                                    <input
                                        id="cover_image_file"
                                        type="file"
                                        className="mt-1 block w-full text-white"
                                        onChange={(e) => setData('cover_image_file', e.target.files[0])}
                                    />
                                    <InputError message={errors.cover_image_file} className="mt-2" />
                                    {event.cover_image && (
                                        <div className="mt-2">
                                            <p className="text-xs text-gray-400 mb-1">Current Cover:</p>
                                            <img src={event.cover_image} alt="Cover" className="h-20 w-auto rounded border border-gray-700" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <InputLabel htmlFor="gallery_images" value="Gallery Images (Multiple)" />
                                    <input
                                        id="gallery_images"
                                        type="file"
                                        multiple
                                        className="mt-1 block w-full text-white"
                                        onChange={(e) => setData('gallery_images', e.target.files)}
                                    />
                                    <InputError message={errors.gallery_images} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="event_date" value="Event Date & Time" />
                                    <TextInput
                                        id="event_date"
                                        type="datetime-local"
                                        name="event_date"
                                        value={data.event_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('event_date', e.target.value)}
                                    />
                                    <InputError message={errors.event_date} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="location" value="Location" />
                                    <TextInput
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={data.location}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('location', e.target.value)}
                                    />
                                    <InputError message={errors.location} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    className="border-white/10 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full"
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="past">Past</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div className="border-t border-white/5 pt-6 mt-6">
                                <h3 className="text-lg font-black text-white mb-4 tracking-widest uppercase">Registration Links</h3>
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="registration_link" value="Main Registration URL (Leave blank to hide)" />
                                        <TextInput
                                            id="registration_link"
                                            type="url"
                                            name="registration_link"
                                            value={data.registration_link}
                                            className="mt-1 block w-full"
                                            placeholder="https://..."
                                            onChange={(e) => setData('registration_link', e.target.value)}
                                        />
                                        <InputError message={errors.registration_link} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="ambassador_link" value="Campus Ambassador URL (Leave blank to hide)" />
                                        <TextInput
                                            id="ambassador_link"
                                            type="url"
                                            name="ambassador_link"
                                            value={data.ambassador_link}
                                            className="mt-1 block w-full"
                                            placeholder="https://..."
                                            onChange={(e) => setData('ambassador_link', e.target.value)}
                                        />
                                        <InputError message={errors.ambassador_link} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="volunteer_link" value="Volunteer URL (Leave blank to hide)" />
                                        <TextInput
                                            id="volunteer_link"
                                            type="url"
                                            name="volunteer_link"
                                            value={data.volunteer_link}
                                            className="mt-1 block w-full"
                                            placeholder="https://..."
                                            onChange={(e) => setData('volunteer_link', e.target.value)}
                                        />
                                        <InputError message={errors.volunteer_link} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Existing Gallery Display */}
                            {isEditing && event.media && event.media.length > 0 && (
                                <div className="border-t border-gray-700 pt-6 mt-6">
                                    <h3 className="text-lg font-medium text-white mb-4">Existing Gallery Images</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {event.media.map(media => (
                                            <div key={media.id} className="relative group rounded overflow-hidden border border-gray-700">
                                                <img src={media.file_path} alt="Gallery" className="w-full h-32 object-cover" />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                                    <Link 
                                                        href={route('admin.events.media.destroy', media.id)} 
                                                        method="delete" 
                                                        as="button" 
                                                        className="text-white bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-500"
                                                    >
                                                        Remove
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    {isEditing ? 'Save Changes' : 'Create Event'}
                                </PrimaryButton>
                                <Link href={route('admin.events.index')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
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
