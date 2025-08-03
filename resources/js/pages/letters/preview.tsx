import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Letter {
    id: number;
    title: string;
    generated_content: string;
    created_at: string;
    letterTemplate: {
        name: string;
        slug: string;
    };
}

interface Props {
    letter: Letter;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Template Surat',
        href: '/templates',
    },
    {
        title: 'Preview Surat',
        href: '#',
    },
];

export default function PreviewLetter({ letter }: Props) {
    const getTemplateIcon = (slug: string) => {
        switch (slug) {
            case 'surat-lamaran-kerja':
                return '💼';
            case 'surat-izin-tidak-masuk':
                return '📅';
            case 'surat-perjanjian-jual-beli':
                return '🤝';
            case 'surat-kuasa':
                return '👤';
            case 'surat-undangan-resmi':
                return '📨';
            default:
                return '📄';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Preview: ${letter.title} - SuratCepat`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Success Message */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="text-3xl">🎉</div>
                        <h1 className="text-2xl font-bold">Surat Berhasil Dibuat!</h1>
                    </div>
                    <p className="text-green-100">
                        Surat Anda telah berhasil di-generate. Silakan review dan download dalam format PDF.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Letter Preview */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">{getTemplateIcon(letter.letterTemplate.slug)}</div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                                {letter.title}
                                            </h2>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {letter.letterTemplate.name} • {new Date(letter.created_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => router.post(route('letters.download', letter.id))}
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2"
                                        >
                                            <span>📥</span>
                                            <span>Download PDF</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Letter Content */}
                            <div className="p-8">
                                <div className="bg-white border rounded-lg shadow-sm max-h-96 overflow-y-auto">
                                    <div className="p-8 text-sm leading-relaxed font-mono">
                                        <pre className="whitespace-pre-wrap text-gray-900 font-sans">
                                            {letter.generated_content}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions & Info Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                🚀 Aksi Cepat
                            </h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => router.post(route('letters.download', letter.id))}
                                    className="flex items-center w-full p-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-lg transition duration-200"
                                >
                                    <span className="text-2xl mr-3">📥</span>
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-white">Download PDF</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Siap cetak & kirim</div>
                                    </div>
                                </button>
                                
                                <Link
                                    href={route('templates.index')}
                                    className="flex items-center w-full p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition duration-200"
                                >
                                    <span className="text-2xl mr-3">📝</span>
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-white">Buat Surat Baru</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Template lainnya</div>
                                    </div>
                                </Link>
                                
                                <Link
                                    href={route('letters.index')}
                                    className="flex items-center w-full p-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-lg transition duration-200"
                                >
                                    <span className="text-2xl mr-3">📋</span>
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-white">Lihat History</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Semua surat Anda</div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Letter Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                ℹ️ Info Surat
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Template:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {letter.letterTemplate.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Dibuat:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {new Date(letter.created_at).toLocaleDateString('id-ID')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        ✅ Siap Download
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4">
                                💡 Tips
                            </h3>
                            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                                <li className="flex items-start">
                                    <span className="mr-2">📱</span>
                                    <span>Download PDF untuk hasil cetak terbaik</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">💾</span>
                                    <span>Surat akan tersimpan otomatis di history</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">🔄</span>
                                    <span>Bisa download ulang kapan saja</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">📧</span>
                                    <span>PDF bisa langsung dikirim via email</span>
                                </li>
                            </ul>
                        </div>

                        {/* Share */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                📤 Bagikan
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Beritahu teman tentang SuratCepat!
                            </p>
                            <Link
                                href={route('home')}
                                className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition duration-200"
                            >
                                🌟 Bagikan SuratCepat
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}