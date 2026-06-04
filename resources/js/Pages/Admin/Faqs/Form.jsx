import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Form({ faq }) {
    const isEditing = !!faq.id;

    const { data, setData, post, put, processing, errors } = useForm({
        question: faq.question || '',
        answer: faq.answer || '',
        order: faq.order || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.faqs.update', faq.id));
        } else {
            post(route('admin.faqs.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                    {isEditing ? 'Edit FAQ' : 'Add FAQ'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit FAQ' : 'Add FAQ'} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-2xl sm:rounded-2xl dark:bg-zinc-900 border dark:border-zinc-800 p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="question" value="Question" />
                                <TextInput
                                    id="question"
                                    className="mt-1 block w-full bg-zinc-800 border-zinc-700 text-white"
                                    value={data.question}
                                    onChange={(e) => setData('question', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.question} />
                            </div>

                            <div>
                                <InputLabel htmlFor="answer" value="Answer" />
                                <textarea
                                    id="answer"
                                    className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-800 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500 min-h-[100px]"
                                    value={data.answer}
                                    onChange={(e) => setData('answer', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.answer} />
                            </div>

                            <div>
                                <InputLabel htmlFor="order" value="Display Order" />
                                <TextInput
                                    id="order"
                                    type="number"
                                    className="mt-1 block w-full bg-zinc-800 border-zinc-700 text-white"
                                    value={data.order}
                                    onChange={(e) => setData('order', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.order} />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing} className="bg-pink-600 hover:bg-pink-500">
                                    {isEditing ? 'Save Changes' : 'Create FAQ'}
                                </PrimaryButton>
                                <Link href={route('admin.faqs.index')} className="text-gray-400 hover:text-white">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
