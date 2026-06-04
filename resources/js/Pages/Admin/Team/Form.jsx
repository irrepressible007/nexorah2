import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Form({ teamMember }) {
    const isEditing = !!teamMember.id;

    const { data, setData, post, put, processing, errors } = useForm({
        name: teamMember.name || '',
        role: teamMember.role || '',
        bio: teamMember.bio || '',
        image: teamMember.image || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.team.update', teamMember.id));
        } else {
            post(route('admin.team.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                    {isEditing ? 'Edit Team Member' : 'Add Team Member'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Team Member' : 'Add Team Member'} />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-2xl sm:rounded-2xl dark:bg-zinc-900 border dark:border-zinc-800 p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full bg-zinc-800 border-zinc-700 text-white"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="role" value="Role/Title" />
                                <TextInput
                                    id="role"
                                    className="mt-1 block w-full bg-zinc-800 border-zinc-700 text-white"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.role} />
                            </div>

                            <div>
                                <InputLabel htmlFor="image" value="Image URL" />
                                <TextInput
                                    id="image"
                                    className="mt-1 block w-full bg-zinc-800 border-zinc-700 text-white"
                                    value={data.image}
                                    onChange={(e) => setData('image', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.image} />
                            </div>

                            <div>
                                <InputLabel htmlFor="bio" value="Bio" />
                                <textarea
                                    id="bio"
                                    className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-800 text-white shadow-sm focus:border-pink-500 focus:ring-pink-500 min-h-[100px]"
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.bio} />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing} className="bg-pink-600 hover:bg-pink-500">
                                    {isEditing ? 'Save Changes' : 'Create Team Member'}
                                </PrimaryButton>
                                <Link href={route('admin.team.index')} className="text-gray-400 hover:text-white">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
