import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Template {
    id: number;
    name: string;
    slug: string;
    description: string;
    is_premium: boolean;
}

interface Props {
    templates: Template[];
    hasPremium: boolean;
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
];

export default function Templates({ templates, hasPremium }: Props) {
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
            <Head title="Template Surat - SuratCepat" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">📋 Pilih Template Surat</h1>
                    <p className="text-blue-100">
                        Pilih template yang sesuai dengan kebutuhan Anda. {hasPremium ? 'Semua template tersedia untuk Anda!' : 'Upgrade ke Premium untuk akses semua template.'}
                    </p>
                </div>

                {/* Subscription Status */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${hasPremium ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {hasPremium ? '💎 Premium Active' : '🆓 Free Plan'}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {hasPremium 
                                        ? 'Anda memiliki akses ke semua template premium'
                                        : `Anda dapat menggunakan ${templates.length} template gratis`
                                    }
                                </p>
                            </div>
                        </div>
                        {!hasPremium && (
                            <Link
                                href={route('subscription.index')}
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
                            >
                                💎 Upgrade ke Premium
                            </Link>
                        )}
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 p-6 transition duration-200 hover:shadow-lg ${
                                template.is_premium && !hasPremium 
                                    ? 'border-yellow-200 opacity-75' 
                                    : 'border-gray-200 hover:border-blue-300'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-4xl">{getTemplateIcon(template.slug)}</div>
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    template.is_premium 
                                        ? 'bg-yellow-100 text-yellow-800' 
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {template.is_premium ? 'PREMIUM' : 'GRATIS'}
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {template.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                                {template.description}
                            </p>

                            <div className="flex items-center justify-between">
                                {template.is_premium && !hasPremium ? (
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href={route('subscription.index')}
                                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition duration-200"
                                        >
                                            🔒 Unlock Premium
                                        </Link>
                                    </div>
                                ) : (
                                    <Link
                                        href={route('templates.show', template.slug)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition duration-200"
                                    >
                                        📝 Pilih Template
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State for Free Users */}
                {templates.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-12 text-center">
                        <div className="text-6xl mb-4">📄</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Tidak Ada Template Tersedia
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Upgrade ke Premium untuk akses semua template surat profesional.
                        </p>
                        <Link
                            href={route('subscription.index')}
                            className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
                        >
                            💎 Lihat Paket Premium
                        </Link>
                    </div>
                )}

                {/* Premium CTA for Free Users */}
                {!hasPremium && templates.length > 0 && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">🚀 Ingin Akses Semua Template?</h3>
                                <p className="text-yellow-100 mb-4">
                                    Upgrade ke Premium dan dapatkan akses ke 5+ template premium plus fitur eksklusif lainnya!
                                </p>
                                <ul className="text-sm text-yellow-100 space-y-1">
                                    <li>✅ Semua Template Premium</li>
                                    <li>✅ Download Format Word</li>
                                    <li>✅ Unlimited Generate</li>
                                    <li>✅ Priority Support</li>
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
            </div>
        </AppLayout>
    );
}