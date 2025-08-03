import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface FormField {
    name: string;
    label: string;
    type: string;
    required: boolean;
}

interface Template {
    id: number;
    name: string;
    slug: string;
    description: string;
    fields: FormField[];
}

interface Props {
    template: Template;
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
        title: 'Buat Surat',
        href: '#',
    },
];

export default function CreateLetter({ template }: Props) {
    const { data, setData, processing, errors } = useForm({
        letter_template_id: template.id,
        title: '',
        form_data: {} as Record<string, string>,
    });

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

    const handleFieldChange = (fieldName: string, value: string) => {
        setData('form_data', {
            ...data.form_data,
            [fieldName]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.post(route('letters.store'), data, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const renderField = (field: FormField) => {
        const commonClasses = "w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white";
        
        switch (field.type) {
            case 'textarea':
                return (
                    <textarea
                        id={field.name}
                        value={data.form_data[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        required={field.required}
                        rows={3}
                        className={commonClasses}
                        placeholder={`Masukkan ${field.label.toLowerCase()}`}
                    />
                );
            case 'email':
                return (
                    <input
                        type="email"
                        id={field.name}
                        value={data.form_data[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        required={field.required}
                        className={commonClasses}
                        placeholder={`Masukkan ${field.label.toLowerCase()}`}
                    />
                );
            case 'date':
                return (
                    <input
                        type="date"
                        id={field.name}
                        value={data.form_data[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        required={field.required}
                        className={commonClasses}
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        id={field.name}
                        value={data.form_data[field.name] || ''}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        required={field.required}
                        className={commonClasses}
                        placeholder={`Masukkan ${field.label.toLowerCase()}`}
                    />
                );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Buat ${template.name} - SuratCepat`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="text-3xl">{getTemplateIcon(template.slug)}</div>
                        <h1 className="text-2xl font-bold">{template.name}</h1>
                    </div>
                    <p className="text-blue-100">
                        {template.description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Form Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                            📝 Isi Data Surat
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Letter Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Judul Surat <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="Contoh: Lamaran Kerja PT ABC"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Dynamic Form Fields */}
                            {template.fields.map((field) => (
                                <div key={field.name}>
                                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    {renderField(field)}
                                    {errors[`form_data.${field.name}` as keyof typeof errors] && (
                                        <p className="mt-1 text-sm text-red-600">{errors[`form_data.${field.name}` as keyof typeof errors]}</p>
                                    )}
                                </div>
                            ))}

                            {/* Submit Button */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-600">
                                <button
                                    type="button"
                                    onClick={() => router.visit(route('templates.index'))}
                                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                                >
                                    ← Kembali
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-8 py-2 rounded-lg transition duration-200"
                                >
                                    {processing ? '⏳ Generating...' : '🚀 Generate Surat'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Preview/Instructions Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                            💡 Petunjuk Pengisian
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                    📋 Tips Pengisian Form
                                </h3>
                                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                    <li>• Pastikan semua data yang diisi sudah benar</li>
                                    <li>• Gunakan format yang standar dan profesional</li>
                                    <li>• Periksa kembali ejaan sebelum generate</li>
                                    <li>• Field yang wajib diisi ditandai dengan (*)</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                                    ✅ Setelah Generate
                                </h3>
                                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                                    <li>• Preview surat akan muncul otomatis</li>
                                    <li>• Download dalam format PDF siap cetak</li>
                                    <li>• Surat akan tersimpan di history Anda</li>
                                    <li>• Bisa download ulang kapan saja</li>
                                </ul>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                                <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                                    ⚠️ Perhatian
                                </h3>
                                <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                                    <li>• Template sudah mengikuti format legal yang benar</li>
                                    <li>• Pastikan data pribadi yang diisi akurat</li>
                                    <li>• Surat yang sudah di-generate tidak bisa diubah</li>
                                    <li>• Buat surat baru jika ada kesalahan</li>
                                </ul>
                            </div>
                        </div>

                        {/* Form Progress */}
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                📊 Progress Pengisian
                            </h3>
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div
                                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${((Object.keys(data.form_data).filter(key => data.form_data[key]).length + (data.title ? 1 : 0)) / (template.fields.length + 1)) * 100}%`
                                    }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                {Object.keys(data.form_data).filter(key => data.form_data[key]).length + (data.title ? 1 : 0)} dari {template.fields.length + 1} field terisi
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}