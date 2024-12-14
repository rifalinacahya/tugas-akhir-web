import Link from "next/link";

export default async function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Selamat Datang di KlinikQueue
          </h1>
          <p className="text-gray-600 mb-8">
            Sistem Manajemen Antrian Pasien yang Mudah dan Efisien
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/auth/login"
            className="w-full inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login Staff
          </Link>

          <Link
            href="/auth/register"
            className="w-full inline-block bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Daftar Akun Baru
          </Link>
        </div>

        <div className="mt-6 text-gray-600">
          <p>Fitur Utama:</p>
          <ul className="mt-2 space-y-2">
            <li>✓ Manajemen antrian real-time</li>
            <li>✓ Pendaftaran pasien online</li>
            <li>✓ Notifikasi status antrian</li>
            <li>✓ Laporan dan statistik kunjungan</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
