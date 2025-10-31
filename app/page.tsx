'use client';

import CoinCard from "@/components/CoinCard";
import { beneficiaryData, causeData, coincard, data } from "@/constants";
import { DataTable } from "@/components/data-table";
import { beneficiaryColumns, causeColumns, columns } from "@/components/columns";

export default function Home() {
    return (
        <div className="px-12 py-8 text-white bg-[#0e0e0e]">
            {/* Heading */}
            <div>
                <h2 className="text-3xl font-semibold">Welcome back, John</h2>
                <p className="font-light text-sm opacity-80 mt-2">
                    Donate with Trust. Impact with Transparency.
                </p>
            </div>

            {/* Coin Cards */}
            <div className="flex flex-wrap gap-6 mt-8">
                {coincard.map((coin) => (
                    <CoinCard
                        key={coin.id}
                        title={coin.title}
                        description={coin.description}
                        buttonText={coin.buttonText}
                    />
                ))}
            </div>

            {/* Tables Section */}
            <div className="mt-10 flex flex-wrap gap-4">
                {/* Left Section (Recent Transactions) */}
                <div className="flex">
                    <DataTable
                        width={625}
                        title="Recent Transactions"
                        columns={columns}
                        data={data}
                        button={true}
                    />
                </div>

                {/* Right Section (Top Causes + Beneficiaries stacked) */}
                <div className="flex flex-col gap-4">
                    <DataTable
                        width={292}
                        title="Top Causes You Support"
                        columns={causeColumns}
                        data={causeData}
                    />
                    <DataTable
                        width={292}
                        title="Your Favorite Beneficiaries"
                        columns={beneficiaryColumns}
                        data={beneficiaryData}
                    />
                </div>
            </div>

        </div>
    );
}
