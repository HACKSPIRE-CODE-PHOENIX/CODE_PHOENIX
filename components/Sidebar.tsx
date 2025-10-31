"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"

export default function Sidebar() {
    return (
        <aside className="flex flex-col justify-between h-screen w-72 bg-[#121212] text-white p-4 border-r border-gray-800">
            {/* ---- Logo ---- */}
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <Image src="/assets/icons/logo.svg" alt="logo" width={150} height={150} />
                </div>

                {/* ---- Menu ---- */}
                <nav className="space-y-3">
                    <Link
                        href="#"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        <Image src="/assets/icons/home-2.svg" alt="Home Icon" width={20} height={20} />
                        <span>Home</span>
                    </Link>

                    {/* ---- Donate Section ---- */}
                    <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-800 transition">
                            <div className="flex items-center gap-3">
                                <Image src="/assets/icons/coin.svg" alt="Donate Icon" width={20} height={20} />
                                <span className="text-[#FF5C00]">Donate</span>
                            </div>
                            <ChevronDown className="w-4 h-4" />
                        </CollapsibleTrigger>

                        <CollapsibleContent className="pl-8 mt-2 space-y-2">
                            <Button
                                className="relative bg-[#1f1f1f] text-white font-medium rounded-lg pl-4 pr-6 py-6 hover:bg-[#2a2a2a] transition-all duration-200 flex items-center justify-start w-full"
                            >
                                {/* Orange left strip */}
                                <span className="absolute left-0 top-0 h-full w-1.5 bg-orange-500 rounded-l-md"></span>
                                <span className="ml-2">Explore</span>
                            </Button>
                            <Button
                                variant="default"
                                className="w-full py-6 justify-start border border-[#FF5C00] bg-gradient-to-b from-[#FF5C00]/8 to-[#FF5C00]/0 text-[#FF5C00]"
                            >
                                Quick Donate
                            </Button>
                        </CollapsibleContent>
                    </Collapsible>

                    {/* ---- Create Fund Section ---- */}
                    <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-800 transition">
                            <div className="flex items-center gap-3">
                                <Image src="/assets/icons/wallet-3.svg" alt="Donate Icon" width={20} height={20} />
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
            <div className="flex items-center justify-between bg-gray-900 p-3 rounded-lg mt-6">
                <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                        <AvatarImage src="/user.jpg" alt="User" />
                        <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold">John Carter</p>
                        <p className="text-xs text-gray-400">Account settings</p>
                    </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
        </aside>
    )
}
