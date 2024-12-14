import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Users, Play, CheckCircle2, PlayCircle, Pencil } from "lucide-react";
import { revalidatePath } from "next/cache";

async function updatePasienStatus(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const status = formData.get("status")?.toString() || "";

  await prisma.pasien.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/dashboard");
}

export default async function Page() {
  const daftarPasien = await prisma.pasien.findMany({
    orderBy: {
      nomorAntrian: "desc",
    },
  });

  // Hitung jumlah pasien menunggu
  const pasienMenunggu = daftarPasien.filter(
    (p) => p.status === "menunggu"
  ).length;

  const nomorPanggilan =
    daftarPasien.find((p) => p.status === "pemeriksaan")?.nomorAntrian ??
    daftarPasien.find((p) => p.status === "selesai")?.nomorAntrian ??
    0;

  return (
    <div className="container mx-auto py-6">
      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-gray-600">Pasien Menunggu</p>
              <h2 className="text-3xl font-bold">{pasienMenunggu}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <PlayCircle className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-gray-600">Nomor Panggilan Terakhir</p>
              <h2 className="text-3xl font-bold">#{nomorPanggilan}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div>
            <h3 className="text-xl font-semibold mb-2">Pendaftaran Pasien</h3>
            <p className="text-gray-600 mb-4">
              Tambahkan pasien baru ke sistem antrian
            </p>
            <Link href="/dashboard/tambah">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Daftarkan pasien
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabel Antrian */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Antrian Saat Ini</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  NOMOR ANTRIAN
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  NAMA PASIEN
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  UMUR
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  KELUHAN
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  STATUS
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  ACTIONS
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  EDIT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {daftarPasien.map((pasien) => (
                <tr key={pasien.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">#{pasien.nomorAntrian}</td>
                  <td className="px-6 py-4">{pasien.nama}</td>
                  <td className="px-6 py-4">{pasien.umur}</td>
                  <td className="px-6 py-4">{pasien.keluhan}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        pasien.status === "menunggu"
                          ? "bg-yellow-100 text-yellow-800"
                          : pasien.status === "pemeriksaan"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {pasien.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {pasien.status === "menunggu" ? (
                      <form action={updatePasienStatus}>
                        <input type="hidden" name="id" value={pasien.id} />
                        <input
                          type="hidden"
                          name="status"
                          value="pemeriksaan"
                        />
                        <button
                          type="submit"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Play className="h-6 w-6" />
                        </button>
                      </form>
                    ) : pasien.status === "pemeriksaan" ? (
                      <form action={updatePasienStatus}>
                        <input type="hidden" name="id" value={pasien.id} />
                        <input type="hidden" name="status" value="selesai" />
                        <button
                          type="submit"
                          className="text-green-500 hover:text-green-700"
                        >
                          <CheckCircle2 className="h-6 w-6" />
                        </button>
                      </form>
                    ) : null}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/edit/${pasien.id}`}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Pencil className="h-6 w-6" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
