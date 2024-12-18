import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const pasien = await prisma.pasien.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  async function updatePasien(formData: FormData) {
    "use server";

    await prisma.pasien.update({
      data: {
        nama: formData.get("nama") as string,
        umur: parseInt(formData.get("umur") as string),
        keluhan: formData.get("keluhan") as string,
        status: formData.get("status") as string,
      },
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  if (!pasien) {
    return null;
  }

  return (
    <div className="my-12">
      <form
        action={updatePasien}
        className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Edit Pasien</h2>

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
            defaultValue={pasien.nama}
            placeholder="Masukkan nama pasien"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            defaultValue={pasien.umur}
            placeholder="Masukkan usia pasien"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Keluhan */}
        <div className="mb-4">
          <label
            htmlFor="keluhan"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Keluhan
          </label>
          <textarea
            id="keluhan"
            name="keluhan"
            defaultValue={pasien.keluhan ?? ""}
            placeholder="Masukkan keluhan pasien"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            defaultValue={pasien.status}
          >
            <option value="menunggu">Menunggu</option>
            <option value="pemeriksaan">Pemeriksaan</option>
            <option value="selesai">Selesai</option>
          </select>
        </div>

        <div className="pt-6" />

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Simpan
        </button>

        <Link href="/dashboard">
          <button className="w-full py-3 mt-4 bg-blue-200 text-black rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Kembali
          </button>
        </Link>
      </form>
    </div>
  );
}
