import React from 'react'
import { Input } from "@/components/ui/input"
import ExploreCard from "@/components/ExploreCard";
import {explorecard} from "@/constants";

const Page = () => {
    const bg : string= "@/public/assets/images/Ellipse.svg";
    return (
        <div className="px-12 py-1 text-white ml-8">
            {/* Heading */}
            <div>
                <h2 className="text-3xl mt-2 font-semibold">Explore all Funds </h2>
                <p className="font-light text-sm opacity-80 mt-2">
                    Donate with Trust. Impact with Transparency.
                </p>
                <Input className="mt-4 w-[90%]" type="text" placeholder="Search by Fund Name, Cause or Beneficiary Name" />
            </div>

            <div className="mt-4">
                {explorecard.map((card, index) => (
                    <ExploreCard key={index} {...card} />
                ))}
            </div>

        </div>
    )
}
export default Page
