import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Subscription',
        href: '/subscription',
    },
    {
        title: 'Upgrade Premium',
        href: '/subscription/create',
    },
];

export default function UpgradePremium() {
    const { data, setData, processing, errors } = useForm({
        plan: 'premium',
        payment_proof: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.post(route('subscription.store'), data, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Upgrade ke Premium - SuratCepat" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">🚀 Upgrade ke Premium</h1>
                    <p className="text-yellow-100">
                        Dapatkan akses unlimited ke semua template premium dan fitur eksklusif lainnya!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Payment Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                            💳 Pembayaran Premium
                        </h2>

                        {/* Package Summary */}
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-gray-900 dark:text-white">💎 Paket Premium</h3>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">Rp 99.000</span>
                            </div>
                            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                <li>✅ Akses semua template (5+ dan bertambah)</li>
                                <li>✅ Download PDF & Word format</li>
                                <li>✅ Unlimited generate surat</li>
                                <li>✅ Priority customer support</li>
                                <li>✅ Template eksklusif dan terbaru</li>
                            </ul>
                        </div>

                        {/* Bank Transfer Instructions */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                                🏦 Cara Pembayaran
                            </h3>
                            <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
                                <div>
                                    <p className="font-semibold">1. Transfer ke rekening berikut:</p>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded border mt-2">
                                        <p><strong>Bank:</strong> BCA</p>
                                        <p><strong>No. Rekening:</strong> 1234567890</p>
                                        <p><strong>Atas Nama:</strong> SuratCepat Indonesia</p>
                                        <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-2">Rp 99.000</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold">2. Upload bukti transfer di form ini</p>
                                </div>
                                <div>
                                    <p className="font-semibold">3. Tunggu aktivasi (1-24 jam)</p>
                                </div>
                            </div>
                        </div>

                        {/* Upload Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="payment_proof" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    📸 Upload Bukti Transfer <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    id="payment_proof"
                                    accept="image/*,.pdf"
                                    onChange={(e) => setData('payment_proof', e.target.files?.[0] || null)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Format: JPG, PNG, atau PDF. Maksimal 2MB.
                                </p>
                                {errors.payment_proof && (
                                    <p className="mt-1 text-sm text-red-600">{errors.payment_proof}</p>
                                )}
                            </div>

                            {/* Terms */}
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📋 Syarat & Ketentuan:</h4>
                                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    <li>• Pembayaran bersifat final dan tidak dapat dikembalikan</li>
                                    <li>• Aktivasi premium dilakukan dalam 1-24 jam setelah verifikasi</li>
                                    <li>• Subscription berlaku selama 30 hari dari tanggal aktivasi</li>
                                    <li>• Akses premium akan hangus jika tidak diperpanjang</li>
                                </ul>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-600">
                                <button
                                    type="button"
                                    onClick={() => router.visit(route('subscription.index'))}
                                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                                >
                                    ← Kembali
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 text-white font-semibold px-8 py-2 rounded-lg transition duration-200"
                                >
                                    {processing ? '⏳ Uploading...' : '🚀 Aktifkan Premium'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Info Sidebar */}
                    <div className="space-y-6">
                        {/* Premium Benefits */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                ✨ Keuntungan Premium
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <span className="text-2xl mr-3">📋</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Semua Template</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Akses 5+ template dan terus bertambah</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <span className="text-2xl mr-3">💾</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Multi Format</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Download PDF dan Word</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <span className="text-2xl mr-3">🔄</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Unlimited</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Generate surat tanpa batas</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <span className="text-2xl mr-3">🎧</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Priority Support</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Bantuan prioritas 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Process */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                ⚡ Proses Cepat
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Transfer Rp 99.000 ke rekening</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Upload bukti transfer</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Tunggu aktivasi (1-24 jam)</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">✓</div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Nikmati fitur Premium!</span>
                                </div>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                🎧 Butuh Bantuan?
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Tim support kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami.
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                    <span className="mr-2">📧</span>
                                    <span className="text-gray-700 dark:text-gray-300">support@suratcepat.com</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">💬</span>
                                    <span className="text-gray-700 dark:text-gray-300">WhatsApp: +62 812-3456-7890</span>
                                </div>
                            </div>
                        </div>

                        {/* Money Back Guarantee */}
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6">
                            <div className="text-center">
                                <div className="text-4xl mb-3">🛡️</div>
                                <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
                                    Garansi Kepuasan
                                </h3>
                                <p className="text-sm text-green-800 dark:text-green-200">
                                    Tidak puas dengan layanan kami dalam 7 hari pertama? Kami akan mengembalikan uang Anda 100%!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}