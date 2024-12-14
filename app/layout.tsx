import type { Metadata } from "next";
import "./globals.css";
import { Activity, User, LogOut } from "lucide-react";
import { getUser } from "@/lib/auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Klinik Cahaya",
  description: "Aplikasi antrian pasien",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <header className="bg-white px-12 py-3 flex items-center justify-between border-b border-gray-200">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80">
            <Activity className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl text-gray-800">Klinik Cahaya</h1>
          </Link>

          {user ? (
            <div className="relative group">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-full">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              </div>

              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150">
                <Link
                  href="/logout"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </header>

        {children}
      </body>
    </html>
  );
}
