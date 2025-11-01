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
            <div className="border border-[#ff5c00] bg-[#2a190f] flex justify-around rounded-xl shadow-sm p-5  hover:shadow-md transition cursor-pointer">
              <h2 className="text-xl font-semibold text-white mb-2">
                <span>Title: </span>{post.title}
              </h2>
              <p className="text-gray-200 mb-3">{post.description}</p>
              <p className="text-gray-200 font-medium mb-2">
                🎯 Goal: {post.goal} APT
              </p>
              <p className="text-sm text-gray-200">
                👤 Creator: {post.creator.slice(0, 6)}...{post.creator.slice(-4)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
