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
      <div className="min-h-screen bg-[#2a190f] flex justify-center items-center relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 font-medium">Loading your dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Preparing your space</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#2a190f] flex flex-col justify-center items-center relative overflow-hidden p-6">
        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        
        <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 max-w-md w-full text-center relative z-10 shadow-2xl">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Access Required</h2>
          <p className="text-red-400 font-medium text-lg mb-2">Authentication Error</p>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">{error}</p>
          <button
            onClick={() => router.push("/start")}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 font-medium w-full shadow-lg hover:shadow-orange-500/25"
          >
            Return to Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2a190f] text-white relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-20 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl animate-float delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-yellow-600/5 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl animate-float delay-3000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800 p-8 mb-8 text-center relative overflow-hidden">
          {/* Header Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-500/20 rotate-45">
              <span className="text-2xl font-bold text-white -rotate-45">👋</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">{name}</span>
            </h1>
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-5 inline-block max-w-full overflow-hidden border border-gray-700">
              <p className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Wallet Address</p>
              <p className="font-mono text-white text-base break-all bg-black/40 px-5 py-3 rounded-xl border border-gray-700/50">
                {account}
              </p>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Create Post Card */}
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800 p-8 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Create Post</h2>
                  <p className="text-gray-400 text-sm">Share your thoughts with the community</p>
                </div>
              </div>
              {account && <CreatePost walletAddress={account} />}
            </div>
          </div>

          {/* My Donations Card */}
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800 p-8 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">My Donations</h2>
                  <p className="text-gray-400 text-sm">Track your contribution history</p>
                </div>
              </div>
              <MyDonationList walletAddress={account!} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-10 py-4 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-medium shadow-2xl border border-gray-700 hover:border-gray-600 hover:scale-105 transform duration-300 group"
          >
            <span className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </span>
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}