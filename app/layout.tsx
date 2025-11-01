import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import WalletProvider from "../components/WalletProvider";

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
  description: "Donate hassle-free with DonorFi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Wrap all Client Components under WalletProvider */}
        <WalletProvider>
          
          <Toaster position="top-right" reverseOrder={false} />
          <div className="fixed top-0 left-0 h-screen w-56">
                <Navbar />
            </div>
            <main className="flex-1 ml-64 p-6 ">
                {children}
            </main>
        </WalletProvider>
      </body>
    </html>
  );
}
