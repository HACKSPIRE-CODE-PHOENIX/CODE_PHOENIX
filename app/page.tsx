'use client';

import { useState } from "react";
import YourDonation from "@/components/YourDonation";
import YourFunds from "@/components/YourFunds";

export default function Home() {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="px-12 py-1 text-white ml-8">
            {/* Heading */}
            <div>
                <h2 className="text-3xl mt-2 font-semibold">Welcome back, John</h2>
                <p className="font-light text-sm opacity-80 mt-2">
                    Donate with Trust. Impact with Transparency.
                </p>
            </div>

            <YourDonation />

            <YourFunds />

        </div>
    );
}
