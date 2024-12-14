import { db } from "@/lib/db";
import Link from "next/link";
import { Pasien } from "./type";

export default function Page() {
  const listPasien = db
    .prepare("SELECT * FROM Patients")
    .all() as Array<Pasien>;

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
            {listPasien.map((pasien) => (
              <tr key={pasien.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{pasien.id}</td>
                <td className="px-4 py-2">{pasien.name}</td>
                <td className="px-4 py-2">{pasien.age}</td>
                <td className="px-4 py-2">{pasien.complaint}</td>
                <td className="px-4 py-2">{pasien.queueNumber}</td>
                <td className="px-4 py-2">{pasien.status}</td>
                <td className="px-4 py-2">
                  {new Date(pasien.createdAt).toLocaleString()}
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
