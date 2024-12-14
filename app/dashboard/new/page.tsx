import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  async function tambahPasien(formData: FormData) {
    "use server";

    await prisma.pasien.create({
      data: {
        nama: formData.get("nama") as string,
        umur: parseInt(formData.get("umur") as string),
        keluhan: formData.get("keluhan") as string,
        nomorAntrian: parseInt(formData.get("nomorAntrian") as string),
        status: formData.get("status") as string,
      },
    });

    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  return (
    <div className="my-12">
      <form
        action={tambahPasien}
        className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Form Input Pasien
        </h2>

        {/* Nama */}
        <div className="mb-4">
          <label
            htmlFor="nama"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            placeholder="Masukkan nama pasien"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Usia */}
        <div className="mb-4">
          <label
            htmlFor="umur"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Usia
          </label>
          <input
            type="number"
            id="umur"
            name="umur"
            placeholder="Masukkan usia pasien"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Keluhan */}
        <div className="mb-4">
          <label
            htmlFor="complaint"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Keluhan
          </label>
          <input
            type="text"
            id="keluhan"
            name="keluhan"
            placeholder="Masukkan keluhan pasien"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Nomor Antrian */}
        <div className="mb-4">
          <label
            htmlFor="queueNumber"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Nomor Antrian
          </label>
          <input
            type="number"
            id="nomorAntrian"
            name="nomorAntrian"
            placeholder="Masukkan nomor antrian"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="waiting">Waiting</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Tambah
        </button>

        <Link href="/">
          <button className="w-full py-3 mt-4 bg-indigo-200 text-black rounded-md hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Kembali
          </button>
        </Link>
      </form>
    </div>
  );
}
