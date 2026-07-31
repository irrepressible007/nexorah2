import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Index({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        homepage_title: settings.homepage_title || '',
        homepage_subtitle: settings.homepage_subtitle || '',
        homepage_cover_url: settings.homepage_cover_url || '',
        homepage_highlights_title: settings.homepage_highlights_title || '',
        homepage_highlights_subtitle: settings.homepage_highlights_subtitle || '',
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        contact_address: settings.contact_address || '',
        contact_page_title: settings.contact_page_title || '',
        contact_page_subtitle: settings.contact_page_subtitle || '',
        social_facebook: settings.social_facebook || '',
        social_twitter: settings.social_twitter || '',
        social_instagram: settings.social_instagram || '',
        social_linkedin: settings.social_linkedin || '',
        primary_color: settings.primary_color || '#ec4899',
        meta_pixel_id: settings.meta_pixel_id || '1382756323752126',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                    Global Settings
                </h2>
            }
        >
            <Head title="Global Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md p-6">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <h3 className="text-lg font-medium text-white font-bold border-b border-white/5 pb-2">Homepage Aesthetics</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="homepage_title" value="Homepage Main Title" />
                                    <TextInput
                                        id="homepage_title"
                                        type="text"
                                        name="homepage_title"
                                        value={data.homepage_title}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('homepage_title', e.target.value)}
                                    />
                                    <InputError message={errors.homepage_title} className="mt-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="homepage_subtitle" value="Homepage Subtitle" />
                                    <textarea
                                        id="homepage_subtitle"
                                        name="homepage_subtitle"
                                        value={data.homepage_subtitle}
                                        className="border-white/10 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full h-24"
                                        onChange={(e) => setData('homepage_subtitle', e.target.value)}
                                    />
                                    <InputError message={errors.homepage_subtitle} className="mt-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="homepage_cover_url" value="Homepage Background Image URL" />
                                    <TextInput
                                        id="homepage_cover_url"
                                        type="url"
                                        name="homepage_cover_url"
                                        value={data.homepage_cover_url}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('homepage_cover_url', e.target.value)}
                                    />
                                    <InputError message={errors.homepage_cover_url} className="mt-2" />
                                    {data.homepage_cover_url && (
                                        <div className="mt-4 aspect-video w-64 rounded-md overflow-hidden border border-gray-700">
                                            <img src={data.homepage_cover_url} alt="Cover Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="homepage_highlights_title" value="Highlights Section Title" />
                                    <TextInput
                                        id="homepage_highlights_title"
                                        type="text"
                                        name="homepage_highlights_title"
                                        value={data.homepage_highlights_title}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('homepage_highlights_title', e.target.value)}
                                    />
                                    <InputError message={errors.homepage_highlights_title} className="mt-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="homepage_highlights_subtitle" value="Highlights Section Subtitle" />
                                    <textarea
                                        id="homepage_highlights_subtitle"
                                        name="homepage_highlights_subtitle"
                                        value={data.homepage_highlights_subtitle}
                                        className="border-white/10 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full h-20"
                                        onChange={(e) => setData('homepage_highlights_subtitle', e.target.value)}
                                    />
                                    <InputError message={errors.homepage_highlights_subtitle} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="primary_color" value="Brand Primary Color (Hex)" />
                                    <div className="flex items-center gap-3 mt-1">
                                        <input
                                            type="color"
                                            value={data.primary_color}
                                            onChange={(e) => setData('primary_color', e.target.value)}
                                            className="h-10 w-10 border-0 p-0 rounded-md cursor-pointer"
                                        />
                                        <TextInput
                                            id="primary_color"
                                            type="text"
                                            name="primary_color"
                                            value={data.primary_color}
                                            className="block w-full"
                                            onChange={(e) => setData('primary_color', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.primary_color} className="mt-2" />
                                </div>
                            </div>

                            <h3 className="text-lg font-medium text-white font-bold border-b border-white/5 pb-2 mt-12">Contact Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="contact_page_title" value="Contact Page Main Title" />
                                    <TextInput
                                        id="contact_page_title"
                                        type="text"
                                        name="contact_page_title"
                                        value={data.contact_page_title}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('contact_page_title', e.target.value)}
                                    />
                                    <InputError message={errors.contact_page_title} className="mt-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="contact_page_subtitle" value="Contact Page Subtitle" />
                                    <textarea
                                        id="contact_page_subtitle"
                                        name="contact_page_subtitle"
                                        value={data.contact_page_subtitle}
                                        className="border-white/10 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full h-24"
                                        onChange={(e) => setData('contact_page_subtitle', e.target.value)}
                                    />
                                    <InputError message={errors.contact_page_subtitle} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="contact_email" value="Contact Email Address" />
                                    <TextInput
                                        id="contact_email"
                                        type="email"
                                        name="contact_email"
                                        value={data.contact_email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                    />
                                    <InputError message={errors.contact_email} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="contact_phone" value="Contact Phone Number" />
                                    <TextInput
                                        id="contact_phone"
                                        type="text"
                                        name="contact_phone"
                                        value={data.contact_phone}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                    />
                                    <InputError message={errors.contact_phone} className="mt-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="contact_address" value="Physical Address" />
                                    <TextInput
                                        id="contact_address"
                                        type="text"
                                        name="contact_address"
                                        value={data.contact_address}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('contact_address', e.target.value)}
                                    />
                                    <InputError message={errors.contact_address} className="mt-2" />
                                </div>
                            </div>

                            <h3 className="text-lg font-medium text-white font-bold border-b border-white/5 pb-2 mt-12">Social Media Links</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div>
                                    <InputLabel htmlFor="social_facebook" value="Facebook URL" />
                                    <TextInput
                                        id="social_facebook"
                                        type="url"
                                        name="social_facebook"
                                        value={data.social_facebook}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('social_facebook', e.target.value)}
                                    />
                                    <InputError message={errors.social_facebook} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="social_twitter" value="Twitter / X URL" />
                                    <TextInput
                                        id="social_twitter"
                                        type="url"
                                        name="social_twitter"
                                        value={data.social_twitter}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('social_twitter', e.target.value)}
                                    />
                                    <InputError message={errors.social_twitter} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="social_instagram" value="Instagram URL" />
                                    <TextInput
                                        id="social_instagram"
                                        type="url"
                                        name="social_instagram"
                                        value={data.social_instagram}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('social_instagram', e.target.value)}
                                    />
                                    <InputError message={errors.social_instagram} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="social_linkedin" value="LinkedIn URL" />
                                    <TextInput
                                        id="social_linkedin"
                                        type="url"
                                        name="social_linkedin"
                                        value={data.social_linkedin}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('social_linkedin', e.target.value)}
                                    />
                                    <InputError message={errors.social_linkedin} className="mt-2" />
                                </div>
                            </div>

                            <h3 className="text-lg font-medium text-white font-bold border-b border-white/5 pb-2 mt-12">Marketing & Pixel Tracking</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="meta_pixel_id" value="Meta (Facebook) Pixel ID" />
                                    <TextInput
                                        id="meta_pixel_id"
                                        type="text"
                                        name="meta_pixel_id"
                                        value={data.meta_pixel_id}
                                        placeholder="e.g. 1382756323752126"
                                        className="mt-1 block w-full font-mono text-sm"
                                        onChange={(e) => setData('meta_pixel_id', e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">This Meta Pixel ID will be dynamically injected into all pages to track PageView and ViewContent events across Nexorah.</p>
                                    <InputError message={errors.meta_pixel_id} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-8 pt-4 border-t border-white/5">
                                <PrimaryButton disabled={processing}>
                                    Save Configuration
                                </PrimaryButton>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
