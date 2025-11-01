"use client";
import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function ConnectPage() {
  const { connect, disconnect, account, connected, wallets } = useWallet();
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Load name from Firestore once wallet is connected
  useEffect(() => {
    const fetchUser = async () => {
      if (connected && account?.address) {
        const userDoc = await getDoc(doc(db, "users", account.address.toString())
);
        if (userDoc.exists()) setSavedName(userDoc.data().name);
      }
    };
    fetchUser();
  }, [connected, account]);

  const connectWallet = async () => {
    try {
      // You can optionally select a wallet (Petra, Martian, etc.)
      // This connects to the first available wallet.
      if (wallets.length > 0) {
        await connect(wallets[0].name);
      } else {
        showError("No Aptos wallets found. Install Petra or Martian!");
      }
    } catch (err) {
      showError("Error connecting wallet. Try again!");
    }
  };

  const createProfile = async () => {
    if (!account?.address || !name.trim()) return;
    try {
      await setDoc(doc(db, "users", account.address.toString())
, {
        name,
        createdAt: new Date().toISOString(),
      });
      setSavedName(name);
    } catch {
      showError("Failed to save profile.");
    }
  };

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-10 min-h-screen">
      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-md">{error}</div>
      )}

      {!connected ? (
        <button
          onClick={connectWallet}
          className="bg-[#ff5c00] text-white px-7 py-4 text-3xl rounded-lg hover:bg-[#622400] hover:font-bold transition"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="text-[#ff5c00] font-2xl font-medium">
            Connected: {account?.address.toString().slice(0, 6)}...{account?.address.toString().slice(-4)}

          </p>

          {!savedName ? (
            <div className="flex flex-col gap-3 items-center">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
              <button
                onClick={createProfile}
                className="bg-[#ff5c00] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Create Profile
              </button>
            </div>
          ) : (
            <p className="text-gray-700">
              Welcome back, <span className="font-semibold">{savedName}</span> 👋
            </p>
          )}

          <button
            onClick={disconnect}
            className="bg-[#692802] text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  );
}
