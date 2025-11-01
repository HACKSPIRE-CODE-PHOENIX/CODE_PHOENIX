import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

import CoinCard from "@/components/CoinCard";
import { DataTable } from "@/components/data-table";
import { beneficiaryColumns, causeColumns, columns } from "@/components/columns";
import { beneficiaryData, causeData, coincard, data } from "@/constants";
import ActiveDonationCard from "@/components/ActiveDonationCard";

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
                        <p>Your Donations</p>
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
                        <div className="mt-10 flex flex-wrap gap-16">
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

                        <ActiveDonationCard />
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}
export default YourDonation
