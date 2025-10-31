"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import DonateButton from "@/components/DonateButton";

interface Post {
  id: string;
  title: string;
  description: string;
  goal: number;
  creator: string;
  collected?: number; // optional if not yet implemented
  createdAt: { seconds: number; nanoseconds: number } | null;
}


export default function DonationDetailsPage() {
  const { id } = useParams();
  const { account } = useWallet();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id as string);
        const docSnap = await getDoc(docRef);
        console.log("Current Post ID:", id);

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...(docSnap.data() as Omit<Post, "id">) });
        } else {
          setError("Donation request not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load donation request.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading donation details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-medium">
        {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        No details available.
      </div>
    );
  }
  const isCreator =post.creator.toLowerCase() === account?.address?.toString().toLowerCase();

  const collected = post.collected || 0;
  const progress = Math.min((collected / post.goal) * 100, 100);

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">
        {post.title}
      </h1>
      <p className="text-gray-600 mb-4">{post.description}</p>
      <p className="text-gray-800 font-medium mb-2">
        🎯 Goal: {post.goal} APT
      </p>
      <p className="text-gray-800 font-medium mb-2">
        💰 Collected: {collected} APT
      </p>
      <div className="w-full bg-gray-200 h-3 rounded-full mb-6">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mb-6">
        👤 Creator: {post.creator.slice(0, 6)}...{post.creator.slice(-4)}
      </p>
        {!isCreator && <DonateButton recipient={post.creator} />}

    </div>
  );
}
