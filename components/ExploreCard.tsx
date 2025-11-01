'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ExploreCardProps {
    fund: string;
    ngo: string;
    target: string;
    num: number;
    causeTitle: string;
    causeDes: string;
    milestoneTitle: string;
    milestoneNum: number;
}

export default function ExploreCard({
                                        fund,
                                        ngo,
                                        target,
                                        num,
                                        causeTitle,
                                        causeDes,
                                        milestoneTitle,
                                        milestoneNum,
                                    }: ExploreCardProps) {
    return (
        <div className="bg-[#2a190f]/70 border border-[#ff5c00]/20 rounded-lg p-4 w-[990px] flex items-center justify-between backdrop-blur-sm hover:border-[#ff5c00]/40 transition-all duration-300 mb-3">

            {/* Left Section */}
            <div>
                <p className="text-white font-montserrat font-semibold text-lg">{fund}</p>
                <p className=" text-xs mt-1 bg-[#ff5c00]/10 text-[#ff5c00] px-2 py-[2px] rounded-md">
                    {ngo}
                </p>
            </div>

            {/* Divider Sections */}
            <div className="flex gap-1 items-center ">
                {/* Target */}

                <div className="flex px-5 border-gray-400 flex-col justify-center items-center">
                    <span className="text-gray-400 text-sm">{target}</span>
                    <span className="text-white gap-[7px] mx-auto flex font-semibold">
                        {num}
                        <Image src="/assets/images/coin3.svg" alt="coin3" width={20} height={20} />
                    </span>

                </div>

                {/* Cause */}
                <div className="flex px-5 border-gray-400 flex-col items-center">
                    <span className="text-gray-400 text-sm">{causeTitle}</span>
                    <span className="bg-[#2a2a2a] text-gray-300 px-3 py-[2px] rounded-md text-sm">{causeDes}</span>
                </div>

                {/* Milestone */}
                <div className="flex px-5 border-gray-400 flex-col items-center">
                    <span className="text-gray-400 text-sm">{milestoneTitle}</span>
                    <span className="bg-[#2a2a2a] text-gray-300 px-3 py-[2px] rounded-md text-sm">{milestoneNum}</span>
                </div>

                {/* Button */}
                <Button className="bg-[#FF5C00] hover:bg-[#e14f00] text-white text-sm font-semibold px-4 py-2 rounded-md transition-all duration-300">
                    DONATE NOW
                </Button>
            </div>
        </div>
    );
}
