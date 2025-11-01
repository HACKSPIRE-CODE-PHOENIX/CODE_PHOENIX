"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  description: string;
  goal: number;
  creator: string;
  createdAt: { seconds: number; nanoseconds: number } | null;
}

export default function DiscoverPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const postList: Post[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">),
        }));
        setPosts(postList);
      } catch (err) {
        console.error(err);
        setError("Failed to load donation requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading donation requests...
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

  if (posts.length === 0) {
    return (
      <div className="flex min-h-screen justify-center items-center text-gray-500">
        No donation requests yet.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl min-h-screen mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Discover Donation Requests 🌍
      </h1>

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link href={`/discover/${post.id}`} key={post.id}>
            <div className="w-full max-w-3xl mx-auto bg-[#2a190f] border border-[#ff5c00]/60 rounded-2xl px-6 py-5 flex flex-wrap md:flex-nowrap items-center justify-between shadow-md hover:shadow-lg transition-shadow duration-300">
  {/* Left Section */}
  <div className="flex flex-col text-left">
    <h2 className="text-xl font-semibold text-white">
      {post.title || "The Fulokpi Welfare Fund"}
    </h2>
    <p className="text-sm text-gray-400 mt-1">
      {post.organization || "The Fulokpi Welfare Association"}
    </p>
  </div>

  {/* Middle Section */}
  <div className="flex items-center justify-center gap-8 text-gray-200 mt-4 md:mt-0">
    <div className="flex  flex-col items-center">
      <span className="text-xs uppercase tracking-wider text-gray-400">
        Target
      </span>
      <span className="text-lg font-semibold text-white flex items-center gap-1">
        {post.goal} <span className="text-[#ff5c00] font-bold">APT</span>
      </span>
    </div>
    <div className="flex  flex-col items-center">
      <span className="text-xs uppercase tracking-wider text-gray-400">
        Cause
      </span>
      <span className="px-3 py-1 rounded-full bg-[#3b2415] text-sm text-gray-300">
        {post.description}
      </span>
    </div>
    <div className="flex  flex-col items-center">
      <span className="text-xs uppercase tracking-wider text-gray-400">
        Milestones
      </span>
      <span className="px-3 py-1 rounded-full bg-[#3b2415] text-sm text-gray-300">
        3
      </span>
    </div>
  </div>
</div>

          </Link>
        ))}
      </div>
    </div>
  );
}
