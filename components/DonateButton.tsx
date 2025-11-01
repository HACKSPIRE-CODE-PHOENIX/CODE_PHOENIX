"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

interface DonateButtonProps {
  recipient: string;
}

export default function DonateButton({ recipient }: DonateButtonProps) {
  const { connect, signAndSubmitTransaction, account, connected } = useWallet();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    try {
      if (!connected || !account?.address) {
        alert("⚠️ Please connect your Petra wallet first!");
        await connect("Petra"); // Automatically prompt wallet connect
        return;
      }

      if (!amount || parseFloat(amount) <= 0) {
        alert("Enter a valid amount to donate!");
        return;
      }

      setLoading(true);

      const payload: any = {
  data: {
    function: "0x1::aptos_account::transfer",
    typeArguments: [],
    functionArguments: [
      recipient,
      (parseFloat(amount) * 10 ** 8).toString(),
    ],
  },
};

      console.log("🚀 Sending transaction:", payload);
      const response = await signAndSubmitTransaction(payload);
      console.log("✅ Transaction submitted:", response);

      alert("Donation sent successfully!");
      setAmount("");
    } catch (error) {
      console.error("❌ Transaction failed:", error);
      alert("Transaction failed! Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <input
        type="number"
        placeholder="Enter amount (APT)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2"
      />

      <button
        onClick={handleDonate}
        disabled={loading}
        className={`w-full px-4 py-2 rounded-lg text-white transition ${
          loading
            ? "bg-gray-200 cursor-not-allowed"
            : connected
            ? "bg-[#ff5c00] hover:bg-[#933600]"
            : "bg-yellow-600 hover:bg-yellow-700"
        }`}
      >
        {loading
          ? "Processing..."
          : connected
          ? "Donate Now"
          : "Connect Wallet to Donate"}
      </button>
    </div>
  );
}
