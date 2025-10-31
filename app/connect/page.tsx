"use client";
import { useState, useEffect } from "react";

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Load connection on mount
  useEffect(() => {
    const connectIfPreviouslyConnected = async () => {
      if ("aptos" in window) {
        const wallet = (window as any).aptos;

        // Check if previously connected
        const wasConnected = localStorage.getItem("petraConnected");
        if (wasConnected) {
          try {
            const acc = await wallet.account();
            if (acc?.address) {
              setAccount(acc.address);
            }
          } catch {
            localStorage.removeItem("petraConnected");
          }
        }
      }
    };

    connectIfPreviouslyConnected();
  }, []);

  // 🔹 Connect Wallet
  const connectWallet = async () => {
    if (!("aptos" in window)) {
      showError("Petra wallet not installed!");
      return;
    }

    const wallet = (window as any).aptos;
    try {
      const response = await wallet.connect();
      setAccount(response.address);
      localStorage.setItem("petraConnected", "true"); // ✅ persist connection
    } catch (err) {
      showError("Error connecting to wallet, try again.");
    }
  };

  // 🔹 Disconnect Wallet
  const disconnectWallet = async () => {
    try {
      await (window as any).aptos.disconnect();
    } catch {}
    localStorage.removeItem("petraConnected");
    setAccount(null);
  };

  // 🔹 Error Popup (2s)
  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 mt-10">
      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-md">
          {error}
        </div>
      )}

      {account ? (
        <>
          <p className="text-green-600 font-medium">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <button
            onClick={disconnectWallet}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
