import React from 'react'
import Image from 'next/image'

interface CoinCardProps {
    title: string;
    description: string;
    buttonText: string;
}

const CoinCard = ({title, description, buttonText}: CoinCardProps) => {
    return (
        <div className="mt-6 flex items-center w-[334px] h-[170px] bg-[#1b1b1b] rounded-xl px-4 py-4 border border-[#FF5C00] bg-[url('/assets/images/bottom.svg')] bg-cover bg-center">
            {/* Coin Image */}
            <div className="flex-shrink-0 mr-4">
                <Image src="/assets/images/plus-coin.svg" alt="coin" width={110} height={110} />
            </div>

            {/* Donation Info */}
            <div className="flex flex-col justify-center text-white">
                <p className="text-sm text-gray-400 mb-1">{title}</p>
                <h2 className="text-3xl font-bold mb-3">{description}</h2>

                <button className="bg-gradient-to-b from-[#ff9500] to-[#ff5c00] text-black font-semibold px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition">
                    {buttonText}
                </button>
            </div>
        </div>
    )
}
export default CoinCard
