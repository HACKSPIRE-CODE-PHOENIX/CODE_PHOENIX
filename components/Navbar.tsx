"use client";

import React from 'react'
import { useRouter } from "next/navigation";



const Navbar = () => {
  const router = useRouter();
  return (
    <div className="fixed top-0 z-9 flex justify-end items-center w-full h-16 px-8 bg-black text-white space-x-8">
        <div>Home</div>
        <div onClick={()=>router.push("/discover")} className='cursor-pointer'>Discover</div>
        <div onClick={() => router.push("/dashboard")} className='cursor-pointer'>Dashboard</div>
    </div>
  )
}

export default Navbar