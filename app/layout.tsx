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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Wrap all Client Components under WalletProvider */}
        <WalletProvider>
          
          <Toaster position="top-right" reverseOrder={false} />
          <Navbar />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
