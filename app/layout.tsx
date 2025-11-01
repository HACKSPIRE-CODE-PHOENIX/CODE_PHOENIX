import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "300"], // you can customize this
    variable: "--font-montserrat",
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
        <body className={`${montserrat.variable} font-montserrat flex bg-[#0e0e0e] min-h-screen text-white`}>
            <div className="fixed top-0 left-0 h-screen w-56">
                <Sidebar />
            </div>
            <main className="flex-1 ml-64 p-6 ">
                {children}
            </main>
        </body>
        </html>

    );
}
