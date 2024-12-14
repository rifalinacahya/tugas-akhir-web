import { getUser } from "@/lib/auth";

export default async function Page() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white mt-12 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image section - reduced to 1/4 */}
            <div
              className="h-48 lg:h-auto lg:w-1/4 relative hidden lg:block"
              style={{
                backgroundImage: "url(/background.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content section */}
            <div className="w-full lg:w-3/4 flex flex-col items-center justify-center p-8">
              <div className="max-w-xl w-full space-y-8">
                <div className="space-y-6 text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Selamat Datang di Klinik Cahaya
                  </h1>
                  <p className="text-gray-600 text-xl font-light">
                    Sistem Manajemen Antrian Pasien yang Mudah dan Efisien
                  </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Kami berkomitmen untuk memberikan pelayanan kesehatan
                    terbaik dengan sistem antrian yang modern dan efisien untuk
                    kenyamanan pasien.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {user ? (
                    <div className="w-full">
                      <a
                        href="/dashboard"
                        className="w-full block px-6 py-3 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Lanjut ke Dashboard
                      </a>
                      <p className="text-gray-600 text-sm mt-2 text-center">
                        Anda telah masuk sebagai {user.name}
                      </p>
                    </div>
                  ) : (
                    <>
                      <a
                        href="/auth/login"
                        className="flex-1 px-6 py-3 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Masuk
                      </a>
                      <a
                        href="/auth/register"
                        className="flex-1 px-6 py-3 text-center text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Daftar
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
