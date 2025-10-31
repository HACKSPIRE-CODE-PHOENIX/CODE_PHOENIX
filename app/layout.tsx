import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DonorFi",
  description: "Milestone Based Transparent Donations on Aptos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className="flex bg-[#0e0e0e] text-white">
      <div className="fixed top-0 left-0 h-screen w-56">
          <Sidebar />
      </div>
      <main className="flex-1 ml-64 p-6 overflow-y-auto h-screen">
          {children}
      </main>
      </body>
      </html>

  );
}
