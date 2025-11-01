"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
const { connect, disconnect, account, connected, wallets } = useWallet();
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Load name from Firestore once wallet is connected
  useEffect(() => {
    const fetchUser = async () => {
      if (connected && account?.address) {
        const userDoc = await getDoc(doc(db, "users", account.address.toString())
);
        if (userDoc.exists()) setSavedName(userDoc.data().name);
      }
    };
    fetchUser();
  }, [connected, account]);

  const connectWallet = async () => {
    try {
      // You can optionally select a wallet (Petra, Martian, etc.)
      // This connects to the first available wallet.
      if (wallets.length > 0) {
        await connect(wallets[0].name);
      } else {
        showError("No Aptos wallets found. Install Petra or Martian!");
      }
    } catch (err) {
      showError("Error connecting wallet. Try again!");
    }
  };

  const createProfile = async () => {
    if (!account?.address || !name.trim()) return;
    try {
      await setDoc(doc(db, "users", account.address.toString())
, {
        name,
        createdAt: new Date().toISOString(),
      });
      setSavedName(name);
    } catch {
      showError("Failed to save profile.");
    }
  };

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 2500);
  };




    return (
        <aside className="flex py-6 flex-col justify-between min-h-screen w-72 bg-[#0e0e0e] text-white p-4 border-r border-gray-800">
            {/* ---- Logo ---- */}
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <Image src="logo.svg" alt="logo" width={150} height={150} />
                </div>

                {/* ---- Menu ---- */}
                <nav className="space-y-3">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        <Image src="home-2.svg" alt="Home Icon" width={20} height={20} />
                        <span>Home</span>
                    </Link>

                    {/* ---- Donate Section ---- */}
                    <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-800 transition">
                            <div className="flex items-center gap-3">
                                <Image src="coin.svg" alt="Donate Icon" width={20} height={20} />
                                <Link href="/home">
                                    <span className="text-[#FF5C00] cursor-pointer">Options</span>
                                </Link>
                            </div>
                            <ChevronDown className="w-4 h-4" />
                        </CollapsibleTrigger>

                        <CollapsibleContent className="pl-8 mt-2 space-y-2">
                            <Button onClick={()=>router.push('/discover') }
                                className="relative bg-[#1f1f1f] text-white font-medium rounded-lg pl-4 pr-6 py-6 hover:bg-[#2a2a2a] transition-all duration-200 flex items-center justify-start w-full"
                            >
                                {/* Orange left strip */}
                                <span className="absolute left-0 top-0 h-full w-1.5 bg-orange-500 rounded-l-md"></span>
                                <span className="ml-2">Discover</span>
                            </Button>
                        </CollapsibleContent>
                    </Collapsible>

                    {/* ---- Create Fund Section ---- */}
                    <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-800 transition">
                            
                                <div className="flex items-center gap-3">
                                <Image src="wallet-3.svg" alt="Donate Icon" width={20} height={20} />
                                <span className="text-[#FF5C00]">Create Fund</span>
                            </div>
                            
                            
                            <ChevronDown className="w-4 h-4" />
                        </CollapsibleTrigger>

                        <CollapsibleContent className="pl-8 mt-2 space-y-2">
                            <Button
                                className="relative bg-[#1f1f1f] text-white font-medium rounded-lg pl-4 pr-6 py-6 hover:bg-[#2a2a2a] transition-all duration-200 flex items-center justify-start w-full"
                            >
                                {/* Orange left strip */}
                                <span className="absolute left-0 top-0 h-full w-1.5 bg-orange-500 rounded-l-md"></span>
                                <span className="ml-2">My Fund</span>
                            </Button>
                            <Button
                                onClick={()=>router.push('/create-fund')}
                                variant="default"
                                className="w-full py-6 justify-start border border-[#FF5C00] bg-gradient-to-b from-[#FF5C00]/8 to-[#FF5C00]/0 text-[#FF5C00]"
                            >
                                Create New Fund
                            </Button>
                        </CollapsibleContent>
                    </Collapsible>
                </nav>
            </div>

            {/* ---- User Profile ---- */}
            <div className="flex items-center justify-between bg-transparent p-3 rounded-lg mt-6">
                
                <button
            onClick={disconnect}
            className="bg-transparent text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Disconnect
          </button>
            </div>
        </aside>
    )
}