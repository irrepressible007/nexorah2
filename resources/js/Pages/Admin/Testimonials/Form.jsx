import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Form({ testimonial }) {
    const isEditing = !!testimonial.id;

    const { data, setData, post, put, processing, errors } = useForm({
        client_name: testimonial.client_name || '',
        client_company: testimonial.client_company || '',
        review_text: testimonial.review_text || '',
        rating: testimonial.rating || 5,
        is_featured: testimonial.is_featured || false,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.testimonials.update', testimonial.id));
        } else {
            post(route('admin.testimonials.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                    {isEditing ? 'Edit Testimonial' : 'Add Testimonial'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Testimonial' : 'Add Testimonial'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md p-6 max-w-2xl">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div>
                                <InputLabel htmlFor="client_name" value="Client Name" />
                                <TextInput
                                    id="client_name"
                                    type="text"
                                    name="client_name"
                                    value={data.client_name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('client_name', e.target.value)}
                                />
                                <InputError message={errors.client_name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="client_company" value="Client Company (Optional)" />
                                <TextInput
                                    id="client_company"
                                    type="text"
                                    name="client_company"
                                    value={data.client_company}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('client_company', e.target.value)}
                                />
                                <InputError message={errors.client_company} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="review_text" value="Review Content" />
                                <textarea
                                    id="review_text"
                                    name="review_text"
                                    value={data.review_text}
                                    className="border-white/10 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full h-32"
                                    onChange={(e) => setData('review_text', e.target.value)}
                                />
                                <InputError message={errors.review_text} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="rating" value="Rating (1-5)" />
                                <TextInput
                                    id="rating"
                                    type="number"
                                    name="rating"
                                    min="1"
                                    max="5"
                                    value={data.rating}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('rating', e.target.value)}
                                />
                                <InputError message={errors.rating} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    {isEditing ? 'Save Changes' : 'Add Testimonial'}
                                </PrimaryButton>
                                <Link href={route('admin.testimonials.index')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
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
