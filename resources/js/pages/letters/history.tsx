import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Letter {
    id: number;
    title: string;
    created_at: string;
    letterTemplate: {
        name: string;
        slug: string;
    };
}

interface PaginatedLetters {
    data: Letter[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    letters: PaginatedLetters;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'History Surat',
        href: '/letters',
    },
];

export default function LetterHistory({ letters }: Props) {
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
            <Head title="History Surat - SuratCepat" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">📋 History Surat</h1>
                            <p className="text-green-100">
                                Lihat semua surat yang pernah Anda buat. Total: {letters.total} surat
                            </p>
                        </div>
                        <Link
                            href={route('templates.index')}
                            className="bg-white hover:bg-gray-100 text-green-600 font-semibold px-6 py-2 rounded-lg transition duration-200"
                        >
                            📝 Buat Surat Baru
                        </Link>
                    </div>
                </div>

                {/* Letters List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border">
                    {letters.data.length > 0 ? (
                        <>
                            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Surat Anda ({letters.total})
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Halaman {letters.current_page} dari {letters.last_page}
                                </p>
                            </div>

                            <div className="divide-y divide-gray-200 dark:divide-gray-600">
                                {letters.data.map((letter) => (
                                    <div
                                        key={letter.id}
                                        className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-3xl">
                                                    {getTemplateIcon(letter.letterTemplate.slug)}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {letter.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {letter.letterTemplate.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                        Dibuat: {new Date(letter.created_at).toLocaleDateString('id-ID', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Link
                                                    href={route('letters.show', letter.id)}
                                                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition duration-200"
                                                >
                                                    👁️ Preview
                                                </Link>
                                                <button
                                                    onClick={() => router.post(route('letters.download', letter.id))}
                                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition duration-200"
                                                >
                                                    📥 Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {letters.last_page > 1 && (
                                <div className="p-6 border-t border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Menampilkan {((letters.current_page - 1) * letters.per_page) + 1} - {Math.min(letters.current_page * letters.per_page, letters.total)} dari {letters.total} surat
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {letters.links.map((link, index) => (
                                                link.url ? (
                                                    <Link
                                                        key={index}
                                                        href={link.url}
                                                        className={`px-3 py-2 text-sm rounded-lg transition duration-200 ${
                                                            link.active
                                                                ? 'bg-blue-600 text-white'
                                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ) : (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-2 text-sm text-gray-400 dark:text-gray-600"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Empty State */
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                Belum Ada Surat
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                                Anda belum membuat surat apapun. Mulai buat surat pertama Anda dengan template profesional kami.
                            </p>
                            <Link
                                href={route('templates.index')}
                                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
                            >
                                🚀 Buat Surat Pertama
                            </Link>
                        </div>
                    )}
                </div>

                {/* Stats Cards */}
                {letters.data.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Surat</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{letters.total}</p>
                                </div>
                                <div className="text-4xl">📄</div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Bulan Ini</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {letters.data.filter(letter => 
                                            new Date(letter.created_at).getMonth() === new Date().getMonth() &&
                                            new Date(letter.created_at).getFullYear() === new Date().getFullYear()
                                        ).length}
                                    </p>
                                </div>
                                <div className="text-4xl">📅</div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Template Favorit</p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                        {letters.data.length > 0 ? letters.data[0].letterTemplate.name : '-'}
                                    </p>
                                </div>
                                <div className="text-4xl">⭐</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        🚀 Aksi Cepat
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            href={route('templates.index')}
                            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                        >
                            <span className="text-3xl mr-4">📝</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Buat Surat Baru</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Pilih template dan buat surat</p>
                            </div>
                        </Link>
                        <Link
                            href={route('dashboard')}
                            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                        >
                            <span className="text-3xl mr-4">🏠</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Kembali ke Dashboard</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Lihat ringkasan aktivitas</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}