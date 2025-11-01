'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

export default function ActiveDonationCard() {

    const [open, setOpen] = useState(false);

    return (
        <div className="bg-[#1f1f1f] rounded-lg p-4 w-[990px] border border-[#2a2a2a] mt-6">
            <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                className="transition-all duration-300 ease-in-out"
            >
                <AccordionItem
                    value="item-1"
                    className="border-none transition-all duration-300 ease-in-out"
                >
                    <AccordionTrigger
                        className="text-white font-medium text-sm hover:no-underline transition-colors duration-200"
                    >
                        Your Active Donations
                    </AccordionTrigger>

                    <AccordionContent
                        className="animate-accordion-down transition-all duration-300 ease-in-out"
                    >
                        <div className="mt-4 space-y-3">
                            {/* Title + NGO Badge */}
                            <div className="flex items-center gap-1.5">
                                <h3 className="text-lg font-semibold text-white">
                                    The Rain Forest Fund
                                </h3>
                                <Badge
                                    className="bg-[#FF5C00]/20 text-[#FF5C00] hover:bg-[#FF5C00]/30 text-xs font-medium px-2 py-0.5"
                                >
                                    by The Fulkopi NGO
                                </Badge>
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-sm text-gray-300">
                                {/* Listing Date */}
                                <div className="flex items-center gap-2">
                                    <p className="min-w-[120px]">Listing Date</p>
                                    <span className="bg-[#2a2a2a] text-gray-400 px-2.5 py-1 rounded-md">
                                        10th August 2025
                                    </span>
                                </div>

                                {/* Total Milestones */}
                                <div className="flex items-center gap-2">
                                    <p className="min-w-[120px]">Total Milestones</p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="bg-[#2a2a2a] text-gray-400 px-2.5 py-1 rounded-md text-xs">
                                            3
                                        </span>
                                        <Button
                                            onClick={() => setOpen(true)}
                                            variant="outline"
                                            className="bg-[#FFB800]/10 border border-[#FFB800]/40 text-[#FFB800] hover:bg-[#FFB800]/20 px-2.5 py-1 h-auto text-xs rounded-md flex items-center"
                                        >
                                            View all Milestones
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Funds Disbursed */}
                                <div className="flex items-center gap-2">
                                    <p className="min-w-[120px]">Funds Disbursed</p>
                                    <span className="bg-[#2a2a2a] text-gray-400 px-2.5 py-1 rounded-md text-xs">
                                        20 ATC
                                    </span>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        {/*    Dialog*/}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px] bg-[#1f1f1f] text-white border border-[#2a2a2a]">
                    <DialogHeader>
                        <DialogTitle className="text-[#FFB800]">Milestone Details</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Overview of all milestones for this donation.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 mt-4">
                        <div className="bg-[#2a2a2a] p-3 rounded-md">
                            <p className="text-sm font-medium">
                                Milestone 1
                            </p>
                            <p className="text-xs text-gray-400">Distributed 10 ATC to community fund.</p>
                        </div>
                        <div className="bg-[#2a2a2a] p-3 rounded-md">
                            <p className="text-sm font-medium">Milestone 2</p>
                            <p className="text-xs text-gray-400">Set up 2 new water pumps.</p>
                        </div>
                        <div className="bg-[#2a2a2a] p-3 rounded-md">
                            <p className="text-sm font-medium">Milestone 3</p>
                            <p className="text-xs text-gray-400">Reforestation completed.</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
