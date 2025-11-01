import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

import CoinCard from "@/components/CoinCard";
import { DataTable } from "@/components/data-table";
import {beneficiaryColumns, Cause, causeColumns, columns, Transaction} from "@/components/columns";
import { beneficiaryData, causeData, coincard, data } from "@/constants";
import {ColumnDef} from "@tanstack/react-table";

const columns1: ColumnDef<Transaction>[] = [
    {
        accessorKey: "id",
        header: "Transaction ID",
    },
    {
        accessorKey: "receiver",
        header: "Received From",
    },
    {
        accessorKey: "country",
        header: "Fund Name",
    },
    {
        accessorKey: "tokens",
        header: "Tokens Received",
        cell: ({ row }) => <div className="text-right">{row.getValue("tokens")}</div>,
    },
]

const coincard1 = [
    {
        "id": 1,
        "title": "Donation Received",
        "description": "500 Tokens",
    }
]

const causeColumns1: ColumnDef<Cause>[] = [
    {
        accessorKey: "cause",
        header: "Cause",
    },
    {
        accessorKey: "tokens",
        header: "Funds Created",
    },
]

const YourDonation = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-full"
            >
                <CollapsibleTrigger asChild>
                    <div
                        className="flex items-center justify-between text-sm mt-6 border-b border-white/60 pb-3 cursor-pointer select-none"
                    >
                        <p>Your Funds</p>
                        <ChevronDown
                            className={`h-4 w-4 transition-transform duration-400 ease-in-out ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                </CollapsibleTrigger>

                <CollapsibleContent
                    className="overflow-hidden transition-all duration-400 ease-in-out data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
                >
                    <div className="mt-6">
                        {/* Coin Cards */}
                        <div className="flex flex-wrap gap-6 mt-8">
                            {coincard1.map((coin) => (
                                <CoinCard
                                    key={coin.id}
                                    title={coin.title}
                                    description={coin.description}
                                />
                            ))}
                        </div>

                        {/* Tables Section */}
                        <div className="mt-10 flex flex-wrap gap-16">
                            {/* Left Section (Recent Transactions) */}
                            <div className="flex">
                                <DataTable
                                    width={625}
                                    title="Recent Transactions"
                                    columns={columns1}
                                    data={data}
                                    button={true}
                                />
                            </div>

                            {/* Right Section (Top Causes + Beneficiaries stacked) */}
                            <div className="flex flex-col gap-4">
                                <DataTable
                                    width={292}
                                    title="Top Causes You Support"
                                    columns={causeColumns1}
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
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}
export default YourDonation
