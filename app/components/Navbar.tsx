import React from 'react'

const Navbar = () => {
  return (
    <div className="fixed top-0 z-9 flex justify-end items-center w-full h-16 px-8 bg-black text-white space-x-8">
        <div>Home</div>
        <div>Discover</div>
        <div>Dashboard</div>
    </div>
  )
}

export default Navbar