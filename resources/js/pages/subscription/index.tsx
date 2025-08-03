import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Subscription {
    id: number;
    plan: string;
    status: string;
    amount: number;
    starts_at: string | null;
    expires_at: string | null;
    created_at: string;
}

interface Props {
    currentSubscription: Subscription | null;
    hasPremium: boolean;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Subscription',
        href: '/subscription',
    },
];

export default function SubscriptionIndex({ currentSubscription, hasPremium }: Props) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">✅ Aktif</span>;
            case 'pending':
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">⏳ Pending</span>;
            case 'inactive':
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">❌ Tidak Aktif</span>;
            default:
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">➖ {status}</span>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription - SuratCepat" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">💎 Subscription Status</h1>
                    <p className="text-purple-100">
                        Kelola subscription Anda dan nikmati fitur premium SuratCepat
                    </p>
                </div>

                {/* Current Subscription Status */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        📊 Status Saat Ini
                    </h2>

                    {currentSubscription ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-600 dark:text-gray-400">Plan:</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {currentSubscription.plan === 'premium' ? '💎 Premium' : '🆓 Free'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                    {getStatusBadge(currentSubscription.status)}
                                </div>
                                {currentSubscription.amount && (
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <span className="text-gray-600 dark:text-gray-400">Harga:</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            Rp {currentSubscription.amount.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4">
                                {currentSubscription.starts_at && (
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <span className="text-gray-600 dark:text-gray-400">Mulai:</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {new Date(currentSubscription.starts_at).toLocaleDateString('id-ID')}
                                        </span>
                                    </div>
                                )}
                                {currentSubscription.expires_at && (
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <span className="text-gray-600 dark:text-gray-400">Berakhir:</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {new Date(currentSubscription.expires_at).toLocaleDateString('id-ID')}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-600 dark:text-gray-400">Bergabung:</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {new Date(currentSubscription.created_at).toLocaleDateString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">🆓</div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Free Plan
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Anda saat ini menggunakan paket gratis
                            </p>
                        </div>
                    )}
                </div>

                {/* Subscription Plans */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        💰 Paket Berlangganan
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Free Plan */}
                        <div className={`p-6 rounded-xl border-2 ${!hasPremium ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-600'}`}>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🆓</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Paket Gratis
                                </h3>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Rp 0
                                    <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/selamanya</span>
                                </div>
                                <ul className="text-left space-y-2 mb-6">
                                    <li className="flex items-center text-sm">
                                        <span className="text-green-500 mr-2">✅</span>
                                        2 Template Gratis
                                    </li>
                                    <li className="flex items-center text-sm">
                                        <span className="text-green-500 mr-2">✅</span>
                                        Download PDF
                                    </li>
                                    <li className="flex items-center text-sm">
                                        <span className="text-green-500 mr-2">✅</span>
                                        History Surat
                                    </li>
                                    <li className="flex items-center text-sm">
                                        <span className="text-red-500 mr-2">❌</span>
                                        Template Premium
                                    </li>
                                    <li className="flex items-center text-sm">
                                        <span className="text-red-500 mr-2">❌</span>
                                        Download Word
                                    </li>
                                </ul>
                                {!hasPremium && (
                                    <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg font-semibold">
                                        🎯 Paket Aktif
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className={`p-6 rounded-xl border-2 relative ${hasPremium ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'border-gradient-to-r from-yellow-400 to-orange-500'}`}>
                            {!hasPremium && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        RECOMMENDED
                                    </span>
                                </div>
                            )}
                            <div className="text-center">
                                <div className="text-4xl mb-3">💎</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Paket Premium
                                </h3>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Rp 99.000
                                    <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/bulan</span>
                                </div>
                                <ul className="text-left space-y-2 mb-6">
                                    <li className="flex items-center text-sm">
                                        <span className="text-green-500 mr-2">✅</span>
                                        Semua Template (5+ dan bertambah)
                                    </li>
                                    <li className="flex items-center text-sm">
                                        <span className="text-green-500 mr-2">✅</span>
                                        Download PDF & Word
                                    </li>
                                    <li className="flex items-center text-sm">
                                        <span className="text-green-500 mr-2">✅</span>
                                        Unlimited Generate
                                    </li>
                                    <li className="flex items-center text-sm">
                                        <span className="text-green-500 mr-2">✅</span>
                                        Priority Support
                                    </li>
                                    <li className="flex items-center text-sm">
                                        <span className="text-green-500 mr-2">✅</span>
                                        Template Eksklusif
                                    </li>
                                </ul>
                                {hasPremium ? (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg font-semibold">
                                        👑 Paket Aktif
                                    </div>
                                ) : (
                                    <Link
                                        href={route('subscription.create')}
                                        className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                                    >
                                        🚀 Upgrade Sekarang
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Payment Notice */}
                {currentSubscription?.status === 'pending' && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">⏳</div>
                            <div>
                                <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-2">
                                    Pembayaran Sedang Diverifikasi
                                </h3>
                                <p className="text-yellow-800 dark:text-yellow-200 mb-4">
                                    Terima kasih telah melakukan pembayaran. Tim kami sedang memverifikasi pembayaran Anda. 
                                    Proses ini biasanya memakan waktu 1-24 jam.
                                </p>
                                <div className="text-sm text-yellow-700 dark:text-yellow-300">
                                    <p><strong>💰 Jumlah:</strong> Rp {currentSubscription.amount?.toLocaleString('id-ID')}</p>
                                    <p><strong>📅 Tanggal:</strong> {new Date(currentSubscription.created_at).toLocaleDateString('id-ID')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Features Comparison */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        📋 Perbandingan Fitur
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-600">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Fitur</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">🆓 Free</th>
                                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">💎 Premium</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                <tr>
                                    <td className="py-3 px-4 text-gray-900 dark:text-white">Template Surat</td>
                                    <td className="py-3 px-4 text-center">2 Template</td>
                                    <td className="py-3 px-4 text-center text-green-600">5+ Template</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 text-gray-900 dark:text-white">Download PDF</td>
                                    <td className="py-3 px-4 text-center text-green-600">✅</td>
                                    <td className="py-3 px-4 text-center text-green-600">✅</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 text-gray-900 dark:text-white">Download Word</td>
                                    <td className="py-3 px-4 text-center text-red-600">❌</td>
                                    <td className="py-3 px-4 text-center text-green-600">✅</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 text-gray-900 dark:text-white">Unlimited Generate</td>
                                    <td className="py-3 px-4 text-center text-red-600">❌</td>
                                    <td className="py-3 px-4 text-center text-green-600">✅</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 text-gray-900 dark:text-white">Priority Support</td>
                                    <td className="py-3 px-4 text-center text-red-600">❌</td>
                                    <td className="py-3 px-4 text-center text-green-600">✅</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 text-gray-900 dark:text-white">Template Eksklusif</td>
                                    <td className="py-3 px-4 text-center text-red-600">❌</td>
                                    <td className="py-3 px-4 text-center text-green-600">✅</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-6">
                        ❓ Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                💳 Bagaimana cara pembayaran?
                            </h3>
                            <p className="text-blue-800 dark:text-blue-200 text-sm">
                                Saat ini pembayaran dilakukan melalui transfer bank manual. Setelah transfer, upload bukti pembayaran dan tim kami akan mengaktifkan akun Premium Anda dalam 1-24 jam.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                🔄 Apakah bisa cancel subscription?
                            </h3>
                            <p className="text-blue-800 dark:text-blue-200 text-sm">
                                Ya, Anda bisa menghubungi support kami untuk membatalkan subscription. Namun pembayaran yang sudah dilakukan tidak dapat dikembalikan.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                📱 Apakah template akan terus bertambah?
                            </h3>
                            <p className="text-blue-800 dark:text-blue-200 text-sm">
                                Ya! Kami secara berkala menambahkan template baru untuk member Premium. Semua template baru dapat diakses tanpa biaya tambahan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}