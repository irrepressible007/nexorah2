import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Trash, RefreshCw } from 'lucide-react';

export default function Index({ logs }) {
    const handleClear = () => {
        if (confirm('Are you sure you want to clear all logs?')) {
            router.post(route('admin.logs.clear'));
        }
    };

    const handleRefresh = () => {
        router.reload();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-white font-black tracking-widest uppercase">
                        System Logs
                    </h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleRefresh}
                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-gray-700 transition-all"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                        </button>
                        <button
                            onClick={handleClear}
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-red-500 transition-all"
                        >
                            <Trash className="w-4 h-4 mr-2" /> Clear Logs
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="System Logs" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-[#111] border border-white/5 shadow-2xl sm:rounded-2xl backdrop-blur-md overflow-hidden p-6">
                        <div className="bg-black border border-white/10 rounded-lg p-4 overflow-x-auto max-h-[70vh] overflow-y-auto font-mono text-sm text-green-400 whitespace-pre-wrap">
                            {logs || 'Log file is empty.'}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
