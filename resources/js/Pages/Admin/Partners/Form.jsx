import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Form({ partner }) {
    const isEditing = !!partner.id;

    const { data, setData, post, processing, errors } = useForm({
        company_name: partner.company_name || '',
        subtitle: partner.subtitle || '',
        website_url: partner.website_url || '',
        display_order: partner.display_order || 0,
        logo_image: null,
        _method: isEditing ? 'put' : 'post',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            post(route('admin.partners.update', partner.id));
        } else {
            post(route('admin.partners.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                    {isEditing ? 'Edit Partner' : 'Add Partner'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Partner' : 'Add Partner'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md p-6 max-w-2xl">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div>
                                <InputLabel htmlFor="company_name" value="Company Name" />
                                <TextInput
                                    id="company_name"
                                    type="text"
                                    name="company_name"
                                    value={data.company_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                />
                                <InputError message={errors.company_name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="subtitle" value="Subtitle (Role / Position)" />
                                <TextInput
                                    id="subtitle"
                                    type="text"
                                    name="subtitle"
                                    value={data.subtitle}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('subtitle', e.target.value)}
                                />
                                <InputError message={errors.subtitle} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="logo_image" value="Logo Image" />
                                {isEditing && partner.logo_image && (
                                    <div className="mb-2">
                                        <img src={partner.logo_image} alt="Logo" className="h-16 w-auto object-contain rounded" />
                                    </div>
                                )}
                                <input
                                    id="logo_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('logo_image', e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                                />
                                <InputError message={errors.logo_image} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="website_url" value="Website URL" />
                                <TextInput
                                    id="website_url"
                                    type="url"
                                    name="website_url"
                                    value={data.website_url}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('website_url', e.target.value)}
                                />
                                <InputError message={errors.website_url} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="display_order" value="Display Order (Optional)" />
                                <TextInput
                                    id="display_order"
                                    type="number"
                                    name="display_order"
                                    value={data.display_order}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('display_order', e.target.value)}
                                />
                                <InputError message={errors.display_order} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    {isEditing ? 'Save Changes' : 'Add Partner'}
                                </PrimaryButton>
                                <Link href={route('admin.partners.index')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
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
