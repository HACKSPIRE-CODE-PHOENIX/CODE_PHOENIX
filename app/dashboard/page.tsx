"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import CreatePost from "../../components/CreatePost";
import MyDonationList from "../../components/MyDonationsList";

export default function DashboardPage() {

    
  const [account, setAccount] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    
    const loadUserData = async () => {
      if (!("aptos" in window)) {
        setError("Petra wallet not installed!");
        setLoading(false);
        return;
      }

      const wallet = (window as any).aptos;
      const wasConnected = localStorage.getItem("petraConnected");

      if (!wasConnected) {
        setError("Please connect your wallet first!");
        setLoading(false);
        return;
      }

      try {
        const acc = await wallet.account();
        if (acc?.address) {
          setAccount(acc.address);

          const docRef = doc(db, "users", acc.address);
          const userDoc = await getDoc(docRef);
          if (userDoc.exists()) {
            setName(userDoc.data().name);
          } else {
            setError("Profile not found! Please create one first.");
          }
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-lg text-gray-600">
        Loading your dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={() => router.push("/start")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 mt-10">
      <h1 className="text-2xl font-semibold text-gray-800">
        Welcome, <span className="text-green-600">{name}</span> 👋
      </h1>
      <p className="text-gray-700">
        Wallet Address:{" "}
        <span className="font-mono bg-gray-100 px-2 py-1 rounded-md">
          {account}
        </span>
      </p>

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
      >
        Back to Home
      </button>
      
      {account && <CreatePost walletAddress={account} />}
      <MyDonationList walletAddress={account!} />

    </div>
  );
}
