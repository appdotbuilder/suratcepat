import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="SuratCepat - Bikin Surat Resmi Jadi Mudah">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
                {/* Header */}
                <header className="relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">📄</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SuratCepat</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition duration-200"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
                                        >
                                            Daftar Gratis
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    SuratCepat
                                </span>
                            </h1>
                            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4">
                                📝 Bikin Surat Resmi Jadi Mudah
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                                Generator surat otomatis dengan template profesional. Buat surat lamaran kerja, izin, perjanjian, dan dokumen resmi lainnya dalam hitungan menit!
                            </p>
                            
                            {auth.user ? (
                                <Link
                                    href={route('templates.index')}
                                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-200"
                                >
                                    🚀 Buat Surat Sekarang
                                </Link>
                            ) : (
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-200"
                                >
                                    🚀 Mulai Gratis Sekarang
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                ✨ Kenapa Pilih SuratCepat?
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Solusi terlengkap untuk kebutuhan surat resmi Anda
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                <div className="text-4xl mb-4">⚡</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Super Cepat
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Buat surat resmi hanya dalam 2-3 menit. Isi form, preview, dan download PDF langsung!
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                <div className="text-4xl mb-4">⚖️</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Format Legal
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Template dibuat sesuai standar hukum Indonesia. Dijamin format yang tepat dan profesional.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Output PDF Siap Cetak
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Download langsung dalam format PDF berkualitas tinggi, siap untuk dicetak atau dikirim via email.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Templates Preview */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                📋 Template yang Tersedia
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Pilihan lengkap untuk berbagai kebutuhan surat resmi
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-green-500">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-2">💼</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Surat Lamaran Kerja</h3>
                                    <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded">GRATIS</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Template profesional untuk melamar pekerjaan dengan format standar HRD
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-green-500">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-2">📅</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Surat Izin Tidak Masuk</h3>
                                    <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded">GRATIS</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Surat izin untuk keperluan tidak masuk kerja atau sekolah
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-2">🤝</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Surat Perjanjian Jual Beli</h3>
                                    <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">PREMIUM</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Kontrak jual beli dengan klausul lengkap dan legally binding
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-2">👤</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Surat Kuasa</h3>
                                    <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">PREMIUM</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Surat kuasa resmi untuk mewakilkan urusan tertentu
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-2">📨</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Surat Undangan Resmi</h3>
                                    <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">PREMIUM</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Undangan formal untuk acara atau pertemuan penting
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl shadow-md text-white">
                                <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-2">🎯</span>
                                    <h3 className="font-semibold">Dan Masih Banyak Lagi!</h3>
                                </div>
                                <p className="text-sm text-blue-100">
                                    Template baru ditambahkan secara berkala untuk memenuhi kebutuhan Anda
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="bg-white dark:bg-gray-800 py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    💎 Pilih Paket yang Cocok
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    Mulai gratis, upgrade kapan saja
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-lg">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            Paket Gratis
                                        </h3>
                                        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                            Rp 0
                                            <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/selamanya</span>
                                        </div>
                                        <ul className="text-left space-y-3 mb-8">
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✅</span>
                                                2 Template Premium
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✅</span>
                                                Download PDF
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✅</span>
                                                History Surat
                                            </li>
                                        </ul>
                                        {!auth.user && (
                                            <Link
                                                href={route('register')}
                                                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
                                            >
                                                Mulai Gratis
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl shadow-lg text-white relative">
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                                            PALING POPULER
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold mb-2">
                                            Paket Premium
                                        </h3>
                                        <div className="text-4xl font-bold mb-6">
                                            Rp 99.000
                                            <span className="text-lg font-normal text-blue-200">/bulan</span>
                                        </div>
                                        <ul className="text-left space-y-3 mb-8">
                                            <li className="flex items-center">
                                                <span className="text-green-400 mr-2">✅</span>
                                                Semua Template (5+ dan terus bertambah)
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-green-400 mr-2">✅</span>
                                                Download PDF & Word
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-green-400 mr-2">✅</span>
                                                Unlimited Generate
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-green-400 mr-2">✅</span>
                                                Priority Support
                                            </li>
                                        </ul>
                                        {auth.user ? (
                                            <Link
                                                href={route('subscription.index')}
                                                className="block w-full bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-6 rounded-lg transition duration-200"
                                            >
                                                Upgrade Sekarang
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route('register')}
                                                className="block w-full bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-6 rounded-lg transition duration-200"
                                            >
                                                Mulai Premium
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                🎯 Siap Bikin Surat Resmi yang Profesional?
                            </h2>
                            <p className="text-xl mb-8 text-blue-100">
                                Bergabung dengan ribuan pengguna yang sudah merasakan kemudahan SuratCepat
                            </p>
                            {auth.user ? (
                                <Link
                                    href={route('templates.index')}
                                    className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-600 text-xl font-bold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-200"
                                >
                                    🚀 Mulai Buat Surat
                                </Link>
                            ) : (
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-600 text-xl font-bold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-200"
                                >
                                    🚀 Daftar Gratis Sekarang
                                </Link>
                            )}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">📄</span>
                            </div>
                            <span className="text-xl font-bold">SuratCepat</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Bikin surat resmi jadi mudah dan cepat
                        </p>
                        <p className="text-sm text-gray-500">
                            © 2024 SuratCepat. Semua hak cipta dilindungi.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}