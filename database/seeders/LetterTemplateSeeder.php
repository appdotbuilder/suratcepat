<?php

namespace Database\Seeders;

use App\Models\LetterTemplate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LetterTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $templates = [
            [
                'name' => 'Surat Lamaran Kerja',
                'slug' => 'surat-lamaran-kerja',
                'description' => 'Template surat lamaran kerja profesional dengan format standar perusahaan.',
                'is_premium' => false,
                'sort_order' => 1,
                'fields' => [
                    ['name' => 'applicant_name', 'label' => 'Nama Lengkap', 'type' => 'text', 'required' => true],
                    ['name' => 'applicant_address', 'label' => 'Alamat Lengkap', 'type' => 'textarea', 'required' => true],
                    ['name' => 'applicant_phone', 'label' => 'Nomor Telepon', 'type' => 'text', 'required' => true],
                    ['name' => 'applicant_email', 'label' => 'Email', 'type' => 'email', 'required' => true],
                    ['name' => 'company_name', 'label' => 'Nama Perusahaan', 'type' => 'text', 'required' => true],
                    ['name' => 'company_address', 'label' => 'Alamat Perusahaan', 'type' => 'textarea', 'required' => true],
                    ['name' => 'position', 'label' => 'Posisi yang Dilamar', 'type' => 'text', 'required' => true],
                ],
                'template_content' => 'Kepada Yth.
HRD {company_name}
di {company_address}

Dengan hormat,

Saya yang bertanda tangan di bawah ini:
Nama: {applicant_name}
Alamat: {applicant_address}
Telepon: {applicant_phone}
Email: {applicant_email}

Dengan ini mengajukan lamaran kerja untuk posisi {position} di perusahaan yang Bapak/Ibu pimpin.

Saya memiliki minat yang besar untuk bergabung dengan perusahaan Bapak/Ibu dan yakin dapat memberikan kontribusi yang positif. Saya bersedia untuk ditempatkan sesuai dengan kebutuhan perusahaan.

Sebagai bahan pertimbangan, saya lampirkan:
1. Curriculum Vitae
2. Fotokopi ijazah dan transkrip nilai
3. Fotokopi KTP
4. Pas foto terbaru

Demikian surat lamaran ini saya buat dengan sebenarnya. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.

Hormat saya,


{applicant_name}'
            ],
            [
                'name' => 'Surat Izin Tidak Masuk',
                'slug' => 'surat-izin-tidak-masuk',
                'description' => 'Template surat izin tidak masuk kerja atau sekolah dengan alasan yang jelas.',
                'is_premium' => false,
                'sort_order' => 2,
                'fields' => [
                    ['name' => 'sender_name', 'label' => 'Nama Pengirim', 'type' => 'text', 'required' => true],
                    ['name' => 'sender_position', 'label' => 'Jabatan/Status', 'type' => 'text', 'required' => true],
                    ['name' => 'recipient_name', 'label' => 'Nama Penerima', 'type' => 'text', 'required' => true],
                    ['name' => 'recipient_title', 'label' => 'Jabatan Penerima', 'type' => 'text', 'required' => true],
                    ['name' => 'absence_reason', 'label' => 'Alasan Tidak Masuk', 'type' => 'textarea', 'required' => true],
                    ['name' => 'absence_date', 'label' => 'Tanggal Tidak Masuk', 'type' => 'date', 'required' => true],
                ],
                'template_content' => 'Kepada Yth.
{recipient_title} {recipient_name}

Dengan hormat,

Saya yang bertanda tangan di bawah ini:
Nama: {sender_name}
Jabatan: {sender_position}

Dengan ini memberitahukan bahwa saya tidak dapat hadir pada tanggal {absence_date} dikarenakan {absence_reason}.

Oleh karena itu, saya mohon izin untuk tidak masuk pada tanggal tersebut. Saya akan memastikan semua pekerjaan tertunggak dapat diselesaikan setelah saya kembali masuk.

Demikian surat izin ini saya buat. Atas perhatian dan pengertiannya, saya ucapkan terima kasih.

Hormat saya,


{sender_name}'
            ],
            [
                'name' => 'Surat Perjanjian Jual Beli',
                'slug' => 'surat-perjanjian-jual-beli',
                'description' => 'Template surat perjanjian jual beli barang dengan klausul lengkap.',
                'is_premium' => true,
                'sort_order' => 3,
                'fields' => [
                    ['name' => 'seller_name', 'label' => 'Nama Penjual', 'type' => 'text', 'required' => true],
                    ['name' => 'seller_address', 'label' => 'Alamat Penjual', 'type' => 'textarea', 'required' => true],
                    ['name' => 'buyer_name', 'label' => 'Nama Pembeli', 'type' => 'text', 'required' => true],
                    ['name' => 'buyer_address', 'label' => 'Alamat Pembeli', 'type' => 'textarea', 'required' => true],
                    ['name' => 'item_description', 'label' => 'Deskripsi Barang', 'type' => 'textarea', 'required' => true],
                    ['name' => 'item_price', 'label' => 'Harga Barang', 'type' => 'text', 'required' => true],
                    ['name' => 'payment_method', 'label' => 'Cara Pembayaran', 'type' => 'text', 'required' => true],
                ],
                'template_content' => 'SURAT PERJANJIAN JUAL BELI

Yang bertanda tangan di bawah ini:

PIHAK PERTAMA (PENJUAL):
Nama: {seller_name}
Alamat: {seller_address}

PIHAK KEDUA (PEMBELI):
Nama: {buyer_name}
Alamat: {buyer_address}

Kedua belah pihak sepakat untuk mengadakan perjanjian jual beli dengan ketentuan sebagai berikut:

1. OBJEK JUAL BELI
   {item_description}

2. HARGA
   Harga yang disepakati adalah Rp {item_price}

3. CARA PEMBAYARAN
   {payment_method}

4. PENYERAHAN BARANG
   Barang akan diserahkan setelah pembayaran lunas diterima penjual.

5. KETENTUAN LAIN
   - Barang yang sudah dibeli tidak dapat dikembalikan
   - Segala resiko setelah penyerahan menjadi tanggung jawab pembeli

Demikian perjanjian ini dibuat dalam keadaan sadar dan tanpa paksaan.

{current_date}

Penjual,                    Pembeli,


{seller_name}               {buyer_name}'
            ],
            [
                'name' => 'Surat Kuasa',
                'slug' => 'surat-kuasa',
                'description' => 'Template surat kuasa untuk mewakilkan urusan tertentu kepada orang lain.',
                'is_premium' => true,
                'sort_order' => 4,
                'fields' => [
                    ['name' => 'grantor_name', 'label' => 'Nama Pemberi Kuasa', 'type' => 'text', 'required' => true],
                    ['name' => 'grantor_address', 'label' => 'Alamat Pemberi Kuasa', 'type' => 'textarea', 'required' => true],
                    ['name' => 'grantor_id', 'label' => 'No. KTP Pemberi Kuasa', 'type' => 'text', 'required' => true],
                    ['name' => 'attorney_name', 'label' => 'Nama Penerima Kuasa', 'type' => 'text', 'required' => true],
                    ['name' => 'attorney_address', 'label' => 'Alamat Penerima Kuasa', 'type' => 'textarea', 'required' => true],
                    ['name' => 'attorney_id', 'label' => 'No. KTP Penerima Kuasa', 'type' => 'text', 'required' => true],
                    ['name' => 'matter_description', 'label' => 'Urusan yang Dikuasakan', 'type' => 'textarea', 'required' => true],
                ],
                'template_content' => 'SURAT KUASA

Yang bertanda tangan di bawah ini:

PEMBERI KUASA:
Nama: {grantor_name}
Alamat: {grantor_address}
No. KTP: {grantor_id}

Dengan ini memberikan kuasa kepada:

PENERIMA KUASA:
Nama: {attorney_name}
Alamat: {attorney_address}
No. KTP: {attorney_id}

Untuk dan atas nama saya melakukan hal-hal sebagai berikut:
{matter_description}

Segala tindakan yang dilakukan oleh penerima kuasa dalam batas-batas kuasa yang diberikan ini, saya anggap sebagai tindakan saya sendiri dan menjadi tanggung jawab saya sepenuhnya.

Surat kuasa ini berlaku sejak tanggal ditandatangani sampai dengan urusan tersebut selesai.

Demikian surat kuasa ini saya buat dengan sebenarnya dan dapat dipergunakan sebagaimana mestinya.

{current_date}

Pemberi Kuasa,              Penerima Kuasa,


{grantor_name}              {attorney_name}'
            ],
            [
                'name' => 'Surat Undangan Resmi',
                'slug' => 'surat-undangan-resmi',
                'description' => 'Template surat undangan resmi untuk acara atau pertemuan.',
                'is_premium' => true,
                'sort_order' => 5,
                'fields' => [
                    ['name' => 'organization_name', 'label' => 'Nama Organisasi/Instansi', 'type' => 'text', 'required' => true],
                    ['name' => 'organization_address', 'label' => 'Alamat Organisasi', 'type' => 'textarea', 'required' => true],
                    ['name' => 'recipient_name', 'label' => 'Nama yang Diundang', 'type' => 'text', 'required' => true],
                    ['name' => 'recipient_title', 'label' => 'Jabatan yang Diundang', 'type' => 'text', 'required' => true],
                    ['name' => 'event_name', 'label' => 'Nama Acara', 'type' => 'text', 'required' => true],
                    ['name' => 'event_date', 'label' => 'Tanggal Acara', 'type' => 'date', 'required' => true],
                    ['name' => 'event_time', 'label' => 'Waktu Acara', 'type' => 'text', 'required' => true],
                    ['name' => 'event_location', 'label' => 'Tempat Acara', 'type' => 'textarea', 'required' => true],
                ],
                'template_content' => '{organization_name}
{organization_address}

Nomor: _______
Hal: Undangan {event_name}

Kepada Yth.
{recipient_title} {recipient_name}

Dengan hormat,

Sehubungan dengan akan dilaksanakannya {event_name}, dengan ini kami mengundang Bapak/Ibu untuk hadir dalam acara tersebut.

Acara akan dilaksanakan pada:
Hari/Tanggal: {event_date}
Waktu: {event_time}
Tempat: {event_location}

Kehadiran Bapak/Ibu sangat kami harapkan. Atas perhatian dan kehadiran Bapak/Ibu, kami ucapkan terima kasih.

Hormat kami,
{organization_name}


(___________________)
Penyelenggara'
            ],
        ];

        foreach ($templates as $template) {
            LetterTemplate::create($template);
        }
    }
}