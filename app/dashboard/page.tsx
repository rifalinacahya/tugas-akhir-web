import Link from "next/link";
import { prisma } from "@/lib/prisma";

// ----------------------------
// Halaman Daftar Pasien
// ----------------------------

export default async function Page() {
  const daftarPasien = await prisma.pasien.findMany();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Daftar Pasien</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Usia</th>
              <th className="px-4 py-2">Keluhan</th>
              <th className="px-4 py-2">Nomor Antrian</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Waktu Dibuat</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarPasien.map((pasien) => (
              <tr key={pasien.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{pasien.id}</td>
                <td className="px-4 py-2">{pasien.nama}</td>
                <td className="px-4 py-2">{pasien.umur}</td>
                <td className="px-4 py-2">{pasien.keluhan}</td>
                <td className="px-4 py-2">{pasien.nomorAntrian}</td>
                <td className="px-4 py-2">{pasien.status}</td>
                <td className="px-4 py-2">
                  {pasien.tanggalDibuat.toLocaleString()}
                </td>
                <td>
                  <Link href={"/edit/" + pasien.id}>
                    <button>edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href="/new">
        <button className="mt-5 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Tambah Pasien
        </button>
      </Link>
    </div>
  );
}
