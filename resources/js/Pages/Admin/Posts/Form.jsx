import React, { useState } from 'react';
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

export default function Form({ post }) {
    const isEditing = !!post.id;

    const { data, setData, post: submitPost, put, processing, errors } = useForm({
        title: post.title || '',
        content: post.content || '',
        author: post.author || '',
        status: post.status || 'draft',
        published_at: post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : '',
        cover_image: post.cover_image || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.posts.update', post.id));
        } else {
            submitPost(route('admin.posts.store'));
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
        ],
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                    {isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Blog Post' : 'Create Blog Post'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md p-6">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="title" value="Post Title" />
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

                                <div className="md:col-span-2 h-96 mb-12">
                                    <InputLabel value="Content" className="mb-1" />
                                    <div className="h-full bg-white text-black dark:bg-gray-900 dark:text-gray-200 rounded-md">
                                        <ReactQuill 
                                            theme="snow" 
                                            value={data.content} 
                                            onChange={(content) => setData('content', content)} 
                                            modules={modules}
                                            className="h-[300px]"
                                        />
                                    </div>
                                    <InputError message={errors.content} className="mt-12" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="author" value="Author" />
                                    <TextInput
                                        id="author"
                                        type="text"
                                        name="author"
                                        value={data.author}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('author', e.target.value)}
                                    />
                                    <InputError message={errors.author} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="cover_image" value="Cover Image URL" />
                                    <TextInput
                                        id="cover_image"
                                        type="url"
                                        name="cover_image"
                                        value={data.cover_image}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('cover_image', e.target.value)}
                                    />
                                    <InputError message={errors.cover_image} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="published_at" value="Publish Date (Optional)" />
                                    <TextInput
                                        id="published_at"
                                        type="datetime-local"
                                        name="published_at"
                                        value={data.published_at}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('published_at', e.target.value)}
                                    />
                                    <InputError message={errors.published_at} className="mt-2" />
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
                                        <option value="published">Published</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-8">
                                <PrimaryButton disabled={processing}>
                                    {isEditing ? 'Save Changes' : 'Create Post'}
                                </PrimaryButton>
                                <Link href={route('admin.posts.index')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
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
