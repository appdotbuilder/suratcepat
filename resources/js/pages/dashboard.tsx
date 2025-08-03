import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Props {
    recentLetters: Array<{
        id: number;
        title: string;
        created_at: string;
        letterTemplate: {
            name: string;
        };
    }>;
    totalLetters: number;
    hasPremium: boolean;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ recentLetters, totalLetters, hasPremium }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - SuratCepat" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">👋 Selamat Datang di SuratCepat!</h1>
                    <p className="text-blue-100 mb-4">
                        Buat surat resmi dengan mudah dan cepat menggunakan template profesional kami.
                    </p>
                    <Link
                        href={route('templates.index')}
                        className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-600 font-semibold px-6 py-2 rounded-lg transition duration-200"
                    >
                        🚀 Buat Surat Baru
                    </Link>
                </div>

                {/* Stats Section */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Surat</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalLetters}</p>
                            </div>
                            <div className="text-4xl">📄</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {hasPremium ? (
                                        <span className="text-yellow-600">💎 Premium</span>
                                    ) : (
                                        <span className="text-gray-600">🆓 Gratis</span>
                                    )}
                                </p>
                            </div>
                            <div className="text-4xl">{hasPremium ? '👑' : '🎯'}</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Template Tersedia</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {hasPremium ? '5+' : '2'}
                                </p>
                            </div>
                            <div className="text-4xl">📋</div>
                        </div>
                    </div>
                </div>

                {/* Recent Letters Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            📋 Surat Terbaru
                        </h2>
                        <Link
                            href={route('letters.index')}
                            className="text-blue-600 hover:text-blue-700 font-medium transition duration-200"
                        >
                            Lihat Semua →
                        </Link>
                    </div>

                    {recentLetters.length > 0 ? (
                        <div className="space-y-4">
                            {recentLetters.map((letter) => (
                                <div
                                    key={letter.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">📄</div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {letter.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {letter.letterTemplate.name} • {new Date(letter.created_at).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('letters.show', letter.id)}
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm transition duration-200"
                                    >
                                        Lihat
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Belum Ada Surat
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Anda belum membuat surat apapun. Mulai buat surat pertama Anda sekarang!
                            </p>
                            <Link
                                href={route('templates.index')}
                                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
                            >
                                🚀 Buat Surat Pertama
                            </Link>
                        </div>
                    )}
                </div>

                {/* Upgrade CTA for Free Users */}
                {!hasPremium && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">🚀 Upgrade ke Premium</h3>
                                <p className="text-yellow-100 mb-4">
                                    Akses semua template, unlimited generate, dan download format Word!
                                </p>
                                <ul className="text-sm text-yellow-100 space-y-1">
                                    <li>✅ 5+ Template Premium</li>
                                    <li>✅ Download PDF & Word</li>
                                    <li>✅ Unlimited Generate</li>
                                </ul>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold mb-2">Rp 99.000</div>
                                <div className="text-sm text-yellow-100 mb-4">/bulan</div>
                                <Link
                                    href={route('subscription.index')}
                                    className="inline-flex items-center bg-white hover:bg-gray-100 text-orange-600 font-semibold px-6 py-2 rounded-lg transition duration-200"
                                >
                                    💎 Upgrade Sekarang
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            🚀 Aksi Cepat
                        </h3>
                        <div className="space-y-3">
                            <Link
                                href={route('templates.index')}
                                className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition duration-200"
                            >
                                <span className="text-2xl mr-3">📝</span>
                                <span className="font-medium text-gray-900 dark:text-white">Buat Surat Baru</span>
                            </Link>
                            <Link
                                href={route('letters.index')}
                                className="flex items-center p-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-lg transition duration-200"
                            >
                                <span className="text-2xl mr-3">📋</span>
                                <span className="font-medium text-gray-900 dark:text-white">Lihat History</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            💡 Tips
                        </h3>
                        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-start">
                                <span className="text-lg mr-2">💡</span>
                                <p>Pastikan data yang diisi sudah benar sebelum generate surat</p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-lg mr-2">📱</span>
                                <p>Download PDF untuk hasil terbaik saat cetak atau kirim email</p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-lg mr-2">⚡</span>
                                <p>Gunakan template yang sesuai dengan kebutuhan Anda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}